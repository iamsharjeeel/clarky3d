import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getSiteSettings } from "@/lib/content/load";

export default function SpatialProjectConceptPage() {
  const site = getSiteSettings();
  const product = getProductBySlug("base-case");
  if (!product) return null;

  return (
    <div className="sp-shell">
      <p className="concept-banner">NON-PRODUCTION CONCEPT B · Spatial project · noindex</p>
      <header className="sp-top">
        <Link className="ed-brand" href="/design-concepts/spatial">
          {site.brandName.replace("3D", "")}
          <span>3D</span>
        </Link>
        <Link className="ed-cta" href="/contact">
          Enquire
        </Link>
      </header>
      <div className="sp-stage">
        <div className="sp-hero">
          <div className="sp-panel sp-panel-media">
            <Image
              src={product.cover.src}
              alt={product.cover.alt}
              width={1100}
              height={820}
              priority
            />
          </div>
          <div className="sp-panel">
            <p className="sp-chip">Project bay</p>
            <h1 className="sp-brand" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>
              {product.title}
            </h1>
            <p>{product.summary}</p>
            <p className="meta">
              ${product.priceAud} {site.currencyLabel} · Made to order
            </p>
            <Link className="ed-cta" href="/contact" style={{ marginTop: "1rem" }}>
              Start an order
            </Link>
          </div>
        </div>
        <div className="sp-bay-grid">
          <article className="sp-bay wide sp-panel">
            <h2>Delivered work</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{product.description}</p>
          </article>
          <article className="sp-bay sp-panel">
            <h2>Colour parts</h2>
            <ul>
              {product.colourParts.map((part) => (
                <li key={part}>{part}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}
