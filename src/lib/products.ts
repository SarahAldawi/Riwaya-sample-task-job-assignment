import { z } from "zod";
import rawProducts from "@/data/products.json";
import rawCategories from "@/data/categories.json";

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string().url(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
});

const ProductArraySchema = z.array(ProductSchema);
const CategoryArraySchema = z.array(z.string());

export type Product = z.infer<typeof ProductSchema>;

export const seedProducts = ProductArraySchema.parse(rawProducts);
export const seedCategories = CategoryArraySchema.parse(rawCategories);

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("API failed");

    return await res.json();
  } catch {
    return fallback;
  }
}

export async function getProducts(): Promise<Product[]> {
  return safeFetch<Product[]>(
    "https://fakestoreapi.com/products",
    seedProducts,
  );
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!id) return null;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error();

    return await res.json();
  } catch {
    return seedProducts.find((p) => p.id === Number(id)) ?? null;
  }
}

export async function getCategories(): Promise<string[]> {
  return safeFetch<string[]>(
    "https://fakestoreapi.com/products/categories",
    seedCategories,
  );
}
