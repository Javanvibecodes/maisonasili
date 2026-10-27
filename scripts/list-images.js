const fs = require('fs');
const path = require('path');
const map = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'image-map.json'), 'utf8'));
const pages = fs.readdirSync(path.join(__dirname, '..', 'src', 'pages')).filter((f) => f.endsWith('.html'));
const seen = new Map();
for (const p of pages) {
  const html = fs.readFileSync(path.join(__dirname, '..', 'src', 'pages', p), 'utf8');
  const re = /<img[^>]*>/g;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    const url = (tag.match(/src="(https:\/\/lh3[^"]+)"/) || [])[1];
    if (!url || seen.has(url)) continue;
    const alt = (tag.match(/data-alt="([^"]*)"/) || tag.match(/alt="([^"]*)"/) || [])[1] || '';
    seen.set(url, { page: p, alt: alt.slice(0, 115) });
  }
}
let i = 0;
for (const [url, info] of seen) {
  i++;
  console.log(String(i).padStart(2, '0'), (map[url] || '(unused)').padEnd(28), '|', info.page.padEnd(14), '|', info.alt);
}
console.log('total <img> in markup:', i, '| map entries:', Object.keys(map).length);
