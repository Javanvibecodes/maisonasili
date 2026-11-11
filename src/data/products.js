/**
 * Maison Asili — product catalogue (single source of truth).
 *
 * Drives the product pages, the editorial product rows, collection pages,
 * search and the wholesale order request. No consumer prices are held here:
 * trade pricing is provided on request.
 *
 * Fields:
 *   slug / name / subtitle / descriptor / category / size / label / eyebrow
 *   description      short summary used for metadata and search results
 *   story            full editorial content supplied by Maison Asili
 *                    heading / paragraphs / flavour / beautifulWith / touch /
 *                    craft / closing / sizeNote
 *   ingredients      ingredient list exactly as supplied by the client
 *   ingredientsNote  optional note where the formulation still needs confirming
 *   image            local asset path for the supplied photograph
 *   imageSource      original client file name
 *   imageWidth/Height natural dimensions, used to reserve layout space
 */

module.exports = [
  {
    slug: 'savannah-fire',
    name: 'Savannah Fire',
    subtitle: 'Premium African Steak Seasoning',
    category: 'spices',
    size: '130 g Jar',
    label: 'Signature Blend',
    eyebrow: 'Artisan Spice Blend • Berlin',
    description:
      "Inspired by the untamed spirit of the African savannah, Savannah Fire combines vibrant African Bird's Eye Chilli, aromatic Grains of Paradise, delicate Fleur de Sel and smoked garlic into a bold, smoky seasoning with remarkable depth and natural umami. Crafted for exceptional steaks, grilled meats, game and vegetables, it brings African spice heritage to the modern gourmet table.",
    story: {
      heading: 'The Soul of Fire. The Art of Flavour.',
      paragraphs: [
        'Across the vast African savannah, where golden grasslands meet endless horizons, fire has long been at the heart of cooking, gathering and sharing food.',
        "Inspired by this timeless connection, Savannah Fire brings together the vibrant warmth of African Bird's Eye Chilli, the aromatic complexity of Grains of Paradise, delicate Fleur de Sel and the deep, savoury character of smoked garlic.",
        'A carefully balanced Afro-Gourmet Fusion creation that celebrates the individuality of every ingredient. Here, heat is not the destination. The chilli awakens the palate, the spices unfold their fragrant warmth, and the gentle smokiness enhances rather than conceals the natural character of the food.',
        'From beautifully seared steaks and slow-roasted lamb to succulent game and flame-grilled vegetables, Savannah Fire transforms familiar ingredients into an extraordinary experience of taste.',
        'More than a seasoning. A celebration of African spice heritage, where ancient flavours are awakened through contemporary culinary craftsmanship.'
      ],
      flavour: ['Smoky Depth', 'Aromatic Warmth', 'Vibrant Chilli', 'Savoury Umami', 'Lingering Heat'],
      beautifulWith: [
        'Ribeye Steak',
        'Beef Fillet',
        'Lamb',
        'Venison',
        'Gourmet Burgers',
        'BBQ',
        'Flame-Grilled Vegetables'
      ],
      touch: [
        'Gently massage into your chosen cut before grilling, searing or roasting. Allow the spices to develop a fragrant, beautifully seasoned crust while preserving the natural character of the meat.',
        'For an elegant finishing touch, add a few drops of premium cold-pressed macadamia oil.'
      ],
      craft: 'Small-batch crafted. Carefully selected natural ingredients. No artificial additives or preservatives.'
    },
    ingredients: [
      "African Bird's Eye Chilli (Peri-Peri)",
      'Grains of Paradise',
      'Fleur de Sel',
      'Smoked Garlic'
    ],
    ingredientsNote:
      'The original recipe also refers to carefully selected spices whose identities are still being confirmed. Full formulation available on request.',
    productType: 'Premium African Steak Seasoning',
    origin: 'Inspired by the untamed spirit of the African savannah.',
    image: 'assets/img/products/savannah-fire.jpg',
    imageSource: 'Products/Savannah 2.jpg',
    imageWidth: 1200,
    imageHeight: 1607,
    featured: true,
    added: 8
  },
  {
    slug: 'selim-and-paradise',
    name: 'Selim & Paradise',
    subtitle: 'West African Smoked Steak Rub',
    category: 'spices',
    size: '130 g Jar',
    label: 'West African Reserve',
    eyebrow: 'West African Spice Heritage',
    description:
      'Inspired by the ancient spice routes of West Africa, Selim & Paradise unites smoky Selim pepper with the warm aromatic character of Grains of Paradise, smoked paprika, coriander and garlic. Finished with smoked sea salt, this distinctive steak rub delivers remarkable smoky depth, peppery warmth and natural umami to premium meats and roasted vegetables.',
    story: {
      heading: 'Where Smoke Meets Paradise',
      paragraphs: [
        'From the ancient spice routes of West Africa comes a remarkable encounter between two extraordinary botanicals: the mysterious, smoky Selim pepper and the warm, fragrant Grains of Paradise.',
        'Selim & Paradise celebrates this rich culinary heritage through a bold Afro-Gourmet Fusion creation, bringing together the woody, almost incense-like aroma of Selim, the lively peppery warmth of Grains of Paradise, and the deep, savoury character of smoked paprika, coriander and garlic.',
        'A touch of smoked sea salt completes the composition, creating an intricate balance of fire, fragrance and earthy depth.',
        'The result is a distinctive steak rub that unfolds in layers: an initial whisper of smoke, followed by aromatic warmth, subtle peppery heat and a lingering savoury finish.',
        'Created for those who appreciate the character of exceptional meat, Selim & Paradise brings a new dimension to beautifully marbled steaks, slow-roasted lamb, venison and flame-grilled specialities. Its smoky complexity also lends remarkable depth to roasted mushrooms and root vegetables.',
        'Not simply a steak rub. A journey through smoke, spice and the extraordinary flavours of West Africa.'
      ],
      flavour: [
        'Smoky Selim',
        'Aromatic Grains of Paradise',
        'Woody Depth',
        'Warm Peppery Notes',
        'Savoury Umami'
      ],
      beautifulWith: [
        'Ribeye Steak',
        'Beef Fillet',
        'Lamb',
        'Venison',
        'Gourmet Burgers',
        'Grilled Mushrooms',
        'Roasted Root Vegetables'
      ],
      touch: [
        'Gently massage the rub into your chosen cut of meat before grilling, searing or roasting. Allow the aromatic spices to settle on the surface, developing a fragrant, beautifully seasoned crust as the heat releases their smoky warmth.',
        'For an elegant finishing touch, pair with a few drops of premium cold-pressed macadamia oil.'
      ],
      craft: 'Small-batch crafted. Carefully selected natural ingredients. No artificial additives or preservatives.'
    },
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
    imageSource: 'Products/Paradise 2.jpg',
    imageWidth: 1200,
    imageHeight: 1607,
    featured: true,
    added: 7
  },
  {
    slug: 'tropical-pink-pepper-salt',
    name: 'Tropical Pink Pepper Salt',
    subtitle: 'Flamingo Pink — Hand-Harvested Sea Salt',
    category: 'salts',
    size: '100 g Jar',
    label: 'Flamingo Pink',
    eyebrow: 'Hand-Harvested Sea Salt',
    description:
      'Tropical Pink Pepper Salt masterfully blends hand-harvested sea salt with the bright, fruity notes of premium pink peppercorns, vibrant hibiscus and delicate citrus zest. This elegant flamingo-pink blend adds colour, freshness and refined complexity to seafood, grilled fish, poultry, summer salads and gourmet creations.',
    story: {
      paragraphs: [
        'Tropical Pink Pepper Salt masterfully blends hand-harvested sea salt with the bright, fruity notes of premium pink peppercorns, vibrant hibiscus and a delicate touch of citrus zest.',
        'This elegant flamingo-pink blend brings a beautiful splash of colour and refined complexity to every dish.',
        'Crafted for exceptional seafood, grilled fish, poultry, fresh summer salads, carpaccio, avocado and goat cheese, it delivers a vibrant tropical finish with remarkable freshness and natural elegance.'
      ],
      flavour: ['Fruity', 'Zesty', 'Floral', 'Subtle Heat', 'Crisp Brightness'],
      beautifulWith: [
        'Seafood',
        'Grilled Fish',
        'Poultry',
        'Summer Salads',
        'Carpaccio',
        'Avocado',
        'Goat Cheese'
      ],
      craft: 'Handcrafted in small batches using carefully selected ingredients.'
    },
    ingredients: ['Hand-Harvested Sea Salt', 'Premium Pink Peppercorns', 'Hibiscus', 'Citrus Zest'],
    productType: 'Hand-Harvested Sea Salt Blend',
    origin: 'Hand-harvested sea salt, blended in Berlin.',
    image: 'assets/img/products/tropical-pink-pepper-salt.jpg',
    imageSource: 'Products/Tropical 2.jpg',
    imageWidth: 1200,
    imageHeight: 1607,
    featured: true,
    added: 6
  },
  {
    slug: 'swahili-coast',
    name: 'Swahili Coast',
    subtitle: 'Citrus & Hibiscus',
    descriptor:
      'Premium Seafood Spice Blend — Inspired by the Swahili Spice Coast of East Africa',
    category: 'spices',
    size: '100 g Jar',
    label: 'Coastal Reserve',
    eyebrow: 'East African Coastal Blend',
    description:
      'Inspired by the Swahili spice heritage of East Africa, Swahili Coast combines lively lime zest, ruby-red hibiscus, fragrant garlic, black pepper and aromatic coastal herbs. Its vibrant citrus-floral character and gentle peppery warmth bring a distinctive Afro-Gourmet touch to seafood, poultry, grilled vegetables, fragrant rice and coconut curries.',
    story: {
      heading: 'The Soulful Aroma of the Swahili Coast',
      paragraphs: [
        "Along the sun-drenched shores of East Africa, where ancient spice routes meet the turquoise waters of the Indian Ocean, centuries of cultural exchange have shaped one of the world's most fascinating culinary traditions.",
        'Inspired by this rich Swahili spice heritage, Swahili Coast is a vibrant Afro-Gourmet Fusion creation that brings together the lively zest of lime peel, the ruby-red tang of hibiscus, fragrant garlic, black pepper and a carefully balanced selection of aromatic coastal herbs.',
        'The result is an exquisite interplay of bright citrus, delicate floral acidity, savoury depth and gentle peppery warmth. The refreshing sharpness of lime dances with the fruity, slightly tart character of hibiscus, while rosemary, thyme and aromatic spices lend an elegant herbal finish.',
        'Created for the adventurous gourmet kitchen, Swahili Coast brings an unexpected dimension to succulent prawns, grilled lobster, delicate white fish and roasted poultry. It also transforms grilled vegetables, fragrant rice and creamy coconut curries with its distinctive citrus-floral character.',
        'More than a seasoning. A celebration of Swahili spice heritage, reimagined for the modern gourmet table.'
      ],
      flavour: [
        'Zesty Lime',
        'Ruby Hibiscus',
        'Aromatic Coastal Herbs',
        'Savoury Depth',
        'Gentle Peppery Warmth'
      ],
      beautifulWith: [
        'Prawns & Lobster',
        'Delicate White Fish',
        'Roasted Poultry',
        'Grilled Vegetables',
        'Fragrant Rice',
        'Coconut Curries'
      ],
      touch: [
        'Sprinkle Swahili Coast over freshly grilled prawns, lobster or delicate white fish just before serving. For a richer coastal-inspired experience, blend it into creamy coconut sauces or fragrant rice dishes, allowing its citrus-floral character to complement the natural flavours of your ingredients.'
      ],
      craft: 'Handcrafted in small batches using natural ingredients. No added MSG or preservatives.'
    },
    ingredients: [
      'Lime Peel',
      'Hibiscus',
      'Garlic',
      'Black Pepper',
      'Rosemary',
      'Thyme',
      'Aromatic Coastal Herbs',
      'Selected Aromatic Spices'
    ],
    productType: 'Premium Seafood Spice Blend',
    origin: 'Inspired by the Swahili spice heritage of East Africa.',
    image: 'assets/img/products/swahili-coast.jpg',
    imageSource: 'Products/Swahili 2.jpg',
    imageWidth: 1200,
    imageHeight: 1607,
    featured: true,
    added: 5
  },
  {
    slug: 'emerald-moringa',
    name: 'Emerald Moringa',
    subtitle: 'African Salt Blend — Moringa & Lemon Zest',
    category: 'salts',
    size: '100 g Jar',
    label: 'Great Rift Valley',
    eyebrow: 'Kenyan Botanical Salt',
    description:
      "Inspired by the landscapes of Kenya's Great Rift Valley, Emerald Moringa brings together hand-harvested African salt, earthy moringa leaves and fragrant dried lemon zest, delicately layered with garlic and white pepper. This vibrant botanical finishing salt adds mineral crispness, citrus brightness and subtle savoury warmth to seafood, avocado, carpaccio and fine vegetables.",
    story: {
      heading: 'The Green Soul of the Rift Valley',
      paragraphs: [
        "Where the lush landscapes of Kenya's Great Rift Valley meet the salt-kissed shores of the African coast, a remarkable fusion of flavours begins.",
        'Emerald Moringa brings together hand-harvested African salt, earthy natural moringa leaves and fragrant dried lemon zest, delicately layered with garlic and white pepper.',
        'The result is a vibrant, herbaceous salt blend with a beautiful interplay of mineral crispness, citrus brightness and subtle savoury warmth. Every crystal offers a little contrast: the freshness of lemon, the green depth of moringa and a gentle peppery finish.',
        'Created for the art of finishing, Emerald Moringa transforms the simplest ingredients into something memorable. A delicate sprinkle awakens salmon tartare, adds a bright botanical accent to beef carpaccio, lifts ripe avocado and brings a refreshing contrast to sashimi, grilled seafood and fine vegetables.',
        'Not simply a seasoning. A finishing touch that brings the dish to life.'
      ],
      flavour: [
        'Earthy Moringa',
        'Vibrant Citrus',
        'Delicate Umami',
        'Gentle White Pepper',
        'Mineral Crunch'
      ],
      beautifulWith: [
        'Salmon Tartare',
        'Beef Carpaccio',
        'Avocado',
        'Sashimi',
        'Grilled Fish',
        'Fine Vegetables'
      ],
      touch: [
        'Use as the final flourish, just before serving. Allow the delicate green moringa, golden lemon zest and salt crystals to remain visible, adding both flavour and natural colour to the plate.'
      ],
      craft: 'Small-batch crafted. Pure ingredients. No artificial additives or preservatives.'
    },
    ingredients: [
      'Hand-Harvested African Salt',
      'Moringa Leaves',
      'Dried Lemon Zest',
      'Garlic',
      'White Pepper'
    ],
    productType: 'African Salt Blend',
    origin: "Inspired by the landscapes of Kenya's Great Rift Valley.",
    image: 'assets/img/products/emerald-moringa.jpg',
    imageSource: 'Products/Moringa 2.jpg',
    imageWidth: 1200,
    imageHeight: 1607,
    featured: true,
    added: 4
  },
  {
    slug: 'royal-purple-elixir',
    name: 'Royal Purple Elixir',
    subtitle: 'Luxury African Botanical Tea | Mount Kenya',
    category: 'tea',
    size: '50 g Loose Leaf',
    label: 'Mount Kenya',
    eyebrow: 'Kenyan Purple Tea',
    description:
      'Born in the mist-kissed highlands of Mount Kenya, Royal Purple Elixir celebrates the distinctive character of Kenyan Purple Tea. Earthy moringa and ancient baobab meet vibrant hibiscus, delicate rose petals and sun-kissed orange peel in an exquisite botanical blend with floral elegance, fruity brightness and refined depth.',
    story: {
      heading: 'A Royal Treasure from the Heart of Africa',
      paragraphs: [
        'Born in the mist-kissed highlands of Mount Kenya, Royal Purple Elixir celebrates one of Africa’s rarest tea treasures. Hand-harvested Kenyan Purple Tea, naturally rich in antioxidants, forms the heart of this exquisite Afro-Gourmet Fusion.',
        'Earthy moringa and ancient baobab meet vibrant hibiscus, delicate rose petals, and sun-kissed orange peel, creating a captivating symphony of floral elegance, fruity brightness, and refined depth.',
        'Its magnificent ruby-red infusion reveals a beautifully layered botanical character, transforming every cup into a comforting, everyday sensory ritual.',
        'More than a tea. A celebration of origin, identity, and heritage.'
      ],
      closing: 'Rooted in Africa. Born in Berlin. For the World.',
      sizeNote: '50 g | Premium Loose-Leaf Botanical Tea'
    },
    ingredients: [
      'Hand-Harvested Kenyan Purple Tea',
      'Moringa',
      'Baobab',
      'Hibiscus',
      'Rose Petals',
      'Orange Peel'
    ],
    productType: 'Premium Loose-Leaf Botanical Tea',
    origin: 'Born in the mist-kissed highlands of Mount Kenya.',
    image: 'assets/img/products/royal-purple-elixir.jpg',
    imageSource: 'Products/Purple 2.jpg',
    imageWidth: 1200,
    imageHeight: 1607,
    featured: true,
    added: 3
  },
  {
    slug: 'mara-moon',
    name: 'Mara Moon',
    subtitle: 'Luxury Evening Botanical Tea | 50 g Loose Leaf',
    category: 'tea',
    size: '50 g Loose Leaf',
    label: 'Evening Reserve',
    eyebrow: 'South African Evening Blend',
    description:
      'Inspired by the tranquil beauty of African evenings, Mara Moon combines delicate Silver Needle white tea with naturally smooth South African green rooibos. Fragrant lavender, gentle chamomile and a whisper of coconut create a beautifully balanced botanical blend with soft floral notes, subtle sweetness and refined elegance.',
    story: {
      heading: 'A Moonlit Botanical Escape',
      paragraphs: [
        'Inspired by the tranquil beauty of African evenings, Mara Moon is an exquisite Afro-Gourmet Fusion of delicate Silver Needle white tea and naturally smooth South African green rooibos.',
        'Fragrant lavender, gentle chamomile and a whisper of coconut unfold into a beautifully balanced composition of soft floral notes, subtle sweetness and refined elegance.',
        'A luxurious botanical escape, crafted to transform the quiet moments of your evening into a soothing sensory ritual.'
      ],
      closing: 'Rooted in Africa. Born in Berlin. For the World.'
    },
    ingredients: [
      'Silver Needle White Tea',
      'South African Green Rooibos',
      'Lavender',
      'Chamomile',
      'Coconut'
    ],
    productType: 'Premium Loose-Leaf Botanical Tea',
    origin: 'Inspired by the tranquil beauty of African evenings.',
    image: 'assets/img/products/mara-moon.jpg',
    imageSource: 'Products/Mara 2.jpg',
    imageWidth: 1200,
    imageHeight: 1607,
    featured: true,
    added: 2
  },
  {
    slug: 'desert-gold',
    name: 'Desert Gold',
    subtitle: 'Malawian White Tea | Luxury Botanical Fusion',
    category: 'tea',
    size: '50 g Loose Leaf',
    label: 'Malawi Reserve',
    eyebrow: 'Malawian White Tea',
    description:
      'From the lush highlands of Malawi comes exquisite Silver Tip white tea, celebrated for its silky elegance and delicate character. Maison Asili reimagines this rare botanical through a refined fusion of fragrant orange blossoms, golden calendula and lemongrass, creating a harmonious blend of floral softness, subtle citrus brightness and graceful depth.',
    story: {
      heading: 'A Golden Treasure from the Heart of Africa',
      paragraphs: [
        'From the lush highlands of Malawi comes one of Africa’s most delicate tea treasures — exquisite Silver Tip white tea, celebrated for its silky elegance and refined, gentle character.',
        'At Maison Asili, this rare botanical is reimagined through our signature Afro-Gourmet Fusion. Fragrant orange blossoms, golden calendula and a delicate touch of lemongrass create a harmonious composition of floral softness, subtle citrus brightness and graceful depth.',
        'Its luminous golden infusion transforms every cup into a moment of quiet indulgence — a celebration of nature, craftsmanship and timeless elegance.',
        'More than a tea. A golden expression of origin, identity and heritage.'
      ],
      closing: 'Rooted in Africa. Born in Berlin. For the World.',
      sizeNote: '50 g | Premium Loose-Leaf White Tea Blend'
    },
    ingredients: ['Malawian Silver Tip White Tea', 'Orange Blossoms', 'Calendula', 'Lemongrass'],
    productType: 'Premium Loose-Leaf White Tea Blend',
    origin: 'From the lush highlands of Malawi.',
    image: 'assets/img/products/desert-gold.jpg',
    imageSource: 'Products/Desert 2.jpg',
    imageWidth: 1200,
    imageHeight: 1607,
    featured: true,
    added: 1
  }
];
