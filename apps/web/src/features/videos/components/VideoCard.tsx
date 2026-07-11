import type { Video } from "@shelflife/shared";
import { useDeleteVideo } from "../hooks/useVideos";
import { useToast } from "../../../components/Toast";

type VideoCardProps = {
  video: Video;
};

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { id, title, videoUrl, thumbnailUrl, views, clicks, productId } =
    video;
  const { showToast } = useToast();
  const { mutate: deleteVideo, isPending } = useDeleteVideo(productId);

  const handleDelete = () => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    deleteVideo(id, {
      onSuccess: () => showToast(`"${title}" deleted`),
      onError: () =>
        showToast("Failed to delete video. Please try again.", "error"),
    });
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {thumbnailUrl && (
        <img src={thumbnailUrl} className="h-32 w-full object-cover" />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="shrink-0 text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
        <p className="mt-1 truncate text-sm text-gray-500">{videoUrl}</p>
        <div className="mt-2 flex gap-3 text-xs text-gray-500">
          <span>{views} Views</span>
          <span>{clicks} Clicks</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
