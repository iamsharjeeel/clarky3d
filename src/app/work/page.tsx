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
    <div className="catalogue-editorial">
      <header className="section-head-editorial">
        <p className="eyebrow">Catalogue</p>
        <h1 className="page-title">Made-to-order prints</h1>
        <p className="lede">
          Products and prices from the 2026-08-11 live catalogue capture. Photography rights remain
          unverified for production launch.
        </p>
      </header>

      <nav className="catalogue-jump" aria-label="Category jump">
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <a href={`#${category.slug}`}>{category.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      {categories.map((category) => {
        const items = products.filter((product) => product.categoryId === category.id);
        return (
          <section
            key={category.id}
            id={category.slug}
            className={`catalogue-block theme-${category.themeToken}`}
            aria-labelledby={category.id}
          >
            <div className="catalogue-block-head">
              <h2 id={category.id}>{category.title}</h2>
              <p className="meta">{items.length} prints</p>
            </div>
            <ul className="editorial-grid">
              {items.map((product, index) => (
                <li key={product.slug} className={index === 0 ? "span-2" : undefined}>
                  <ProductCard product={product} layout={index === 0 ? "feature" : "grid"} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
