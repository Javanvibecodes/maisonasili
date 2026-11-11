'use client';

import * as React from 'react';
import { InteractiveTravelCard } from '@/components/interactive-travel-card';
import { collections, getProduct, assetPath } from '@/lib/catalog';

const collectionImageSlugs: Record<string, string> = {
  spices: 'savannah-fire',
  salts: 'tropical-pink-pepper-salt',
  tea: 'royal-purple-elixir',
};

export function CollectionCards() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.scrollWidth / collections.length;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.min(collections.length - 1, Math.max(0, index)));
  };

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const itemWidth = el.scrollWidth / collections.length;
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
        {collections.map((collection) => {
          const product = getProduct(collectionImageSlugs[collection.slug] ?? '');
          const imageUrl = product ? assetPath(product.image) : '/assets/img/img-59efbbe90f.jpg';

          return (
            <div
              key={collection.slug}
              className="w-[78vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:snap-align-none"
            >
              <InteractiveTravelCard
                title={collection.name}
                subtitle={collection.tagline}
                imageUrl={imageUrl}
                actionText="Explore"
                href={`/collections/${collection.slug}`}
                className="h-[360px] w-full sm:h-[460px] lg:h-[520px]"
              />
            </div>
          );
        })}
      </div>

      {/* Slide Indicators for mobile */}
      <div className="mt-4 flex items-center justify-center gap-2 sm:hidden" aria-label="Collections carousel navigation">
        {collections.map((collection, idx) => (
          <button
            key={collection.slug}
            type="button"
            aria-label={`Go to ${collection.name}`}
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
