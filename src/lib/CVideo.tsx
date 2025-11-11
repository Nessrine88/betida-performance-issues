"use client";

import React from "react";
import { CldVideoPlayer } from "next-cloudinary"; 
import { TRANSFORM_BY_SIZE } from "@/config/cloudinary";

interface CVideoProps {
  publicId: string;
  width?: keyof typeof TRANSFORM_BY_SIZE | number; 
  height?: number; 
  priority?: boolean;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  colors?: { base?: string; text?: string; accent?: string }; 
  [key: string]: any; 
}

const CVideo: React.FC<CVideoProps> = ({
  publicId,
  width = "md", 
  height = TRANSFORM_BY_SIZE["md"].width * 0.5625, 
  priority = false,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  controls = true,
  colors, 
  ...props
}) => {
  const effectiveWidth =
    typeof width === "string"
      ? TRANSFORM_BY_SIZE[width as keyof typeof TRANSFORM_BY_SIZE].width
      : width;

  return (
    <CldVideoPlayer
      src={publicId}
      width={effectiveWidth}
      height={height}
      className={className}
      autoPlay={priority ? autoPlay : false} 
      muted={muted}
      loop={loop}
      controls={controls}
      colors={colors}
      {...props}
    />
  );
};

export default CVideo;
