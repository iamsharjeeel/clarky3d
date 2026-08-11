"use client";

import { useCart } from "@/components/cart/CartProvider";

export function CartButton() {
  const { count, openCart } = useCart();
  return (
    <button type="button" className="cart-btn" aria-label="Open cart" onClick={openCart}>
      <span className="cart-btn-label">Cart</span>
      <span className="cart-count" aria-hidden="true">
        {count}
      </span>
    </button>
  );
}
