import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import VideoCreateForm from "../components/VideoCreateForm";
import { useUploadVideo } from "../hooks/useVideos";
import { useToast } from "../../../components/Toast";

const VideoCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const uploadVideo = useUploadVideo();
  const { showToast } = useToast();
  const [progress, setProgress] = useState(0);

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
          isSubmitting={uploadVideo.isPending}
          progress={progress}
          onSubmit={({ file, title }) => {
            setProgress(0);
            uploadVideo.mutate(
              { file, title, productId: id, onProgress: setProgress },
              {
                onSuccess: () => {
                  showToast(`"${title}" uploaded successfully`);
                  navigate(`/products/${id}`);
                },
                onError: () => {
                  showToast("Video upload failed. Please try again.", "error");
                },
              },
            );
          }}
        />
      </div>
    </div>
  );
};

export default VideoCreatePage;
