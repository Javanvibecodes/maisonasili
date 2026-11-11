'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/cart-provider';
import { assetPath, type Product } from '@/lib/catalog';
import { money } from '@/lib/format';

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden border border-outline-variant/70 bg-surface-container-lowest transition-all duration-300 hover:border-brand-gold/80">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
        <Link href={`/product/${product.slug}`} tabIndex={-1} aria-hidden="true" className="block h-full w-full">
          <Image
            src={assetPath(product.image)}
            alt={`${product.name} — ${product.subtitle}`}
            width={product.imageWidth}
            height={product.imageHeight}
            className="h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:p-5"
          />
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3 p-5">
        <div>
          <h3 className="text-sm font-medium leading-snug text-primary transition-colors group-hover:text-tertiary">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 text-[11px] leading-snug text-on-surface-variant">
            {product.subtitle} · {product.size}
          </p>
          <div className="mt-2 text-sm text-primary/80">{money(product.price)}</div>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant/50 pt-2">
          <button
            type="button"
            onClick={() => add(product.slug)}
            className="w-full bg-primary px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-on-primary transition-colors hover:bg-brand-gold hover:text-primary"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </article>
  );
}
