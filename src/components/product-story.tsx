import type { Product } from '@/lib/catalog';

/**
 * Full editorial product story.
 *
 * Renders the supplied narrative sections in order: introduction, flavour
 * experience, Beautiful With, The Maison Asili Touch and the small-batch
 * production statement. Wording comes verbatim from the catalogue.
 */
export function ProductStory({ product }: { product: Product }) {
  const { story } = product;

  return (
    <article>
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="h-px w-10 bg-brand-gold" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-tertiary">The Story</p>
      </div>

      {story.heading ? (
        <h2 className="mt-5 font-headline text-3xl font-light leading-[1.15] tracking-tight text-primary sm:text-4xl">
          {story.heading}
        </h2>
      ) : null}

      <div className="mt-7 space-y-5 text-[15px] leading-[1.9] text-on-surface-variant sm:text-base">
        {story.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {story.sizeNote ? (
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-on-surface-variant">
          {story.sizeNote}
        </p>
      ) : null}

      {story.closing ? (
        <p className="mt-8 border-l-2 border-brand-gold pl-5 font-headline text-lg italic leading-relaxed text-tertiary sm:text-xl">
          {story.closing}
        </p>
      ) : null}

      {story.flavour?.length ? (
        <section className="mt-12" aria-labelledby={`flavour-${product.slug}`}>
          <h3
            id={`flavour-${product.slug}`}
            className="text-[10px] font-semibold uppercase tracking-[0.34em] text-tertiary"
          >
            The Flavour Experience
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {story.flavour.map((note) => (
              <li
                key={note}
                className="border border-brand-gold/45 bg-surface-container-low px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-on-surface"
              >
                {note}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {story.beautifulWith?.length ? (
        <section className="mt-10" aria-labelledby={`beautiful-with-${product.slug}`}>
          <h3
            id={`beautiful-with-${product.slug}`}
            className="text-[10px] font-semibold uppercase tracking-[0.34em] text-tertiary"
          >
            Beautiful With
          </h3>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {story.beautifulWith.map((pairing) => (
              <li
                key={pairing}
                className="flex items-center gap-3 border-b border-outline-variant/70 py-2.5 text-sm text-on-surface-variant last:border-b-0"
              >
                <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-brand-gold" />
                {pairing}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {story.touch?.length ? (
        <section
          aria-labelledby={`touch-${product.slug}`}
          className="mt-10 border-l-2 border-brand-gold bg-surface-container-low px-6 py-6 sm:px-7"
        >
          <h3
            id={`touch-${product.slug}`}
            className="text-[10px] font-semibold uppercase tracking-[0.34em] text-tertiary"
          >
            The Maison Asili Touch
          </h3>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-on-surface-variant">
            {story.touch.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      ) : null}

      {story.craft ? (
        <p className="mt-10 border-t border-outline-variant pt-6 font-headline text-base italic leading-relaxed text-on-surface-variant">
          {story.craft}
        </p>
      ) : null}
    </article>
  );
}
