import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, getSiteSettings } from "@/lib/content/load";

export default function SpatialConceptPage() {
  const site = getSiteSettings();
  const featured = getFeaturedProducts().slice(0, 4);
  const hero = featured[0];

  return (
    <div className="sp-shell">
      <p className="concept-banner">NON-PRODUCTION CONCEPT B · Spatial Studio · noindex</p>
      <header className="sp-top">
        <Link className="ed-brand" href="/design-concepts/spatial">
          {site.brandName.replace("3D", "")}
          <span>3D</span>
        </Link>
        <nav className="ed-nav" aria-label="Concept primary">
          <Link href="/design-concepts/spatial" aria-current="page">
            Home
          </Link>
          <Link href="/design-concepts/spatial/project">Project</Link>
          <Link href="/design-concepts">All concepts</Link>
        </nav>
        <Link className="ed-cta" href="/contact">
          Order bay
        </Link>
      </header>

      <div className="sp-stage">
        <section className="sp-hero" aria-labelledby="sp-hero-title">
          <div className="sp-panel">
            <p className="sp-chip">{site.tagline}</p>
            <h1 id="sp-hero-title" className="sp-brand">
              CLARKY<span>3D</span>
            </h1>
            <p>
              Dimensional catalogue staging: browse prints, lock filament colours, then message the
              order channel.
            </p>
            <div className="ed-actions" style={{ marginTop: "1.25rem" }}>
              <Link className="ed-cta" href="/work">
                Enter catalogue
              </Link>
              <Link className="ed-cta ed-cta-ghost" href="/contact">
                Start enquiry
              </Link>
            </div>
          </div>
          <div className="sp-panel sp-panel-media">
            {hero ? (
              <Image src={hero.cover.src} alt={hero.cover.alt} width={1100} height={820} priority />
            ) : null}
          </div>
        </section>

        <section className="sp-bay-grid" aria-label="Selected work bays">
          {featured.map((product, index) => (
            <article className={`sp-bay ${index === 0 ? "wide" : ""}`} key={product.slug}>
              <div className="sp-panel" style={{ padding: 0, overflow: "hidden" }}>
                <Image src={product.cover.src} alt={product.cover.alt} width={900} height={560} />
              </div>
              <p className="sp-chip">
                {product.subcategoryId.replace(/_/g, " ")} · ${product.priceAud}
              </p>
              <h2 style={{ margin: 0, fontSize: "1.25rem" }}>{product.title}</h2>
              <Link href="/design-concepts/spatial/project">Inspect bay</Link>
            </article>
          ))}
        </section>
      </div>

      <aside className="ed-notes">
        <p>
          <strong>Recognizably Clarky3D:</strong> cyan chips, pixel brand, hard offset panels, real
          product media.
        </p>
        <p>
          <strong>Different from legacy:</strong> perspective media stage, 12-column bay grid,
          layered depth instead of flat equal cards.
        </p>
        <p>
          <strong>Motion:</strong> subtle hover perspective; removed under reduced-motion.
          <strong> Risk:</strong> depth can compete with copy on small screens; heavier compositing
          than Editorial.
        </p>
      </aside>
    </div>
  );
}
