/* One-off: swaps static markup in src/pages/shop.html + home.html for build tokens. */
const fs = require('fs');
const path = require('path');
const P = (f) => path.join(__dirname, '..', 'src', 'pages', f);

/* ------------------------------------------------------------------ shop */
let shop = fs.readFileSync(P('shop.html'), 'utf8');

// 1. category pills -> token
const pillsStart = shop.indexOf('<div class="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none"');
const pillsEnd = shop.indexOf('</div>', shop.indexOf('data-category="oils"')) + '</div>'.length;
if (pillsStart === -1 || pillsEnd < pillsStart) throw new Error('pills block not found');
shop = shop.slice(0, pillsStart) + '{{FILTER_PILLS}}' + shop.slice(pillsEnd);

// 2. live counter + price ceiling -> tokens
shop = shop.replace(/(<span class="text-on-surface font-bold" id="productCounter">)\d+(<\/span>)/, '$1{{PRODUCT_COUNT}}$2');
shop = shop.replace(/id="priceDisplay">&euro;\d+|id="priceDisplay">€\d+/, 'id="priceDisplay">&euro;{{MAX_PRICE}}');
shop = shop.replace(
  /id="priceRange" max="\d+" min="\d+" step="1" type="range" value="\d+"/,
  'id="priceRange" max="{{MAX_PRICE}}" min="10" step="1" type="range" value="{{MAX_PRICE}}"'
);

// 3. add the Newest sort option
shop = shop.replace(
  '<option value="featured">Featured</option>\n                                <option value="price-asc">',
  '<option value="featured">Featured</option>\n                                <option value="newest">Newest</option>\n                                <option value="price-asc">'
);

// 4. static product grid -> token (grid div spans ~900 lines)
const gridOpen = shop.indexOf('id="productGrid"');
const gridStart = shop.indexOf('>', gridOpen) + 1;
const gridEnd = shop.indexOf('</div>', shop.indexOf('</article>', shop.lastIndexOf('<article'))) + '</div>'.length;
if (gridStart === 0 || gridEnd < gridStart) throw new Error('grid block not found');
shop = shop.slice(0, gridStart) + '\n                    {{PRODUCT_GRID}}\n                ' + shop.slice(gridEnd);

fs.writeFileSync(P('shop.html'), shop, 'utf8');
console.log('shop.html tokenised — pills:', shop.includes('{{FILTER_PILLS}}'), 'grid:', shop.includes('{{PRODUCT_GRID}}'), 'count:', shop.includes('{{PRODUCT_COUNT}}'), 'price:', shop.includes('{{MAX_PRICE}}'), 'newest:', shop.includes('value="newest"'), 'articles left:', (shop.match(/<article/g) || []).length);

/* ------------------------------------------------------------------ home */
let home = fs.readFileSync(P('home.html'), 'utf8');

// 1. hero secondary CTA -> "Discover Our Heritage"
home = home.replace(/(<a[^>]*data-path="our-heritage"[^>]*>\s*)(?:Our\s+)?(Heritage|Story|Discover[^<]*)/i, '$1Discover Our Heritage');

// 2. featured product cards -> token grid (keep the section head, swap the grid)
const fGridOpen = home.indexOf('<!-- 4 Curated Product Cards -->');
const fGridStart = home.indexOf('<div', fGridOpen);
// find matching close by scanning nested divs
let depth = 0;
let i = home.indexOf('<div', fGridStart);
let closeIdx = -1;
const re = /<div\b|<\/div>/g;
re.lastIndex = i;
let m;
while ((m = re.exec(home))) {
  if (m[0] === '<div') depth++;
  else {
    depth--;
    if (depth === 0) {
      closeIdx = re.lastIndex;
      break;
    }
  }
}
if (closeIdx === -1) throw new Error('featured grid close not found');
home =
  home.slice(0, fGridStart) +
  '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">\n                    {{FEATURED_GRID}}\n                ' +
  home.slice(closeIdx);

fs.writeFileSync(P('home.html'), home, 'utf8');
console.log('home.html tokenised — featured:', home.includes('{{FEATURED_GRID}}'), 'cta:', /Discover Our Heritage/.test(home));
