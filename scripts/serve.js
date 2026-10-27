/* Maison Asili — zero-dependency static file server for the built storefront.
   Serves public/ with clean directory-index resolution so /shop/, /cart/,
   /collections/coffee/ etc. all load index.html. No backend, no database. */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'public');
const PORT = process.env.PORT || 4173;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function send(res, code, body, type) {
  res.writeHead(code, { 'Content-Type': type || 'text/plain; charset=utf-8' });
  res.end(body);
}

const server = http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    let filePath = path.join(ROOT, urlPath);

    // prevent path traversal
    if (!filePath.startsWith(ROOT)) return send(res, 403, 'Forbidden');

    // if no extension and no file, try directory index
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      if (!path.extname(filePath)) {
        const asIndex = path.join(filePath, 'index.html');
        if (fs.existsSync(asIndex)) filePath = asIndex;
        else return send(res, 404, '404 — Not found');
      } else return send(res, 404, '404 — Not found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const data = fs.readFileSync(filePath);
    send(res, 200, data, TYPES[ext] || 'application/octet-stream');
  } catch (err) {
    send(res, 500, '500 — Server error');
  }
});

server.listen(PORT, () => {
  console.log(`\n  Maison Asili — demonstration storefront`);
  console.log(`  http://localhost:${PORT}\n`);
  console.log(`  Serving: ${ROOT}`);
  console.log(`  No backend, no database, no external services.\n`);
});
