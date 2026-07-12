import { Link, useNavigate } from "react-router-dom";
import type { Product, Video } from "@shelflife/shared";
import VideoCard from "../../videos/components/VideoCard";
import { useDeleteProduct } from "../hooks/useProducts";
import { useToast } from "../../../components/Toast";
import EmptyState from "../../../components/EmptyState";
import EmbedCodeButton from "./EmbedCodeButton";

type ProductDetailsProps = {
  product: Product;
  videos: Video[];
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  videos,
}) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDelete = () => {
    if (
      !window.confirm(
        `Delete "${product.name}" and all of its videos? This cannot be undone.`,
      )
    )
      return;
    deleteProduct(product.id, {
      onSuccess: () => {
        showToast(`"${product.name}" deleted`);
        navigate("/");
      },
      onError: () =>
        showToast("Failed to delete product. Please try again.", "error"),
    });
  };

  return (
    <div>
      <Link to="/" className="text-sm text-indigo-600 hover:underline">
        {"<-"} Back to Products
      </Link>
      <div className="mt-4 flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <img
          src={product.image}
          className="h-48 w-48 rounded-md object-cover"
        />
        <h1 className="text-2xl font-semibold text-gray-900">
          {product.name}
        </h1>
        <p className="text-center text-gray-600">{product.description}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <Link
            to={`/products/${product.id}/analytics`}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Analytics
          </Link>
          <Link
            to={`/products/${product.id}/edit`}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
        <div className="mt-2 w-full max-w-md">
          <EmbedCodeButton productId={product.id} />
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Videos</h2>
          <Link
            to={`/products/${product.id}/videos/create`}
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Add Video
          </Link>
        </div>
        {videos.length === 0 ? (
          <EmptyState
            title="No videos yet"
            description="Add a video to start tracking views and clicks for this product."
            action={
              <Link
                to={`/products/${product.id}/videos/create`}
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Add Video
              </Link>
            }
          />
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
