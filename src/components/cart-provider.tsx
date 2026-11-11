'use client';

import * as React from 'react';
import { getProduct, type Product } from '@/lib/catalog';

const STORAGE_KEY = 'maison-asili-cart';

export const FREE_SHIPPING_THRESHOLD = 60;

export interface CartLine {
  slug: string;
  qty: number;
}

export interface ResolvedCartLine extends CartLine {
  product: Product;
  lineTotal: number;
}

interface CartContextValue {
  lines: ResolvedCartLine[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  drawerOpen: boolean;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = React.createContext<CartContextValue | null>(null);

function readStoredCart(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (line): line is CartLine =>
          typeof line === 'object' &&
          line !== null &&
          typeof (line as CartLine).slug === 'string' &&
          Number.isFinite((line as CartLine).qty) &&
          (line as CartLine).qty > 0 &&
          Boolean(getProduct((line as CartLine).slug))
      )
      .map((line) => ({ slug: line.slug, qty: Math.floor(line.qty) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = React.useState<CartLine[]>([]);
  const [hydrated, setHydrated] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    setStored(readStoredCart());
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // Storage can be unavailable (private mode); the cart still works in memory.
    }
  }, [stored, hydrated]);

  const lines = React.useMemo<ResolvedCartLine[]>(() => {
    return stored.flatMap((line) => {
      const product = getProduct(line.slug);
      if (!product) return [];
      return [{ ...line, product, lineTotal: product.price * line.qty }];
    });
  }, [stored]);

  const count = lines.reduce((total, line) => total + line.qty, 0);
  const subtotal = lines.reduce((total, line) => total + line.lineTotal, 0);

  const add = React.useCallback((slug: string, qty = 1) => {
    if (!getProduct(slug)) return;
    setStored((current) => {
      const existing = current.find((line) => line.slug === slug);
      if (existing) {
        return current.map((line) =>
          line.slug === slug ? { ...line, qty: Math.min(99, line.qty + qty) } : line
        );
      }
      return [...current, { slug, qty: Math.min(99, Math.max(1, qty)) }];
    });
    setDrawerOpen(true);
  }, []);

  const setQty = React.useCallback((slug: string, qty: number) => {
    setStored((current) =>
      qty <= 0
        ? current.filter((line) => line.slug !== slug)
        : current.map((line) =>
            line.slug === slug ? { ...line, qty: Math.min(99, Math.floor(qty)) } : line
          )
    );
  }, []);

  const remove = React.useCallback((slug: string) => {
    setStored((current) => current.filter((line) => line.slug !== slug));
  }, []);

  const clear = React.useCallback(() => setStored([]), []);

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    hydrated,
    drawerOpen,
    add,
    setQty,
    remove,
    clear,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
}
