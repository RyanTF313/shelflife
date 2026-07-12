import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import ErrorState from "../../../components/ErrorState";
import { useProduct, useUpdateProduct } from "../hooks/useProducts";

export default function ProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error, refetch } = useProduct(id ?? "");
  const updateProduct = useUpdateProduct(id ?? "");

  if (!id) return <ErrorState message="Something went wrong." />;

  if (isLoading) return <h2 className="text-gray-600">Loading...</h2>;

  if (error || !product)
    return (
      <ErrorState
        message="Couldn't load this product."
        onRetry={() => refetch()}
      />
    );

  return (
    <div>
      <Link
        to={`/products/${id}`}
        className="text-sm text-indigo-600 hover:underline"
      >
        {"<-"} Back
      </Link>
      <div className="mt-4 max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-xl font-semibold text-gray-900">
          Edit Product
        </h1>
        <ProductForm
          product={product}
          isSubmitting={updateProduct.isPending}
          onSubmit={(updates) =>
            updateProduct.mutate(updates, {
              onSuccess: () => navigate(`/products/${id}`),
            })
          }
        />
      </div>
    </div>
  );
}
