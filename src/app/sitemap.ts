import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/content/load";
import { getSiteUrl, shouldNoIndex } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  if (shouldNoIndex()) {
    return [];
  }
  const siteUrl = getSiteUrl();
  const staticRoutes = ["", "/work", "/colours", "/contact", "/accessibility"].map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const productRoutes = getProducts().map((product) => ({
    url: `${siteUrl}/work/${product.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...staticRoutes, ...productRoutes];
}
