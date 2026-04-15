"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";

import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import SiteHeader from "@/components/SiteHeader";

interface Props {
  products: Product[];
  categories: string[];
}

export default function ProductClient({ products, categories }: Props) {
  const [category, setCategory] = useState("");

  const maxPrice = useMemo(() => {
    if (!products || products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map((p) => p.price)));
  }, [products]);

  const [priceRange, setPriceRange] = useState<[number, number]>(() => [
    0,
    maxPrice,
  ]);

  const [prevProducts, setPrevProducts] = useState(products);
  if (products !== prevProducts) {
    setPrevProducts(products);
    setPriceRange([0, maxPrice]);
  }

  const filtered = useMemo(() => {
    return products.filter(
      (p) =>
        (!category || p.category === category) &&
        p.price >= priceRange[0] &&
        p.price <= priceRange[1],
    );
  }, [products, category, priceRange]);

  const isLoading = products.length === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="py-10 container mx-auto px-4">
        <h1 className="text-4xl font-bold">Our Collection</h1>
      </div>

      <FilterBar
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
        priceRange={priceRange}
        maxPrice={maxPrice}
        onPriceChange={setPriceRange}
      />

      <main className="flex-1 container mx-auto px-4 pb-16">
        <ProductGrid products={filtered} isLoading={isLoading} />
      </main>
    </div>
  );
}
