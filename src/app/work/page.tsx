import { ProductCard } from "@/components/work/ProductCard";
import { getCategories, getProducts } from "@/lib/content/load";
import { createMetadata } from "@/lib/metadata/create-metadata";

export const metadata = createMetadata({
  title: "Catalogue",
  description: "Browse Clarky3D made-to-order 3D prints by category.",
  path: "/work",
});

export default function WorkPage() {
  const categories = getCategories();
  const products = getProducts();

  return (
    <div className="stack">
      <header className="stack">
        <h1 className="page-title">Catalogue</h1>
        <p className="lede">
          Products and prices transcribed from the 2026-08-11 live catalogue capture. Photography
          rights remain unverified.
        </p>
      </header>
      {categories.map((category) => {
        const items = products.filter((product) => product.categoryId === category.id);
        return (
          <section
            key={category.id}
            id={category.slug}
            className={`stack theme-${category.themeToken}`}
            aria-labelledby={category.id}
          >
            <h2 id={category.id} className="strip-title">
              {category.title}
            </h2>
            <ul className="product-grid">
              {items.map((product) => (
                <li key={product.slug}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
