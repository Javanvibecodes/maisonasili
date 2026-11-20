import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Heritage',
  description:
    'Origin. Identity. Heritage. Two decades of craft and a continent of origin — the story of Maison Asili, founded in Berlin by Susan Kiruku-Klann.'
};

const foundations = [
  'In 2003, Susan brought her entrepreneurial vision to life, co-founding and building SoLuna Brot und Oel alongside her then-husband, the accomplished food artisan Peter Klann. Together, they spent five demanding years establishing an artisanal Feinkost enterprise that would become a recognized name in Berlin\u2019s culinary landscape.',
  'Their work began in an old German farmhouse in Ringenwalde, Brandenburg, centered around a traditional clay oven. It later evolved into SoLuna Brot und Oel\u2019s Berlin-Kreuzberg location, where an impressive French Panyol wood-fired oven attracted food enthusiasts and lovers of traditional artisanal craftsmanship from all over the world.',
  'At SoLuna Brot und Oel, the philosophy extended far beyond wood-fired bread. Together, they developed a distinctive world of cold-pressed oils, specialty salts, raw spices, handmade sauces, traditional mojos, and pestos\u2014including a celebrated walnut pesto that gained a devoted following.',
  'Working with certified organic and Demeter products, traditional preparation methods, and carefully selected natural ingredients, Susan deepened her culinary knowledge while actively contributing to every stage of building the enterprise.',
  'Across Berlin\u2019s vibrant markets, Susan became the familiar face of SoLuna Brot und Oel, bringing its artisanal creations directly to customers and cultivating relationships that extended far beyond the market stalls. It was here, at her own market stand, that renowned food critic Katja Burghardt met and interviewed her directly, leading to SoLuna Brot und Oel\u2019s first major recognition in DER FEINSCHMECKER, Germany\u2019s premier gourmet magazine. Further recognition followed in leading German and international culinary publications, alongside lasting connections with Michelin-starred chefs and specialty retailers.',
  'These formative years established the bedrock of Susan\u2019s culinary expertise, providing an understanding of ingredients, flavor equilibrium, sourcing, and traditional craftsmanship that would continue to evolve over the next two decades.'
];

const transition = [
  'Following her chapter at SoLuna Brot und Oel, Susan stepped into a period of personal and entrepreneurial exploration, keeping her connection to craftsmanship alive across different mediums. She returned directly to her roots, sourcing and curating authentic African arts, traditional textiles, original artwork, and hand-carved cultural artifacts, presenting and curating these collections face to face with customers in independent regional marketplaces.',
  'To expand her understanding of modern commerce, she also immersed herself in the structured commercial world of established retail stores. Working within these high-volume retail environments provided valuable, hands-on insight into inventory flow, supply chains, and customer relationship management at scale.',
  'Driven by a desire to bring the richness of African heritage to an international audience, Susan expanded into digital entrepreneurship, establishing her own online store. Her collection encompassed intricate textiles, clothing, original artworks, traditional carvings, and cultural objects. This chapter opened the door to digital marketing, international logistics, and relationships with customers across different continents. Navigating the nuances of cross-border e-commerce, global sourcing, and one-to-one international online client care became another vital piece of her entrepreneurial education.',
  'This diverse path\u2014from the slow precision of artisanal food production to the tactile beauty of African carvings and textiles, retail operations, and international digital commerce\u2014laid the perfect foundation for her next vision.'
];

const terroir = [
  'Africa\u2019s culinary landscape stretches far beyond historical trade routes. Its remarkable microclimates\u2014spanning high-altitude mist forests, arid deserts, volcanic slopes, and tropical coastlines\u2014nurture an extraordinary diversity of heritage ingredients, rare seeds, spices, teas, and botanical oils. MAISON ASILI was founded to explore and celebrate these remarkable ingredients, bringing their origins, character and culinary possibilities to an international audience.',
  'In North Africa, the arid foothills of the Atlas Mountains yield precious argan kernels, delicate Barbary fig seeds, wild cumin, coriander, and traditional desert salts shaped by centuries of regional knowledge.',
  'Across West Africa, the landscape shifts to the intense aromatic complexity of Selim pepper, grains of paradise, and umami-rich Dawadawa. From the forests of Ghana to the rich volcanic soils of Cameroon\u2014home to the celebrated Penja pepper\u2014the region offers an extraordinary depth of flavor.',
  'In Central Africa, tropical forests contribute distinctive wild spices and heritage seeds, including prized bush mango kernels and njansang, deeply embedded in traditional food cultures.',
  'East Africa brings the vibrant character of Kenya\u2019s fertile highlands, renowned for exceptional Arabica coffees and distinctive purple teas. The region\u2019s botanical diversity extends to moringa, hibiscus, macadamia, and traditional grains. Along the Swahili Coast and across the spice islands of Zanzibar, centuries of Indian Ocean exchange are reflected in fragrant cloves, cardamom, cinnamon, black pepper, and aromatic roots. Madagascar and the Indian Ocean islands add their own remarkable botanical heritage, from Bourbon vanilla and cloves to wild forest peppers and aromatic plants.',
  'Further south, Southern Africa offers the rugged biodiversity of the Cape, home to rooibos and honeybush, alongside the sun-drenched savannas that yield marula oil, Kalahari melon seeds, and precious mongongo nuts. Its varied mountain landscapes and indigenous flora reveal another world of distinctive botanical oils and traditional ingredients.',
  'From argan to marula, from Penja pepper to highland teas, these ingredients tell stories of specific soils, shifting climates, and generations of preserved agricultural knowledge. Some remain rare beyond their regions of origin. Others have been treasured in everyday cooking for centuries. Together, they reveal a continent of remarkable culinary depth, where ancient traditions continue to inspire new possibilities.'
];

const precision = [
  'MAISON ASILI is the synthesis of this multifaceted journey. Taken from the Swahili word for "origin" or "roots," Asili represents a return to source, guided by modern precision and a deep respect for traditional craftsmanship.',
  'Conceived and crafted in Berlin, MAISON ASILI explores Africa\u2019s diverse culinary landscape through a carefully curated world of heritage spices, specialty salts, distinctive teas, exceptional coffees, and cold-pressed botanical oils.',
  'Our approach begins with the ingredient itself\u2014its origin, natural character, traditional uses, and potential in contemporary gastronomy. The knowledge gathered through decades of hands-on craftsmanship, sourcing, face-to-face market trading, retail expertise, and international commerce informs every stage of this journey. Careful selection, thoughtful preparation, and respect for the individual qualities of each ingredient remain at the heart of the Maison.'
];

const legacy = [
  'From the wood-fired ovens of Brandenburg and the vibrant markets of Berlin to African arts, traditional textiles, international retail, and the borderless digital world, Susan Kiruku-Klann\u2019s path has been shaped by connection, craftsmanship, cultural exchange, and a continuous pursuit of knowledge.',
  'MAISON ASILI brings these experiences together in a new chapter\u2014one rooted in African heritage, enriched by more than two decades of entrepreneurial experience, and inspired by the extraordinary culinary diversity of a continent.'
];

const closing = [
  'A continuing journey of discovery, craftsmanship, and origins.',
  'MAISON ASILI',
  'Origin. Identity. Heritage.',
  'Rooted in Africa. Born in Berlin. For the World.'
];

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
    <div className="space-y-5 text-[15px] font-light leading-[1.85] text-stone-muted sm:text-base sm:leading-[1.9]">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 60)}>{paragraph}</p>
      ))}
    </div>
  );
}

export default function HeritagePage() {
  return (
    <main className="w-full bg-warm-ivory">
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
            MAISON ASILI is born at the intersection of raw heritage and absolute culinary precision. Founded in Berlin
            by Susan Kiruku-Klann, the house represents a sophisticated fusion of her African roots and over twenty years
            of elite artisan food production, retail operations, and cross-border e-commerce.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-16 px-6 py-16 sm:space-y-24 sm:py-24">
        <section>
          <SectionHeading title="The Foundations of Craft" />
          <Prose paragraphs={foundations} />
        </section>

        <section className="border-t border-stone-border-light pt-14 sm:pt-16">
          <SectionHeading title="The Transition: Sourcing Heritage and Connecting Globally" />
          <Prose paragraphs={transition} />
        </section>

        <section className="border-t border-stone-border-light pt-14 sm:pt-16">
          <SectionHeading title="The African Terroir: A Continent of Rich Culinary Heritage" />
          <Prose paragraphs={terroir} />
        </section>

        <section className="border-t border-stone-border-light pt-14 sm:pt-16">
          <SectionHeading title="Where Heritage Meets Precision" />
          <Prose paragraphs={precision} />
        </section>

        <section className="border-t border-stone-border-light pt-14 sm:pt-16">
          <SectionHeading title="A Continuing Legacy" />
          <Prose paragraphs={legacy} />
        </section>

        <section className="border-t border-stone-border-light pt-14 text-center sm:pt-20">
          <p className="mx-auto max-w-xl font-serif text-xl font-normal leading-snug text-stone-dark sm:text-2xl">
            {closing[0]}
          </p>
          <div className="mx-auto mt-10 h-px w-12 bg-gold" />
          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.42em] text-gold">{closing[1]}</p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-stone-muted sm:text-[11px]">{closing[2]}</p>
          <p className="mt-8 font-serif text-base italic tracking-wide text-tertiary sm:text-lg">{closing[3]}</p>
        </section>
      </div>
    </main>
  );
}
