import Image from "next/image";
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
  const featured = getFeaturedProducts();
  const heroProduct = featured[0];
  const selected = featured.slice(0, 5);
  const categories = getCategories();
  const filaments = getFilaments().filter((filament) => filament.status === "In Stock");

  return (
    <div className="home-editorial">
      <section className="hero-editorial" aria-labelledby="home-hero-title">
        <div className="hero-editorial-media">
          {heroProduct ? (
            <Image
              src={heroProduct.cover.src}
              alt={heroProduct.cover.alt}
              width={1400}
              height={1050}
              className="hero-editorial-image"
              sizes="(max-width: 900px) 100vw, 58vw"
              priority
            />
          ) : null}
        </div>
        <div className="hero-editorial-copy motion-rise">
          <p className="eyebrow">{site.tagline}</p>
          <h1 id="home-hero-title" className="hero-brand">
            CLARKY<span>3D</span>
          </h1>
          <p className="lede hero-lede">
            Made-to-order 3D prints. Browse the catalogue, pick filament colours, then order through
            Telegram.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/work">
              Browse catalogue
            </Link>
            <Link className="btn btn-secondary" href="/contact">
              Start an order
            </Link>
          </div>
        </div>
      </section>

      <section className="section-editorial" aria-labelledby="selected-heading">
        <div className="section-head-editorial">
          <p className="eyebrow">Selected work</p>
          <h2 id="selected-heading">Prints with context</h2>
          <p className="lede">
            Titles, categories, and prices from the published catalogue — not unexplained
            thumbnails.
          </p>
        </div>
        <div className="feature-stack">
          {selected.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              layout={index === 0 ? "feature" : "grid"}
              priority={index === 0}
            />
          ))}
        </div>
        <Link className="text-link" href="/work">
          View full catalogue
        </Link>
      </section>

      <section className="section-editorial" aria-labelledby="capabilities-heading">
        <div className="section-head-editorial">
          <p className="eyebrow">What you can do here</p>
          <h2 id="capabilities-heading">Buyer-facing capabilities</h2>
        </div>
        <ul className="capability-rail">
          <li>
            <h3>Browse by category</h3>
            <p>{categories.length} catalogue groups with real product photos and AUD prices.</p>
          </li>
          <li>
            <h3>Choose filament colours</h3>
            <p>
              {filaments.length} in-stock colours captured from the live library — or Lucky Dip.
            </p>
          </li>
          <li>
            <h3>Order made-to-order</h3>
            <p>Configure parts, add to cart, then message Telegram or send an enquiry.</p>
          </li>
        </ul>
        <Link className="text-link" href="/how-it-works">
          See how ordering works
        </Link>
      </section>

      <section className="section-editorial process-band" aria-labelledby="process-heading">
        <div className="section-head-editorial">
          <p className="eyebrow">Process</p>
          <h2 id="process-heading">From browse to print</h2>
          <p className="lede">All items are print on demand. No invented timelines.</p>
        </div>
        <ol className="process-steps">
          <li>
            <span className="step-index">01</span>
            <div>
              <h3>Pick a print</h3>
              <p>Open a product, read the description, check options and colour parts.</p>
            </div>
          </li>
          <li>
            <span className="step-index">02</span>
            <div>
              <h3>Set colours</h3>
              <p>Assign filament per part from the in-stock list, or leave Lucky Dip.</p>
            </div>
          </li>
          <li>
            <span className="step-index">03</span>
            <div>
              <h3>Send the order</h3>
              <p>Cart drafts a Telegram message, or use the enquiry form if you prefer email.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="section-editorial cta-band" aria-labelledby="cta-heading">
        <div className="section-head-editorial">
          <p className="eyebrow">Next step</p>
          <h2 id="cta-heading">Ready to order a print?</h2>
          <p className="lede">
            Start an enquiry with what you want printed, or open Telegram when the order handle is
            configured. Response timing is only stated if published separately.
          </p>
        </div>
        <div className="cta-row">
          <Link className="btn" href="/contact">
            Start an order
          </Link>
          <Link className="btn btn-secondary" href="/work">
            Inspect the catalogue
          </Link>
        </div>
      </section>
    </div>
  );
}
