/**
 * Generates the first draft of src/data/products.js from the catalogue
 * extracted out of the supplied Shop page markup. Re-runnable until the
 * catalogue file is curated by hand (it will not overwrite an existing file
 * unless --force is passed).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '.shop-products.json'), 'utf8'));
const imgMap = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'image-map.json'), 'utf8'));

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

const rows = raw.map((p, i) => ({
  slug: slugify(p.name),
  name: p.name,
  category: p.category,
  price: p.price,
  size: p.size,
  label: p.label,
  eyebrow: p.eyebrow,
  description: p.description,
  image: imgMap[p.image] || p.image,
  featured: p.label === 'Bestseller',
  added: raw.length - i, // later index = newer (for the "Newest" sort)
  ingredients: '',
  uses: '',
  details: []
}));

const out =
  `/**\n` +
  ` * Maison Asili — demonstration catalogue.\n` +
  ` * Single source of truth for every product shown in the store.\n` +
  ` * Prices are placeholders in EUR until the client provides the real range.\n` +
  ` * Product pages, grids, search and the cart are all generated from this file.\n` +
  ` */\n\n` +
  `module.exports = ` +
  JSON.stringify(rows, null, 2) +
  ';\n';

const target = path.join(ROOT, 'src', 'data', 'products.js');
if (fs.existsSync(target) && !process.argv.includes('--force')) {
  console.log('src/data/products.js already exists — not overwriting (pass --force).');
} else {
  fs.writeFileSync(target, out);
  console.log(`draft written: src/data/products.js (${rows.length} products)`);
}
