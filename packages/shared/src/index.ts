export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  productId: string;
  views: number;
  clicks: number;
}