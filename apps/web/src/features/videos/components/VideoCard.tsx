import type { Video } from "@shelflife/shared";

type VideoCardProps = {
  video: Video;
};

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { title, url, thumbnail, views, clicks } = video;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <img src={thumbnail} className="h-32 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 truncate text-sm text-gray-500">{url}</p>
        <div className="mt-2 flex gap-3 text-xs text-gray-500">
          <span>{views} Views</span>
          <span>{clicks} Clicks</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
