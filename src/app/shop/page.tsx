import type { Metadata } from 'next';
import { ProductExplorer } from '@/components/product-explorer';
import { products } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'The Collection',
  description:
    'Explore the Maison Asili collection: heritage spice blends, botanical finishing salts and rare African teas, composed in our Berlin atelier. Trade pricing available on request.'
};

const discoveryCards = [
  {
    index: '01',
    title: 'Small-Batch Blending',
    body: 'Every blend is composed and packed by hand in micro-batches at our Berlin atelier.'
  },
  {
    index: '02',
    title: 'Botanical Salts',
    body: 'Hand-harvested salts are layered with moringa, pink pepper, hibiscus and citrus zest.'
  },
  {
    index: '03',
    title: 'Whole-Leaf Teas',
    body: 'Kenyan purple tea and Malawian white tea, blended with whole flowers and botanical infusions.'
  }
];

export default function ShopPage() {
  return (
    <main className="min-h-[calc(100vh-140px)] w-full bg-surface-container-lowest">
      <section className="relative w-full px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <h1 className="font-headline text-4xl font-light leading-[1.1] tracking-tight text-on-surface sm:text-5xl lg:text-6xl">
              The Maison Asili <span className="font-normal italic text-tertiary">Collection</span>
            </h1>
            <p className="max-w-2xl text-base font-normal leading-relaxed text-on-surface-variant sm:text-lg">
              Explore eight small-batch creations: heritage spice blends, botanical finishing salts and rare African
              teas, composed in our Berlin atelier and rooted in the continent’s finest growing regions.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-6 bg-surface-container-lowest p-6 shadow-sm sm:flex-row lg:col-span-4 lg:flex-col">
            {[
              ['Sourcing Ethics', '100% Direct Fair Trade'],
              ['Harvest Season', 'Current Reserve'],
              ['Shipping Atelier', 'Charlottenburg, Berlin']
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-on-surface-variant">{label}</div>
                <span className="text-xs font-semibold tracking-wider text-on-surface">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductExplorer products={products} />

      <section className="my-8 w-full px-6 py-16 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <h2 className="font-headline text-2xl font-light leading-tight text-on-surface sm:text-3xl">
              Purity of Provenance. <br />
              <span className="font-normal italic">Excellence in Execution.</span>
            </h2>
            <p className="text-xs leading-relaxed text-on-surface-variant sm:text-sm">
              Every harvest in our catalogue represents uncompromised micro-terroir transparency. We collaborate
              directly with women-led farming co-ops and generational herbalists across Eastern and Western Africa.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-8">
            {discoveryCards.map((card) => (
              <div key={card.index} className="flex h-48 flex-col justify-end bg-surface-container-lowest p-6 shadow-sm">
                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-on-surface">{card.title}</div>
                  <p className="text-[11px] leading-relaxed text-on-surface-variant">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
