/* Link audit: crawls every built page, collects internal links, resolves them
 * against the public/ tree, and reports broken targets. */
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '..', 'public');

function listHtml(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) listHtml(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const pages = listHtml(PUBLIC);
const problems = [];
const seen = new Set();

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const rel = path.relative(PUBLIC, page).replace(/\\/g, '/');
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const srcs = [...html.matchAll(/(?:src|data-src)="([^"]+)"/g)].map((m) => m[1]);

  for (const raw of [...hrefs, ...srcs]) {
    if (/^(https?:|mailto:|tel:|data:|#|javascript:)/i.test(raw)) continue;
    const clean = raw.split('#')[0].split('?')[0];
    if (!clean) continue; // pure fragment link
    const key = rel + ' -> ' + clean;
    if (seen.has(key)) continue;
    seen.add(key);

    const baseDir = path.dirname(page);
    let target = path.normalize(path.join(baseDir, decodeURIComponent(clean)));
    // directory-style links resolve to index.html (serve.js behaviour)
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      target = path.join(target, 'index.html');
    }
    if (!fs.existsSync(target)) {
      problems.push(`${rel} -> ${raw}`);
    }
  }
}

console.log(`pages crawled: ${pages.length}`);
console.log(`unique internal refs checked: ${seen.size}`);
if (problems.length) {
  console.log(`\nBROKEN (${problems.length}):`);
  problems.forEach((p) => console.log('  x ' + p));
} else {
  console.log('\nno broken internal links or missing assets');
}
