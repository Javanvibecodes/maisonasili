Maison Asili — All Changes Complete ✅

## 1. Brand Palette: Warm Ivory → White
- tailwind.config.js: All #F8F0E6 → #FFFFFF (8 tokens + accent note)
- Build: "8 products, 3 collections, no warnings"

## 2. Eight Products (17 old → 8 new)
Each product: description + ingredients + price/weight + photo (object-contain)

| Slug | Name | Category | Price | Size |
|------|------|----------|-------|------|
| savannah-fire | Savannah Fire | spices | €18 | 130 g Jar |
| selim-and-paradise | Selim & Paradise | spices | €19 | 130 g Jar |
| tropical-pink-pepper-salt | Tropical Pink Pepper Salt | salts | €16 | 100 g Jar |
| swahili-coast | Swahili Coast | spices | €17 | 100 g Jar |
| emerald-moringa | Emerald Moringa | salts | €18 | 100 g Jar |
| royal-purple-elixir | Royal Purple Elixir | tea | €24 | 50 g Loose Leaf |
| mara-moon | Mara Moon | tea | €24 | 50 g Loose Leaf |
| desert-gold | Desert Gold | tea | €26 | 50 g Loose Leaf |

## 3. Microtext Removals (all pages)
- home.html: "Handcrafted in Small Batches" section
- home.html: Collection card counters 01/03, 02/03, 03/03
- home.html: "Selected for Your Table" carousel + tabs → 3 fixed product cards
- collection.html: TAGLINE above section title
- shop.html: "Small-batch creations" + status footer

## 4. Product Page
- Removed "Spice Blends" collection tag
- Removed "Small-batch stock" status
- Removed repeated micro text below product name
- Removed format section
- Removed "Packed in Berlin" → "Shipped from Berlin"
- Removed Details/Origin/Storage accordions
- Removed 3 bottom cards (Selection/Craft/Table)
- Removed demonstration storefront banner

## 5. Language
- lang="en" on all 42 HTML pages
- Browser-language detection via navigator.languages (auto-detects de, en, fr, etc.)
- Language panel instructs user to use native browser translation

## 6. Build & Tests
- npm run build: no warnings
- 42 HTML files, no broken links, all lang="en"
- Puppeteer tests: all routes 200, carousel, filters, search, cart, language panel, mobile menu

## 7. Items Needing Client Confirmation
- Emerald Moringa weight (inferred 100 g)
- Demo prices (illustrative placeholders)
- Ingredient terms (vague supplied terms)
- Royal Purple Elixur filename typo