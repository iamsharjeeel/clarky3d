import Link from "next/link";
import {
  getCategories,
  getFeaturedProducts,
  getFilaments,
  getSiteSettings,
} from "@/lib/content/load";

export default function HomePage() {
  const site = getSiteSettings();
  const featured = getFeaturedProducts().slice(0, 8);
  const categories = getCategories();
  const inStock = getFilaments().filter((filament) => filament.status === "In Stock").length;

  return (
    <div className="stack">
      <header className="stack">
        <h1 className="page-title">Featured items</h1>
        <div className="panel">
          <p className="lede">{site.landingIntro}</p>
          <p className="meta">{site.landingSubtext}</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <Link className="btn" href="/work">
            Browse catalogue
          </Link>
          <Link className="btn btn-secondary" href="/contact">
            Start an order
          </Link>
        </div>
      </header>

      <section className="stack" aria-labelledby="categories-heading">
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
          <h2 id="categories-heading" className="meta">
            Browse the catalogue
          </h2>
          <p className="meta">{categories.length} categories</p>
        </div>
        <ul className="product-grid">
          {categories.map((category) => (
            <li key={category.id}>
              <Link className="product-card" href={`/work#${category.slug}`}>
                <div className="product-card-body">
                  <h3>{category.title}</h3>
                  <p className="meta">{category.subcategories.length} sections</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="stack" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="meta">
          Latest releases
        </h2>
        <ul className="product-grid">
          {featured.map((product) => (
            <li key={product.slug}>
              <Link className="product-card" href={`/work/${product.slug}`}>
                <div className="product-card-body">
                  <h3>{product.title}</h3>
                  <p className="price">${product.priceAud}</p>
                  <p className="meta">
                    {product.badge === "none" ? "Made to order" : product.badge}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel stack" aria-labelledby="colours-heading">
        <h2 id="colours-heading">Colours on the shelf</h2>
        <p className="meta">{inStock} in stock</p>
        <p className="lede">
          Every listed colour is sourced from the live filament inventory capture. Pick colours per
          part when you order, or leave it to Lucky Dip.
        </p>
        <Link className="btn btn-secondary" href="/colours">
          See the full library
        </Link>
      </section>
    </div>
  );
}
