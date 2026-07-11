export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  publicId: string;
  duration: number | null;
  width: number | null;
  height: number | null;
  productId: string;
  views: number;
  clicks: number;
}