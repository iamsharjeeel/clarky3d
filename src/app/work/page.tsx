import Link from "next/link";
import { createMetadata } from "@/lib/metadata/create-metadata";
import { getCategories, getProducts } from "@/lib/content/load";

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
          Products and prices below are transcribed from the 2026-08-11 live catalogue capture.
          Media rights remain unverified.
        </p>
      </header>
      {categories.map((category) => {
        const items = products.filter((product) => product.categoryId === category.id);
        return (
          <section
            key={category.id}
            id={category.slug}
            className="stack"
            aria-labelledby={category.id}
          >
            <h2 id={category.id}>{category.title}</h2>
            <ul className="product-grid">
              {items.map((product) => (
                <li key={product.slug}>
                  <Link className="product-card" href={`/work/${product.slug}`}>
                    <div className="product-card-body">
                      <h3>{product.title}</h3>
                      <p className="price">${product.priceAud} AUD</p>
                      <p className="meta">{product.subcategoryId.replace(/_/g, " ")}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
