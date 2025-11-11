"use client";

import { useRouter } from "@/i18n/navigation";
import BackSVG from "../common/svg_icons/back-svg";
import BackRedirectHandler from "../common/Back-redirect-handler";

interface BackButtonProps {
  className?: string; // optional styling
}

export default function BackButton({ className }: BackButtonProps) {
  const router = useRouter();

  return (
    <>
      <BackRedirectHandler />
      <button
        aria-label="back"
        onClick={() => router.back()}
        className={`cursor-pointer inline-block p-2 ${className || ""}`}
      >
        <BackSVG size={30} />
      </button>
    </>
  );
}
