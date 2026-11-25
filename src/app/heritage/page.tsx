import type { Metadata } from 'next';
import Image from 'next/image';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'Our Heritage',
  description:
    'Origin. Identity. Heritage. Two decades of craft and a continent of origin — the story of Maison Asili, founded in Berlin by Susan Kiruku-Klann.'
};

const foundations = [
  'In 2003, Susan brought her entrepreneurial vision to life by co-founding and building SoLuna Brot und Öl Kiruku-Klann GbR alongside Peter Klann. Together, they established an artisanal food enterprise that brought traditional craftsmanship and distinctive gourmet products to the Berlin food scene.',
  'Their work began in an old German farmhouse in Ringenwalde, Brandenburg, centred around a traditional clay oven. The enterprise later developed into a Berlin-Kreuzberg location, where a French Panyol wood-fired oven became central to its artisanal bread-making.',
  'At SoLuna, the philosophy extended beyond bread. The product range included cold-pressed oils, specialty salts, raw spices, handmade sauces, traditional mojos and pestos, including a walnut pesto that gained a devoted following. Working with carefully selected natural ingredients and certified organic and Demeter products, Susan developed a practical understanding of flavour, quality and artisanal food production.',
  "Across Berlin's vibrant markets, Susan represented SoLuna Brot und Oel directly to customers at her market stand. It was right there at the stand that renowned food critic Katja Burghardt met and interviewed her, which directly led to SoLuna Brot und Oel's feature in DER FEINSCHMECKER, Germany's premier gourmet magazine, alongside recognition in other culinary publications and connections with Michelin-starred chefs and specialty retailers.",
  'These formative years established a strong foundation in culinary craftsmanship, ingredient selection, sourcing, flavour development and direct customer relationships. They also gave Susan first-hand experience of the standards and relationships that shape the gourmet food world.'
];

const transition = [
  'Following her chapter at SoLuna, Susan explored new mediums by sourcing authentic African arts, textiles, paintings and hand-carved pieces directly from her roots, connecting with collectors face-to-face at regional markets. This was paired with valuable experience in structured commercial retail, teaching her key lessons in product presentation, consistency and customer expectations that shape her work today.',
  'She then brought her curated collection online, maintaining personal, one-to-one service and care for international clients across borders. This blend of artisanal craft, commercial retail discipline and global client connection laid the groundwork for her next chapter.',
  "From food production and market trading to cultural collections, commercial retail and international e-commerce, each chapter broadened Susan's entrepreneurial experience and deepened her understanding of sourcing, craftsmanship and connecting people with distinctive products."
];

const terroirIntro =
  "Africa's extraordinary diversity of landscapes and microclimates gives rise to a remarkable wealth of natural ingredients, each shaped by its own environment, traditions and generations of knowledge. From the argan kernels and desert salts of North Africa to the aromatic grains of paradise of West Africa, the wild spices of Central Africa, the highland coffees and Swahili Coast spices of East Africa, the precious Bourbon vanilla of Madagascar, and the rooibos and marula oil of Southern Africa, the continent reveals an exceptional depth of culinary and botanical heritage.";

const terroirRegions = [
  'North Africa: Argan kernels, Barbary fig seeds, wild cumin, coriander and desert salts from the Atlas Mountains.',
  "West Africa: Selim pepper, grains of paradise, Dawadawa and Cameroon's renowned Penja pepper.",
  'Central Africa: Wild spices, bush mango kernels and njansang, ingredients rooted in regional food traditions.',
  'East Africa: Kenyan Arabica coffees, purple teas, moringa and the aromatic spices of the Swahili Coast, including Zanzibar.',
  'Madagascar: Bourbon vanilla and other distinctive island botanicals.',
  'Southern Africa: Rooibos, honeybush, marula oil, Kalahari melon seeds and mongongo nuts.'
];

const terroirOutro =
  'Together, these ingredients tell stories of distinctive landscapes, agricultural knowledge and culinary traditions passed down through generations. Some are treasured locally yet remain little known internationally; others have travelled across continents while retaining their unmistakable character. They represent a rich and diverse heritage with extraordinary possibilities for contemporary gastronomy.';

const precision = [
  `Derived from the Swahili word asili, meaning "origin" or "roots", MAISON ASILI brings together Susan's more than two decades of entrepreneurial experience with the deep-rooted culinary traditions and botanical richness of the African continent.`,
  'Conceived and crafted in Berlin, the house explores this heritage through a carefully curated collection of spices, specialty salts, teas, coffees and botanical oils.',
  "Informed by decades of hands-on sourcing, artisanal production and market experience, the Maison's approach begins with respect for the ingredient itself: its origin, natural character, traditional uses and potential in contemporary gastronomy.",
  'The aim is to honour the heritage of these ingredients while exploring their possibilities through thoughtful selection, balance and contemporary culinary creativity.'
];

const legacy = [
  "From Brandenburg's wood-fired ovens and Berlin's vibrant markets to African textiles, cultural collections and global digital commerce, Susan Kiruku-Klann brings her entrepreneurial journey together in MAISON ASILI.",
  'A new chapter shaped by more than two decades of experience, rooted in African heritage and brought to life in Berlin.'
];

const proseClass =
  'space-y-5 text-[15px] font-light leading-[1.85] text-stone-muted sm:text-base sm:leading-[1.9]';

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <div className="mb-5 h-px w-10 bg-gold" />
      <h2 className="font-serif text-2xl font-normal leading-tight text-stone-dark sm:text-3xl md:text-4xl">{title}</h2>
    </div>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className={proseClass}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 60)}>{paragraph}</p>
      ))}
    </div>
  );
}

export default function HeritagePage() {
  return (
    <main className="w-full bg-background">
      <section className="border-b border-stone-border-light px-6 pb-14 pt-16 text-center sm:pb-20 sm:pt-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.42em] text-gold">MAISON ASILI</p>
          <p className="mb-10 text-[10px] uppercase tracking-[0.3em] text-stone-muted sm:text-[11px]">
            Origin. Identity. Heritage.
          </p>
          <h1 className="mx-auto max-w-2xl font-serif text-3xl font-normal leading-[1.2] tracking-tight text-stone-dark sm:text-4xl md:text-[2.75rem]">
            Two Decades of Craft. A Continent of Origin.
          </h1>
          <div className="mx-auto mt-10 h-px w-12 bg-gold" />
          <p className="mx-auto mt-10 max-w-2xl text-[15px] font-light leading-[1.9] text-stone-muted sm:text-base">
            MAISON ASILI was born at the intersection of African heritage and culinary craftsmanship. Founded in Berlin
            by Susan Kiruku-Klann, the house brings together her African roots and more than two decades of experience in
            artisanal food production, gourmet retail, sourcing and international commerce.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl lg:max-w-5xl space-y-16 px-6 py-16 sm:space-y-24 sm:py-24">
        <section>
          <SectionHeading title="The Foundations of Craft" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
            <div className={`lg:col-span-7 ${proseClass}`}>
              {foundations.map((paragraph, index) => (
                <Fragment key={paragraph.slice(0, 40)}>
                  <p>{paragraph}</p>
                  {index === 3 ? (
                    <div className="lg:hidden my-6">
                      <figure className="relative overflow-hidden border border-stone-border bg-surface-container-lowest p-2 shadow-sm">
                        <Image
                          src="/assets/img/editorial/soluna-archive.jpg"
                          alt="SoLuna Brot und Öl business card and the 2005 DER FEINSCHMECKER feature from Ringenwalde, Brandenburg."
                          width={896}
                          height={1200}
                          sizes="(min-width: 768px) 600px, 100vw"
                          className="block h-auto w-full"
                        />
                        <figcaption className="mt-2.5 px-1 pb-1 text-[11px] italic leading-snug text-stone-muted">
                          SoLuna Brot und Öl business card and the 2005 DER FEINSCHMECKER feature from Ringenwalde, Brandenburg.
                        </figcaption>
                      </figure>
                    </div>
                  ) : null}
                </Fragment>
              ))}
            </div>

            <div className="hidden lg:col-span-5 lg:block lg:sticky lg:top-28">
              <figure className="relative overflow-hidden border border-stone-border bg-surface-container-lowest p-2 shadow-sm">
                <Image
                  src="/assets/img/editorial/soluna-archive.jpg"
                  alt="SoLuna Brot und Öl business card and the 2005 DER FEINSCHMECKER feature from Ringenwalde, Brandenburg."
                  width={896}
                  height={1200}
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="block h-auto w-full"
                />
                <figcaption className="mt-2.5 px-1 pb-1 text-[11px] italic leading-snug text-stone-muted">
                  SoLuna Brot und Öl business card and the 2005 DER FEINSCHMECKER feature from Ringenwalde, Brandenburg.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-border-light pt-14 sm:pt-16 max-w-3xl">
          <SectionHeading title="The Transition: Sourcing Heritage and Connecting Globally" />
          <Prose paragraphs={transition} />
        </section>

        <section className="border-t border-stone-border-light pt-14 sm:pt-16 max-w-3xl">
          <SectionHeading title="A Continent of Rich Culinary Heritage" />
          <div className={proseClass}>
            <p>{terroirIntro}</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-gold/80">
              {terroirRegions.map((region) => (
                <li key={region.slice(0, 40)}>{region}</li>
              ))}
            </ul>
            <p>{terroirOutro}</p>
          </div>
        </section>

        <section className="border-t border-stone-border-light pt-14 sm:pt-16 max-w-3xl">
          <SectionHeading title="Where Heritage Meets Precision" />
          <Prose paragraphs={precision} />
        </section>

        <section className="border-t border-stone-border-light pt-14 sm:pt-16 max-w-3xl">
          <SectionHeading title="A Continuing Legacy" />
          <Prose paragraphs={legacy} />
        </section>

        <section className="border-t border-stone-border-light pt-14 text-center sm:pt-20">
          <div className="mx-auto mt-2 h-px w-12 bg-gold" />
          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.42em] text-gold">MAISON ASILI</p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-stone-muted sm:text-[11px]">
            Origin. Identity. Heritage.
          </p>
        </section>
      </div>
    </main>
  );
}
