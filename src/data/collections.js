/**
 * Maison Asili — collection definitions.
 * Drives the collection pages, the home page collection cards, the shop filters
 * and the related-category links. Copy is brand-level and stays within the
 * client-approved range of spice blends, salt blends, botanical teas and culinary oils.
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
    related: ['salts', 'oils'],
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
      'Beyond seasoning lies the art of finishing. Our salts bring together distinctive African botanicals, vibrant spices and carefully selected ingredients to create expressive blends that awaken the senses and bring character to the final plate. Each composition celebrates the beauty of its ingredients, adding colour, aroma and depth to contemporary cuisine.',
    media: 'collectionSalts',
    editorialMedia: 'collectionSaltsEditorial',
    related: ['spices', 'oils'],
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
      'Our botanical teas celebrate the richness and diversity of African teas and botanicals. Drawing on distinctive leaves, flowers, fruits and plants, we bring together carefully selected ingredients to create blends with individual character, colour and depth. Each blend is an invitation to discover something distinctive, inspired by the natural treasures and botanical heritage of Africa.',
    media: 'collectionTea',
    editorialMedia: 'collectionTeaEditorial',
    related: ['spices', 'oils'],
    editorialTitle: 'A slower ceremony for the modern table.',
    editorialBody:
      'Tea asks for patience and rewards it. Infuse by the pot for long afternoons, build clear iced brews for warm evenings, or pour a quiet cup at the end of the day. The leaves are whole, the flowers are whole, and the ritual is yours to keep.',
    applications: [
      'Loose-leaf pot service',
      'Iced and cold-brew infusions',
      'Evening and after-dinner blends',
      'Pastry and dessert pairings'
    ]
  },
  {
    slug: 'oils',
    index: '04',
    name: 'Culinary Oils',
    navName: 'Oils',
    tagline: 'Cold-pressed oils for cooking and finishing',
    eyebrow: 'The Oil Press',
    intro:
      'Our culinary oils bring together carefully selected oils and distinctive botanical ingredients, crafted to add character and depth to contemporary cuisine. From the delicate richness of cold-pressed macadamia oil, made from premium Kenya AA macadamia nuts, to the aromatic warmth of Madagascar Bourbon vanilla, each oil offers its own distinctive expression and culinary possibilities.',
    media: 'collectionOils',
    editorialMedia: 'collectionOilsEditorial',
    related: ['spices', 'salts'],
    editorialTitle: 'The last drop that finishes the plate.',
    editorialBody:
      'A finishing oil is a seasoning in liquid form. A few drops over seafood, salad or dessert carry aroma further than any dry spice can. Keep the bottle at the table, use it sparingly, and let the oil arrive uncooked.',
    applications: [
      'Finishing seafood, salads and vegetables',
      'Pastry, desserts and chocolate',
      'Gentle searing and roasting',
      'Vinaigrettes and marinades'
    ]
  }
];
