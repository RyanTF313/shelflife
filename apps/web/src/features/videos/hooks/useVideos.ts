import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getVideos, createVideo } from "../api/videos";
import type { Video } from "@shelflife/shared";

export function useVideos(productId: string) {
  return useQuery({
    queryKey: ["videos", productId],
    queryFn: () => getVideos(productId),
    enabled: Boolean(productId),
  });
}

export function useCreateVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (video: Omit<Video, "id" | "views" | "clicks">) =>
      createVideo(video),
    onSuccess: (video) => {
      queryClient.invalidateQueries({ queryKey: ["videos", video.productId] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}