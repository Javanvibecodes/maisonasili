/* One-off: adds demonstration size variants to the cold-pressed oil products
   so the product page renders a working size selector. */
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'src', 'data', 'products.js');
const products = require(file);

const VARIANTS = {
  'cold-pressed-marula-and-sesame-finishing-oil': {
    base: 42,
    sizes: [
      { label: '100ml', price: 22 },
      { label: '250ml', price: 42 },
      { label: '500ml', price: 74 }
    ]
  },
  'first-press-toasted-argan-finishing-oil': {
    base: 46,
    sizes: [
      { label: '100ml', price: 24 },
      { label: '200ml', price: 46 },
      { label: '500ml', price: 92 }
    ]
  },
  'kalahari-melon-seed-cold-pressed-oil': {
    base: 36,
    sizes: [
      { label: '100ml', price: 19 },
      { label: '250ml', price: 36 },
      { label: '500ml', price: 64 }
    ]
  }
};

const next = products.map((p) => {
  const v = VARIANTS[p.slug];
  if (!v) return p;
  return { ...p, variants: v.sizes };
});

const header = `/**
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

module.exports = `;
fs.writeFileSync(file, header + JSON.stringify(next, null, 2) + ';\n');
console.log(
  'variants added:',
  next.filter((p) => p.variants).map((p) => p.slug).join(', ')
);
