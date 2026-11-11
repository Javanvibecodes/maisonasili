import productsSource from '@/data/products';
import collectionsSource from '@/data/collections';
import legalSource from '@/data/legal';
import mediaSource from '@/data/media.json';

export type Category = 'spices' | 'salts' | 'tea';

export interface ProductStory {
  heading?: string;
  paragraphs: string[];
  flavour?: string[];
  beautifulWith?: string[];
  touch?: string[];
  craft?: string;
  closing?: string;
  sizeNote?: string;
}

export interface Product {
  slug: string;
  name: string;
  subtitle: string;
  descriptor?: string;
  category: Category;
  size: string;
  label: string;
  eyebrow: string;
  description: string;
  story: ProductStory;
  ingredients: string[];
  ingredientsNote?: string;
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
  editorialMedia: keyof typeof mediaSource;
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

export function isCategory(value: string): value is Category {
  return collections.some((collection) => collection.slug === value);
}
