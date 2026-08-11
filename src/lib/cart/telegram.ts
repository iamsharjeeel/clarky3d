export type CartLine = {
  title: string;
  categoryLabel: string;
  priceAud: string;
  quantity: number;
  colourSelections: Record<string, string>;
};

export function buildTelegramOrderText(lines: CartLine[], currencyLabel: string): string {
  const blocks = lines.map((line) => {
    const colours = Object.entries(line.colourSelections)
      .map(([part, value]) => `${part}: ${value}`)
      .join("\n");
    const unit = Number(line.priceAud);
    const lineTotal = (unit * line.quantity).toFixed(2);
    return [line.title, colours, line.quantity > 1 ? `Qty: ${line.quantity}` : "", `$${lineTotal}`]
      .filter(Boolean)
      .join("\n");
  });

  const total = lines
    .reduce((sum, line) => sum + Number(line.priceAud) * line.quantity, 0)
    .toFixed(2);

  return [
    "Hi Clarky, I'd like to order this print:",
    "",
    ...blocks.flatMap((block, index) => (index === 0 ? [block] : ["", block])),
    "",
    `Total: $${total} ${currencyLabel}`,
    "Shipping to be confirmed.",
  ].join("\n");
}

export function buildTelegramOrderHref(handle: string, text: string): string {
  return `https://t.me/${handle}?text=${encodeURIComponent(text)}`;
}
