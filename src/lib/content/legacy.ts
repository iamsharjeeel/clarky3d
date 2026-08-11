import { getProducts } from "@/lib/content/load";

export function legacyPathToSlug(legacyPath: string): string | undefined {
  const normalized = legacyPath.replace(/^\/+/, "").replace(/\/+$/, "");
  return getProducts().find((product) => product.legacyPath === normalized)?.slug;
}
