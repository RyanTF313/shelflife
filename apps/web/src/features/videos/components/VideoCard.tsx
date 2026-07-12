import { useRef, useState } from "react";
import type { Video } from "@shelflife/shared";
import { useDeleteVideo } from "../hooks/useVideos";
import {
  useRecordVideoClick,
  useRecordVideoView,
} from "../../analytics/hooks/useAnalytics";
import { useToast } from "../../../components/Toast";

type VideoCardProps = {
  video: Video;
};

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { id, title, videoUrl, thumbnailUrl, views, clicks, productId } =
    video;
  const { showToast } = useToast();
  const { mutate: deleteVideo, isPending } = useDeleteVideo(productId);
  const { mutate: recordView } = useRecordVideoView(productId);
  const { mutate: recordClick } = useRecordVideoClick(productId);
  const hasRecordedView = useRef(false);
  const [revealed, setRevealed] = useState(false);

  const handleDelete = () => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    deleteVideo(id, {
      onSuccess: () => showToast(`"${title}" deleted`),
      onError: () =>
        showToast("Failed to delete video. Please try again.", "error"),
    });
  };

  const handlePlay = () => {
    if (hasRecordedView.current) return;
    hasRecordedView.current = true;
    recordView(id);
  };

  const handleThumbnailClick = () => {
    recordClick(id);
    setRevealed(true);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {revealed ? (
        <video
          src={videoUrl}
          poster={thumbnailUrl ?? undefined}
          controls
          autoPlay
          preload="metadata"
          onPlay={handlePlay}
          className="aspect-video w-full bg-black"
        />
      ) : (
        <button
          type="button"
          onClick={handleThumbnailClick}
          className="group relative aspect-video w-full bg-black"
        >
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/30">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-900">
              ▶
            </span>
          </span>
        </button>
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
