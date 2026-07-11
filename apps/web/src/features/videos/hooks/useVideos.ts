import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getVideos,
  uploadVideo,
  deleteVideo,
  type UploadVideoInput,
} from "../api/videos";
import type { Video } from "@shelflife/shared";

export function useVideos(productId: string) {
  return useQuery({
    queryKey: ["videos", productId],
    queryFn: () => getVideos(productId),
    enabled: Boolean(productId),
  });
}

export function useUploadVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UploadVideoInput) => uploadVideo(input),
    onSuccess: (video: Video) => {
      queryClient.invalidateQueries({
        queryKey: ["videos", video.productId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["products", video.productId],
        exact: true,
      });
    },
  });
}

export function useDeleteVideo(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videos", productId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["products", productId],
        exact: true,
      });
    },
  });
}
