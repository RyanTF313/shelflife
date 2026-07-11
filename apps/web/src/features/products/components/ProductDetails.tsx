import { Link, useNavigate } from "react-router-dom";
import type { Product, Video } from "@shelflife/shared";
import VideoCard from "../../videos/components/VideoCard";
import { useDeleteProduct } from "../hooks/useProducts";
import { useToast } from "../../../components/Toast";

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
        <div className="mt-2 flex gap-2">
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
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Videos</h2>
          <Link
            to={`/products/${product.id}/videos/create`}
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Add Video
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos?.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
