import { z } from "zod";

export const mediaSchema = z.object({
  src: z.string().min(1),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  alt: z.string(),
  caption: z.string().optional(),
  credit: z.string().optional(),
  rightsStatus: z.enum(["unknown", "approved", "do-not-ship"]).default("unknown"),
});

export const productOptionSchema = z.object({
  name: z.string().min(1),
  choices: z.array(z.string().min(1)).min(1),
});

export const productSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  legacyPath: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string().min(1),
  subcategoryId: z.string().min(1),
  priceAud: z.string().regex(/^\d+\.\d{2}$/),
  featured: z.boolean().default(false),
  badge: z.enum(["none", "new", "popular"]).default("none"),
  colourParts: z.array(z.string()).default([]),
  options: z.array(productOptionSchema).default([]),
  cover: mediaSchema,
  photos: z.array(mediaSchema).default([]),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().min(1),
    noindex: z.boolean().optional(),
  }),
});

export const categorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  themeToken: z.enum(["hotwheels", "retro", "misc", "pep"]),
  subcategories: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
    }),
  ),
});

export const filamentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  material: z.string().min(1),
  finish: z.string().min(1),
  hex: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  status: z.enum(["In Stock", "On Order", "Out of Stock"]),
});

export const siteSettingsSchema = z.object({
  brandName: z.string().min(1),
  tagline: z.string().min(1),
  landingIntro: z.string().min(1),
  landingSubtext: z.string().min(1),
  currencyLabel: z.literal("AUD"),
  telegramHandleObserved: z.string().min(1),
});

export type Media = z.infer<typeof mediaSchema>;
export type Product = z.infer<typeof productSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Filament = z.infer<typeof filamentSchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;

export function assertUniqueSlugs(products: Product[]): void {
  const seen = new Set<string>();
  for (const product of products) {
    if (seen.has(product.slug)) {
      throw new Error(`Duplicate product slug: ${product.slug}`);
    }
    seen.add(product.slug);
  }
}
