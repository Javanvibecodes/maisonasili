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
      src: product.packshot,
      width: product.packshotWidth,
      height: product.packshotHeight,
      label: 'Product pack shot'
    },
    {
      src: product.image,
      width: product.imageWidth,
      height: product.imageHeight,
      label: 'Styled photograph'
    }
  ];

  const [active, setActive] = React.useState(0);
  const current = views[active];

  return (
    <div>
      <div className="relative overflow-hidden bg-white">
        <div className="relative aspect-square w-full">
          <Image
            key={current.src}
            src={assetPath(current.src)}
            alt={`${product.name} — ${current.label}`}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
            className="object-contain"
          />
        </div>

        <button
          type="button"
          onClick={() => setActive((index) => (index + 1) % views.length)}
          aria-label="Show next image"
          className="absolute bottom-4 right-4 z-20 hidden h-10 w-10 items-center justify-center rounded-full border border-brand-gold/40 bg-background/90 text-primary shadow-md transition-colors hover:bg-primary hover:text-on-primary sm:bottom-6 sm:right-6 sm:flex"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-lg">
            chevron_right
          </span>
        </button>
        <span className="absolute bottom-6 left-6 z-20 hidden rounded-full bg-black/45 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm sm:block">
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
            className={`h-14 w-12 shrink-0 bg-white p-0.5 transition-opacity sm:h-24 sm:w-20 sm:p-1.5 ${
              active === index ? 'opacity-100' : 'opacity-55 hover:opacity-80'
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
