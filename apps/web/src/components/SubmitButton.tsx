type SubmitButtonProps = {
  isSubmitting?: boolean;
};

export default function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="self-start rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
    >
      {isSubmitting ? "Saving..." : "Save"}
    </button>
  );
}
