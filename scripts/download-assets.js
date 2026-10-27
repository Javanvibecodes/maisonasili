/**
 * Downloads every remote asset referenced by the page sources so the demo
 * never depends on a third-party host at runtime:
 *
 *   • product / editorial photography  -> public/assets/img/
 *   • Google Fonts (Public Sans, Cormorant Garamond, Material Symbols)
 *                                        -> public/assets/fonts/ + public/assets/css/fonts.css
 *
 * Writes src/data/image-map.json which the build uses to rewrite <img src>.
 * Run with:  npm run assets
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const PAGES = path.join(ROOT, 'src', 'pages');
const IMG_DIR = path.join(ROOT, 'public', 'assets', 'img');
const FONT_DIR = path.join(ROOT, 'public', 'assets', 'fonts');
const CSS_DIR = path.join(ROOT, 'public', 'assets', 'css');
const MAP_FILE = path.join(ROOT, 'src', 'data', 'image-map.json');

const CHROME_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

fs.mkdirSync(IMG_DIR, { recursive: true });
fs.mkdirSync(FONT_DIR, { recursive: true });
fs.mkdirSync(CSS_DIR, { recursive: true });
fs.mkdirSync(path.dirname(MAP_FILE), { recursive: true });

const hash = (str, len = 10) =>
  crypto.createHash('sha1').update(str).digest('hex').slice(0, len);

async function fetchBuffer(url, ua) {
  const res = await fetch(url, { headers: { 'User-Agent': ua || CHROME_UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const type = res.headers.get('content-type') || '';
  const buf = Buffer.from(await res.arrayBuffer());
  return { buf, type };
}

function extFor(type, url) {
  if (type.includes('png')) return '.png';
  if (type.includes('webp')) return '.webp';
  if (type.includes('svg')) return '.svg';
  if (type.includes('gif')) return '.gif';
  if (/\.(png|jpe?g|webp|svg|gif)(\?|$)/i.test(url)) return url.match(/\.(png|jpe?g|webp|svg|gif)/i)[0].toLowerCase();
  if (type.includes('jpeg') || type.includes('jpg')) return '.jpg';
  if (type.includes('woff2')) return '.woff2';
  if (type.includes('woff')) return '.woff';
  return '.jpg';
}

async function downloadImages() {
  const files = fs.readdirSync(PAGES).filter((f) => f.endsWith('.html'));
  const urls = new Set();
  files.forEach((f) => {
    const html = fs.readFileSync(path.join(PAGES, f), 'utf8');
    (html.match(/https:\/\/lh3\.googleusercontent\.com\/[^"'\s)]+/g) || []).forEach((u) => urls.add(u));
  });

  const map = fs.existsSync(MAP_FILE) ? JSON.parse(fs.readFileSync(MAP_FILE, 'utf8')) : {};
  const list = [...urls];
  console.log(`images: ${list.length} unique references`);

  let done = 0;
  for (const url of list) {
    if (map[url] && fs.existsSync(path.join(ROOT, 'public', map[url]))) {
      done++;
      continue;
    }
    try {
      const { buf, type } = await fetchBuffer(url, 'Mozilla/5.0 (compatible; MaisonAsiliDemo/1.0)');
      const file = `assets/img/img-${hash(url)}${extFor(type, url)}`;
      fs.writeFileSync(path.join(ROOT, 'public', file), buf);
      map[url] = file;
      done++;
    } catch (err) {
      console.warn('  ! failed:', url.slice(0, 70), err.message);
    }
  }
  fs.writeFileSync(MAP_FILE, JSON.stringify(map, null, 2));
  console.log(`images: ${done}/${list.length} stored -> public/assets/img`);
  return map;
}

async function downloadFontSheet(name, cssUrl) {
  const { buf, type } = await fetchBuffer(cssUrl);
  let css = buf.toString('utf8');
  const urls = [...new Set((css.match(/https:\/\/fonts\.gstatic\.com\/[^"')\s]+/g) || []))];
  console.log(`fonts: ${name} — ${urls.length} file(s)`);
  for (const u of urls) {
    const ext = u.includes('.woff2') ? '.woff2' : u.includes('.woff') ? '.woff' : extFor('', u);
    const file = `fonts/${name}-${hash(u, 8)}${ext}`;
    try {
      const { buf: fbuf } = await fetchBuffer(u);
      fs.mkdirSync(path.dirname(path.join(ROOT, 'public', 'assets', file)), { recursive: true });
      fs.writeFileSync(path.join(ROOT, 'public', 'assets', file), fbuf);
      css = css.split(u).join('../' + file); // css lives in public/assets/css/
    } catch (err) {
      console.warn('  ! font failed:', u, err.message);
    }
  }
  return css;
}

async function downloadFonts() {
  const sheets = [
    downloadFontSheet(
      'public-sans',
      'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap'
    ),
    downloadFontSheet(
      'cormorant',
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap'
    ),
    downloadFontSheet(
      'material-symbols',
      'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block'
    )
  ];
  const css = (await Promise.all(sheets)).join('\n\n');
  fs.writeFileSync(path.join(CSS_DIR, 'fonts.css'), css);
  console.log('fonts: wrote public/assets/css/fonts.css');
}

function writePlaceholder() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">
  <rect width="400" height="500" fill="#E8DDCC"/>
  <g fill="none" stroke="#B69A62" stroke-width="1.4">
    <path d="M120 300 L200 170 L280 300"/>
    <path d="M150 300 L200 220 L250 300"/>
    <path d="M200 300 v60"/>
    <path d="M200 330 c-30 -14 -46 -40 -46 -40 c22 2 40 16 46 40z"/>
    <path d="M200 330 c30 -14 46 -40 46 -40 c-22 2 -40 16 -46 40z"/>
  </g>
  <text x="200" y="405" text-anchor="middle" font-family="Georgia, serif" font-size="26" letter-spacing="6" fill="#171714">MAISON ASILI</text>
  <text x="200" y="432" text-anchor="middle" font-family="Georgia, serif" font-size="10" letter-spacing="4" fill="#8A6A34">ORIGIN. IDENTITY. HERITAGE.</text>
</svg>`;
  fs.writeFileSync(path.join(IMG_DIR, 'placeholder.svg'), svg);
  console.log('placeholder artwork written');
}

(async () => {
  await downloadImages();
  await downloadFonts();
  writePlaceholder();
  console.log('assets: complete');
})();
