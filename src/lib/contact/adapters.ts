import type { ContactInput } from "@/lib/contact/schema";

export type DeliveryResult =
  | { ok: true; provider: string; providerId: string }
  | { ok: false; provider: string; errorType: "config" | "upstream" };

export interface ContactAdapter {
  name: string;
  deliver(input: ContactInput): Promise<DeliveryResult>;
}

export class MemoryContactAdapter implements ContactAdapter {
  name = "memory";
  static deliveries: Array<{ at: string; emailDomain: string }> = [];

  async deliver(input: ContactInput): Promise<DeliveryResult> {
    const domain = input.email.split("@")[1] ?? "unknown";
    MemoryContactAdapter.deliveries.push({
      at: new Date().toISOString(),
      emailDomain: domain,
    });
    return { ok: true, provider: this.name, providerId: `mem_${Date.now()}` };
  }
}

export class ResendContactAdapter implements ContactAdapter {
  name = "resend";

  async deliver(input: ContactInput): Promise<DeliveryResult> {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL;
    if (!apiKey || !from || !to) {
      return { ok: false, provider: this.name, errorType: "config" };
    }

    let response: Response;
    try {
      response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: input.email,
          subject: `Clarky3D enquiry from ${input.name}`,
          text: [
            `Name: ${input.name}`,
            `Email: ${input.email}`,
            input.company ? `Company: ${input.company}` : null,
            input.serviceInterest ? `Interest: ${input.serviceInterest}` : null,
            "",
            input.message,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
        signal: AbortSignal.timeout(10_000),
      });
    } catch {
      return { ok: false, provider: this.name, errorType: "upstream" };
    }

    if (!response.ok) {
      return { ok: false, provider: this.name, errorType: "upstream" };
    }
    const payload = (await response.json()) as { id?: string };
    return {
      ok: true,
      provider: this.name,
      providerId: payload.id ?? `resend_${Date.now()}`,
    };
  }
}

class UnavailableContactAdapter implements ContactAdapter {
  name = "unavailable";

  async deliver(): Promise<DeliveryResult> {
    return { ok: false, provider: this.name, errorType: "config" };
  }
}

export function getContactAdapter(): ContactAdapter {
  if (
    process.env.RESEND_API_KEY &&
    process.env.CONTACT_FROM_EMAIL &&
    process.env.CONTACT_TO_EMAIL
  ) {
    return new ResendContactAdapter();
  }
  if (process.env.CONTACT_DELIVERY_MODE === "memory" || process.env.NODE_ENV !== "production") {
    return new MemoryContactAdapter();
  }
  return new UnavailableContactAdapter();
}
