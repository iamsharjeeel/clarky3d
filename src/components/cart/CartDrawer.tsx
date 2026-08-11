"use client";

import { useEffect, useId, useRef } from "react";
import { buildTelegramOrderHref, buildTelegramOrderText } from "@/lib/cart/telegram";
import { useCart } from "@/components/cart/CartProvider";

type Props = {
  currencyLabel: string;
  telegramHandle?: string;
};

export function CartDrawer({ currencyLabel, telegramHandle }: Props) {
  const { items, isOpen, closeCart, setQuantity, removeItem, clear, count } = useCart();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeCartRef = useRef(closeCart);
  closeCartRef.current = closeCart;

  useEffect(() => {
    if (!isOpen) return;
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCartRef.current();
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      returnFocusRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const total = items
    .reduce((sum, item) => sum + Number(item.priceAud) * item.quantity, 0)
    .toFixed(2);
  const orderText = buildTelegramOrderText(items, currencyLabel);
  const orderHref = telegramHandle ? buildTelegramOrderHref(telegramHandle, orderText) : undefined;

  return (
    <div className="cart-overlay" role="presentation" onClick={closeCart}>
      <aside
        ref={panelRef}
        className="cart-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-head">
          <h2 id={titleId}>Your cart ({count})</h2>
          <button ref={closeRef} type="button" className="cart-close" onClick={closeCart}>
            Close
          </button>
        </div>
        {items.length === 0 ? (
          <p className="meta">Cart is empty.</p>
        ) : (
          <ul className="cart-lines">
            {items.map((item) => (
              <li key={item.id} className="cart-line">
                <div>
                  <p className="cart-line-title">{item.title}</p>
                  <p className="meta">{item.categoryLabel}</p>
                  {Object.entries(item.colourSelections).map(([part, value]) => (
                    <p key={part} className="meta">
                      {part}: {value}
                    </p>
                  ))}
                  <p className="price">${item.priceAud}</p>
                </div>
                <div className="cart-line-side">
                  <div className="qty">
                    <button
                      type="button"
                      aria-label={`Decrease quantity for ${item.title}`}
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity for ${item.title}`}
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button type="button" className="linkish" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="cart-foot">
          <p className="cart-total">
            <span className="meta">Total</span>
            <span className="price">
              ${total} {currencyLabel}
            </span>
          </p>
          <p className="meta">Shipping to be calculated</p>
          {orderHref ? (
            <a className="btn cart-order" href={orderHref} rel="noopener noreferrer">
              Order on Telegram
            </a>
          ) : (
            <p className="draft-note">
              Set `NEXT_PUBLIC_TELEGRAM_ORDER_HANDLE` to enable the Telegram order link.
            </p>
          )}
          <p className="meta">
            Opens Telegram with your order written out. Nothing is sent until you press send.
          </p>
          {items.length > 0 ? (
            <button type="button" className="linkish" onClick={clear}>
              Clear cart
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
