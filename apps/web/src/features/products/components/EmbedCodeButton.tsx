import { useState } from "react";
import { useToast } from "../../../components/Toast";
import { api } from "../../../lib/api-client";

type EmbedCodeButtonProps = {
  productId: string;
};

const EmbedCodeButton: React.FC<EmbedCodeButtonProps> = ({ productId }) => {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();
  const apiUrl = api.defaults.baseURL;
  const snippet = `<script src="${apiUrl}/widget.js" data-product-id="${productId}" data-api-url="${apiUrl}" async></script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      showToast("Embed code copied to clipboard");
    } catch {
      showToast("Couldn't copy embed code. Please copy it manually.", "error");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        {open ? "Hide Embed Code" : "Embed"}
      </button>
      {open && (
        <div className="mt-3 rounded-md border border-gray-200 bg-gray-50 p-3 text-left">
          <pre className="overflow-x-auto rounded bg-gray-900 p-3 text-xs text-gray-100">
            <code>{snippet}</code>
          </pre>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Copy to Clipboard
            </button>
            <a
              href={`/demo.html?productId=${productId}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Preview
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbedCodeButton;
