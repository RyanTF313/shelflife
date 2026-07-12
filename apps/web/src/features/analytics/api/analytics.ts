import { api } from "../../../lib/api-client";

export const recordVideoView = async (videoId: string): Promise<void> => {
  await api.post(`/analytics/videos/${videoId}/views`);
};

export const recordVideoClick = async (videoId: string): Promise<void> => {
  await api.post(`/analytics/videos/${videoId}/clicks`);
};

export type ProductAnalyticsSummary = {
  productId: string;
  videoCount: number;
  totalViews: number;
  totalClicks: number;
};

export const getProductAnalytics = async (
  productId: string,
): Promise<ProductAnalyticsSummary> => {
  const { data } = await api.get(`/analytics/products/${productId}`);
  return data;
};
