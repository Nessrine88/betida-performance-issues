"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import CImage from "@/lib/CIdImage";

interface SliderItemProps {
  videoUrl?: string;
  imageUrl?: string;
  alt?: string;
}

export default function SliderItem({
  videoUrl,
  imageUrl,
  alt,
}: SliderItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const effectiveAlt = alt || "";

  const hasVideo = videoUrl && videoUrl.trim() !== "";
  const hasImage = imageUrl && imageUrl.trim() !== "";

  if (!hasVideo && !hasImage) {
    return null;
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (hasVideo) {
    return (
      <div className="relative flex-shrink-0 w-24 md:w-36 h-48 md:h-60 snap-center bg-background rounded-2xl overflow-hidden border border-chart-3/55 cursor-pointer group">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlayPause}
        />
        <button
          aria-label="play"
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-foreground" />
          ) : (
            <Play className="w-8 h-8 text-foreground" />
          )}
        </button>
      </div>
    );
  }

  if (hasImage) {
    const fullImageUrl = imageUrl;
    return (
      <div className="flex-shrink-0 w-24 md:w-36 h-48 md:h-60 snap-center bg-background rounded-2xl overflow-hidden border border-chart-3/55">
        <CImage
          publicId={fullImageUrl}
          alt={effectiveAlt}
          className="object-cover"
          sizes="96px"
        />
      </div>
    );
  }

  return null;
}
