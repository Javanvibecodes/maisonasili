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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div
          className={`flex w-full items-center justify-between border border-outline-variant bg-warm-sand px-3 ${
            compact ? 'py-1.5 sm:w-32' : 'py-2 sm:w-36'
          }`}
        >
          <button
            type="button"
            aria-label={`Decrease quantity of ${product.name}`}
            onClick={() => updateQty(qty - 1)}
            className={`flex items-center justify-center font-semibold text-on-surface transition-colors hover:text-primary ${
              compact ? 'h-7 w-7 text-sm' : 'h-8 w-8 text-base'
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
              compact ? 'h-7 w-7 text-sm' : 'h-8 w-8 text-base'
            }`}
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className={`flex flex-1 items-center justify-center gap-2.5 whitespace-nowrap bg-primary font-bold uppercase tracking-[0.16em] text-on-primary shadow-md transition-colors hover:bg-brand-gold hover:text-primary ${
            compact ? 'px-4 py-3 text-[10px] sm:px-5' : 'gap-3 px-4 py-4 text-[11px] tracking-[0.18em] sm:px-6'
          }`}
        >
          <span
            aria-hidden="true"
            className={`material-symbols-outlined ${compact ? 'text-sm' : 'text-base'}`}
          >
            add_shopping_cart
          </span>
          <span>Add to Order Cart</span>
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
            {qty} × {product.name} added to your order cart.{' '}
            <Link href="/cart" className="font-semibold underline underline-offset-2 hover:text-primary">
              Review your order cart
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
            <p className="font-semibold text-on-surface">Trade pricing on request</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-on-surface-variant">
              Add the quantities you need and submit a wholesale order request. Maison Asili will confirm availability,
              trade pricing and fulfilment with you directly.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
