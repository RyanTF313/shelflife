import type { Video } from "@shelflife/shared";
import { api } from "../../../lib/api-client";

export const getVideos = async (productId: Video["productId"]) => {
  const { data } = await api.get(`/videos/${productId}`);
  return data;
};

export const createVideo = async (
  video: Omit<Video, "id" | "views" | "clicks">,
) => {
  const { data } = await api.post("/videos", video);
  return data;
};
