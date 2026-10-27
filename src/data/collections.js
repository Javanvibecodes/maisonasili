/**
 * Maison Asili — collection definitions.
 * Drives the five collection pages, the home page collection grid and the
 * related-category links. Copy is brand-level (no invented origins,
 * certifications or product claims).
 */
module.exports = [
  {
    slug: 'coffee',
    index: '01',
    name: 'Coffee',
    navName: 'Coffee',
    tagline: 'High-altitude, small-batch roasts',
    eyebrow: 'The Coffee Reserve',
    intro:
      'Small-batch coffees selected for clarity, structure and sweetness. Every roast in the Maison Asili pantry is composed for the filter cup and the espresso bar alike, and prepared in Berlin for the discerning epicurean.',
    media: 'collectionCoffee',
    related: ['tea', 'spices'],
    editorialTitle: 'Extraordinary flavour begins with extraordinary ingredients.',
    editorialBody:
      'From the slow ritual of the morning filter to the intensity of the espresso bar, coffee is where craft becomes daily habit. Explore roast profiles across the collection, and pair a bright, structured cup with our spice blends and botanical infusions.',
    applications: [
      'Filter and pour-over services',
      'Espresso and milk pairings',
      'Cold brew and slow steeping',
      'Pastry and chocolate pairings'
    ]
  },
  {
    slug: 'tea',
    index: '02',
    name: 'Tea',
    navName: 'Tea',
    tagline: 'Rare leaves, tisanes and infusions',
    eyebrow: 'The Tea Room',
    intro:
      'Whole-leaf teas, herbal tisanes and botanical infusions chosen for aroma, colour and composure. A quiet collection for the unhurried table, served with the same attention as the rest of the Maison Asili pantry.',
    media: 'collectionTea',
    related: ['botanicals', 'coffee'],
    editorialTitle: 'A slower ceremony for the modern table.',
    editorialBody:
      'Tea asks for patience and rewards it. Infuse by the pot for long afternoons, build clear iced brews for warm evenings, or compose a house tisane from the botanicals that sit beside this collection.',
    applications: [
      'Loose-leaf pot service',
      'Iced and cold-brew infusions',
      'House tisanes and evening blends',
      'Pastry and dessert pairings'
    ]
  },
  {
    slug: 'spices',
    index: '03',
    name: 'Spices',
    navName: 'Spices',
    tagline: 'Ancient blends and whole spices',
    eyebrow: 'The Spice Cabinet',
    intro:
      'Whole spices, single-origin aromatics and composed blends milled for intensity. The spice cabinet is the heart of the Maison Asili pantry — the shortest route from ordinary cooking to a genuinely memorable plate.',
    media: 'collectionSpices',
    related: ['botanicals', 'oils'],
    editorialTitle: 'The fastest route to depth, aroma and colour.',
    editorialBody:
      'Toast whole spices, grind to order, and finish at the last moment: the difference is immediate. Build a rub, a marinade or a finishing blend, then let the oils and botanicals in the pantry carry it the rest of the way.',
    applications: [
      'Rubs, marinades and finishing blends',
      'Warm spice drinks and chocolate',
      'Rice, grain and legume seasoning',
      'Baking and preserved condiments'
    ]
  },
  {
    slug: 'botanicals',
    index: '04',
    name: 'Botanicals',
    navName: 'Botanicals',
    tagline: 'Elixirs, infusions and dried botanicals',
    eyebrow: 'The Botanicals',
    intro:
      'Dried flowers, fruits, pods and leaf — ingredients that sit between kitchen and apothecary. Maison Asili botanicals are selected for fragrance and flavour, ready for infusions, cordials, syrups and desserts.',
    media: 'collectionBotanicals',
    related: ['tea', 'spices'],
    editorialTitle: 'Between kitchen and apothecary.',
    editorialBody:
      'Steep them, macerate them, dry them into a blend. Botanicals give a kitchen its range: bright infusions, deep reductions, fragrant syrups and desserts that taste of somewhere else entirely.',
    applications: [
      'Hot and cold infusions',
      'Cordials, shrubs and syrups',
      'Desserts, creams and sorbets',
      'Aromatic reductions and glazes'
    ]
  },
  {
    slug: 'oils',
    index: '05',
    name: 'Oils',
    navName: 'Oils',
    tagline: 'Cold-pressed specialty oils',
    eyebrow: 'The Oil Cellar',
    intro:
      'Cold-pressed specialty oils in small volumes, selected for finishing rather than frying. Poured at the table, over raw fish or vegetables, warm bread or ice cream — a few drops change the plate completely.',
    media: 'collectionOils',
    related: ['spices', 'botanicals'],
    editorialTitle: 'A few drops, poured at the very end.',
    editorialBody:
      'Great finishing oils are used raw: over crudo, tomatoes, charred vegetables, warm bread or vanilla ice cream. Keep them close to the stove, away from heat, and pour them last.',
    applications: [
      'Finishing raw and cooked dishes',
      'Bread service and dipping',
      'Dressings and cold emulsions',
      'Desserts and vanilla pairings'
    ]
  }
];
