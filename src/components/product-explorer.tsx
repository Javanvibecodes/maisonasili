'use client';

import * as React from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { collections, type Product } from '@/lib/catalog';
import { money } from '@/lib/format';

type SortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'alpha';

interface ProductExplorerProps {
  products: Product[];
  showCategories?: boolean;
  initialCategory?: string;
}

export function ProductExplorer({ products, showCategories = true, initialCategory = 'all' }: ProductExplorerProps) {
  const priceCap = React.useMemo(() => Math.max(...products.map((product) => product.price), 10), [products]);
  const [category, setCategory] = React.useState(initialCategory);
  const [maxPrice, setMaxPrice] = React.useState(priceCap);
  const [sort, setSort] = React.useState<SortKey>('featured');

  const counts = React.useMemo(() => {
    const result: Record<string, number> = { all: products.length };
    for (const product of products) {
      result[product.category] = (result[product.category] ?? 0) + 1;
    }
    return result;
  }, [products]);

  const visible = React.useMemo(() => {
    const filtered = products.filter(
      (product) => (category === 'all' || product.category === category) && product.price <= maxPrice
    );
    const sorted = [...filtered];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => b.added - a.added);
        break;
      case 'alpha':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort((a, b) => b.added - a.added);
    }
    return sorted;
  }, [products, category, maxPrice, sort]);

  function reset() {
    setCategory('all');
    setMaxPrice(priceCap);
    setSort('featured');
  }

  return (
    <div className="w-full">
      <section className="sticky top-20 z-30 w-full border-y border-outline-variant bg-surface-container-lowest px-6 py-4 shadow-sm lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 lg:flex-row lg:items-center">
          {showCategories ? (
            <div className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              {[{ slug: 'all', navName: 'All' }, ...collections].map((collection) => {
                const active = category === collection.slug;
                return (
                  <button
                    key={collection.slug}
                    type="button"
                    onClick={() => setCategory(collection.slug)}
                    aria-pressed={active}
                    className={`whitespace-nowrap px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                      active
                        ? 'bg-on-surface font-semibold text-surface-container-lowest'
                        : 'bg-surface-container font-medium text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                  >
                    {collection.navName}{' '}
                    <span className="ml-1 opacity-70">({counts[collection.slug] ?? 0})</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <Link
                href="/shop"
                className="whitespace-nowrap bg-surface-container px-4 py-2 text-xs font-medium uppercase tracking-wider text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              >
                All provisions
              </Link>
              {collections.map((collection) => {
                const active = category === collection.slug;
                return (
                  <Link
                    key={collection.slug}
                    href={`/collections/${collection.slug}`}
                    className={`whitespace-nowrap px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                      active
                        ? 'bg-on-surface font-semibold text-surface-container-lowest'
                        : 'bg-surface-container font-medium text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                  >
                    {collection.navName}
                  </Link>
                );
              })}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end sm:gap-6">
            <div className="hidden text-xs font-medium uppercase tracking-wider text-on-surface-variant lg:block">
              <span className="font-bold text-on-surface">{visible.length}</span> items available
            </div>
            <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Max:</span>
              <span className="text-xs font-bold text-on-surface">{money(maxPrice)}</span>
              <input
                aria-label="Maximum price filter"
                type="range"
                min={10}
                max={priceCap}
                step={1}
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="w-20 cursor-pointer accent-tertiary"
              />
            </div>
            <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5">
              <label htmlFor="sort-select" className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="cursor-pointer bg-transparent text-xs font-medium uppercase tracking-wider text-on-surface focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="alpha">Alphabetical</option>
              </select>
            </div>
            <button
              type="button"
              onClick={reset}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant transition-colors hover:text-tertiary"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-12">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-outline-variant bg-surface-container-low px-6 py-24 text-center">
            <span aria-hidden="true" className="material-symbols-outlined mb-4 text-4xl text-outline">
              search_off
            </span>
            <h3 className="mb-2 font-headline text-xl font-normal tracking-wide text-on-surface">
              No Provisions Matching Criteria
            </h3>
            <p className="mb-6 max-w-md text-xs leading-relaxed text-on-surface-variant">
              Adjust your category selection or increase your price threshold to discover our spice blends, botanical
              salts and rare teas.
            </p>
            <button
              type="button"
              onClick={reset}
              className="bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-on-primary transition-colors hover:bg-tertiary"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
            {visible.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
