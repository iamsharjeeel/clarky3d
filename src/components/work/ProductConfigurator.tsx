"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/lib/content/schemas";

const LUCKY = "Any / Lucky Dip";

type Props = {
  product: Product;
  categoryLabel: string;
  filamentNames: string[];
};

export function ProductConfigurator({ product, categoryLabel, filamentNames }: Props) {
  const { addItem } = useCart();
  const options = useMemo(() => [...filamentNames, LUCKY], [filamentNames]);
  const [colours, setColours] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.colourParts.map((part) => [part, LUCKY])),
  );
  const [status, setStatus] = useState("");

  return (
    <form
      className="panel stack"
      onSubmit={(event) => {
        event.preventDefault();
        addItem({
          title: product.title,
          categoryLabel,
          priceAud: product.priceAud,
          colourSelections: colours,
        });
        setStatus("Added to cart");
      }}
    >
      <h2 className="meta">Print colours</h2>
      {product.colourParts.length === 0 ? (
        <p className="meta">No part colours to choose for this print.</p>
      ) : (
        product.colourParts.map((part) => (
          <label key={part} className="field">
            <span>{part}</span>
            <select
              name={part}
              value={colours[part] ?? LUCKY}
              onChange={(event) =>
                setColours((current) => ({ ...current, [part]: event.target.value }))
              }
            >
              {options.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        ))
      )}
      <p className="meta">
        Leave parts on Lucky Dip and Clarky will pick. Colour list comes from the captured filament
        inventory.
      </p>
      <button type="submit" className="btn">
        Add to cart
      </button>
      <p className="meta" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
