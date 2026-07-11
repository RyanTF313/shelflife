import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "@shelflife/shared";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Omit<Product, "id">) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: true });
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });
}

export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<Product>) => updateProduct(id, updates),
    onSuccess: (product) => {
      queryClient.setQueryData(["products", id], product);
      queryClient.invalidateQueries({ queryKey: ["products"], exact: true });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: ["products", id] });
      queryClient.invalidateQueries({ queryKey: ["products"], exact: true });
    },
  });
}
