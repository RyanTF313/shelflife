import { Link, useNavigate, useParams } from "react-router-dom";
import VideoCreateForm from "../components/VideoCreateForm";
import { useCreateVideo } from "../hooks/useVideos";

const VideoCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const createVideo = useCreateVideo();

  if (!id) return <h2 className="text-red-600">Something went wrong.</h2>;

  return (
    <div>
      <Link
        to={`/products/${id}`}
        className="text-sm text-indigo-600 hover:underline"
      >
        {"<-"} Back
      </Link>
      <div className="mt-4 max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-xl font-semibold text-gray-900">
          Add Video
        </h1>
        <VideoCreateForm
          isSubmitting={createVideo.isPending}
          onSubmit={(video) =>
            createVideo.mutate(video, {
              onSuccess: () => navigate(`/products/${id}`),
            })
          }
          productId={id}
        />
      </div>
    </div>
  );
};

export default VideoCreatePage;
