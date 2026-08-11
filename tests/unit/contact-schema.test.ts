import { describe, expect, it } from "vitest";
import { contactInputSchema } from "@/lib/contact/schema";

describe("contactInputSchema", () => {
  it("accepts a valid enquiry and normalizes email", () => {
    const parsed = contactInputSchema.parse({
      name: "Ada Example",
      email: "Ada@example.com",
      message: "Looking for a custom vial case print.",
      consent: true,
      website: "",
    });
    expect(parsed.email).toBe("ada@example.com");
  });

  it("rejects missing consent and short messages", () => {
    const result = contactInputSchema.safeParse({
      name: "Ada",
      email: "ada@example.com",
      message: "Hi",
      consent: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects honeypot content", () => {
    const result = contactInputSchema.safeParse({
      name: "Ada",
      email: "ada@example.com",
      message: "Looking for a custom vial case print.",
      consent: true,
      website: "https://spam.example",
    });
    expect(result.success).toBe(false);
  });
});
