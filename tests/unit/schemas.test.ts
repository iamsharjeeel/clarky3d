import { describe, expect, it } from "vitest";
import { assertUniqueSlugs, productSchema, siteSettingsSchema } from "@/lib/content/schemas";
import { getProducts, getSiteSettings } from "@/lib/content/load";

describe("content schemas", () => {
  it("validates site settings from evidence-backed content", () => {
    const site = getSiteSettings();
    expect(siteSettingsSchema.parse(site).brandName).toBe("Clarky3D");
    expect(site.currencyLabel).toBe("AUD");
  });

  it("validates all products and unique slugs", () => {
    const products = getProducts();
    expect(products.length).toBeGreaterThan(0);
    for (const product of products) {
      expect(() => productSchema.parse(product)).not.toThrow();
      expect(product.cover.alt !== undefined).toBe(true);
    }
    expect(() => assertUniqueSlugs(products)).not.toThrow();
  });

  it("rejects duplicate slugs", () => {
    const products = getProducts();
    const clone = [products[0], products[0]];
    expect(() => assertUniqueSlugs(clone)).toThrow(/Duplicate product slug/);
  });
});
