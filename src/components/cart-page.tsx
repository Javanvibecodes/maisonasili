'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/cart-provider';
import { assetPath } from '@/lib/catalog';
import { money } from '@/lib/format';

const countries = [
  'Germany',
  'Austria',
  'Switzerland',
  'France',
  'Netherlands',
  'Belgium',
  'United Kingdom',
  'Italy',
  'Spain',
  'Other'
];

export function CartPageContent() {
  const { lines, count, subtotal, hydrated, setQty, remove, clear } = useCart();
  const [checkoutOpen, setCheckoutOpen] = React.useState(false);
  const [orderPlaced, setOrderPlaced] = React.useState(false);

  function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setOrderPlaced(true);
  }

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-20 text-center text-sm text-on-surface-variant lg:px-12">
        Loading your bag…
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-12">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant"
      >
        <Link href="/" className="transition-colors hover:text-on-surface">
          Home
        </Link>
        <span className="text-outline-variant">/</span>
        <span className="font-semibold text-on-surface">Shopping Bag</span>
      </nav>

      <div className="mb-10 flex flex-col justify-between gap-4 border-b border-outline-variant pb-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-headline text-4xl font-light tracking-tight text-on-surface sm:text-5xl">Shopping Bag</h1>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">
          <span className="font-semibold text-on-surface">{count}</span> {count === 1 ? 'item' : 'items'} • saved in
          this browser
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex flex-col gap-6">
            {lines.map((line) => (
              <div
                key={line.slug}
                className="flex flex-col gap-4 border border-outline-variant bg-surface-container-lowest p-4 sm:flex-row sm:items-center"
              >
                <Link
                  href={`/product/${line.slug}`}
                  className="flex h-28 w-full shrink-0 items-center justify-center bg-surface-container-low p-3 sm:w-28"
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
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/product/${line.slug}`}
                        className="font-headline text-xl text-on-surface transition-colors hover:text-tertiary"
                      >
                        {line.product.name}
                      </Link>
                      <p className="mt-1 text-[11px] uppercase tracking-wider text-on-surface-variant">
                        {line.product.size} • {line.product.eyebrow}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.slug)}
                      aria-label={`Remove ${line.product.name} from bag`}
                      className="text-outline transition-colors hover:text-error"
                    >
                      <span aria-hidden="true" className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center border border-outline-variant">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${line.product.name}`}
                        onClick={() => setQty(line.slug, line.qty - 1)}
                        className="flex h-9 w-9 items-center justify-center text-on-surface transition-colors hover:text-primary"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm tabular-nums">{line.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${line.product.name}`}
                        onClick={() => setQty(line.slug, line.qty + 1)}
                        className="flex h-9 w-9 items-center justify-center text-on-surface transition-colors hover:text-primary"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                        {money(line.product.price)} each
                      </div>
                      <div className="font-headline text-lg font-semibold text-on-surface">{money(line.lineTotal)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {lines.length === 0 ? (
            <div className="flex flex-col items-center border border-outline-variant bg-surface-container-lowest px-6 py-16 text-center">
              <span aria-hidden="true" className="material-symbols-outlined mb-4 text-4xl text-outline">
                shopping_bag
              </span>
              <h2 className="mb-2 font-headline text-2xl font-light text-on-surface">Your bag is waiting</h2>
              <p className="mb-6 max-w-sm text-xs leading-relaxed text-on-surface-variant">
                Nothing has been added yet. Explore the pantry — spice blends, botanical salts and rare teas — and add a
                few provisions to see the bag in action.
              </p>
              <Link
                href="/shop"
                className="bg-on-surface px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-surface-container-lowest transition-colors hover:bg-primary"
              >
                Explore the Shop
              </Link>
            </div>
          ) : null}

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant transition-colors hover:text-tertiary"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Continue shopping
          </Link>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-32 border border-outline-variant bg-surface-container-lowest p-6 lg:p-7">
            <h2 className="mb-5 border-b border-outline-variant pb-4 font-headline text-sm font-semibold uppercase tracking-[0.2em] text-on-surface">
              Order Summary
            </h2>
            <dl className="mb-5 flex flex-col gap-3 text-xs">
              <div className="flex items-center justify-between">
                <dt className="uppercase tracking-wider text-on-surface-variant">Subtotal</dt>
                <dd className="font-semibold text-on-surface">{money(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="uppercase tracking-wider text-on-surface-variant">Shipping</dt>
                <dd className="text-on-surface-variant">Calculated at the next step</dd>
              </div>
              <div className="flex items-center justify-between border-t border-outline-variant pt-3">
                <dt className="font-semibold uppercase tracking-wider text-on-surface">Estimated total</dt>
                <dd className="font-headline text-xl font-semibold text-on-surface">{money(subtotal)}</dd>
              </div>
            </dl>
            <p className="mb-5 text-[11px] leading-relaxed text-on-surface-variant">
              Prices include VAT. This demonstration store does not process payments — no order will be placed.
            </p>
            <button
              type="button"
              disabled={lines.length === 0}
              onClick={() => {
                setCheckoutOpen(true);
                setOrderPlaced(false);
                window.setTimeout(() => {
                  document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
                }, 30);
              }}
              className="w-full bg-on-surface py-4 text-xs font-semibold uppercase tracking-[0.25em] text-surface-container-lowest transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Proceed to Demo Checkout
            </button>
            <div className="mt-5 flex items-start gap-3 border-t border-outline-variant pt-5">
              <span aria-hidden="true" className="material-symbols-outlined mt-0.5 text-base text-tertiary">
                verified_user
              </span>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                <strong className="text-on-surface">Demonstration only.</strong> No payment details are collected, no
                account is required and no order is transmitted.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {checkoutOpen && !orderPlaced && lines.length > 0 ? (
        <section id="checkout" className="mt-16 scroll-mt-32 border-t border-outline-variant pt-12">
          <div className="mb-8">
            <h2 className="font-headline text-3xl font-light tracking-tight text-on-surface">
              Where would we send it?
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-on-surface-variant">
              The form below behaves exactly like a real checkout, but it runs entirely in your browser. Nothing is
              submitted anywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <form className="flex flex-col gap-5 lg:col-span-7" noValidate onSubmit={handleCheckout}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface">
                    Full name <span className="text-tertiary">*</span>
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-tertiary focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface">
                    Email <span className="text-tertiary">*</span>
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-tertiary focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface">
                    Delivery address <span className="text-tertiary">*</span>
                  </span>
                  <input
                    name="address"
                    type="text"
                    required
                    placeholder="Street and number"
                    className="border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-tertiary focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface">
                    City <span className="text-tertiary">*</span>
                  </span>
                  <input
                    name="city"
                    type="text"
                    required
                    placeholder="City"
                    className="border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-tertiary focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface">
                    Country <span className="text-tertiary">*</span>
                  </span>
                  <select
                    name="country"
                    required
                    defaultValue=""
                    className="border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface focus:border-tertiary focus:outline-none"
                  >
                    <option value="">Please select</option>
                    {countries.map((country) => (
                      <option key={country}>{country}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface">
                    Delivery notes{' '}
                    <span className="font-normal normal-case tracking-normal text-on-surface-variant">(optional)</span>
                  </span>
                  <textarea
                    name="notes"
                    placeholder="Door code, preferred delivery day, gift message…"
                    className="min-h-[110px] resize-y border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-tertiary focus:outline-none"
                  />
                </label>
              </div>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="bg-on-surface px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-surface-container-lowest transition-colors hover:bg-primary"
                >
                  Place Demo Order
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(false)}
                  className="border border-outline-variant px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-on-surface transition-colors hover:border-tertiary hover:text-tertiary"
                >
                  Back to bag
                </button>
              </div>
            </form>

            <div className="lg:col-span-5">
              <div className="border border-outline-variant bg-warm-sand p-6">
                <h3 className="mb-4 font-headline text-sm font-semibold uppercase tracking-[0.2em] text-on-surface">
                  In your bag
                </h3>
                <div className="flex flex-col gap-4 text-xs">
                  {lines.map((line) => (
                    <div key={line.slug} className="flex items-center justify-between gap-3">
                      <span className="text-on-surface">
                        {line.product.name} <span className="text-on-surface-variant">× {line.qty}</span>
                      </span>
                      <span className="font-semibold text-on-surface">{money(line.lineTotal)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-outline-variant pt-4">
                  <span className="text-[11px] uppercase tracking-wider text-on-surface-variant">Total</span>
                  <span className="font-headline text-lg font-semibold text-on-surface">{money(subtotal)}</span>
                </div>
                <p className="mt-4 text-[11px] leading-relaxed text-on-surface-variant">
                  No payment method is requested: this storefront is a frontend demonstration for client review.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {orderPlaced ? (
        <section className="mt-16 border border-tertiary bg-surface-container-lowest px-6 py-14 text-center">
          <span aria-hidden="true" className="material-symbols-outlined mb-4 text-4xl text-tertiary">
            mark_email_read
          </span>
          <h2 className="mb-3 font-headline text-2xl font-light text-on-surface">
            Thank you — the flow works end-to-end
          </h2>
          <p className="mx-auto mb-2 max-w-xl text-sm leading-relaxed text-on-surface-variant">
            <strong className="text-on-surface">
              This is a demonstration store. Your order has not been placed and no payment has been processed.
            </strong>
          </p>
          <p className="mx-auto mb-6 max-w-xl text-xs leading-relaxed text-on-surface-variant">
            Nothing was transmitted from your browser: no personal details, no payment data and no email. The bag will
            stay as it is until you clear it.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="bg-on-surface px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-surface-container-lowest transition-colors hover:bg-primary"
            >
              Continue Shopping
            </Link>
            <button
              type="button"
              onClick={() => {
                clear();
                setOrderPlaced(false);
                setCheckoutOpen(false);
              }}
              className="border border-outline-variant px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors hover:border-tertiary hover:text-tertiary"
            >
              Clear the demonstration bag
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
