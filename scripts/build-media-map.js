/**
 * Builds src/data/media.json — semantic keys -> locally stored asset paths.
 * (Re-runnable; only reads the page sources and the downloaded image map.)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const imgMap = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'image-map.json'), 'utf8'));
const read = (f) => fs.readFileSync(path.join(ROOT, 'src', 'pages', f), 'utf8');

const home = read('home.html');
const prod = read('product.html');
const firstImg = (seg) => {
  const m = seg.match(/src="(https:\/\/lh3[^"]+)"/);
  return m ? imgMap[m[1]] || m[1] : null;
};

const media = {};

media.logo = imgMap[Object.keys(imgMap).find((u) => u.includes('AB6AXuB-E2bMOT'))];
media.hero = firstImg(home.slice(home.indexOf('Hero Visual Composition')));
media.heritageArchive = firstImg(home.slice(home.indexOf('Black and white archival')));

['coffee-reserve', 'botanical-tea', 'spices-and-seasonings', 'botanicals-and-elixirs', 'cold-pressed-oils'].forEach(
  (p) => {
    const i = home.indexOf(`data-path="${p}"`);
    const key = 'collection' + p.split('-')[0][0].toUpperCase() + p.split('-')[0].slice(1);
    media[key] = firstImg(home.slice(i, i + 1600));
  }
);
// normalise keys: collectionCoffee / collectionBotanical(tea) ...
media.collectionTea = media.collectionBotanical;
delete media.collectionBotanical;
media.collectionBotanicals = media.collectionBotanicals; // botanicals-and-elixirs -> collectionBotanicals
media.collectionCold = media.collectionCold;
media.collectionOils = media.collectionCold;
delete media.collectionCold;

const mainM = prod.match(/id="main-product-image"[\s\S]{0,600}?src="(https:\/\/lh3[^"]+)"/);
media.pdpMain = mainM ? imgMap[mainM[1]] || mainM[1] : null;

const thumbSegs = prod.split('thumbnail-btn').slice(1);
const thumbLabels = ['pdpCloseup', 'pdpSeeds', 'pdpPress', 'pdpGift'];
thumbSegs.forEach((seg, i) => {
  if (thumbLabels[i]) media[thumbLabels[i]] = firstImg(seg.slice(0, 1400));
});

media.culinary = media.pdpSeeds;
media.editorial = media.pdpPress;

fs.writeFileSync(path.join(ROOT, 'src', 'data', 'media.json'), JSON.stringify(media, null, 2));
console.log(JSON.stringify(media, null, 2));
