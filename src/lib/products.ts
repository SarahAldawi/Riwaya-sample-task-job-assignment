import type { Product } from "@/types/product";

async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retries = 3,
  timeout = 5000,
): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) throw new Error("Request failed");

    return res;
  } catch (err) {
    clearTimeout(timer);

    if (retries === 0) return null;

    await new Promise((r) => setTimeout(r, 400));
    return fetchWithRetry(url, options, retries - 1, timeout);
  }
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetchWithRetry("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });

  if (!res) return [];

  return res.json();
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!id) return null;

  try {
    const res = await fetchWithRetry(
      `https://fakestoreapi.com/products/${id}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res) {
      throw new Error("API Connection Failed");
    }

    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function getCategories(): Promise<string[]> {
  const res = await fetchWithRetry(
    "https://fakestoreapi.com/products/categories",
    { next: { revalidate: 3600 } },
  );

  if (!res) return [];

  return res.json();
}
