'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FREE_SHIPPING_THRESHOLD, useCart } from '@/components/cart-provider';
import { assetPath } from '@/lib/catalog';
import { money } from '@/lib/format';

export function CartDrawer() {
  const { lines, count, subtotal, drawerOpen, closeDrawer, setQty, remove } = useCart();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  React.useEffect(() => {
    if (!drawerOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className={`fixed inset-0 z-[60] bg-on-surface/40 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Shopping bag"
        aria-hidden={!drawerOpen}
        className={`fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col bg-surface-container-lowest shadow-2xl transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-outline-variant p-6">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="material-symbols-outlined text-xl">
              shopping_bag
            </span>
            <h2 className="font-headline text-sm font-semibold uppercase tracking-[0.2em] text-on-surface">
              Your Bag ({count})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close bag"
            className="p-2 text-on-surface transition-colors hover:text-primary"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-2xl">
              close
            </span>
          </button>
        </div>

        <div className="bg-warm-sand px-6 py-3">
          <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase tracking-wider">
            <span className="font-semibold text-on-surface">Complimentary shipping over €60</span>
            <span className="font-bold text-tertiary">{remaining > 0 ? `${money(remaining)} away` : 'Applied'}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
            <div className="h-full bg-tertiary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <span aria-hidden="true" className="material-symbols-outlined mb-3 text-3xl text-outline">
                shopping_bag
              </span>
              <p className="text-sm text-on-surface-variant">Your bag is empty.</p>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="mt-5 bg-primary px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-on-primary transition-colors hover:bg-tertiary"
              >
                Explore the Shop
              </Link>
            </div>
          ) : (
            lines.map((line) => (
              <div key={line.slug} className="flex gap-4">
                <Link
                  href={`/product/${line.slug}`}
                  onClick={closeDrawer}
                  className="flex h-20 w-20 shrink-0 items-center justify-center bg-surface-container-low p-2"
                >
                  <Image
                    src={assetPath(line.product.image)}
                    alt={line.product.name}
                    width={line.product.imageWidth}
                    height={line.product.imageHeight}
                    className="h-full w-full object-contain"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/product/${line.slug}`}
                      onClick={closeDrawer}
                      className="font-headline text-base leading-tight text-on-surface hover:text-tertiary"
                    >
                      {line.product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(line.slug)}
                      aria-label={`Remove ${line.product.name}`}
                      className="text-outline transition-colors hover:text-error"
                    >
                      <span aria-hidden="true" className="material-symbols-outlined text-base">
                        close
                      </span>
                    </button>
                  </div>
                  <span className="mt-0.5 text-[10px] uppercase tracking-wider text-on-surface-variant">
                    {line.product.size}
                  </span>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center border border-outline-variant">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${line.product.name}`}
                        onClick={() => setQty(line.slug, line.qty - 1)}
                        className="flex h-7 w-7 items-center justify-center text-on-surface hover:text-primary"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs tabular-nums">{line.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${line.product.name}`}
                        onClick={() => setQty(line.slug, line.qty + 1)}
                        className="flex h-7 w-7 items-center justify-center text-on-surface hover:text-primary"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-on-surface">{money(line.lineTotal)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-auto flex flex-col gap-4 border-t border-outline-variant bg-warm-sand p-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider">
            <span className="text-on-surface-variant">Subtotal</span>
            <span className="font-headline text-lg font-semibold text-on-surface">{money(subtotal)}</span>
          </div>
          <p className="text-[11px] text-on-surface-variant">Prices include VAT. This demonstration store does not process payments.</p>
          <Link
            href="/cart"
            onClick={closeDrawer}
            className="w-full bg-on-surface py-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-surface-container-lowest transition-colors hover:bg-primary"
          >
            Proceed to Demo Checkout
          </Link>
          <button
            type="button"
            onClick={closeDrawer}
            className="py-1 text-center text-[11px] uppercase tracking-widest text-on-surface-variant transition-colors hover:text-on-surface"
          >
            Continue Shopping
          </button>
        </div>
      </aside>
    </>
  );
}
