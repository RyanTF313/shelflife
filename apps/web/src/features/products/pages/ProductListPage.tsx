import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function ProductListPage() {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <h2 className="text-gray-600">Loading...</h2>;

  if (error) return <h2 className="text-red-600">Something went wrong.</h2>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
