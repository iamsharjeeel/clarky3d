import { describe, expect, it } from "vitest";
import { buildTelegramOrderHref, buildTelegramOrderText } from "@/lib/cart/telegram";

describe("telegram order builder", () => {
  it("builds a non-PII order summary", () => {
    const text = buildTelegramOrderText(
      [
        {
          title: "Modular Case",
          categoryLabel: "Pep Things / Cases",
          priceAud: "25.00",
          quantity: 2,
          colourSelections: { "Lid / Base": "Black", Latches: "Any / Lucky Dip" },
        },
      ],
      "AUD",
    );
    expect(text).toContain("Modular Case");
    expect(text).toContain("Qty: 2");
    expect(text).toContain("Total: $50.00 AUD");
    expect(text).not.toMatch(/@|email|phone/i);
  });

  it("encodes telegram href", () => {
    const href = buildTelegramOrderHref("Clarky_AU", "Hello");
    expect(href).toBe("https://t.me/Clarky_AU?text=Hello");
  });
});
