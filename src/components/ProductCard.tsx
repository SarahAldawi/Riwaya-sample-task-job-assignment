import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => (
  <Link
    href={`/product/${product.id}`}
    className="group block animate-fade-in"
    style={{ animationDelay: `${index * 30}ms` }}
  >
    <div className="overflow-hidden rounded-lg bg-card border border-border shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
      <div className="relative aspect-square bg-secondary p-8 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority={index < 8}
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 h-4 overflow-hidden">
          {product.category}
        </p>

        <h3 className="text-base font-medium leading-snug line-clamp-2 mb-3 h-[40px]">
          {product.title}
        </h3>

        <p className="text-lg font-semibold text-foreground">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  </Link>
);

export default ProductCard;
