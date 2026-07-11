import { useRef, useState } from "react";
import FormField from "../../../components/FormField";
import SubmitButton from "../../../components/SubmitButton";

type VideoCreateFormProps = {
  onSubmit: (input: { file: File; title: string }) => void;
  isSubmitting?: boolean;
  progress?: number;
};

const VideoCreateForm = ({
  onSubmit,
  isSubmitting,
  progress = 0,
}: VideoCreateFormProps) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectFile = (selected: File | null | undefined) => {
    if (!selected) return;
    setFile(selected);
    if (!title) {
      setTitle(selected.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !title) return;
    onSubmit({ file, title });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label="Title" value={title} onChange={setTitle} />

      <div className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Video File
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors ${
            isDragging
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(event) => selectFile(event.target.files?.[0])}
          />
          {file ? (
            <>
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-700">
                Drag & drop a video here, or click to browse
              </p>
              <p className="text-xs text-gray-500">MP4, MOV, WebM supported</p>
            </>
          )}
        </div>
      </div>

      {isSubmitting && (
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <SubmitButton
        isSubmitting={isSubmitting}
        disabled={!file || !title}
        label="Upload"
        submittingLabel={`Uploading... ${progress}%`}
      />
    </form>
  );
};

export default VideoCreateForm;
