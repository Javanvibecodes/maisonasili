'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/cart-provider';
import { OrderRequestForm, type OrderSubmission } from '@/components/order-request-form';
import { assetPath, collectionName } from '@/lib/catalog';

export function CartPageContent() {
  const { lines, count, hydrated, setQty, remove, clear } = useCart();
  const [submission, setSubmission] = React.useState<OrderSubmission | null>(null);

  function handleSubmitted(result: OrderSubmission) {
    setSubmission(result);
    clear();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-20 text-center text-sm text-on-surface-variant lg:px-12">
        Loading your order cart…
      </div>
    );
  }

  if (submission) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 py-12 lg:px-12">
        <section className="border border-tertiary/40 bg-surface-container-lowest px-6 py-12 sm:px-10">
          <span aria-hidden="true" className="material-symbols-outlined mb-4 text-4xl text-tertiary">
            mark_email_read
          </span>
          <h1 className="mb-3 font-headline text-3xl font-light text-on-surface sm:text-4xl">
            Order Request Received
          </h1>
          <p className="mb-2 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
            Thank you — your wholesale order request has been received by Maison Asili. This is an acknowledgement of
            your request, not a confirmed order.
          </p>
          <p className="mb-6 max-w-2xl text-xs leading-relaxed text-on-surface-variant">
            {submission.acknowledgementSent
              ? 'A copy has been sent to the email address you provided. Our team will follow up to confirm availability, trade pricing and fulfilment.'
              : 'We could not send the acknowledgement email, but our team has your request and will follow up with you directly.'}
          </p>

          <div className="mb-8 inline-block border border-outline-variant bg-surface-container-low px-5 py-4">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-on-surface-variant">
              Your order reference
            </span>
            <span className="mt-1 block font-headline text-2xl text-primary">{submission.reference}</span>
          </div>

          <h2 className="mb-4 border-b border-outline-variant pb-3 font-headline text-lg font-semibold text-on-surface">
            Products requested
          </h2>
          <ul className="mb-8 flex flex-col divide-y divide-outline-variant">
            {submission.lines.map((line) => (
              <li key={line.slug} className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="text-on-surface">
                  {line.product.name}
                  <span className="ml-2 text-xs text-on-surface-variant">{line.product.size}</span>
                </span>
                <span className="shrink-0 text-xs uppercase tracking-wider text-on-surface-variant">× {line.qty}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="bg-on-surface px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-surface-container-lowest transition-colors hover:bg-primary"
            >
              Continue Exploring
            </Link>
            <Link
              href="/contact"
              className="border border-outline-variant px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-on-surface transition-colors hover:border-tertiary hover:text-tertiary"
            >
              Contact the Maison
            </Link>
          </div>
        </section>
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
        <span className="font-semibold text-on-surface">Order Cart</span>
      </nav>

      <div className="mb-10 flex flex-col justify-between gap-4 border-b border-outline-variant pb-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-headline text-4xl font-light tracking-tight text-on-surface sm:text-5xl">Order Cart</h1>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-on-surface-variant">
            Build your wholesale selection, then submit it as an order request. Maison Asili will confirm availability,
            trade pricing and fulfilment directly.
          </p>
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
                        {line.product.size} • {collectionName(line.product.category)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.slug)}
                      aria-label={`Remove ${line.product.name} from order cart`}
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
                    <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                      Trade price confirmed on request
                    </span>
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
              <h2 className="mb-2 font-headline text-2xl font-light text-on-surface">Your order cart is empty</h2>
              <p className="mb-6 max-w-sm text-xs leading-relaxed text-on-surface-variant">
                Explore the collection and add the products and quantities you would like to request. No payment is
                taken and no prices are shown on this website.
              </p>
              <Link
                href="/shop"
                className="bg-on-surface px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-surface-container-lowest transition-colors hover:bg-primary"
              >
                Explore the Collection
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
            Continue Exploring
          </Link>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-32 border border-outline-variant bg-surface-container-lowest p-6 lg:p-7">
            <h2 className="mb-5 border-b border-outline-variant pb-4 font-headline text-sm font-semibold uppercase tracking-[0.2em] text-on-surface">
              Order Summary
            </h2>
            {lines.length > 0 ? (
              <ul className="mb-5 flex flex-col gap-3 text-xs">
                {lines.map((line) => (
                  <li key={line.slug} className="flex items-start justify-between gap-3">
                    <span className="text-on-surface">
                      {line.product.name}
                      <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-on-surface-variant">
                        {line.product.size}
                      </span>
                    </span>
                    <span className="shrink-0 font-semibold text-on-surface">× {line.qty}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-5 text-xs leading-relaxed text-on-surface-variant">
                No products have been added yet.
              </p>
            )}
            <p className="mb-5 border-t border-outline-variant pt-4 text-[11px] leading-relaxed text-on-surface-variant">
              This is a request for a trade quotation. No prices are displayed, no payment is collected and no order is
              confirmed until Maison Asili has reviewed your request.
            </p>
            <a
              href="#order-request"
              aria-disabled={lines.length === 0}
              tabIndex={lines.length === 0 ? -1 : undefined}
              className={`block w-full py-4 text-center text-xs font-semibold uppercase tracking-[0.25em] transition-colors ${
                lines.length > 0
                  ? 'bg-on-surface text-surface-container-lowest hover:bg-primary'
                  : 'pointer-events-none bg-on-surface/40 text-surface-container-lowest'
              }`}
            >
              Submit Order Request
            </a>
            <div className="mt-5 flex items-start gap-3 border-t border-outline-variant pt-5">
              <span aria-hidden="true" className="material-symbols-outlined mt-0.5 text-base text-tertiary">
                verified_user
              </span>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                Your selection is stored in this browser only. Business details are sent to Maison Asili solely to
                respond to your request.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {lines.length > 0 ? (
        <section id="order-request" className="mt-16 scroll-mt-32 border-t border-outline-variant pt-12">
          <div className="mb-8 max-w-2xl">
            <h2 className="font-headline text-3xl font-light tracking-tight text-on-surface">
              Submit your wholesale order request
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">
              Tell us who you are and how we can reach you. Required fields are marked with an asterisk.
            </p>
          </div>
          <OrderRequestForm lines={lines} onSubmitted={handleSubmitted} />
        </section>
      ) : null}
    </div>
  );
}
