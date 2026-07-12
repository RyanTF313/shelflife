type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="mt-4 flex flex-col items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-gray-500">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
