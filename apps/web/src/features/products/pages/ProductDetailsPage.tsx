import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import { useProduct } from "../hooks/useProducts";
import { useVideos } from "../../videos/hooks/useVideos";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id!);
  const { data: videos, isLoading: isVideoLoading, error: videoError } = useVideos(id!);

  if (isLoading || isVideoLoading) return <h2>Loading...</h2>;

  if (error || videoError || !product) return <h2>Something went wrong.</h2>;

  return <ProductDetails product={product} videos={videos} />;
}
