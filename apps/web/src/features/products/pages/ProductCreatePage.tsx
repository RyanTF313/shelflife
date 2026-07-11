import { Link, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useCreateProduct } from "../hooks/useProducts";
import { useToast } from "../../../components/Toast";

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const { showToast } = useToast();

  return (
    <div>
      <Link to="/" className="text-sm text-indigo-600 hover:underline">
        {"<-"} Back to Products
      </Link>
      <div className="mt-4 max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-xl font-semibold text-gray-900">
          New Product
        </h1>
        <ProductForm
          isSubmitting={createProduct.isPending}
          submitLabel="Create"
          submittingLabel="Creating..."
          onSubmit={(updates) =>
            createProduct.mutate(
              {
                name: updates.name ?? "",
                description: updates.description ?? "",
                image: updates.image ?? "",
              },
              {
                onSuccess: (product) => {
                  showToast(`"${product.name}" created`);
                  navigate(`/products/${product.id}`);
                },
                onError: () => {
                  showToast("Failed to create product. Please try again.", "error");
                },
              }
            )
          }
        />
      </div>
    </div>
  );
}
