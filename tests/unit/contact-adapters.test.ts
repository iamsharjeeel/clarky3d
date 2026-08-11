import { afterEach, describe, expect, it, vi } from "vitest";
import { getContactAdapter, ResendContactAdapter } from "@/lib/contact/adapters";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("contact delivery adapters", () => {
  it("fails closed in production when no provider is configured", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("CONTACT_DELIVERY_MODE", "");
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    vi.stubEnv("CONTACT_TO_EMAIL", "");

    const result = await getContactAdapter().deliver({
      name: "Test User",
      email: "enquiry@example.com",
      message: "A reserved test enquiry.",
      consent: true,
    });

    expect(result).toEqual({ ok: false, provider: "unavailable", errorType: "config" });
  });

  it("returns a stable upstream failure when Resend cannot be reached", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_FROM_EMAIL", "from@example.com");
    vi.stubEnv("CONTACT_TO_EMAIL", "to@example.com");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    const result = await new ResendContactAdapter().deliver({
      name: "Test User",
      email: "enquiry@example.com",
      message: "A reserved test enquiry.",
      consent: true,
    });

    expect(result).toEqual({ ok: false, provider: "resend", errorType: "upstream" });
  });
});
