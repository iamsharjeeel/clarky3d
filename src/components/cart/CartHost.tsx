"use client";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import type { ReactNode } from "react";

export function CartHost({
  children,
  currencyLabel,
  telegramHandle,
}: {
  children: ReactNode;
  currencyLabel: string;
  telegramHandle?: string;
}) {
  return (
    <CartProvider>
      {children}
      <CartDrawer currencyLabel={currencyLabel} telegramHandle={telegramHandle} />
    </CartProvider>
  );
}
