'use client';

import * as React from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart-provider';
import type { Product } from '@/lib/catalog';
import { MAX_ORDER_QUANTITY, MIN_ORDER_QUANTITY } from '@/lib/order-limits';

interface AddToOrderCartProps {
  product: Product;
  /**
   * `full` is used on the product page (with the trade-pricing note).
   * `compact` is used inside the editorial product rows.
   */
  variant?: 'full' | 'compact';
}

export function AddToOrderCart({ product, variant = 'full' }: AddToOrderCartProps) {
  const { add } = useCart();
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  function updateQty(next: number) {
    setQty(Math.min(MAX_ORDER_QUANTITY, Math.max(MIN_ORDER_QUANTITY, Math.floor(next))));
    setAdded(false);
  }

  function handleAdd() {
    add(product.slug, qty);
    setAdded(true);
  }

  const compact = variant === 'compact';

  return (
    <div className={compact ? 'flex flex-col gap-3' : 'mb-6 flex flex-col gap-4'}>
      <div className="flex flex-row items-stretch gap-1.5 sm:gap-3">
        <div
          className={`flex shrink-0 items-center justify-between border border-outline-variant bg-warm-sand px-1 sm:px-3 ${
            compact ? 'w-20 py-1.5 sm:w-32' : 'w-24 py-2 sm:w-36'
          }`}
        >
          <button
            type="button"
            aria-label={`Decrease quantity of ${product.name}`}
            onClick={() => updateQty(qty - 1)}
            className={`flex items-center justify-center font-semibold text-on-surface transition-colors hover:text-primary ${
              compact ? 'h-10 w-10 text-base sm:h-7 sm:w-7 sm:text-sm' : 'h-10 w-10 text-base sm:h-8 sm:w-8'
            }`}
          >
            −
          </button>
          <label className="sr-only" htmlFor={`order-qty-${product.slug}`}>
            Quantity of {product.name}
          </label>
          <input
            id={`order-qty-${product.slug}`}
            type="number"
            inputMode="numeric"
            min={MIN_ORDER_QUANTITY}
            max={MAX_ORDER_QUANTITY}
            step={1}
            value={qty}
            onChange={(event) => updateQty(Number(event.target.value))}
            className={`border-0 bg-transparent text-center font-semibold tabular-nums text-on-surface focus:outline-none ${
              compact ? 'w-12 text-xs' : 'w-14 text-sm'
            }`}
          />
          <button
            type="button"
            aria-label={`Increase quantity of ${product.name}`}
            onClick={() => updateQty(qty + 1)}
            className={`flex items-center justify-center font-semibold text-on-surface transition-colors hover:text-primary ${
              compact ? 'h-10 w-10 text-base sm:h-7 sm:w-7 sm:text-sm' : 'h-10 w-10 text-base sm:h-8 sm:w-8'
            }`}
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className={`flex flex-1 items-center justify-center gap-1.5 whitespace-normal bg-primary text-center font-bold uppercase leading-tight text-on-primary shadow-md transition-colors sm:hover:bg-brand-gold sm:hover:text-primary active:bg-primary sm:gap-2.5 sm:whitespace-nowrap ${
            compact
              ? 'px-2 py-3 text-[10px] tracking-[0.05em] sm:px-5 sm:text-[10px] sm:tracking-[0.16em]'
              : 'gap-2 px-2 py-4 text-[10px] tracking-[0.05em] sm:gap-3 sm:px-6 sm:text-[11px] sm:tracking-[0.18em]'
          }`}
        >
          <span
            aria-hidden="true"
            className={`material-symbols-outlined ${compact ? 'text-sm' : 'text-base'}`}
          >
            add_shopping_cart
          </span>
          <span>Add to Enquiry Selection</span>
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`min-h-[1.25rem] leading-relaxed text-tertiary ${
          compact ? 'text-[11px]' : 'text-xs'
        }`}
      >
        {added ? (
          <>
            {qty} × {product.name} added to your enquiry selection.{' '}
            <Link href="/cart" className="font-semibold underline underline-offset-2 hover:text-primary">
              Review your enquiry selection
            </Link>
          </>
        ) : null}
      </p>

      {!compact ? (
        <div className="flex items-start gap-3.5 bg-warm-sand p-4">
          <span aria-hidden="true" className="material-symbols-outlined mt-0.5 shrink-0 text-xl text-tertiary">
            request_quote
          </span>
          <div className="text-xs">
            <p className="font-semibold text-on-surface">Small-Batch Pre-Launch — Private &amp; Trade Enquiries</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-on-surface-variant">
              Your selection is a direct order enquiry. We will confirm availability, pricing, and collection or
              delivery options with you personally—or visit us at our Berlin market stalls. No payment is taken on this
              website.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
