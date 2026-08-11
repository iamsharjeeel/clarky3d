import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata/create-metadata";
import { getProductBySlug, getProducts, getSiteSettings } from "@/lib/content/load";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return createMetadata({
      title: "Product not found",
      description: "This product is not in the published catalogue.",
      path: `/work/${slug}`,
      noIndex: true,
    });
  }
  return createMetadata({
    title: product.seo.title ?? product.title,
    description: product.seo.description,
    path: `/work/${product.slug}`,
    noIndex: product.seo.noindex,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const site = getSiteSettings();

  return (
    <article className="stack">
      <p className="meta">
        <Link href="/work">Catalogue</Link> / {product.categoryId.replace(/_/g, " ")} /{" "}
        {product.title}
      </p>
      <header className="stack">
        <h1 className="page-title">{product.title}</h1>
        <p className="price">
          ${product.priceAud} {site.currencyLabel}
        </p>
        <p className="meta">Made to order</p>
      </header>
      <div className="panel stack">
        <h2 className="meta">About this print</h2>
        <p className="lede" style={{ whiteSpace: "pre-wrap" }}>
          {product.description}
        </p>
      </div>
      {product.colourParts.length > 0 ? (
        <div className="panel stack">
          <h2 className="meta">Print colours</h2>
          <ul>
            {product.colourParts.map((part) => (
              <li key={part}>{part}</li>
            ))}
          </ul>
          <p className="meta">
            Colour selection UI arrives in M2/M3. Ordering currently routes through the contact
            page.
          </p>
        </div>
      ) : null}
      {product.cover.rightsStatus !== "approved" ? (
        <p className="draft-note">
          Product photography is linked from the live site for development reference only. Do not
          treat media as rights-cleared for production launch.
        </p>
      ) : null}
      <Link className="btn" href="/contact">
        Start an order
      </Link>
    </article>
  );
}
