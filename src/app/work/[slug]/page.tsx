import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductConfigurator } from "@/components/work/ProductConfigurator";
import {
  getCategoryById,
  getFilaments,
  getProductBySlug,
  getProducts,
  getSiteSettings,
} from "@/lib/content/load";
import { createMetadata } from "@/lib/metadata/create-metadata";
import { productJsonLd } from "@/lib/seo/jsonld";

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
  const category = getCategoryById(product.categoryId);
  const filaments = getFilaments()
    .filter((filament) => filament.status === "In Stock")
    .map((filament) => filament.name);

  return (
    <article className={`product-detail theme-${category?.themeToken ?? "misc"}`}>
      <JsonLd data={productJsonLd(product)} />
      <p className="meta breadcrumb">
        <Link href="/work">Catalogue</Link> / {category?.title ?? product.categoryId} /{" "}
        {product.title}
      </p>
      <div className="product-split">
        <div className="product-gallery stack">
          {product.photos.map((photo) => (
            <figure key={photo.src} className="panel media-frame">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={900}
                height={700}
                className="detail-image"
                priority={photo.src === product.cover.src}
              />
            </figure>
          ))}
        </div>
        <div className="stack">
          <header className="panel stack">
            <h1 className="page-title" style={{ marginBottom: 0 }}>
              {product.title}
            </h1>
            <p className="price">
              ${product.priceAud} {site.currencyLabel}
            </p>
            <p className="meta">Made to order</p>
          </header>
          <div className="panel stack">
            <h2 className="meta">About this print</h2>
            <p className="lede" style={{ whiteSpace: "pre-wrap", margin: 0 }}>
              {product.description}
            </p>
          </div>
          {product.options.length > 0 ? (
            <div className="panel stack">
              <h2 className="meta">Options</h2>
              {product.options.map((option) => (
                <div key={option.name}>
                  <p>{option.name}</p>
                  <ul>
                    {option.choices.map((choice) => (
                      <li key={choice}>{choice}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
          <ProductConfigurator
            product={product}
            categoryLabel={`${category?.title ?? product.categoryId} / ${product.subcategoryId.replace(/_/g, " ")}`}
            filamentNames={filaments}
          />
          {product.cover.rightsStatus !== "approved" ? (
            <p className="draft-note">
              Product photography is retained from the live site for development reference only.
              Rights are not cleared for production launch.
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
