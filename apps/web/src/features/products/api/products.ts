import type { Product } from "@shelflife/shared";
import { api } from "../../../lib/api-client";

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get("/products");
  return data;
}

export async function getProduct(id: string): Promise<Product> {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function createProduct(
  product: Omit<Product, "id">
): Promise<Product> {
  const { data } = await api.post("/products", product);
  return data;
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<Product> {
  const { data } = await api.patch(`/products/${id}`, updates);
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/products/${id}`);
}
