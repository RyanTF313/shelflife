import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProductAnalytics,
  recordVideoClick,
  recordVideoView,
} from "../api/analytics";

export function useRecordVideoView(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: string) => recordVideoView(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videos", productId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["analytics", "product", productId],
        exact: true,
      });
    },
  });
}

export function useRecordVideoClick(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: string) => recordVideoClick(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videos", productId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["analytics", "product", productId],
        exact: true,
      });
    },
  });
}

export function useProductAnalytics(productId: string) {
  return useQuery({
    queryKey: ["analytics", "product", productId],
    queryFn: () => getProductAnalytics(productId),
    enabled: Boolean(productId),
  });
}
