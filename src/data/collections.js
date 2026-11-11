/**
 * Maison Asili — collection definitions.
 * Drives the collection pages, the home page collection cards, the shop filters
 * and the related-category links. Copy is brand-level and stays within the
 * client-approved range of spice blends, salt blends and botanical teas.
 */
module.exports = [
  {
    slug: 'spices',
    index: '01',
    name: 'Spice Blends',
    navName: 'Spices',
    tagline: 'Heritage blends, rubs and seasonings',
    eyebrow: 'The Spice Cabinet',
    intro:
      'Heritage spice blends composed for remarkable depth, aroma and natural umami. From the savannah fire of Bird’s Eye Chilli to the smoky warmth of Selim pepper, each blend is made for steaks, seafood, vegetables and the modern gourmet table.',
    media: 'collectionSpices',
    editorialMedia: 'collectionSpicesEditorial',
    related: ['salts', 'tea'],
    editorialTitle: 'The shortest route from ordinary cooking to a memorable plate.',
    editorialBody:
      'Toast, crush and finish at the last moment: the difference is immediate. Build a rub for exceptional steaks, season seafood with citrus and hibiscus, or let a smoked blend carry the depth of a slow-roasted vegetable. These are kitchen ingredients, composed to be used.',
    applications: [
      'Steaks, grilled meats and game',
      'Seafood, poultry and vegetables',
      'Rubs, marinades and finishing blends',
      'Rice, grains and roasted dishes'
    ]
  },
  {
    slug: 'salts',
    index: '02',
    name: 'Salts',
    navName: 'Salts',
    tagline: 'Botanical salt blends and finishing salts',
    eyebrow: 'The Salt Cellar',
    intro:
      'Hand-harvested salts layered with moringa, pink pepper, hibiscus and citrus. These are finishing salts designed to bring mineral crispness, colour and aromatic lift to the final plate — never merely a substitute for seasoning.',
    media: 'collectionSalts',
    editorialMedia: 'collectionSaltsEditorial',
    related: ['spices', 'tea'],
    editorialTitle: 'The last gesture before the table.',
    editorialBody:
      'A finishing salt should do more than season. Scatter it over grilled fish, avocado, carpaccio or fine vegetables and let the mineral texture, citrus brightness and botanical aroma arrive intact. Add it at the end, with a generous hand and a light touch.',
    applications: [
      'Seafood and grilled fish',
      'Avocado, carpaccio and crudo',
      'Fine vegetables and summer salads',
      'A finishing touch at the table'
    ]
  },
  {
    slug: 'tea',
    index: '03',
    name: 'Botanical Teas',
    navName: 'Tea',
    tagline: 'Rare leaves, flowers and botanical infusions',
    eyebrow: 'The Tea Room',
    intro:
      'Whole-leaf teas and botanical infusions chosen for aroma, colour and composure. From Kenyan purple tea to Malawian white tea, each blend is composed for the unhurried table and served with the same attention as the rest of the Maison Asili pantry.',
    media: 'collectionTea',
    editorialMedia: 'collectionTeaEditorial',
    related: ['spices', 'salts'],
    editorialTitle: 'A slower ceremony for the modern table.',
    editorialBody:
      'Tea asks for patience and rewards it. Infuse by the pot for long afternoons, build clear iced brews for warm evenings, or pour a quiet cup at the end of the day. The leaves are whole, the flowers are whole, and the ritual is yours to keep.',
    applications: [
      'Loose-leaf pot service',
      'Iced and cold-brew infusions',
      'Evening and after-dinner blends',
      'Pastry and dessert pairings'
    ]
  }
];
