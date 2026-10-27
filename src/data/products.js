/**
 * Maison Asili — demonstration catalogue (single source of truth).
 *
 * Drives the product pages, collection grids, search, quick-add and cart.
 * Prices are placeholder values in EUR until the real range is supplied.
 * Copy marked "demo composition" is illustrative only.
 * Products with a "variants" array render a working size selector on the PDP.
 *
 * Fields:
 *   slug / name / category / price / size / label / eyebrow / description
 *   image        local asset path for the packshot
 *   featured     shown in "Selected for Your Table" on the home page
 *   added        ordering key for the "Newest" sort
 *   ingredients  composition (demo content)
 *   uses         culinary applications (demo content)
 *   variants     optional [{ label, price }] size options (demo content)
 */

module.exports = [
  {
    "slug": "kilimanjaro-peaberry-signature-roast",
    "name": "Kilimanjaro Peaberry Signature Roast",
    "category": "coffee",
    "price": 26,
    "size": "250g Whole Bean",
    "label": "Bestseller",
    "eyebrow": "Estate Coffee • Tanzania",
    "description": "Volcanic soil profile with bright blackcurrant acidity, dark cocoa finish, and jasmine blossom florals.",
    "image": "assets/img/img-a9d043c5f0.jpg",
    "featured": true,
    "added": 18,
    "ingredients": "100% arabica whole-bean coffee (demo composition).",
    "uses": "Ground to order for filter, pour-over or espresso. Rest the roasted beans three to five days before brewing.",
    "details": []
  },
  {
    "slug": "kinkeliba-and-wild-mint-herbal-infusion",
    "name": "Kinkeliba & Wild Mint Herbal Infusion",
    "category": "tea",
    "price": 22,
    "size": "80g Loose Leaf",
    "label": "Harvest 2024",
    "eyebrow": "Reserve Tea • Senegal",
    "description": "Venerated West African health tonic brewed for clarity, smooth woody warmth, and crisp spearmint undertones.",
    "image": "assets/img/img-f33403a878.jpg",
    "featured": false,
    "added": 17,
    "ingredients": "Dried kinkeliba leaf and wild mint (demo composition).",
    "uses": "Infuse a generous spoon per cup in water just off the boil for four to six minutes. Serve hot or chilled over ice.",
    "details": []
  },
  {
    "slug": "dukkah-heritage-spice-blend",
    "name": "Dukkah Heritage Spice Blend",
    "category": "spices",
    "price": 18,
    "size": "120g Tin",
    "label": "Bestseller",
    "eyebrow": "Artisan Spices • Egypt",
    "description": "Stone-crushed roasted hazelnuts, golden sesame, whole cumin seeds, and citrusy toasted coriander.",
    "image": "assets/img/img-73b0b3068a.jpg",
    "featured": true,
    "added": 16,
    "ingredients": "Roasted hazelnuts, golden sesame, cumin and coriander (demo composition).",
    "uses": "Serve with olive oil and flatbread for dipping, or use as a finishing crust for roasted vegetables, eggs and grilled fish.",
    "details": []
  },
  {
    "slug": "cold-pressed-marula-and-sesame-finishing-oil",
    "name": "Cold-Pressed Marula & Sesame Finishing Oil",
    "category": "oils",
    "price": 42,
    "size": "250ml Glass",
    "label": "Single Origin",
    "eyebrow": "Finishing Oils • Namibia",
    "description": "First cold-extraction wild marula kernel paired with toasted sesame for velvety nuttiness and complex depth.",
    "image": "assets/img/img-6967f272c4.jpg",
    "featured": false,
    "added": 15,
    "ingredients": "Cold-pressed marula kernel oil, cold-pressed sesame oil (demo composition).",
    "uses": "Used raw: over crudo, charred vegetables, warm grains or vanilla ice cream. Do not heat.",
    "details": [],
    "variants": [
      {
        "label": "100ml",
        "price": 22
      },
      {
        "label": "250ml",
        "price": 42
      },
      {
        "label": "500ml",
        "price": 74
      }
    ]
  },
  {
    "slug": "sun-dried-hibiscus-and-baobab-pods",
    "name": "Sun-Dried Hibiscus & Baobab Pods",
    "category": "botanicals",
    "price": 19,
    "size": "150g Pouch",
    "label": "Harvest 2024",
    "eyebrow": "Wild Botanicals • Sudan",
    "description": "Tart, ruby-red calyces blended with wild baobab fruit pulp for invigorating tonics, cordials, and reduction sauces.",
    "image": "assets/img/img-cd3d08d0f3.jpg",
    "featured": false,
    "added": 14,
    "ingredients": "Sun-dried hibiscus calyces and baobab fruit pulp (demo composition).",
    "uses": "Steep for bright drinks and iced tea, reduce into syrups and cordials, or fold into sauces and glazes.",
    "details": []
  },
  {
    "slug": "smoked-black-cardamom-and-grains-of-paradise",
    "name": "Smoked Black Cardamom & Grains of Paradise",
    "category": "spices",
    "price": 24,
    "size": "90g Jar",
    "label": "Single Origin",
    "eyebrow": "Rare Spices • Ghana",
    "description": "Wood-smoked cardamom pods layered with the pungent, citrus-peppery snap of wild Guinean pepper.",
    "image": "assets/img/img-e1b0f8f36c.jpg",
    "featured": false,
    "added": 13,
    "ingredients": "Smoked black cardamom pods, grains of paradise (demo composition).",
    "uses": "Crush to order for braises, rice, roasts and chocolate. Toast briefly in dry pan before grinding.",
    "details": []
  },
  {
    "slug": "yirgacheffe-washed-heirloom-arabica",
    "name": "Yirgacheffe Washed Heirloom Arabica",
    "category": "coffee",
    "price": 29,
    "size": "250g Whole Bean",
    "label": "Bestseller",
    "eyebrow": "Estate Coffee • Ethiopia",
    "description": "High-altitude heirloom cultivars expressing refined bergamot tea notes, lemongrass, and sweet peach blossom.",
    "image": "assets/img/img-99b8b6f410.jpg",
    "featured": true,
    "added": 12,
    "ingredients": "100% arabica whole-bean coffee (demo composition).",
    "uses": "Best as filter or pour-over, where the lighter structure and aromatics stay intact. Allow to rest before brewing.",
    "details": []
  },
  {
    "slug": "mount-kenya-silver-needle-white-tea",
    "name": "Mount Kenya Silver Needle White Tea",
    "category": "tea",
    "price": 27,
    "size": "50g Leaf Reserve",
    "label": "Single Origin",
    "eyebrow": "Reserve Tea • Kenya",
    "description": "Early spring plucking composed solely of unopened downy leaf buds. Notes of melon rind and dry wildflower honey.",
    "image": "assets/img/img-f0733fcbdd.jpg",
    "featured": false,
    "added": 11,
    "ingredients": "Whole white tea buds (demo composition).",
    "uses": "Infuse gently at around 80°C, two to three minutes, and repeat across several steepings.",
    "details": []
  },
  {
    "slug": "zanzibar-bourbon-vanilla-pods",
    "name": "Zanzibar Bourbon Vanilla Pods",
    "category": "spices",
    "price": 38,
    "size": "5 Whole Pods",
    "label": "Harvest 2024",
    "eyebrow": "Fine Spice • Zanzibar",
    "description": "Aromatic vanilla beans exhibiting intense moisture content, dark cherry nuances, and warm wood notes.",
    "image": "assets/img/img-8dfbec0e4c.jpg",
    "featured": false,
    "added": 10,
    "ingredients": "Whole cured vanilla pods (demo composition).",
    "uses": "Split and scrape for custards, creams and doughs; steep whole pods in milk, syrups or spirits.",
    "details": []
  },
  {
    "slug": "first-press-toasted-argan-finishing-oil",
    "name": "First Press Toasted Argan Finishing Oil",
    "category": "oils",
    "price": 46,
    "size": "200ml Glass",
    "label": "Bestseller",
    "eyebrow": "Cold-Pressed Oils • Morocco",
    "description": "Traditional slow-roasted argan kernels yielding an unctuous golden oil with intense hazelnut and brioche aromas.",
    "image": "assets/img/img-c36dea6e8a.jpg",
    "featured": true,
    "added": 9,
    "ingredients": "Cold-pressed argan oil from toasted kernels (demo composition).",
    "uses": "Finish salads, soups, couscous and bread with it. Keep raw and pour just before serving.",
    "details": [],
    "variants": [
      {
        "label": "100ml",
        "price": 24
      },
      {
        "label": "200ml",
        "price": 46
      },
      {
        "label": "500ml",
        "price": 92
      }
    ]
  },
  {
    "slug": "cederberg-mountain-wild-rooibos",
    "name": "Cederberg Mountain Wild Rooibos",
    "category": "tea",
    "price": 21,
    "size": "100g Loose Leaf",
    "label": "Single Origin",
    "eyebrow": "Reserve Tea • South Africa",
    "description": "Harvested from uncultivated wild bushes in the high Cederberg range. Naturally caffeine-free with caramel and tobacco notes.",
    "image": "assets/img/img-4845ee99e3.jpg",
    "featured": false,
    "added": 8,
    "ingredients": "Whole rooibos leaf (demo composition).",
    "uses": "Infuse five to seven minutes in boiling water. Takes milk well and works as a base for iced tea.",
    "details": []
  },
  {
    "slug": "grand-cru-berbere-spice-blend",
    "name": "Grand Cru Berbere Spice Blend",
    "category": "spices",
    "price": 17,
    "size": "100g Tin",
    "label": "Bestseller",
    "eyebrow": "Artisan Spices • Ethiopia",
    "description": "Twelve-spice composition featuring sun-ripened chillies, korarima cardamom, fenugreek, and holy basil.",
    "image": "assets/img/img-02ca7c8131.jpg",
    "featured": true,
    "added": 7,
    "ingredients": "Sun-ripened chillies, korarima cardamom, fenugreek, holy basil and warming spices (demo composition).",
    "uses": "Bloom in fat at the start of cooking for stews, lentils and braises, or use as a rub for roasts.",
    "details": []
  },
  {
    "slug": "shade-dried-moringa-leaf-powder",
    "name": "Shade-Dried Moringa Leaf Powder",
    "category": "botanicals",
    "price": 23,
    "size": "100g Glass Jar",
    "label": "Harvest 2024",
    "eyebrow": "Wild Botanicals • Ghana",
    "description": "Gently shade-dried to protect heat-sensitive vitamins and enzymes. Grassy, matcha-like freshness for smoothies and dressings.",
    "image": "assets/img/img-8f4e7d2cdc.jpg",
    "featured": false,
    "added": 6,
    "ingredients": "Shade-dried moringa leaf powder (demo composition).",
    "uses": "Whisk into smoothies, dressings and doughs. Use sparingly and add late to keep its fresh character.",
    "details": []
  },
  {
    "slug": "nyamasheke-honey-process-arabica",
    "name": "Nyamasheke Honey Process Arabica",
    "category": "coffee",
    "price": 28,
    "size": "250g Whole Bean",
    "label": "Single Origin",
    "eyebrow": "Estate Coffee • Rwanda",
    "description": "Lake Kivu regional profile offering layered brown sugar sweetness, red currant acidity, and black tea body.",
    "image": "assets/img/img-5040f672ab.jpg",
    "featured": false,
    "added": 5,
    "ingredients": "100% arabica whole-bean coffee (demo composition).",
    "uses": "A structured cup for filter brewing, and equally at home as a sweet, dense espresso.",
    "details": []
  },
  {
    "slug": "kalahari-melon-seed-cold-pressed-oil",
    "name": "Kalahari Melon Seed Cold-Pressed Oil",
    "category": "oils",
    "price": 36,
    "size": "250ml Glass",
    "label": "Single Origin",
    "eyebrow": "Finishing Oils • Botswana",
    "description": "Extraordinarily light culinary oil with a crisp cucumber-rind bouquet and high linoleic acid concentration.",
    "image": "assets/img/img-48d320f3b0.jpg",
    "featured": false,
    "added": 4,
    "ingredients": "Cold-pressed melon seed oil (demo composition).",
    "uses": "A light finishing oil for salads, raw fish, cucumber and cold soups. Best used raw.",
    "details": [],
    "variants": [
      {
        "label": "100ml",
        "price": 19
      },
      {
        "label": "250ml",
        "price": 36
      },
      {
        "label": "500ml",
        "price": 64
      }
    ]
  },
  {
    "slug": "virunga-national-park-espresso-roast",
    "name": "Virunga National Park Espresso Roast",
    "category": "coffee",
    "price": 25,
    "size": "250g Whole Bean",
    "label": "Harvest 2024",
    "eyebrow": "Estate Coffee • DR Congo",
    "description": "Cultivated along the Virunga volcanic ridge. Dense body featuring roasted hazelnut, dried fig, and dark treacle notes.",
    "image": "assets/img/img-4320210dfc.jpg",
    "featured": false,
    "added": 3,
    "ingredients": "100% arabica whole-bean coffee (demo composition).",
    "uses": "Dialled for espresso and moka; also excellent with milk in the morning.",
    "details": []
  },
  {
    "slug": "madagascar-wild-voatsiperifery-pepper",
    "name": "Madagascar Wild Voatsiperifery Pepper",
    "category": "spices",
    "price": 27,
    "size": "75g Jar",
    "label": "Single Origin",
    "eyebrow": "Artisan Spices • Madagascar",
    "description": "Rare canopy-gathered wild pepper. Unmistakable fragrant pine, damp forest soil, and subtle citrus sweetness.",
    "image": "assets/img/img-4a834eac6c.jpg",
    "featured": false,
    "added": 2,
    "ingredients": "Whole wild voatsiperifery pepper (demo composition).",
    "uses": "Crush over grilled meat, seafood, fruit and chocolate. Add late to keep its aromatic lift.",
    "details": []
  },
  {
    "slug": "honeybush-and-wild-cape-botanical-flowers",
    "name": "Honeybush & Wild Cape Botanical Flowers",
    "category": "botanicals",
    "price": 31,
    "size": "90g Botanical Jar",
    "label": "Harvest 2024",
    "eyebrow": "Wild Botanicals • South Africa",
    "description": "Fragrant yellow fynbos blossoms blended for vermouth macerations, tea ceremony cordials, and delicate pastry infusions.",
    "image": "assets/img/img-6a537a73fb.jpg",
    "featured": false,
    "added": 1,
    "ingredients": "Dried honeybush and Cape floral botanicals (demo composition).",
    "uses": "Infuse for tea, macerate for cordials and vermouth-style drinks, or dry into pastry creams.",
    "details": []
  }
];
