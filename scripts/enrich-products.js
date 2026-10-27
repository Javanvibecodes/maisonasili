/**
 * One-off: folds PDP content (ingredients / culinary uses / details) into
 * src/data/products.js, keyed by the exact product name.
 * Run: node scripts/enrich-products.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const file = path.join(ROOT, 'src', 'data', 'products.js');
const products = require(file);

/** name -> extra fields (demo content, kept free of health/benefit claims) */
const ENRICH = {
  'Kilimanjaro Peaberry Signature Roast': {
    ingredients: '100% arabica whole-bean coffee (demo composition).',
    uses: 'Ground to order for filter, pour-over or espresso. Rest the roasted beans three to five days before brewing.'
  },
  'Kinkeliba & Wild Mint Herbal Infusion': {
    ingredients: 'Dried kinkeliba leaf and wild mint (demo composition).',
    uses: 'Infuse a generous spoon per cup in water just off the boil for four to six minutes. Serve hot or chilled over ice.'
  },
  'Dukkah Heritage Spice Blend': {
    ingredients: 'Roasted hazelnuts, golden sesame, cumin and coriander (demo composition).',
    uses: 'Serve with olive oil and flatbread for dipping, or use as a finishing crust for roasted vegetables, eggs and grilled fish.'
  },
  'Cold-Pressed Marula & Sesame Finishing Oil': {
    ingredients: 'Cold-pressed marula kernel oil, cold-pressed sesame oil (demo composition).',
    uses: 'Used raw: over crudo, charred vegetables, warm grains or vanilla ice cream. Do not heat.'
  },
  'Sun-Dried Hibiscus & Baobab Pods': {
    ingredients: 'Sun-dried hibiscus calyces and baobab fruit pulp (demo composition).',
    uses: 'Steep for bright drinks and iced tea, reduce into syrups and cordials, or fold into sauces and glazes.'
  },
  'Smoked Black Cardamom & Grains of Paradise': {
    ingredients: 'Smoked black cardamom pods, grains of paradise (demo composition).',
    uses: 'Crush to order for braises, rice, roasts and chocolate. Toast briefly in dry pan before grinding.'
  },
  'Yirgacheffe Washed Heirloom Arabica': {
    ingredients: '100% arabica whole-bean coffee (demo composition).',
    uses: 'Best as filter or pour-over, where the lighter structure and aromatics stay intact. Allow to rest before brewing.'
  },
  'Mount Kenya Silver Needle White Tea': {
    ingredients: 'Whole white tea buds (demo composition).',
    uses: 'Infuse gently at around 80°C, two to three minutes, and repeat across several steepings.'
  },
  'Zanzibar Bourbon Vanilla Pods': {
    ingredients: 'Whole cured vanilla pods (demo composition).',
    uses: 'Split and scrape for custards, creams and doughs; steep whole pods in milk, syrups or spirits.'
  },
  'First Press Toasted Argan Finishing Oil': {
    ingredients: 'Cold-pressed argan oil from toasted kernels (demo composition).',
    uses: 'Finish salads, soups, couscous and bread with it. Keep raw and pour just before serving.'
  },
  'Cederberg Mountain Wild Rooibos': {
    ingredients: 'Whole rooibos leaf (demo composition).',
    uses: 'Infuse five to seven minutes in boiling water. Takes milk well and works as a base for iced tea.'
  },
  'Grand Cru Berbere Spice Blend': {
    ingredients: 'Sun-ripened chillies, korarima cardamom, fenugreek, holy basil and warming spices (demo composition).',
    uses: 'Bloom in fat at the start of cooking for stews, lentils and braises, or use as a rub for roasts.'
  },
  'Shade-Dried Moringa Leaf Powder': {
    ingredients: 'Shade-dried moringa leaf powder (demo composition).',
    uses: 'Whisk into smoothies, dressings and doughs. Use sparingly and add late to keep its fresh character.'
  },
  'Nyamasheke Honey Process Arabica': {
    ingredients: '100% arabica whole-bean coffee (demo composition).',
    uses: 'A structured cup for filter brewing, and equally at home as a sweet, dense espresso.'
  },
  'Kalahari Melon Seed Cold-Pressed Oil': {
    ingredients: 'Cold-pressed melon seed oil (demo composition).',
    uses: 'A light finishing oil for salads, raw fish, cucumber and cold soups. Best used raw.'
  },
  'Virunga National Park Espresso Roast': {
    ingredients: '100% arabica whole-bean coffee (demo composition).',
    uses: 'Dialled for espresso and moka; also excellent with milk in the morning.'
  },
  'Madagascar Wild Voatsiperifery Pepper': {
    ingredients: 'Whole wild voatsiperifery pepper (demo composition).',
    uses: 'Crush over grilled meat, seafood, fruit and chocolate. Add late to keep its aromatic lift.'
  },
  'Honeybush & Wild Cape Botanical Flowers': {
    ingredients: 'Dried honeybush and Cape floral botanicals (demo composition).',
    uses: 'Infuse for tea, macerate for cordials and vermouth-style drinks, or dry into pastry creams.'
  }
};

let missing = [];
const next = products.map((p) => {
  const extra = ENRICH[p.name];
  if (!extra) {
    missing.push(p.name);
    return p;
  }
  return { ...p, ...extra };
});

if (missing.length) {
  console.error('missing enrichment for:', missing);
  process.exit(1);
}

const out =
  `/**\n` +
  ` * Maison Asili — demonstration catalogue (single source of truth).\n` +
  ` *\n` +
  ` * Drives the product pages, collection grids, search, quick-add and cart.\n` +
  ` * Prices are placeholder values in EUR until the real range is supplied.\n` +
  ` * Copy marked "demo composition" is illustrative only.\n` +
  ` *\n` +
  ` * Fields:\n` +
  ` *   slug / name / category / price / size / label / eyebrow / description\n` +
  ` *   image        local asset path for the packshot\n` +
  ` *   featured     shown in "Selected for Your Table" on the home page\n` +
  ` *   added        ordering key for the "Newest" sort\n` +
  ` *   ingredients  composition (demo content)\n` +
  ` *   uses         culinary applications (demo content)\n` +
  ` */\n\n` +
  'module.exports = ' +
  JSON.stringify(next, null, 2) +
  ';\n';

fs.writeFileSync(file, out);
console.log(`products.js curated: ${next.length} entries`);
