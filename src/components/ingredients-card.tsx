import type { Product } from '@/lib/catalog';

/**
 * Dedicated product ingredients panel.
 *
 * Deliberately separate from the long-form product story: deep plum surface,
 * antique-gold rules and a numbered list so the composition can be read at a
 * glance without competing with the editorial copy.
 */
export function IngredientsCard({ product }: { product: Product }) {
  const headingId = `ingredients-${product.slug}`;

  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-primary text-on-primary shadow-[0_18px_40px_-24px_rgba(33,11,54,0.65)]"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-brand-gold/60" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-brand-gold/40" />

      <div className="px-7 py-9 sm:px-9 sm:py-11">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px flex-1 bg-brand-gold/40" />
          <span aria-hidden="true" className="material-symbols-outlined text-lg text-brand-gold">
            spa
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-brand-gold/40" />
        </div>

        <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.34em] text-brand-gold/80">
          The Composition
        </p>
        <h2
          id={headingId}
          className="mt-2 font-headline text-2xl font-normal uppercase leading-tight tracking-[0.12em] text-on-primary sm:text-3xl"
        >
          The Ingredients
        </h2>

        <ol className="mt-7 flex flex-col">
          {product.ingredients.map((ingredient, index) => (
            <li
              key={ingredient}
              className="flex items-baseline gap-4 border-b border-brand-gold/20 py-3.5 last:border-b-0"
            >
              <span
                aria-hidden="true"
                className="font-headline text-xs tabular-nums tracking-[0.18em] text-brand-gold/75"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[15px] leading-relaxed text-on-primary/90">{ingredient}</span>
            </li>
          ))}
        </ol>

        <div className="mt-7 flex items-start gap-3 border-t border-brand-gold/30 pt-5">
          <span aria-hidden="true" className="material-symbols-outlined mt-0.5 text-base text-brand-gold/80">
            eco
          </span>
          <p className="text-[11px] leading-relaxed text-on-primary/60">
            {product.ingredientsNote ?? 'Small-batch crafted in Berlin.'}
          </p>
        </div>
      </div>
    </section>
  );
}
