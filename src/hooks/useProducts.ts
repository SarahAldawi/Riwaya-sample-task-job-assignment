import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";

const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
};

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetcher<Product[]>("https://fakestoreapi.com/products"),
  });

export const useProduct = (id: string) =>
  useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetcher<Product>(`https://fakestoreapi.com/products/${id}`),
    enabled: !!id,
  });

export const useCategories = () =>
  useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: () =>
      fetcher<string[]>("https://fakestoreapi.com/products/categories"),
  });
