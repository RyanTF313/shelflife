import { useState } from "react";
import type { Product } from "@shelflife/shared";
import FormField from "../../../components/FormField";
import SubmitButton from "../../../components/SubmitButton";

type ProductFormProps = {
  product?: Partial<Product>;
  onSubmit: (updates: Partial<Product>) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  submittingLabel?: string;
};

const ProductForm: React.FC<ProductFormProps> = ({
  product = {},
  onSubmit,
  isSubmitting,
  submitLabel,
  submittingLabel,
}) => {
  const [name, setName] = useState(product.name ?? "");
  const [description, setDescription] = useState(product.description ?? "");
  const [image, setImage] = useState(product.image ?? "");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ name, description, image });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label="Name" value={name} onChange={setName} />
      <FormField
        label="Description"
        value={description}
        onChange={setDescription}
        multiline
      />
      <FormField label="Image URL" value={image} onChange={setImage} />
      <SubmitButton
        isSubmitting={isSubmitting}
        label={submitLabel}
        submittingLabel={submittingLabel}
      />
    </form>
  );
};

export default ProductForm;
