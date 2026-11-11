/**
 * Maison Asili — product catalogue (single source of truth).
 *
 * Drives the product pages, collection grids, search, quick-add and cart.
 * Prices are demonstration values in EUR until the client confirms the live
 * price list. Product weights are taken from the supplied packshots where
 * visible; the Emerald Moringa weight is inferred from the range and flagged
 * in the implementation report.
 *
 * Fields:
 *   slug / name / subtitle / category / price / size / label / eyebrow
 *   description      one concise, client-approved product paragraph
 *   ingredients      ordered ingredient list supplied by the client
 *   image            local asset path for the supplied photograph
 *   imageSource      original client file copied by the build
 *   imageWidth/Height natural dimensions, used to reserve layout space
 */

module.exports = [
  {
    slug: 'savannah-fire',
    name: 'Savannah Fire',
    subtitle: 'Premium African Steak Seasoning',
    category: 'spices',
    price: 18,
    size: '130 g Jar',
    label: 'Signature Blend',
    eyebrow: 'Artisan Spice Blend • Berlin',
    description:
      "Inspired by the untamed spirit of the African savannah, Savannah Fire combines vibrant African Bird's Eye Chilli, aromatic Grains of Paradise, delicate Fleur de Sel and smoked garlic into a bold, smoky seasoning with remarkable depth and natural umami. Crafted for exceptional steaks, grilled meats, game and vegetables, it brings African spice heritage to the modern gourmet table.",
    ingredients: [
      "Bird's Eye Chilli (Peri-Peri)",
      'Grains of Paradise',
      'Fleur de Sel',
      'Smoked Garlic',
      'Selected Aromatic Spices'
    ],
    productType: 'Premium African Steak Seasoning',
    origin: 'Inspired by the untamed spirit of the African savannah.',
    image: 'assets/img/products/savannah-fire.jpg',
    imageSource: 'Product Images/Savannah Fire.jpeg',
    imageWidth: 1536,
    imageHeight: 1024,
    featured: true,
    added: 8
  },
  {
    slug: 'selim-and-paradise',
    name: 'Selim & Paradise',
    subtitle: 'West African Smoked Steak Rub',
    category: 'spices',
    price: 19,
    size: '130 g Jar',
    label: 'West African Reserve',
    eyebrow: 'West African Spice Heritage',
    description:
      'Inspired by the ancient spice routes of West Africa, Selim & Paradise unites smoky Selim pepper with the warm aromatic character of Grains of Paradise, smoked paprika, coriander and garlic. Finished with smoked sea salt, this distinctive steak rub delivers remarkable smoky depth, peppery warmth and natural umami to premium meats and roasted vegetables.',
    ingredients: [
      'Selim Pepper (Negro Pepper)',
      'Grains of Paradise',
      'Smoked Paprika',
      'Coriander',
      'Garlic',
      'Smoked Sea Salt'
    ],
    productType: 'West African Smoked Steak Rub',
    origin: 'Inspired by the ancient spice routes of West Africa.',
    image: 'assets/img/products/selim-and-paradise.jpg',
    imageSource: 'Product Images/Salim and Paradise.jpeg',
    imageWidth: 1402,
    imageHeight: 1122,
    featured: true,
    added: 7
  },
  {
    slug: 'tropical-pink-pepper-salt',
    name: 'Tropical Pink Pepper Salt',
    subtitle: 'Flamingo Pink — Hand-Harvested Sea Salt',
    category: 'salts',
    price: 16,
    size: '100 g Jar',
    label: 'Flamingo Pink',
    eyebrow: 'Hand-Harvested Sea Salt',
    description:
      'Tropical Pink Pepper Salt masterfully blends hand-harvested sea salt with the bright, fruity notes of premium pink peppercorns, vibrant hibiscus and delicate citrus zest. This elegant flamingo-pink blend adds colour, freshness and refined complexity to seafood, grilled fish, poultry, summer salads and gourmet creations.',
    ingredients: ['Hand-Harvested Sea Salt', 'Pink Peppercorns', 'Hibiscus', 'Citrus Zest'],
    productType: 'Hand-Harvested Sea Salt Blend',
    origin: 'Hand-harvested sea salt, blended in Berlin.',
    image: 'assets/img/products/tropical-pink-pepper-salt.jpg',
    imageSource: 'Product Images/Tropical Pink Pepper.jpeg',
    imageWidth: 1536,
    imageHeight: 1024,
    featured: true,
    added: 6
  },
  {
    slug: 'swahili-coast',
    name: 'Swahili Coast',
    subtitle: 'Citrus & Hibiscus — Premium Seafood Spice Blend',
    category: 'spices',
    price: 17,
    size: '100 g Jar',
    label: 'Coastal Reserve',
    eyebrow: 'East African Coastal Blend',
    description:
      'Inspired by the Swahili spice heritage of East Africa, Swahili Coast combines lively lime zest, ruby-red hibiscus, fragrant garlic, black pepper and aromatic coastal herbs. Its vibrant citrus-floral character and gentle peppery warmth bring a distinctive Afro-Gourmet touch to seafood, poultry, grilled vegetables, fragrant rice and coconut curries.',
    ingredients: [
      'Lime Peel',
      'Hibiscus',
      'Garlic',
      'Black Pepper',
      'Rosemary',
      'Thyme',
      'Selected Aromatic Coastal Herbs and Spices'
    ],
    productType: 'Premium Seafood Spice Blend',
    origin: 'Inspired by the Swahili spice heritage of East Africa.',
    image: 'assets/img/products/swahili-coast.jpg',
    imageSource: 'Product Images/Swahili Coast.jpeg',
    imageWidth: 1254,
    imageHeight: 1254,
    featured: true,
    added: 5
  },
  {
    slug: 'emerald-moringa',
    name: 'Emerald Moringa',
    subtitle: 'African Salt Blend — Moringa & Lemon Zest',
    category: 'salts',
    price: 18,
    size: '100 g Jar',
    label: 'Great Rift Valley',
    eyebrow: 'Kenyan Botanical Salt',
    description:
      "Inspired by the landscapes of Kenya's Great Rift Valley, Emerald Moringa brings together hand-harvested African salt, earthy moringa leaves and fragrant dried lemon zest, delicately layered with garlic and white pepper. This vibrant botanical finishing salt adds mineral crispness, citrus brightness and subtle savoury warmth to seafood, avocado, carpaccio and fine vegetables.",
    ingredients: ['Hand-Harvested African Salt', 'Moringa Leaves', 'Dried Lemon Zest', 'Garlic', 'White Pepper'],
    productType: 'African Salt Blend',
    origin: "Inspired by the landscapes of Kenya's Great Rift Valley.",
    image: 'assets/img/products/emerald-moringa.jpg',
    imageSource: 'Product Images/Emerald Moringa.jpeg',
    imageWidth: 1254,
    imageHeight: 1254,
    featured: true,
    added: 4
  },
  {
    slug: 'royal-purple-elixir',
    name: 'Royal Purple Elixir',
    subtitle: 'Luxury African Botanical Tea | Mount Kenya',
    category: 'tea',
    price: 24,
    size: '50 g Loose Leaf',
    label: 'Mount Kenya',
    eyebrow: 'Kenyan Purple Tea',
    description:
      'Born in the mist-kissed highlands of Mount Kenya, Royal Purple Elixir celebrates the distinctive character of Kenyan Purple Tea. Earthy moringa and ancient baobab meet vibrant hibiscus, delicate rose petals and sun-kissed orange peel in an exquisite botanical blend with floral elegance, fruity brightness and refined depth.',
    ingredients: ['Kenyan Purple Tea', 'Moringa', 'Baobab', 'Hibiscus', 'Rose Petals', 'Orange Peel'],
    productType: 'Premium Loose-Leaf Botanical Tea',
    origin: 'Born in the mist-kissed highlands of Mount Kenya.',
    image: 'assets/img/products/royal-purple-elixir.jpg',
    imageSource: 'Product Images/Royal Purple Elixur.jpeg',
    imageWidth: 1024,
    imageHeight: 1024,
    featured: true,
    added: 3
  },
  {
    slug: 'mara-moon',
    name: 'Mara Moon',
    subtitle: 'Luxury Evening Botanical Tea',
    category: 'tea',
    price: 24,
    size: '50 g Loose Leaf',
    label: 'Evening Reserve',
    eyebrow: 'South African Evening Blend',
    description:
      'Inspired by the tranquil beauty of African evenings, Mara Moon combines delicate Silver Needle white tea with naturally smooth South African green rooibos. Fragrant lavender, gentle chamomile and a whisper of coconut create a beautifully balanced botanical blend with soft floral notes, subtle sweetness and refined elegance.',
    ingredients: ['Silver Needle White Tea', 'South African Green Rooibos', 'Lavender', 'Chamomile', 'Coconut'],
    productType: 'Premium Loose-Leaf Botanical Tea',
    origin: 'Inspired by the tranquil beauty of African evenings.',
    image: 'assets/img/products/mara-moon.jpg',
    imageSource: 'Product Images/Mara Moon.jpeg',
    imageWidth: 896,
    imageHeight: 1200,
    featured: true,
    added: 2
  },
  {
    slug: 'desert-gold',
    name: 'Desert Gold',
    subtitle: 'Malawian White Tea | Luxury Botanical Fusion',
    category: 'tea',
    price: 26,
    size: '50 g Loose Leaf',
    label: 'Malawi Reserve',
    eyebrow: 'Malawian White Tea',
    description:
      'From the lush highlands of Malawi comes exquisite Silver Tip white tea, celebrated for its silky elegance and delicate character. Maison Asili reimagines this rare botanical through a refined fusion of fragrant orange blossoms, golden calendula and lemongrass, creating a harmonious blend of floral softness, subtle citrus brightness and graceful depth.',
    ingredients: ['Malawian Silver Tip White Tea', 'Orange Blossoms', 'Calendula', 'Lemongrass'],
    productType: 'Premium Loose-Leaf White Tea Blend',
    origin: 'From the lush highlands of Malawi.',
    image: 'assets/img/products/desert-gold.jpg',
    imageSource: 'Product Images/Desert Gold.jpeg',
    imageWidth: 1264,
    imageHeight: 843,
    featured: true,
    added: 1
  }
];
