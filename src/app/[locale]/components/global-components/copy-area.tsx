"use client";

import { toast } from "sonner";
import CopyIconSVG from "../../components/common/svg_icons/copy-icon-svg";
import { useCallback } from "react";

interface CopyAreaProps {
  code: string;
  label?: string;
  successMessage?: string;
  errorMessage?: string;
  emptyMessage?: string;
  reveal?: boolean;
}

export default function CopyArea({
  code,
  label = "Copy Code",
  successMessage = "Copied to clipboard!",
  errorMessage = "Failed to copy",
  emptyMessage = "No code available to copy",
  reveal = true,
}: CopyAreaProps) {
  const handleCopy = useCallback(async () => {
    if (!code) {
      toast.error(emptyMessage);
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      toast.success(successMessage);
    } catch {
      toast.error(errorMessage);
    }
  }, [code, emptyMessage, successMessage, errorMessage]);

  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-sm text-white/55 inline-block">
          {label}
        </label>
      )}

      <div className="flex items-center bg-background-2 gap-2 rounded-lg px-4 py-2">
        <input
          type={reveal ? "text" : "password"}
          value={code}
          readOnly
          className="w-full inline-block bg-transparent text-white text-sm outline-none cursor-text"
        />

        <button
          onClick={handleCopy}
          disabled={!reveal}
          className={`cursor-pointer p-1 group transition-opacity ${
            reveal ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
          aria-label="Copy"
        >
          <CopyIconSVG
            className={`fill-white transition-all ${
              reveal ? "group-hover:scale-125" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
