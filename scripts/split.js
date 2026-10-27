/**
 * One-off extraction: splits the original single-file prototype
 * (website.html) into the four page bodies that back the real site.
 *
 *   src/pages/home.html
 *   src/pages/product.html     (product detail template)
 *   src/pages/heritage.html
 *   src/pages/shop.html
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'website.html'), 'utf8');
const outDir = path.join(ROOT, 'src', 'pages');
fs.mkdirSync(outDir, { recursive: true });

const names = ['home', 'product', 'heritage', 'shop'];

// Each document starts with a comment line + <!DOCTYPE html>
const parts = src.split(/(?=<!--\s*Maison Asili[^\n]*-->\s*\r?\n<!DOCTYPE html>)/i);
const docs = parts.filter((p) => /<!DOCTYPE html>/i.test(p));
console.log('documents found:', docs.length);

docs.forEach((doc, i) => {
  const headerEnd = doc.indexOf('</header>');
  const footerStart = doc.indexOf('<footer');
  if (headerEnd === -1 || footerStart === -1) {
    throw new Error('could not locate header/footer for document ' + i);
  }
  let body = doc.slice(headerEnd + '</header>'.length, footerStart).trim();
  // drop the leading <main ...> wrapper duplication risk: keep as-is
  const name = names[i];
  const file = path.join(outDir, `${name}.html`);
  fs.writeFileSync(file, body, 'utf8');
  console.log(`${name}.html  (${body.length} chars)`);
});
