import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import EmptyState from "../../../components/EmptyState";
import ErrorState from "../../../components/ErrorState";
import { useProducts } from "../hooks/useProducts";

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="h-40 w-full bg-gray-200" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-2/3 rounded bg-gray-200" />
        <div className="h-3 w-full rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function ProductListPage() {
  const { data, isLoading, error, refetch } = useProducts();

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Products</h2>
          {!isLoading && !error && (
            <p className="text-sm text-gray-500">
              {data?.length ?? 0} {data?.length === 1 ? "product" : "products"}
            </p>
          )}
        </div>
        <Link
          to="/products/new"
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          New Product
        </Link>
      </div>

      {isLoading && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <ErrorState message="Couldn't load products." onRetry={() => refetch()} />
      )}

      {!isLoading && !error && data?.length === 0 && (
        <EmptyState
          title="No products yet"
          description="Create your first product to start uploading videos."
          action={
            <Link
              to="/products/new"
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
            >
              New Product
            </Link>
          }
        />
      )}

      {!isLoading && !error && data && data.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
}
