import { useState } from "react";
import { ClipboardDocumentIcon } from "../components/icons/ClipboardDocumentIcon";

export function CopyToClipboardButton({
  text,
}: {
  readonly text: string;
}): JSX.Element {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      disabled={isClicked}
      type="button"
      className="flex items-center gap-1 rounded-lg border border-neutral-300 p-2 font-mono text-xs font-bold text-neutral-500 transition enabled:hover:shadow-lg disabled:scale-90 disabled:text-neutral-200"
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => {
          setIsClicked(true);
        });
      }}
    >
      {isClicked ? "Copied" : text}
      <ClipboardDocumentIcon variant={isClicked ? "check" : "list"} />
    </button>
  );
}
