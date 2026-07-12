import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import ErrorState from "../../../components/ErrorState";
import { useProduct } from "../hooks/useProducts";
import { useVideos } from "../../videos/hooks/useVideos";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error, refetch } = useProduct(id!);
  const {
    data: videos,
    isLoading: isVideoLoading,
    error: videoError,
    refetch: refetchVideos,
  } = useVideos(id!);

  if (isLoading || isVideoLoading)
    return <h2 className="text-gray-600">Loading...</h2>;

  if (error || videoError || !product)
    return (
      <ErrorState
        message="Couldn't load this product."
        onRetry={() => {
          refetch();
          refetchVideos();
        }}
      />
    );

  return <ProductDetails product={product} videos={videos ?? []} />;
}
