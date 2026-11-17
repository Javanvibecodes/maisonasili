'use client';

import * as React from 'react';
import Image from 'next/image';
import { assetPath, type Product } from '@/lib/catalog';

/**
 * Product imagery: the styled photograph plus the white-background pack shot.
 * The thumbnails below the photograph switch between the two views.
 */
export function ProductGallery({ product }: { product: Product }) {
  const views = [
    {
      src: product.image,
      width: product.imageWidth,
      height: product.imageHeight,
      label: 'Styled photograph'
    },
    {
      src: product.packshot,
      width: product.packshotWidth,
      height: product.packshotHeight,
      label: 'Product pack shot'
    }
  ];

  const [active, setActive] = React.useState(0);
  const current = views[active];

  return (
    <div>
      <div className="relative overflow-hidden bg-warm-sand">
        <span aria-hidden="true" className="absolute inset-3 z-10 border border-brand-gold/35 sm:inset-6" />
        <div className="relative flex aspect-[4/3] items-center justify-center p-5 sm:p-12 lg:aspect-[4/5] lg:p-14">
          <Image
            key={current.src}
            src={assetPath(current.src)}
            alt={`${product.name} — ${current.label}`}
            width={current.width}
            height={current.height}
            priority
            className="h-full w-full object-contain"
          />
        </div>

        <button
          type="button"
          onClick={() => setActive((index) => (index + 1) % views.length)}
          aria-label="Show next image"
          className="absolute bottom-4 right-4 z-20 hidden h-10 w-10 items-center justify-center rounded-full border border-brand-gold/40 bg-white/90 text-primary shadow-md transition-colors hover:bg-primary hover:text-on-primary sm:bottom-6 sm:right-6 sm:flex"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-lg">
            chevron_right
          </span>
        </button>
        <span className="absolute bottom-6 left-6 z-20 hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-tertiary sm:block">
          {active + 1} / {views.length}
        </span>
      </div>

      <div className="mt-2.5 flex items-center gap-2 sm:mt-3 sm:gap-3">
        {views.map((view, index) => (
          <button
            key={view.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show ${view.label}`}
            aria-pressed={active === index}
            className={`h-12 w-10 shrink-0 border bg-warm-ivory p-0.5 transition-colors sm:h-24 sm:w-20 sm:p-1.5 ${
              active === index
                ? 'border-primary'
                : 'border-outline-variant hover:border-brand-gold'
            }`}
          >
            <Image
              src={assetPath(view.src)}
              alt=""
              width={view.width}
              height={view.height}
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
