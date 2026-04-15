import { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/products";
import ProductClient from "@/components/ProductClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse our latest collection of electronics, jewelry, and apparel at the best prices.",
};

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <ProductClient products={products} categories={categories} />;
}
