/**
 * Extracts the catalogue that already exists inside the supplied Shop page
 * markup (src/pages/shop.html) so product data can be curated in one file.
 * Output: scripts/.shop-products.json (working data for src/data/products.js)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'src', 'pages', 'shop.html'), 'utf8');

const strip = (s) =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&euro;/g, '€')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const articles = html.match(/<article[\s\S]*?<\/article>/g) || [];
const products = articles.map((a) => {
  const pick = (re) => {
    const m = a.match(re);
    return m ? strip(m[1]) : '';
  };
  return {
    name: pick(/data-name="([^"]+)"/),
    category: pick(/data-category="([^"]+)"/),
    price: parseFloat(pick(/data-price="([^"]+)"/)),
    image: (a.match(/src="(https:\/\/lh3[^"]+)"/) || [])[1] || '',
    eyebrow: pick(/class="text-\[10px\] uppercase font-semibold tracking-widest text-tertiary block mb-1">([\s\S]*?)<\/span>/),
    description: pick(/class="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">([\s\S]*?)<\/p>/),
    size: pick(/absolute top-3 right-3[^>]*>([\s\S]*?)<\/div>/),
    label: pick(/absolute top-3 left-3[^>]*>([\s\S]*?)<\/div>/),
    priceLabel: pick(/class="text-sm font-bold text-on-surface">([\s\S]*?)<\/span>/)
  };
});

console.log(JSON.stringify(products, null, 2));
console.error(`\n${products.length} products parsed`);
fs.writeFileSync(path.join(__dirname, '.shop-products.json'), JSON.stringify(products, null, 2));
