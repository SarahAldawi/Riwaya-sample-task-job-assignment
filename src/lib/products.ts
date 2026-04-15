import { cache } from "react";
import { z } from "zod";

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

async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retries = 3,
  timeout = 5000,
): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res;
  } catch (err) {
    clearTimeout(timer);
    if (retries === 0) {
      console.error(`[fetchWithRetry] All retries exhausted for: ${url}`);
      return null;
    }
    const attempt = 3 - retries;
    const delay = 2 ** attempt * 300;
    await new Promise((r) => setTimeout(r, delay));
    return fetchWithRetry(url, options, retries - 1, timeout);
  }
}

export const getProducts = cache(async (): Promise<Product[]> => {
  const res = await fetchWithRetry("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });

  if (!res) return [];

  const raw = await res.json();
  const parsed = ProductArraySchema.safeParse(raw);

  if (!parsed.success) {
    console.error(
      "[getProducts] Invalid response shape:",
      parsed.error.flatten(),
    );
    return [];
  }

  return parsed.data;
});

export const getProduct = cache(async (id: string): Promise<Product | null> => {
  if (!id) return null;

  const res = await fetchWithRetry(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res) return null;

  const raw = await res.json();
  const parsed = ProductSchema.safeParse(raw);

  if (!parsed.success) {
    console.error(
      `[getProduct] Invalid shape for id ${id}:`,
      parsed.error.flatten(),
    );
    return null;
  }

  return parsed.data;
});

export const getCategories = cache(async (): Promise<string[]> => {
  const res = await fetchWithRetry(
    "https://fakestoreapi.com/products/categories",
    { next: { revalidate: 3600 } },
  );

  if (!res) return [];

  const raw = await res.json();
  const parsed = CategoryArraySchema.safeParse(raw);

  if (!parsed.success) {
    console.error(
      "[getCategories] Invalid response shape:",
      parsed.error.flatten(),
    );
    return [];
  }

  return parsed.data;
});
