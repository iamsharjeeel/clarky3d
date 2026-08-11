import Link from "next/link";
import { ProductCard } from "@/components/work/ProductCard";
import {
  getCategories,
  getFeaturedProducts,
  getFilaments,
  getSiteSettings,
} from "@/lib/content/load";

export default function HomePage() {
  const site = getSiteSettings();
  const featured = getFeaturedProducts().slice(0, 11);
  const categories = getCategories();
  const filaments = getFilaments().filter((filament) => filament.status === "In Stock");

  return (
    <div className="stack">
      <header className="stack home-hero">
        <h1 className="page-title motion-fade">Featured items</h1>
        <div className="panel welcome-panel motion-fade">
          <p className="lede welcome-lead">{site.landingIntro}</p>
          <p className="meta">{site.landingSubtext}</p>
        </div>
        <div className="cta-row">
          <Link className="btn" href="/work">
            Browse catalogue
          </Link>
          <Link className="btn btn-secondary" href="/contact">
            Start an order
          </Link>
        </div>
      </header>

      <section className="stack" aria-labelledby="categories-heading">
        <div className="section-head">
          <h2 id="categories-heading" className="strip-title">
            Browse the catalogue
          </h2>
          <p className="meta">{categories.length} categories</p>
        </div>
        <ul className="cat-row">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                className={`cat-tile theme-${category.themeToken} motion-lift`}
                href={`/work#${category.slug}`}
              >
                <span className="cat-tile-name">{category.title}</span>
                <span className="cat-tile-count">{category.subcategories.length} sections</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="stack" aria-labelledby="featured-heading">
        <div className="section-head">
          <h2 id="featured-heading" className="strip-title">
            Latest releases
          </h2>
          <p className="meta">{featured.length} items</p>
        </div>
        <ul className="product-grid">
          {featured.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>

      <section className="panel stack" aria-labelledby="colours-heading">
        <div className="section-head">
          <h2 id="colours-heading" className="strip-title">
            Colours on the shelf
          </h2>
          <p className="meta">{filaments.length} in stock</p>
        </div>
        <ul className="swatch-row" aria-label="In-stock filament colours">
          {filaments.map((filament) => (
            <li key={filament.id} className="swatch">
              <span
                className="swatch-dot"
                style={{ background: filament.hex }}
                aria-hidden="true"
              />
              <span>{filament.name}</span>
            </li>
          ))}
        </ul>
        <p className="meta">
          Every colour above is from the captured in-stock inventory. Pick one per part when you
          order, or leave it to Lucky Dip.
        </p>
        <Link className="btn btn-secondary" href="/colours">
          See the full library
        </Link>
      </section>
    </div>
  );
}
