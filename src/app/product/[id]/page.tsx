import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import { getProduct, getProducts } from "@/lib/products";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((p) => ({
    id: String(p.id),
  }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product does not exist.",
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}

/* ---------------- Page ---------------- */
export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 font-body"
        >
          ← Back to collection
        </Link>

        <div className="grid md:grid-cols-2 gap-12 animate-fade-in">
          {/* Image */}
          <div className="bg-secondary rounded-lg p-10 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              priority
              className="object-contain max-h-[500px]"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              {product.category}
            </p>

            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {product.title}
            </h1>

            <p className="text-3xl font-semibold mb-6">
              ${product.price.toFixed(2)}
            </p>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">
                ⭐ {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </main>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: product.image,
            description: product.description,
            brand: {
              "@type": "Brand",
              name: "The Store",
            },
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            category: product.category,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating.rate,
              reviewCount: product.rating.count,
            },
          }),
        }}
      />
    </div>
  );
}
