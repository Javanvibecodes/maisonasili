'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { assetPath, products } from '@/lib/catalog';

export function SearchOverlay() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('maison-search-open', handleOpen);
    return () => window.removeEventListener('maison-search-open', handleOpen);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.removeEventListener('keydown', handleKey);
      window.clearTimeout(timer);
    };
  }, [open]);

  if (!open) return null;

  const term = query.trim().toLowerCase();
  const results = term
    ? products.filter((product) =>
        [product.name, product.subtitle, product.category, product.description, ...product.ingredients]
          .join(' ')
          .toLowerCase()
          .includes(term)
      )
    : products;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Maison Asili"
      className="fixed inset-0 z-[60] overflow-y-auto bg-surface-container-lowest"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between gap-6 border-b border-outline-variant">
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary-container ring-1 ring-brand-gold/50">
              <Image src="/assets/img/img-59efbbe90f.jpg" alt="" width={44} height={44} className="h-11 w-11 scale-[1.15] object-cover" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-tertiary">Search the collection</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-on-surface transition-colors hover:text-tertiary"
            aria-label="Close search"
          >
            <span className="hidden text-[10px] uppercase tracking-[0.2em] sm:inline">Close</span>
            <span aria-hidden="true" className="material-symbols-outlined text-2xl">
              close
            </span>
          </button>
        </div>

        <div className="py-8 lg:py-12">
          <div className="flex items-center gap-4 border-b-2 border-on-surface pb-4">
            <span aria-hidden="true" className="material-symbols-outlined text-3xl text-tertiary">
              search
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Spice blends, salts, tea…"
              className="min-w-0 flex-1 bg-transparent py-1 font-headline text-2xl text-on-surface placeholder:text-outline focus:outline-none sm:text-4xl"
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.24em] text-on-surface-variant">
            <span>
              {term
                ? `${results.length} ${results.length === 1 ? 'product' : 'products'} matching “${query.trim()}”`
                : 'Search product names, categories and descriptions.'}
            </span>
          </div>

          {results.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {results.map((product) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  onClick={() => setOpen(false)}
                  className="group flex flex-col border border-transparent bg-surface-container-lowest transition-colors hover:border-outline-variant"
                >
                  <div className="flex aspect-square items-center justify-center overflow-hidden bg-surface-container-low p-4">
                    <Image
                      src={assetPath(product.image)}
                      alt={product.name}
                      width={product.imageWidth}
                      height={product.imageHeight}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-headline text-lg text-on-surface">{product.name}</h3>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-on-surface-variant">{product.subtitle}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-tertiary">Discover Product</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-16 text-center">
              <span aria-hidden="true" className="material-symbols-outlined mb-4 text-4xl text-outline">
                search_off
              </span>
              <h3 className="mb-2 font-headline text-2xl text-on-surface">Nothing matches that search</h3>
              <p className="max-w-md text-xs leading-relaxed text-on-surface-variant">
                Try “spice”, “salt”, “tea” or “moringa” — or browse the full collection instead.
              </p>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="mt-6 bg-on-surface px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-surface-container-lowest transition-colors hover:bg-primary"
              >
                Explore the Collection
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
