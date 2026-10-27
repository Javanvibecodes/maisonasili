/**
 * Maison Asili — static site build.
 *
 *   node scripts/build.js
 *
 * Assembles every route of the storefront into public/ from:
 *   • src/partials/*     layout, header, footer, overlays, scripts
 *   • src/pages/*        page bodies (extracted from the supplied prototype + new pages)
 *   • src/templates/*    collection + legal templates
 *   • src/data/*         product catalogue, collections, media map
 *
 * No backend, no API, no environment variables — output is plain HTML/CSS/JS.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const products = require(path.join(ROOT, 'src', 'data', 'products.js'));
const collections = require(path.join(ROOT, 'src', 'data', 'collections.js'));
const media = require(path.join(ROOT, 'src', 'data', 'media.json'));
const imageMap = require(path.join(ROOT, 'src', 'data', 'image-map.json'));

const warnings = [];

/* ------------------------------------------------------------------ routes */

const ROUTES = {
  home: 'index.html',
  'shop-all': 'shop/index.html',
  collections: 'shop/index.html',
  coffee: 'collections/coffee/index.html',
  'coffee-reserve': 'collections/coffee/index.html',
  tea: 'collections/tea/index.html',
  'botanical-tea': 'collections/tea/index.html',
  spices: 'collections/spices/index.html',
  'spices-and-seasonings': 'collections/spices/index.html',
  botanicals: 'collections/botanicals/index.html',
  'botanicals-and-elixirs': 'collections/botanicals/index.html',
  oils: 'collections/oils/index.html',
  'cold-pressed-oils': 'collections/oils/index.html',
  'our-heritage': 'heritage/index.html',
  '23-year-legacy': 'heritage/index.html#chapter-1',
  'feinkost-philosophy': 'heritage/index.html#chapter-4',
  sustainability: 'heritage/index.html#chapter-5',
  'wholesale-and-hospitality': 'wholesale/index.html',
  'michelin-partners': 'wholesale/index.html#partners',
  'private-reserve': 'wholesale/index.html#private-reserve',
  'tasting-events': 'wholesale/index.html#tastings',
  contact: 'contact/index.html',
  cart: 'cart/index.html',
  checkout: 'cart/index.html#checkout',
  account: 'contact/index.html',
  'client-service': 'contact/index.html',
  'privacy-policy': 'privacy/index.html',
  terms: 'terms/index.html',
  'terms-of-service': 'terms/index.html',
  'shipping-and-returns': 'shipping/index.html',
  impressum: 'impressum/index.html',
  'sourcing-ethics': 'heritage/index.html#chapter-5',
  'berlin-atelier': 'heritage/index.html#chapter-2',
  'nairobi-estate': 'heritage/index.html#chapter-5',
  press: 'heritage/index.html#chapter-3',
  'private-client-sommelier': 'wholesale/index.html#sommelier',
  'corporate-curations': 'wholesale/index.html#curations',
  'culinary-partners': 'wholesale/index.html#partners'
};

/* --------------------------------------------------------------- utilities */

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

function write(relOut, content) {
  const file = path.join(PUBLIC, relOut);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}

const baseFor = (outRel) => '../'.repeat(outRel.split('/').filter(Boolean).length - 1);

function subst(label, tpl, tokens) {
  return tpl.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, key) => {
    if (Object.prototype.hasOwnProperty.call(tokens, key)) return tokens[key];
    warnings.push(`${label}: unknown token {{${key}}}`);
    return m;
  });
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const money = (n) => '€' + Number(n).toFixed(2);

/** Rewrites links, images and page-level surfaces for a page body. */
function transform(label, html, base) {
  // remote imagery -> locally stored assets
  html = html.replace(/src="(https:\/\/lh3[^"]+)"/g, (m, url) => {
    const local = imageMap[url];
    if (!local) {
      warnings.push(`${label}: image missing from map — ${url.slice(0, 60)}`);
      return `src="${base}assets/img/placeholder.svg"`;
    }
    return `src="${base}${local}"`;
  });

  // accessibility: real alt text + deferred decoding
  html = html.replace(/<img\b([^>]*)>/g, (m, attrs) => {
    let a = attrs;
    if (!/\salt="/.test(a)) {
      const dm = a.match(/\sdata-alt="([^"]*)"/);
      a = a.replace(/\sdata-alt="[^"]*"/, '');
      a += ` alt="${dm ? dm[1] : ''}"`;
    }
    if (!/loading=/.test(a)) a += ' loading="lazy" decoding="async"';
    return `<img${a}>`;
  });

  // data-path navigation -> real routes
  html = html.replace(/<a\b[^>]*>/g, (tag) => {
    const m = tag.match(/data-path="([^"]+)"/);
    if (!m) return tag;
    const route = ROUTES[m[1]];
    if (!route) warnings.push(`${label}: unmapped data-path "${m[1]}"`);
    const href = route || 'index.html';
    let t = tag.replace(/\shref="[^"]*"/, ` href="${base}${href}"`);
    if (!/\shref=/.test(t)) t = t.replace(/^<a\b/, `<a href="${base}${href}"`);
    return t.replace(/\s*data-path="[^"]*"/, '');
  });

  // page surface: warm ivory background
  html = html.replace(/<main\b([^>]*)>/g, (m, attrs) => {
    let a = attrs.replace(/\sbg-white\b/, ' bg-background').replace(/\sbg-surface-container-lowest\b/, ' bg-background');
    return `<main${a}>`;
  });
  html = html.replace(/\bbg-\[#F7F3EB\]/g, 'bg-surface-container-lowest');

  return html;
}

/* ------------------------------------------------------------- renderers */

const collectionBySlug = Object.fromEntries(collections.map((c) => [c.slug, c]));

const CATEGORY_STORAGE = {
  coffee: 'Store the sealed pouch in a cool, dark place. Best enjoyed within four weeks of opening for peak aroma.',
  tea: 'Keep sealed in a cool, dry cupboard, away from strong aromas and moisture.',
  spices: 'Reseal tightly after use and store in a cool, dark cupboard. Grind or crush to order.',
  botanicals: 'Store dry and sealed, away from direct light and humidity.',
  oils: 'Store upright with the cap closed, away from light and heat. Best used within a few weeks of opening.'
};

const CATEGORY_STORAGE_ICON = {
  coffee: 'coffee',
  tea: 'emoji_food_beverage',
  spices: 'grain',
  botanicals: 'spa',
  oils: 'water_drop'
};

/** Ambience imagery for a product gallery (product shot first). */
function galleryFor(p) {
  const c = collectionBySlug[p.category];
  const ambience = [];
  if (p.category === 'oils') {
    ambience.push(media.pdpPress, media.pdpSeeds, media.pdpCloseup);
  } else {
    ambience.push(media.pdpSeeds, media.pdpPress);
  }
  if (c) ambience.push(media[c.media]);
  ambience.push(media.hero);
  return [p.image, ...ambience].filter((v, i, arr) => v && arr.indexOf(v) === i).slice(0, 4);
}

/** Product card used by the shop grid, collection grids, search and home. */
function productCard(p, base, opts = {}) {
  const href = `${base}products/${p.slug}/index.html`;
  const label = p.label
    ? `<div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-charcoal shadow-sm">${esc(p.label)}</div>`
    : '';
  const size = p.size
    ? `<div class="absolute top-3 right-3 text-[9px] uppercase tracking-wider text-charcoal/70 bg-white/80 backdrop-blur-sm px-2 py-0.5">${esc(p.size)}</div>`
    : '';
  const eyebrow = p.eyebrow
    ? `<span class="text-[10px] uppercase font-semibold tracking-[0.24em] text-tertiary block mb-1.5">${esc(p.eyebrow)}</span>`
    : `<span class="text-[10px] uppercase font-semibold tracking-[0.24em] text-tertiary block mb-1.5">${esc(p.category)}</span>`;

  const isCarousel = opts.carousel === true;
  const widthClasses = isCarousel ? 'w-[240px] sm:w-[280px] md:w-[320px] shrink-0 snap-start' : '';

  return `<article class="product-item group flex flex-col bg-[#F9F7F2] overflow-hidden transition-all duration-300 ${widthClasses}"
            data-added="${p.added}" data-category="${p.category}" data-name="${esc(p.name)}" data-price="${p.price}"
            data-slug="${p.slug}">
            <div class="relative w-full aspect-[4/5] overflow-hidden bg-[#ECE8DF]">
                <a class="block w-full h-full" href="${href}" tabindex="-1" aria-hidden="true">
                    <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        src="${base}${p.image}" alt="${esc(p.name)} — Maison Asili ${p.category}">
                </a>
                ${label}
                ${size}
            </div>
            <div class="p-5 flex flex-col flex-1 justify-between gap-3">
                <div>
                    ${eyebrow}
                    <h3 class="text-sm font-sans font-medium text-charcoal leading-snug group-hover:text-tertiary transition-colors">
                        <a href="${href}">${esc(p.name)}</a>
                    </h3>
                    <div class="mt-1 text-sm font-normal text-charcoal/80">${money(p.price)}</div>
                </div>
                <div class="pt-2 flex items-center justify-between border-t border-outline-variant/30">
                    <button class="add-to-bag-btn px-4 py-2 bg-charcoal text-white hover:bg-brand-gold hover:text-charcoal text-[10px] uppercase tracking-[0.18em] font-medium transition-colors w-full text-center"
                        data-add-to-cart="${p.slug}" type="button">
                        Add to Bag
                    </button>
                </div>
            </div>
        </article>`;
}

function carouselProducts(list, base) {
  return list.map((p) => productCard(p, base, { carousel: true })).join('\n');
}

function productGrid(list, base) {
  return list.map((p) => productCard(p, base)).join('\n');
}

function filterPills(list, base, active) {
  const counts = { all: list.length };
  list.forEach((p) => (counts[p.category] = (counts[p.category] || 0) + 1));
  const make = (key, text) => {
    const isActive = (active || 'all') === key;
    const count = counts[key] || 0;
    return `<button class="category-pill px-4 py-2 text-xs ${isActive ? 'font-semibold' : 'font-medium'} uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${isActive ? 'bg-on-surface text-surface-container-lowest' : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}"
                            data-category="${key}" type="button">
                            ${text} <span class="ml-1 opacity-70">(${count})</span>
                        </button>`;
  };
  const pills = [make('all', 'All')];
  collections.forEach((c) => pills.push(make(c.slug, c.navName)));
  return pills.join('\n                        ');
}

const maxPrice = products.reduce((m, p) => Math.max(m, p.price), 0);

/** Category switcher used on collection pages (real links, not filters). */
function collectionPills(activeSlug) {
  const items = collections.map((c) => {
    const active = c.slug === activeSlug;
    return `<a class="category-pill px-4 py-2 text-xs ${active ? 'font-semibold' : 'font-medium'} uppercase tracking-wider whitespace-nowrap transition-colors ${active ? 'bg-on-surface text-surface-container-lowest' : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}"
                        href="{{BASE}}collections/${c.slug}/index.html">${esc(c.navName)}</a>`;
  });
  items.unshift(
    `<a class="category-pill px-4 py-2 text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-colors bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                        href="{{BASE}}shop/index.html">All</a>`
  );
  return items.join('\n                    ');
}

/* ------------------------------------------------------- PDP fragments */

function sizeSection(p, base) {
  if (!p.variants || p.variants.length < 2) {
    return `<div class="flex flex-col gap-3 mb-8">
                            <div class="flex items-center justify-between text-xs font-label uppercase tracking-widest">
                                <span class="font-semibold text-on-surface">Format</span>
                                <span class="text-on-surface-variant text-[11px]">${esc(p.size)}</span>
                            </div>
                            <div class="p-3.5 bg-surface-container-low border border-outline-variant flex items-center justify-between">
                                <span class="text-sm font-headline font-semibold text-on-surface">${esc(p.size)}</span>
                                <span class="text-[11px] font-label uppercase tracking-widest text-tertiary">Single format</span>
                            </div>
                        </div>`;
  }
  const cols = p.variants.length === 3 ? 'grid-cols-3' : 'grid-cols-2';
  const btns = p.variants
    .map((v, i) => {
      const selected = i === 0;
      return `<button class="size-btn p-3 ${selected ? 'bg-surface-container-lowest shadow-sm ring-2 ring-on-surface' : 'bg-surface-container-lowest shadow-sm hover:bg-surface-container'} flex flex-col items-center justify-center gap-1 text-center transition-all focus:outline-none"
                                    data-price="${v.price}" data-size="${esc(v.label)}" type="button">
                                    <span class="text-xs font-headline ${selected ? 'font-bold' : 'font-semibold'} text-on-surface">${esc(v.label)}</span>
                                    <span class="text-[11px] font-label ${selected ? 'text-on-surface font-semibold' : 'text-on-surface-variant'}">${money(v.price)}</span>
                                </button>`;
    })
    .join('\n                                ');
  return `<div class="flex flex-col gap-3 mb-8">
                            <div class="flex items-center justify-between text-xs font-label uppercase tracking-widest">
                                <span class="font-semibold text-on-surface">Select Size</span>
                                <span class="text-on-surface-variant text-[11px]">Demonstration variants</span>
                            </div>
                            <div class="${cols} gap-3">
                                ${btns}
                            </div>
                        </div>`;
}

function accordion(id, icon, title, body, open) {
  return `<div class="py-4 border-t border-outline-variant">
                                <button
                                    class="w-full flex items-center justify-between text-left text-xs font-label uppercase tracking-[0.2em] font-semibold text-on-surface hover:text-primary transition-colors"
                                    onclick="toggleAccordion('${id}')" type="button">
                                    <span class="flex items-center gap-2.5">
                                        <span class="material-symbols-outlined text-base text-tertiary">${icon}</span>
                                        ${title}
                                    </span>
                                    <span class="material-symbols-outlined text-lg transition-transform duration-300"
                                        id="icon-${id}">${open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</span>
                                </button>
                                <div class="${open ? 'mt-3' : 'hidden mt-3'} text-xs leading-relaxed text-on-surface-variant pr-4"
                                    id="content-${id}">
                                    ${body}
                                </div>
                            </div>`;
}

function craftBar(p) {
  const bars = {
    coffee: { icon: 'coffee', title: 'Roasted in Small Batches', sub: 'Rest three to five days before brewing' },
    tea: { icon: 'spa', title: 'Whole-Leaf Selection', sub: 'Infused slowly, served unhurried' },
    spices: { icon: 'grain', title: 'Crushed to Order', sub: 'Ground fresh for maximum aroma' },
    botanicals: { icon: 'eco', title: 'Dried Whole', sub: 'Shade-dried and sealed in Berlin' },
    oils: { icon: 'water_drop', title: 'Pressed Without Heat', sub: 'Bottled in small volumes in Berlin' }
  };
  const b = bars[p.category] || bars.spices;
  return `<div class="bg-surface-container-lowest p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-warm-sand flex items-center justify-center text-tertiary">
                                    <span class="material-symbols-outlined text-2xl">${b.icon}</span>
                                </div>
                                <div>
                                    <p class="text-[11px] font-label uppercase tracking-widest text-on-surface font-semibold">${b.title}</p>
                                    <p class="text-xs text-on-surface-variant mt-0.5">${b.sub}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-6 text-xs text-on-surface-variant font-label uppercase tracking-wider">
                                <div><span class="font-bold text-on-surface">Format:</span> ${esc(p.size)}</div>
                                <div><span class="font-bold text-on-surface">Series:</span> ${esc(collectionBySlug[p.category].name)}</div>
                            </div>
                        </div>`;
}

function relatedFor(p, base) {
  const same = products.filter((x) => x.category === p.category && x.slug !== p.slug);
  const others = products.filter((x) => x.category !== p.category && x.featured);
  const picks = [...same.slice(0, 3), ...others].slice(0, 3);
  return picks
    .map((r) => {
      const href = `${base}products/${r.slug}/index.html`;
      return `<div class="group bg-surface-container-lowest p-5 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md">
                        <div class="relative w-full aspect-square bg-surface-container overflow-hidden mb-5 flex items-center justify-center overflow-hidden">
                            <a class="block w-full h-full" href="${href}" tabindex="-1" aria-hidden="true">
                                <img class="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                                    src="${base}${r.image}" alt="${esc(r.name)}">
                            </a>
                            ${r.label ? `<div class="absolute top-3 left-3 bg-surface-container-lowest px-2.5 py-1 text-[9px] font-label uppercase tracking-widest font-semibold shadow-sm">${esc(r.label)}</div>` : ''}
                        </div>
                        <div class="flex flex-col">
                            <span class="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant">${esc(r.eyebrow)}</span>
                            <h4 class="text-base font-headline font-semibold text-on-surface mt-1 group-hover:text-primary transition-colors">
                                <a href="${href}">${esc(r.name)}</a>
                            </h4>
                            <p class="text-xs text-on-surface-variant mt-1.5 line-clamp-2 leading-relaxed">${esc(r.description)}</p>
                            <div class="flex items-center justify-between mt-5 pt-4">
                                <span class="text-base font-headline font-semibold text-on-surface">${money(r.price)}</span>
                                <button class="px-4 py-2 bg-on-surface text-surface-container-lowest text-[11px] font-label uppercase tracking-widest font-semibold hover:bg-primary transition-colors"
                                    data-add-to-cart="${r.slug}" type="button">Quick Add</button>
                            </div>
                        </div>
                    </div>`;
    })
    .join('\n');
}

function thumbsFor(gallery, base, name) {
  const labels = ['Product', 'Ingredients', 'Atelier', 'At the Table'];
  return gallery
    .map((src, i) => {
      const first = i === 0;
      return `<button aria-label="View image ${i + 1} of ${esc(name)}"
                                class="thumbnail-btn ${first ? 'ring-1 ring-on-surface' : 'opacity-70'} p-2 bg-surface-container-lowest transition-all hover:opacity-100 flex flex-col items-center gap-1.5 focus:outline-none"
                                data-gallery-src="${base}${src}" type="button">
                                <div class="w-full aspect-square overflow-hidden bg-surface-container flex items-center justify-center">
                                    <img class="w-full h-full object-cover" src="${base}${src}" alt="${esc(name)} — view ${i + 1}">
                                </div>
                                <span class="text-[9px] font-label uppercase tracking-widest ${first ? 'text-on-surface' : 'text-on-surface-variant'} truncate">${labels[i] || 'Detail'}</span>
                            </button>`;
    })
    .join('\n                            ');
}

/* --------------------------------------------------------- page assembly */

function buildPage({ out, title, desc, page, contentTpl, tokens = {}, pageScripts = [] }) {
  const base = baseFor(out);
  const layout = read('src/partials/layout.html');
  const header = subst(out, read('src/partials/header.html'), { BASE: base });
  const footer = subst(out, read('src/partials/footer.html'), { BASE: base });
  const overlays = subst(out, read('src/partials/overlays.html'), { BASE: base });
  const scriptsTpl = pageScripts
    .map((s) => `<script src="{{BASE}}assets/js/${s}"></script>`)
    .join('\n');
  const scripts = subst(out, read('src/partials/scripts.html'), {
    BASE: base,
    PAGE_SCRIPTS: subst(out, scriptsTpl, { BASE: base })
  });

  const content = transform(
    out,
    subst(out, subst(out, contentTpl, { BASE: base, ...tokens }), { BASE: base, ...tokens }),
    base
  );

  const html = subst(out, layout, {
    TITLE: esc(title),
    DESC: esc(desc),
    PAGE: page,
    BASE: base,
    HEADER: header,
    CONTENT: content,
    FOOTER: footer,
    OVERLAYS: overlays,
    SCRIPTS: scripts
  });

  write(out, html);
  return html;
}

const pageBody = (name) => read(`src/pages/${name}.html`);

/* ------------------------------------------------------------- static pages */

const PAGES = [
  {
    out: 'heritage/index.html',
    file: 'heritage',
    page: 'heritage',
    title: 'Our Heritage — 23 Years of Craft | Maison Asili',
    desc:
      'From a restored farmhouse in the Uckermark to Berlin markets and the transition from SoLuna Brot & Oel to Maison Asili.',
    scripts: []
  },
  {
    out: 'cart/index.html',
    file: 'cart',
    page: 'cart',
    title: 'Your Bag — Maison Asili',
    desc: 'Review your Maison Asili bag and run the demonstration checkout.',
    scripts: []
  },
  {
    out: 'contact/index.html',
    file: 'contact',
    page: 'contact',
    title: 'Contact — Maison Asili',
    desc: 'Get in touch with Maison Asili. Buyer enquiries: info@maisonasili.com',
    scripts: []
  },
  {
    out: 'wholesale/index.html',
    file: 'wholesale',
    page: 'wholesale',
    title: 'Wholesale & Hospitality — Maison Asili',
    desc: 'Exceptional ingredients for exceptional tables. Wholesale and hospitality enquiries for Maison Asili.',
    scripts: []
  }
];

PAGES.forEach((cfg) => {
  buildPage({
    out: cfg.out,
    title: cfg.title,
    desc: cfg.desc,
    page: cfg.page,
    contentTpl: pageBody(cfg.file),
    pageScripts: cfg.scripts
  });
});

/* -------------------------------------------------------------- home page */
// The home hero/sections ship as static markup; the product carousel
// is generated from the catalogue so quick-add and tabs stay live.
(function buildHome() {
  let tpl = pageBody('home');
  const allProducts = [...products];
  const featured = products.filter((p) => p.featured);
  tpl = tpl.replace(/\{\{FEATURED_CAROUSEL\}\}/g, carouselProducts(allProducts, '{{BASE}}'));
  tpl = tpl.replace(/\{\{FEATURED_GRID\}\}/g, productGrid(featured.slice(0, 8), '{{BASE}}'));

  buildPage({
    out: 'index.html',
    title: 'Maison Asili — Afro-Gourmet Feinkost, Botanicals & Single-Origin Coffee',
    desc:
      'Maison Asili — rooted in Africa, born in Berlin. Small-batch coffee, tea, spices, botanicals and cold-pressed oils for the discerning epicurean.',
    page: 'home',
    contentTpl: tpl,
    pageScripts: []
  });
})();

/* --------------------------------------------------------------- shop page */

(function buildShop() {
  let tpl = pageBody('shop');
  const shopProducts = [...products];
  const grid = productGrid(shopProducts, '{{BASE}}');
  const pills = filterPills(shopProducts, '{{BASE}}', 'all');

  tpl = tpl.replace(/\{\{PRODUCT_GRID\}\}/g, grid).replace(/\{\{FILTER_PILLS\}\}/g, pills);
  tpl = tpl.replace(/\{\{PRODUCT_COUNT\}\}/g, String(shopProducts.length));
  tpl = tpl.replace(/\{\{MAX_PRICE\}\}/g, String(Math.ceil(maxPrice)));

  // (legacy markup) the original inline filter script is replaced by filters.js
  tpl = tpl.replace(/<!-- Interactive Client-side Script for Filtering & Sorting -->[\s\S]*?<\/script>/, '<!-- filtering handled by assets/js/filters.js -->');

  buildPage({
    out: 'shop/index.html',
    title: 'Shop All — Maison Asili',
    desc: 'The full Maison Asili pantry: coffee, tea, spices, botanicals and cold-pressed oils.',
    page: 'shop',
    contentTpl: tpl,
    pageScripts: ['filters.js']
  });
})();

/* ------------------------------------------------------- collection pages */

const collectionTpl = read('src/templates/collection.html');

collections.forEach((c) => {
  const list = products.filter((p) => p.category === c.slug);
  const related = collections
    .filter((x) => x.slug !== c.slug)
    .map(
      (x) => `<a class="group flex items-center justify-between gap-4 bg-surface-container-lowest border border-outline-variant px-5 py-4 hover:border-tertiary transition-colors"
                        href="{{BASE}}collections/${x.slug}/index.html">
                        <span class="flex flex-col">
                            <span class="font-headline text-base font-semibold text-on-surface group-hover:text-tertiary transition-colors">${esc(x.name)}</span>
                            <span class="text-[11px] text-on-surface-variant font-label">${esc(x.tagline)}</span>
                        </span>
                        <span class="material-symbols-outlined text-sm text-outline group-hover:text-tertiary group-hover:translate-x-0.5 transition-all">arrow_forward</span>
                    </a>`
    )
    .join('\n                    ');

  const applications = c.applications
    .map(
      (a) => `<li class="flex items-start gap-3 py-2.5 border-b border-outline-variant">
                            <span class="material-symbols-outlined text-base text-tertiary mt-0.5">check</span>
                            <span class="text-sm text-on-surface-variant">${esc(a)}</span>
                        </li>`
    )
    .join('\n                        ');

  const tokens = {
    NAME: esc(c.name),
    INDEX: c.index,
    EYEBROW: esc(c.eyebrow),
    TAGLINE: esc(c.tagline),
    INTRO: esc(c.intro),
    HERO_SRC: `{{BASE}}${media[c.media]}`,
    HERO_ALT: `${c.name} — Maison Asili`,
    COUNT: String(list.length),
    COLLECTION_PILLS: collectionPills(c.slug),
    PRODUCT_GRID: productGrid(list, '{{BASE}}'),
    MAX_PRICE: String(Math.ceil(maxPrice)),
    EDITORIAL_TITLE: esc(c.editorialTitle),
    EDITORIAL_BODY: esc(c.editorialBody),
    EDITORIAL_IMG: `{{BASE}}${media.culinary}`,
    APPLICATIONS: applications,
    RELATED_LINKS: related,
    HREF: `{{BASE}}collections/${c.slug}/index.html`
  };

  buildPage({
    out: `collections/${c.slug}/index.html`,
    title: `${c.name} — Maison Asili`,
    desc: `${c.name}: ${c.tagline}. ${c.intro}`,
    page: 'shop',
    contentTpl: collectionTpl,
    tokens,
    pageScripts: ['filters.js']
  });
});

/* --------------------------------------------------------- product pages */

const productTpl = read('src/pages/product.html');

products.forEach((p) => {
  const c = collectionBySlug[p.category];
  const gallery = galleryFor(p);
  const variants = p.variants || [];
  const unitPrice = variants.length ? (variants[0].price / 100).toFixed(2) : null;

  const detailsBody = `<ul class="flex flex-col gap-2 list-none">
                                        <li class="flex gap-2"><span class="text-tertiary">&mdash;</span><span>Format: ${esc(p.size)}</span></li>
                                        <li class="flex gap-2"><span class="text-tertiary">&mdash;</span><span>Category: ${esc(c.name)}</span></li>
                                        <li class="flex gap-2"><span class="text-tertiary">&mdash;</span><span>Prepared and packed in Berlin in small batches</span></li>
                                        <li class="flex gap-2"><span class="text-tertiary">&mdash;</span><span>Demonstration entry &mdash; final specification pending client confirmation</span></li>
                                    </ul>`;

  const originBody = `Provenance, harvest and batch documentation for this position will be
                                        confirmed against the official Maison Asili catalogue before launch.
                                        No origin, certification or quality claim is made on this demonstration
                                        page.<br><br>Prepared and packed in Berlin.`;

  // Editorial accordions — details / ingredients / origin / culinary uses / storage.
  // `open` marks the first expanded panel; product.js wires the toggle.
  const accordion = (id, label, body, open) => `
                        <div class="border-t border-outline-variant">
                            <button class="accordion-toggle w-full flex items-center justify-between gap-4 py-4 text-left"
                                aria-expanded="${open ? 'true' : 'false'}" data-accordion="${id}" type="button">
                                <span class="text-[10px] uppercase tracking-[0.25em] text-tertiary font-semibold">${label}</span>
                                <span class="material-symbols-outlined text-on-surface-variant accordion-icon transition-transform duration-200">${open ? 'remove' : 'add'}</span>
                            </button>
                            <div class="accordion-panel${open ? '' : ' hidden'} pb-5 text-sm text-on-surface-variant font-light leading-relaxed pr-6">${body}</div>
                        </div>`;

  const ACCORDION_DETAILS = accordion('details', 'Details', detailsBody, true);
  const ACCORDION_INGREDIENTS = accordion('ingredients', 'Ingredients & Composition', esc(p.ingredients), false);
  const ACCORDION_ORIGIN = accordion('origin', 'Origin & Provenance', originBody, false);
  const ACCORDION_USES = accordion('uses', 'Culinary Uses', esc(p.uses), false);
  const ACCORDION_STORAGE = accordion('storage', 'Storage', esc(CATEGORY_STORAGE[p.category]), false);

  const tokens = {
    SLUG: p.slug,
    NAME: esc(p.name),
    CATEGORY: esc(c.name),
    CATEGORY_HREF: `{{BASE}}collections/${c.slug}/index.html`,
    BREADCRUMB: `${`{{BASE}}collections/${c.slug}/index.html`}`,
    PRICE: money(p.price),
    SIZE: esc(p.size),
    SIZE_SECTION: sizeSection(p, '{{BASE}}'),
    EYEBROW: esc(p.eyebrow || `${c.name} • Maison Asili`),
    LABEL_NOTE: p.label ? esc(p.label) : 'Demo Catalogue',
    DESCRIPTION: esc(p.description),
    GALLERY_MAIN: gallery[0],
    THUMBS: thumbsFor(gallery, '{{BASE}}', p.name),
    CRAFT_BAR: craftBar(p),
    MICRO_A: `Small Batch &bull; ${esc(c.name)}`,
    MICRO_B: 'Demonstration Catalogue',
    ACCORDION_DETAILS,
    ACCORDION_INGREDIENTS,
    ACCORDION_ORIGIN,
    ACCORDION_USES,
    ACCORDION_STORAGE,
    STORAGE_ICON: CATEGORY_STORAGE_ICON[p.category],
    RELATED: relatedFor(p, '{{BASE}}'),
    DEMO_PRICE: money(p.price)
  };

  buildPage({
    out: `products/${p.slug}/index.html`,
    title: `${p.name} — Maison Asili`,
    desc: `${p.name} (${p.size}) — ${p.description}`,
    page: 'shop',
    contentTpl: productTpl,
    tokens,
    pageScripts: ['product.js']
  });
});

/* ---------------------------------------------------------- legal pages */

const legalPages = require(path.join(ROOT, 'src', 'data', 'legal.js'));
const legalTpl = read('src/templates/legal.html');

legalPages.forEach((l) => {
  const sections = l.sections
    .map(
      (s) => `<section class="mb-10">
                        <h2 class="font-headline text-xl sm:text-2xl font-semibold text-on-surface mb-3">${esc(s.h)}</h2>
                        <div class="flex flex-col gap-3 text-sm text-on-surface-variant leading-relaxed">${s.p
                          .map((t) => `<p>${esc(t)}</p>`)
                          .join('')}</div>
                    </section>`
    )
    .join('\n                    ');

  buildPage({
    out: `${l.slug}/index.html`,
    title: `${l.title} — Maison Asili`,
    desc: l.title,
    page: l.slug,
    contentTpl: legalTpl,
    tokens: { TITLE: esc(l.title), INTRO: esc(l.intro), SECTIONS: sections }
  });
});

/* ------------------------------------------------------- browser catalogue */

const clientCatalog = products.map((p) => ({
  slug: p.slug,
  name: p.name,
  category: p.category,
  categoryName: collectionBySlug[p.category].name,
  price: p.price,
  size: p.size,
  label: p.label,
  eyebrow: p.eyebrow,
  description: p.description,
  image: p.image,
  /* optional size options — used by the cart to charge the selected variant */
  variants: p.variants,
  path: `products/${p.slug}/index.html`
}));

write(
  'assets/js/catalog.js',
  `/* Generated by scripts/build.js — do not edit by hand.\n` +
    `   Source of truth: src/data/products.js */\n` +
    `window.MA_CATALOG = ${JSON.stringify(clientCatalog, null, 2)};\n` +
    `window.MA_COLLECTIONS = ${JSON.stringify(
      collections.map((c) => ({ slug: c.slug, name: c.name, tagline: c.tagline, path: `collections/${c.slug}/index.html` })),
      null,
      2
    )};\n`
);

/* --------------------------------------------- copy static client JS ---- */
// Interactive storefront scripts are authored in src/js/ and copied into the
// build output so they sit alongside the generated catalogue.js.
const JS_SRC = path.join(ROOT, 'src', 'js');
if (fs.existsSync(JS_SRC)) {
  fs.readdirSync(JS_SRC)
    .filter((f) => f.endsWith('.js'))
    .forEach((f) => {
      fs.copyFileSync(path.join(JS_SRC, f), path.join(PUBLIC, 'assets', 'js', f));
    });
}

/* --------------------------------------------- copy media & video ------- */
const rootVideo = path.join(ROOT, 'Glass_bottle_rotating_in_forest_20261027023850.mp4');
const targetVideoDir = path.join(PUBLIC, 'assets', 'video');
const targetVideo = path.join(targetVideoDir, 'botanical-infusion-forest.mp4');
if (fs.existsSync(rootVideo)) {
  fs.mkdirSync(targetVideoDir, { recursive: true });
  if (!fs.existsSync(targetVideo) || fs.statSync(rootVideo).size !== fs.statSync(targetVideo).size) {
    fs.copyFileSync(rootVideo, targetVideo);
  }
}
const pristineLogo = path.join(ROOT, 'WhatsApp Image 2026-10-21 at 17.11.20.jpeg');
if (fs.existsSync(pristineLogo)) {
  fs.copyFileSync(pristineLogo, path.join(PUBLIC, 'assets', 'img', 'img-59efbbe90f.jpg'));
  fs.copyFileSync(pristineLogo, path.join(PUBLIC, 'assets', 'img', 'brand-logo-gold.jpg'));
}

/* ------------------------------------------------------------- cleanup */

// keep the original prototype untouched; report issues instead
console.log(`\nbuild: ${products.length} products, ${collections.length} collections`);
if (warnings.length) {
  console.log('\nwarnings:');
  [...new Set(warnings)].forEach((w) => console.log('  !', w));
} else {
  console.log('build: no warnings');
}
