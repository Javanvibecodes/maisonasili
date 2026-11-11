import productsSource from '@/data/products';
import collectionsSource from '@/data/collections';
import legalSource from '@/data/legal';
import mediaSource from '@/data/media.json';

export type Category = 'spices' | 'salts' | 'tea';

export interface Product {
  slug: string;
  name: string;
  subtitle: string;
  category: Category;
  price: number;
  size: string;
  label: string;
  eyebrow: string;
  description: string;
  ingredients: string[];
  productType: string;
  origin: string;
  image: string;
  imageSource: string;
  imageWidth: number;
  imageHeight: number;
  featured: boolean;
  added: number;
}

export interface Collection {
  slug: Category;
  index: string;
  name: string;
  navName: string;
  tagline: string;
  eyebrow: string;
  intro: string;
  media: keyof typeof mediaSource;
  related: Category[];
  editorialTitle: string;
  editorialBody: string;
  applications: string[];
}

export interface LegalSection {
  h: string;
  p: string[];
}

export interface LegalPage {
  slug: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}

export const products = productsSource as Product[];
export const collections = collectionsSource as Collection[];
export const legalPages = legalSource as LegalPage[];
export const media = mediaSource as Record<string, string>;

/** Asset paths in the data files are written as `assets/img/...`. */
export function assetPath(path: string): string {
  if (!path) return '/assets/img/placeholder.svg';
  if (path.startsWith('/') || path.startsWith('http')) return path;
  return `/${path}`;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function productsInCollection(slug: string): Product[] {
  return products.filter((product) => product.category === slug);
}

export function collectionName(category: string): string {
  return collections.find((collection) => collection.slug === category)?.name ?? category;
}

export const MAX_PRICE = Math.max(...products.map((product) => product.price));
