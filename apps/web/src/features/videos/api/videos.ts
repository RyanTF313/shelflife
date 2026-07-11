import type { Video } from "@shelflife/shared";
import { api } from "../../../lib/api-client";

export const getVideos = async (productId: Video["productId"]) => {
  const { data } = await api.get(`/videos/${productId}`);
  return data;
};

export type UploadVideoInput = {
  file: File;
  title: string;
  productId: string;
  onProgress?: (percent: number) => void;
};

export const uploadVideo = async ({
  file,
  title,
  productId,
  onProgress,
}: UploadVideoInput): Promise<Video> => {
  const formData = new FormData();
  formData.append("video", file);
  formData.append("title", title);
  formData.append("productId", productId);

  const { data } = await api.post("/videos/upload", formData, {
    onUploadProgress: (event) => {
      if (onProgress && event.total) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    },
  });
  return data;
};

export const deleteVideo = async (id: string): Promise<void> => {
  await api.delete(`/videos/${id}`);
};
