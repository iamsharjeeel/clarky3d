import { NextResponse } from "next/server";
import { getContactAdapter } from "@/lib/contact/adapters";
import { checkRateLimit } from "@/lib/contact/rate-limit";
import { contactInputSchema } from "@/lib/contact/schema";
import { getSiteUrl } from "@/lib/env";

export const runtime = "nodejs";

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "anonymous";
}

function originAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const requestOrigin = new URL(origin).origin;
    const configured = new URL(getSiteUrl()).origin;
    const allowed = new Set(
      [
        configured,
        process.env.SITE_URL,
        process.env.NEXT_PUBLIC_SITE_URL,
        "http://127.0.0.1:3000",
        "http://localhost:3000",
      ]
        .filter(Boolean)
        .map((value) => {
          try {
            return new URL(String(value)).origin;
          } catch {
            return null;
          }
        })
        .filter((value): value is string => Boolean(value)),
    );
    return allowed.has(requestOrigin);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!originAllowed(request)) {
    return NextResponse.json({ ok: false, errorType: "origin" }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json") && !contentType.includes("form")) {
    return NextResponse.json({ ok: false, errorType: "content_type" }, { status: 415 });
  }

  const rate = checkRateLimit(`contact:${clientKey(request)}`);
  if (!rate.ok) {
    return NextResponse.json(
      { ok: false, errorType: "rate_limit" },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } },
    );
  }

  let payload: unknown;
  try {
    if (contentType.includes("application/json")) {
      payload = await request.json();
    } else {
      const form = await request.formData();
      payload = Object.fromEntries(form.entries());
      if (payload && typeof payload === "object" && "consent" in payload) {
        (payload as Record<string, unknown>).consent =
          (payload as Record<string, unknown>).consent === "on" ||
          (payload as Record<string, unknown>).consent === "true" ||
          (payload as Record<string, unknown>).consent === true;
      }
    }
  } catch {
    return NextResponse.json({ ok: false, errorType: "invalid_json" }, { status: 400 });
  }

  const parsed = contactInputSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, errorType: "validation", fieldErrors }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const adapter = getContactAdapter();
  const result = await adapter.deliver(parsed.data);
  if (!result.ok) {
    console.error("contact_delivery_failed", {
      provider: result.provider,
      errorType: result.errorType,
    });
    return NextResponse.json({ ok: false, errorType: "delivery" }, { status: 502 });
  }

  console.info("contact_delivery_ok", {
    provider: result.provider,
    providerId: result.providerId,
  });

  return NextResponse.json({ ok: true });
}
