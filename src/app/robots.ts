import type { MetadataRoute } from "next";
import { getSiteUrl, shouldNoIndex } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  if (shouldNoIndex()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/privacy"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
