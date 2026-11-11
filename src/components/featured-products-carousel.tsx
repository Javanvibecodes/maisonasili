'use client';

import * as React from 'react';
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/catalog';

export function FeaturedProductsCarousel({ products }: { products: Product[] }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.scrollWidth / products.length;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.min(products.length - 1, Math.max(0, index)));
  };

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const itemWidth = el.scrollWidth / products.length;
    el.scrollTo({ left: itemWidth * index, behavior: 'smooth' });
    setActiveIndex(index);
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 lg:gap-8"
      >
        {products.map((product) => (
          <div
            key={product.slug}
            className="w-[68vw] max-w-[240px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:snap-align-none"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Slide Indicators for mobile */}
      <div className="mt-4 flex items-center justify-center gap-2 sm:hidden" aria-label="Featured products carousel navigation">
        {products.map((product, idx) => (
          <button
            key={product.slug}
            type="button"
            aria-label={`Go to ${product.name}`}
            onClick={() => scrollToIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === idx
                ? 'w-6 bg-brand-gold'
                : 'w-1.5 bg-outline-variant hover:bg-outline'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

