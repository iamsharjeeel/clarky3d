"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import type { CartLine } from "@/lib/cart/telegram";

type CartItem = CartLine & { id: string };

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "clarky3d-cart-v1";

let memoryItems: CartItem[] | null = null;
const listeners = new Set<() => void>();

function lineId(item: Omit<CartItem, "id" | "quantity">): string {
  return `${item.title}::${JSON.stringify(item.colourSelections)}`;
}

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getClientItems(): CartItem[] {
  if (memoryItems === null) {
    memoryItems = readStorage();
  }
  return memoryItems;
}

function setClientItems(next: CartItem[]) {
  memoryItems = next;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getClientItems, () => []);
  const [isOpen, setIsOpen] = useState(false);

  const value: CartContextValue = {
    items,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem: (item) => {
      const id = lineId(item);
      const current = getClientItems();
      const existing = current.find((entry) => entry.id === id);
      const next = existing
        ? current.map((entry) =>
            entry.id === id ? { ...entry, quantity: entry.quantity + (item.quantity ?? 1) } : entry,
          )
        : [...current, { ...item, id, quantity: item.quantity ?? 1 }];
      setClientItems(next);
      setIsOpen(true);
    },
    setQuantity: (id, quantity) => {
      setClientItems(
        getClientItems()
          .map((entry) => (entry.id === id ? { ...entry, quantity } : entry))
          .filter((entry) => entry.quantity > 0),
      );
    },
    removeItem: (id) => {
      setClientItems(getClientItems().filter((entry) => entry.id !== id));
    },
    clear: () => setClientItems([]),
    count: items.reduce((sum, item) => sum + item.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
