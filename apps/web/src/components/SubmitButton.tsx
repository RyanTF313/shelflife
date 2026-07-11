type SubmitButtonProps = {
  isSubmitting?: boolean;
  disabled?: boolean;
  label?: string;
  submittingLabel?: string;
};

export default function SubmitButton({
  isSubmitting,
  disabled,
  label = "Save",
  submittingLabel = "Saving...",
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || disabled}
      className="self-start rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
    >
      {isSubmitting ? submittingLabel : label}
    </button>
  );
}
