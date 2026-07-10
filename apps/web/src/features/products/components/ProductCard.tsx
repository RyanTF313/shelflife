import { Link } from "react-router-dom";
import type { Product } from "@shelflife/shared";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, description, image } = product;

  return (
    <Link
      to={`/products/${id}`}
      className="block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <img src={image} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
