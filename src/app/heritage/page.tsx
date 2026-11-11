import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { assetPath, media } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Our Heritage',
  description: '23 Years of Culinary Craftsmanship — from the Uckermark to Berlin, and the Afro-Gourmet dialogue.'
};

const chapters = [
  { href: '#chapter-1', label: 'I. The Hearth' },
  { href: '#chapter-2', label: 'II. Kreuzberg' },
  { href: '#chapter-3', label: 'III. Der Feinschmecker' },
  { href: '#chapter-4', label: 'IV. SoLuna Brot & Oel' },
  { href: '#chapter-5', label: 'V. The Afro-Gourmet' }
];

const metrics = [
  ['2001', 'Genesis'],
  ['14', 'Terroir Reserves'],
  ['3×', 'Feinschmecker Plaudit'],
  ['2', 'Atelier Capitals']
];

function ChapterHeading({
  number,
  years,
  title
}: {
  number: string;
  years: string;
  title: string;
}) {
  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Chapter {number}</span>
        <div className="h-[1px] flex-grow bg-stone-border" />
        <span className="text-xs tracking-widest text-stone-muted">{years}</span>
      </div>
      <h2 className="mb-6 font-serif text-3xl text-stone-dark md:text-4xl">{title}</h2>
    </>
  );
}

export default function HeritagePage() {
  return (
    <main className="w-full bg-background">
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/assets/img/img-59efbbe90f.jpg"
            alt="Maison Asili Gold Crest"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover shadow-sm ring-1 ring-gold/30"
          />
        </div>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
          Est. 2001 — Berlin — Nairobi — Feinkost Archive
        </p>
        <h1 className="mx-auto mb-8 max-w-4xl font-serif text-4xl font-normal leading-[1.15] tracking-tight text-stone-dark md:text-5xl lg:text-6xl">
          23 Years of Culinary Craftsmanship
        </h1>
        <div className="mx-auto mb-8 h-[1px] w-12 bg-gold" />
        <p className="mx-auto max-w-2xl text-base font-normal leading-relaxed text-stone-muted md:text-lg">
          A journey from the fertile loam of the Uckermark to the kinetic ateliers of Berlin, shaped by ancestral
          botanical heritage, elemental craftsmanship, and an enduring devotion to extraordinary ingredients.
        </p>
      </section>

      <section className="border-y border-stone-border bg-surface-container-low">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 divide-y divide-stone-border px-6 py-8 text-center md:grid-cols-4 md:divide-x md:divide-y-0">
          {metrics.map(([value, label]) => (
            <div key={label} className="pt-2 md:pt-0">
              <span className="mb-1 block font-serif text-2xl font-medium text-stone-dark lg:text-3xl">{value}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-muted">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <nav className="sticky top-20 z-30 border-b border-stone-border bg-background">
        <div className="scrollbar-none mx-auto max-w-6xl overflow-x-auto px-6">
          <div className="flex items-center justify-start gap-8 whitespace-nowrap py-3.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-muted md:justify-center">
            {chapters.map((chapter, index) => (
              <span key={chapter.href} className="flex items-center gap-8">
                {index > 0 ? <span className="text-stone-border">/</span> : null}
                <a href={chapter.href} className="transition-colors hover:text-gold">
                  {chapter.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl space-y-32 px-6 py-20">
        <section className="scroll-mt-44" id="chapter-1">
          <ChapterHeading number="01" years="2001 — 2006" title="From the Hearth of the Uckermark" />
          <div className="mb-10 grid grid-cols-1 items-start gap-10 md:grid-cols-12">
            <div className="space-y-5 font-normal leading-relaxed text-stone-muted md:col-span-7">
              <p>
                In the quiet expanses of Brandenburg&apos;s Uckermark, long before Berlin became a worldwide
                gastronomical center, the journey began at a restored old farmhouse. A traditional clay oven bakery and
                oil mill stood side by side here, where baking and culinary oil extraction were practiced not as
                industry, but as elemental alchemy: raw fire, regional flour, pure spring water, and stone-cold
                pressing.
              </p>
              <p>
                Every harvest cycle taught patience. Slow sourdough fermentations lasting up to 36 hours and
                small-batch seed pressing revealed how pure soil integrity directly translates into sensory depth. It
                was here that our exacting standards for raw materials were permanently codified.
              </p>
            </div>
            <div className="rounded-none border border-stone-border bg-surface-container-low p-6 md:col-span-5">
              <span aria-hidden="true" className="material-symbols-outlined mb-3 text-3xl text-gold">
                format_quote
              </span>
              <blockquote className="mb-4 font-serif text-lg italic leading-snug text-stone-dark">
                &ldquo;When you touch pure grain or taste unfiltered oil freshly drawn from cold granite, you realize
                taste cannot be manufactured—only revealed.&rdquo;
              </blockquote>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-muted">
                — Founding Miller&apos;s Ledger, 2003
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-2">
            <div className="overflow-hidden border border-stone-border bg-surface-container-low">
              <div className="relative h-64 w-full bg-surface-container">
                <Image
                  src={assetPath(media.heritageArchive)}
                  alt="Terracotta bowls of chilli, moringa, black pepper and hand-harvested salt"
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover grayscale contrast-125"
                />
              </div>
              <div className="bg-surface-container-lowest p-6">
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-stone-dark">
                  Unmilled Grains &amp; Seeds
                </h3>
                <p className="text-xs leading-relaxed text-stone-muted">
                  Selecting heritage grain varieties and biodynamic oilseeds directly from organic Brandenburg estates.
                </p>
              </div>
            </div>
            <div className="overflow-hidden border border-stone-border bg-surface-container-low">
              <div className="relative h-64 w-full bg-surface-container">
                <Image
                  src={assetPath(media.editorial)}
                  alt="Fresh and dried herbs, citrus peel and spices arranged on a dark surface"
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover grayscale contrast-125"
                />
              </div>
              <div className="bg-surface-container-lowest p-6">
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-stone-dark">
                  Cold Granite Stone Press
                </h3>
                <p className="text-xs leading-relaxed text-stone-muted">
                  Slow mechanical pressing preserving delicate polyphenols, fatty acids, and vibrant terroir profiles.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-mt-44 border-t border-stone-border pt-20" id="chapter-2">
          <ChapterHeading number="02" years="2006 — 2014" title="Into the Kinetic Heart of Kreuzberg" />
          <div className="mb-10 grid grid-cols-1 items-center gap-10 md:grid-cols-12">
            <div className="space-y-5 leading-relaxed text-stone-muted md:col-span-6">
              <p>
                By the mid-2000s, the rural quietude met the creative velocity of Berlin-Kreuzberg. Establishing
                morning presence at weekly farmers’ markets and artisanal halls, our sourdough loaves and specialty oils
                quickly found an impassioned circle of connoisseurs, neighborhood elders, and innovative chefs.
              </p>
              <p>
                Before dawn, loaves emerged from wood ovens, packed alongside bottles of freshly pressed walnut and
                pumpkinseed oils. Kreuzberg was unfiltered, multicultural, and fiercely authentic—a crucible that
                demanded undeniable quality and uncompromising craft.
              </p>
            </div>
            <div className="md:col-span-6">
              <div className="relative border border-stone-border bg-surface-container-low p-3">
                <div className="relative h-72 w-full overflow-hidden bg-surface-container">
                  <Image
                    src={assetPath(media.culinary)}
                    alt="Lime, hand-harvested salts and colourful spices on linen"
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover grayscale"
                  />
                </div>
                <div className="absolute bottom-6 left-6 right-6 border border-stone-border bg-surface-container-lowest p-4 shadow-md">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                    Archive Document: 2008
                  </span>
                  <p className="text-xs font-medium text-stone-dark">
                    Daily supply rounds to Lausitzer Platz and Markthalle Neun.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 border border-stone-border bg-surface-container-low p-6 sm:grid-cols-2">
            <div className="flex items-start gap-4">
              <span className="font-serif text-2xl font-bold text-gold">01</span>
              <div>
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-dark">
                  Lausitzer Platz Morning Rites
                </h3>
                <p className="text-xs leading-relaxed text-stone-muted">
                  The communal queues of weekend visitors waiting for warm loaves and unrefined virgin cold oils.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="font-serif text-2xl font-bold text-gold">02</span>
              <div>
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-dark">
                  The Nocturnal B109 Run
                </h3>
                <p className="text-xs leading-relaxed text-stone-muted">
                  Nightly routes transferring freshly harvested grain and presses from the countryside into the capital.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-mt-44 border-t border-stone-border pt-20" id="chapter-3">
          <ChapterHeading number="03" years="2012 — 2019" title="Recognized by Der Feinschmecker" />
          <div className="mb-8 grid grid-cols-1 items-center gap-10 md:grid-cols-12">
            <div className="order-2 md:order-1 md:col-span-5">
              <div className="border border-stone-border bg-surface-container-low p-3 text-center">
                <div className="relative h-80 w-full overflow-hidden bg-surface-container">
                  <Image
                    src={assetPath(media.pdpGift)}
                    alt="Hibiscus, pink peppercorns, dried orange peel and long pepper on wood"
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 border-t border-stone-border bg-surface-container-lowest p-4">
                  <span className="mb-2 inline-block bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                    3× Feinschmecker Award
                  </span>
                  <p className="text-xs text-stone-muted">
                    Selected among the premier culinary ateliers in the Federal Republic.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 space-y-5 leading-relaxed text-stone-muted md:order-2 md:col-span-7">
              <p>
                Critical national acclaim soon followed our quiet consistency. Germany’s leading gastronomy and
                epicurean journal, <em className="text-stone-dark">Der Feinschmecker</em>, repeatedly highlighted our
                atelier for unmatched purity, artisan integrity, and reverence for traditional extraction techniques.
              </p>
              <p>
                Berlin’s emerging wave of Michelin-starred dining rooms and private embassies turned to our pantry for
                table services, pairing our aromatic cold-pressed oils with contemporary culinary tasting menus.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-stone-border pt-4">
                <div>
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                    Michelin Kitchens
                  </span>
                  <span className="text-xs text-stone-muted">Permanent fixtures in Berlin’s tasting menus.</span>
                </div>
                <div>
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                    Diplomatic Menus
                  </span>
                  <span className="text-xs text-stone-muted">Curated provisions for international delegations.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-mt-44 border-t border-stone-border pt-20" id="chapter-4">
          <ChapterHeading
            number="04"
            years="2019 — 2022"
            title="Honoring the Legacy: From SoLuna Brot & Oel to Maison Asili"
          />
          <p className="mb-12 max-w-3xl font-normal leading-relaxed text-stone-muted">
            An evolutionary transformation rooted in profound continuity. The heritage forged over two decades under
            the name SoLuna Brot &amp; Oel evolved into its natural, elevated expression as Maison Asili—expanding our
            culinary horizon from regional borders to the global African diaspora.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                eyebrow: 'Origin Foundation',
                title: 'SoLuna Brot & Oel',
                body:
                  'The crucible of our mastery: twenty years perfecting slow wood-fired sourdough, stone-ground flours, and unadulterated cold-pressed virgin seed oils in Berlin.',
                footer: 'Established 2001'
              },
              {
                eyebrow: 'Swahili Etymology',
                title: "The Meaning of 'Asili'",
                body:
                  'In Swahili, Asili signifies origin, ancestry, essence, and nature. It embodies the truth that fine food is an ancestral gift that connects land, lineage, and the human table.',
                footer: 'Ancestral Identity'
              },
              {
                eyebrow: 'Contemporary House',
                title: 'Maison Asili',
                body:
                  'The synthesis of European epicurean discipline and African agricultural terroir: heritage spice blends, botanical salts, and rare African teas.',
                footer: 'Active Horizon'
              }
            ].map((pillar, index) => (
              <div
                key={pillar.title}
                className={`flex flex-col justify-between border p-8 ${
                  index === 1
                    ? 'relative border-2 border-gold/40 bg-surface-container-lowest shadow-sm'
                    : 'border-stone-border bg-surface-container-low'
                }`}
              >
                {index === 1 ? (
                  <div className="absolute -top-3 left-6 bg-brand-gold px-3 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary">
                    The Essence
                  </div>
                ) : null}
                <div>
                  <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                    {pillar.eyebrow}
                  </span>
                  <h3 className="mb-3 font-serif text-xl text-stone-dark">{pillar.title}</h3>
                  <p className="mb-6 text-xs leading-relaxed text-stone-muted">{pillar.body}</p>
                </div>
                <div className="border-t border-stone-border pt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-muted">
                    {pillar.footer}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="scroll-mt-44 border-t border-stone-border pt-20" id="chapter-5">
          <ChapterHeading
            number="05"
            years="2022 & Beyond"
            title="A New Chapter, A Wider World: The Afro-Gourmet Dialogue"
          />
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
            <div className="space-y-5 leading-relaxed text-stone-muted md:col-span-6">
              <p>
                Maison Asili now bridges two vibrant culinary worlds: the precision and connoisseur culture of Berlin,
                and the unparalleled biodiversity of the African continent—from the volcanic soils of Mount Kenya to
                the aromatic spice archipelagos of Zanzibar.
              </p>
              <p>
                We collaborate with multi-generational smallholder farming families, wild harvesters, and regenerative
                botanical cooperatives. Every provision in our archive is traceable, unblended, and hand-selected for
                extraordinary complexity.
              </p>
              <div className="space-y-2 border-l-2 border-gold bg-surface-container-low p-5">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Direct Ethical Sourcing
                </span>
                <p className="text-xs text-stone-muted">
                  100% single-origin provenance, preserving fair value equity at origin while maintaining European
                  certified feinkost standards.
                </p>
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="overflow-hidden border border-stone-border bg-surface-container-low">
                <div className="relative h-80 w-full bg-surface-container">
                  <Image
                    src={assetPath(media.heritageTea)}
                    alt="Steaming cup of botanical tea with dried citrus, rose petals and loose-leaf tea"
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="bg-surface-container-lowest p-4 text-center">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-stone-muted">
                    Mount Kenya Terroir Reserve • Elevation 2,100m
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl border border-stone-border bg-surface-container-low p-10 text-center shadow-sm md:p-16">
          <div className="mb-6 flex justify-center">
            <Image
              src="/assets/img/img-59efbbe90f.jpg"
              alt="Maison Asili Crest"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover shadow-sm ring-1 ring-gold/40"
            />
          </div>
          <div className="mx-auto mb-6 h-[1px] w-8 bg-gold" />
          <blockquote className="mx-auto mb-8 max-w-xl font-serif text-xl italic leading-relaxed text-stone-dark md:text-2xl">
            &ldquo;For those who have known my work over the years, welcome back. For those discovering Maison Asili
            for the first time, welcome to the next chapter.&rdquo;
          </blockquote>
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            The Founder — Maison Asili Feinkost
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-widest text-stone-muted">Berlin &amp; Nairobi</div>
        </section>
      </div>

      <section className="border-t border-stone-border bg-surface-container-low px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Discover the Provisions
          </span>
          <h2 className="mb-4 font-serif text-3xl text-stone-dark md:text-4xl">
            Experience the Lineage: Taste Twenty-Three Years of Sensory Mastery
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm font-normal text-stone-muted md:text-base">
            Explore our collection of heritage spice blends, botanical finishing salts, and rare African teas,
            handcrafted in small batches in Berlin.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/shop"
              className="w-full bg-stone-dark px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-on-primary transition-colors duration-300 hover:bg-gold sm:w-auto"
            >
              Explore the Heritage Collection
            </Link>
            <Link
              href="/wholesale"
              className="w-full border border-stone-border bg-surface-container-lowest px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-stone-dark transition-colors duration-300 hover:border-stone-dark sm:w-auto"
            >
              Private Tastings &amp; Sommelier
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
