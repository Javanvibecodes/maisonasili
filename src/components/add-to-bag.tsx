'use client';

import * as React from 'react';
import { useCart } from '@/components/cart-provider';
import type { Product } from '@/lib/catalog';
import { money } from '@/lib/format';

const WISHLIST_KEY = 'maison-asili-wishlist';

export function AddToBag({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = React.useState(1);
  const [wishlisted, setWishlisted] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(WISHLIST_KEY) ?? '[]') as unknown;
      setWishlisted(Array.isArray(stored) && stored.includes(product.slug));
    } catch {
      setWishlisted(false);
    }
  }, [product.slug]);

  function toggleWishlist() {
    setWishlisted((current) => {
      const next = !current;
      try {
        const stored = JSON.parse(window.localStorage.getItem(WISHLIST_KEY) ?? '[]') as unknown;
        const list = Array.isArray(stored) ? stored.filter((slug): slug is string => typeof slug === 'string') : [];
        const updated = next ? [...new Set([...list, product.slug])] : list.filter((slug) => slug !== product.slug);
        window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
      } catch {
        // Non-critical: the button still reflects the in-memory state.
      }
      return next;
    });
  }

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex items-stretch gap-3">
        <div className="flex w-32 items-center justify-between bg-warm-sand px-3 py-2 shadow-sm">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((value) => Math.max(1, value - 1))}
            className="flex h-8 w-8 items-center justify-center text-base font-semibold text-on-surface transition-colors hover:text-primary focus:outline-none"
          >
            −
          </button>
          <span className="text-xs font-bold tabular-nums text-on-surface">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((value) => Math.min(99, value + 1))}
            className="flex h-8 w-8 items-center justify-center text-base font-semibold text-on-surface transition-colors hover:text-primary focus:outline-none"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => add(product.slug, qty)}
          className="flex flex-1 items-center justify-center gap-3 whitespace-nowrap bg-primary px-4 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-on-primary shadow-md transition-colors hover:bg-brand-gold hover:text-primary sm:px-6"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-base">
            shopping_bag
          </span>
          <span>Add to Bag • {money(product.price * qty)}</span>
        </button>
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-pressed={wishlisted}
          className={`flex w-14 items-center justify-center shadow-sm transition-colors focus:outline-none ${
            wishlisted ? 'bg-primary text-brand-gold' : 'bg-warm-sand text-on-surface hover:text-primary'
          }`}
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
            {wishlisted ? 'favorite' : 'favorite_border'}
          </span>
        </button>
      </div>

      <div className="flex items-start gap-3.5 bg-warm-sand p-4">
        <span aria-hidden="true" className="material-symbols-outlined mt-0.5 shrink-0 text-xl text-tertiary">
          local_shipping
        </span>
        <div className="text-xs">
          <p className="font-semibold text-on-surface">Shipped from Berlin</p>
          <p className="mt-0.5 text-[11px] text-on-surface-variant">
            Dispatch details for the live store will be confirmed before launch — see Shipping &amp; Returns for the
            current demonstration wording.
          </p>
        </div>
      </div>
    </div>
  );
}
