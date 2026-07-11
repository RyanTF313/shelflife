import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function ProductListPage() {
  const { data, isLoading, error } = useProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Products</h2>
        <Link
          to="/products/new"
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          New Product
        </Link>
      </div>

      {isLoading && <h2 className="mt-4 text-gray-600">Loading...</h2>}
      {error && (
        <h2 className="mt-4 text-red-600">Something went wrong.</h2>
      )}

      {!isLoading && !error && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
}
