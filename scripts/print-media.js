const fs = require('fs');
const path = require('path');
const map = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'image-map.json'), 'utf8'));
const home = fs.readFileSync(path.join(__dirname, '..', 'src', 'pages', 'home.html'), 'utf8');
const prod = fs.readFileSync(path.join(__dirname, '..', 'src', 'pages', 'product.html'), 'utf8');
const herit = fs.readFileSync(path.join(__dirname, '..', 'src', 'pages', 'heritage.html'), 'utf8');

const pick = (html, re, label) => {
  const m = html.match(re);
  if (!m) return console.log(label.padEnd(22), 'NOT FOUND');
  console.log(label.padEnd(22), map[m[1]] || m[1]);
};

// hero still life (first image inside hero visual)
const heroBlock = home.slice(home.indexOf('Editorial Hero'), home.indexOf('<!-- 2. Brand'));
pick(heroBlock, /src="(https:\/\/lh3[^"]+)"/, 'hero');

['coffee-reserve', 'botanical-tea', 'spices-and-seasonings', 'botanicals-and-elixirs', 'cold-pressed-oils'].forEach((p) => {
  const i = home.indexOf(`data-path="${p}"`);
  const seg = home.slice(i, i + 1400);
  pick(seg, /src="(https:\/\/lh3[^"]+)"/, 'collection-' + p.split('-')[0]);
});

pick(home, /data-alt="Black and white archival([\s\S]*?)src="(https:\/\/lh3[^"]+)"/, 'x');
const arch = home.match(/data-alt="Black and white archival[^"]*"\s*\n?\s*src="(https:\/\/lh3[^"]+)"/);
if (arch) console.log('heritage-archive      ', map[arch[1]] || arch[1]);

pick(prod, /id="main-product-image"[\s\S]{0,400}?src="(https:\/\/lh3[^"]+)"/, 'pdp-main');
const thumbs = [...prod.matchAll(/class="w-full h-full object-(?:contain|cover)"\s*\n?\s*data-alt="[^"]*"\s*\n?\s*src="(https:\/\/lh3[^"]+)"/g)].map((m) => m[1]);
thumbs.slice(1, 6).forEach((u, i) => console.log('pdp-thumb-' + i, (map[u] || u).padEnd(28)));

// heritage page images
const hImgs = [...herit.matchAll(/src="(https:\/\/lh3[^"]+)"/g)].map((m) => map[m[1]] || m[1]);
console.log('heritage images:', hImgs.length);
hImgs.forEach((u, i) => console.log('  heritage-' + i, u));
