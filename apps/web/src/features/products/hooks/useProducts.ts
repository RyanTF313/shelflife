import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "@shelflife/shared";
import { getProducts, getProduct, updateProduct } from "../api/products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
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
