import { type Video } from "@shelflife/shared";
import { useState } from "react";
import FormField from "../../../components/FormField";
import SubmitButton from "../../../components/SubmitButton";

type VideoCreateFormProps = {
  onSubmit: (updates: Omit<Video, "id" | "views" | "clicks">) => void;
  isSubmitting?: boolean;
  productId: string;
};

const VideoCreateForm = ({
  onSubmit,
  isSubmitting,
  productId,
}: VideoCreateFormProps) => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ title, url: videoUrl, thumbnail: thumbnailUrl, productId });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label="Title" value={title} onChange={setTitle} />
      <FormField label="Video Url" value={videoUrl} onChange={setVideoUrl} multiline />
      <FormField
        label="Thumbnail URL"
        value={thumbnailUrl}
        onChange={setThumbnailUrl}
      />
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
};

export default VideoCreateForm;
