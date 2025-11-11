// components/YouTubeEmbed.tsx
"use client";

import { useEffect, useState } from "react";

interface YouTubeEmbedProps {
  embedCode: string;
}

export default function YouTubeEmbed({ embedCode }: YouTubeEmbedProps) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    // Extract src from iframe embed code using regex
    const iframeRegex = /<iframe[^>]*src=["']([^"']+)["'][^>]*>/i;
    const match = embedCode.match(iframeRegex);
    if (match) {
      setSrc(match[1]);
    }
  }, [embedCode]);

  if (!src) {
    return null;
  }

  return (
    <div className="relative aspect-video w-full max-w-2xl mx-auto">
      <iframe
        src={src}
        title="YouTube Video Embed"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-presentation"
        className="w-full h-full rounded-2xl"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
