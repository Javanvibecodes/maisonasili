'use client';

import * as React from 'react';
import { getProduct, type Product } from '@/lib/catalog';
import { MAX_ORDER_QUANTITY, MIN_ORDER_QUANTITY } from '@/lib/order-limits';

const STORAGE_KEY = 'maison-asili-order-cart';
const LEGACY_STORAGE_KEY = 'maison-asili-cart';

export { MAX_ORDER_QUANTITY, MIN_ORDER_QUANTITY };

export interface CartLine {
  slug: string;
  qty: number;
}

export interface ResolvedCartLine extends CartLine {
  product: Product;
}

interface CartContextValue {
  lines: ResolvedCartLine[];
  count: number;
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

export function clampQuantity(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return MIN_ORDER_QUANTITY;
  const integer = Math.floor(value);
  return Math.min(MAX_ORDER_QUANTITY, Math.max(MIN_ORDER_QUANTITY, integer));
}

function parseStoredCart(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const seen = new Set<string>();
    const lines: CartLine[] = [];
    for (const entry of parsed) {
      if (typeof entry !== 'object' || entry === null) continue;
      const slug = (entry as { slug?: unknown }).slug;
      const qty = (entry as { qty?: unknown }).qty;
      if (typeof slug !== 'string' || !getProduct(slug) || seen.has(slug)) continue;
      if (typeof qty !== 'number' || !Number.isFinite(qty) || qty <= 0) continue;
      seen.add(slug);
      lines.push({ slug, qty: clampQuantity(qty) });
    }
    return lines;
  } catch {
    return [];
  }
}

function readStoredCart(): CartLine[] {
  try {
    const current = window.localStorage.getItem(STORAGE_KEY);
    if (current) return parseStoredCart(current);

    // Carry over carts saved before the wholesale conversion, then retire the key.
    const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const migrated = parseStoredCart(legacy);
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      return migrated;
    }
    return [];
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

  React.useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || event.newValue === null) return;
      setStored(parseStoredCart(event.newValue));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const lines = React.useMemo<ResolvedCartLine[]>(() => {
    return stored.flatMap((line) => {
      const product = getProduct(line.slug);
      if (!product) return [];
      return [{ ...line, product }];
    });
  }, [stored]);

  const count = lines.reduce((total, line) => total + line.qty, 0);

  const add = React.useCallback((slug: string, qty = 1) => {
    if (!getProduct(slug)) return;
    const increment = clampQuantity(qty);
    setStored((current) => {
      const existing = current.find((line) => line.slug === slug);
      if (existing) {
        return current.map((line) =>
          line.slug === slug
            ? { ...line, qty: Math.min(MAX_ORDER_QUANTITY, line.qty + increment) }
            : line
        );
      }
      return [...current, { slug, qty: increment }];
    });
    setDrawerOpen(true);
  }, []);

  const setQty = React.useCallback((slug: string, qty: number) => {
    if (!Number.isFinite(qty)) return;
    setStored((current) =>
      Math.floor(qty) <= 0
        ? current.filter((line) => line.slug !== slug)
        : current.map((line) =>
            line.slug === slug ? { ...line, qty: clampQuantity(qty) } : line
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
