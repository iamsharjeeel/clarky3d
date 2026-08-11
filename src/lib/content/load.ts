import { categories } from "../../../content/categories";
import { filaments } from "../../../content/filaments";
import { products } from "../../../content/products";
import { siteSettings } from "../../../content/site";
import {
  assertUniqueSlugs,
  categorySchema,
  filamentSchema,
  productSchema,
  siteSettingsSchema,
  type Category,
  type Filament,
  type Product,
  type SiteSettings,
} from "@/lib/content/schemas";

export function getSiteSettings(): SiteSettings {
  return siteSettingsSchema.parse(siteSettings);
}

export function getCategories(): Category[] {
  return categories.map((category) => categorySchema.parse(category));
}

export function getFilaments(): Filament[] {
  return filaments.map((filament) => filamentSchema.parse(filament));
}

export function getProducts(): Product[] {
  const parsed = products.map((product) => productSchema.parse(product));
  assertUniqueSlugs(parsed);
  return parsed;
}

export function getFeaturedProducts(): Product[] {
  return getProducts().filter((product) => product.featured || product.badge !== "none");
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((product) => product.slug === slug);
}

export function getProductByLegacyPath(legacyPath: string): Product | undefined {
  return getProducts().find((product) => product.legacyPath === legacyPath);
}

export function getCategoryById(id: string): Category | undefined {
  return getCategories().find((category) => category.id === id);
}
