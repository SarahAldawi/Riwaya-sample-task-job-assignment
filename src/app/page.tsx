import { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/products";
import ProductClient from "@/components/ProductClient";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse our latest collection of electronics, jewelry, and apparel at the best prices.",
};

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

  return <ProductClient products={products} categories={categories} />;
}
