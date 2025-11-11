"use client";

import Image from "next/image";
import React from "react";
import { cloudinaryLoader } from "@/lib/cloudinaryLoader";

interface CImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fetchPriority?: "high" | "low" | "auto" | undefined;
  blurDataUrl?: string;
}

const CImage: React.FC<CImageProps> = ({
  publicId,
  alt,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  fetchPriority = "auto",
  className,
  blurDataUrl = publicId + "?w_10,h_10,c_fill,f_auto,q_10",
}) => {
  return (
    <Image
      loader={({ width: w }) => cloudinaryLoader({ src: publicId, width: w })}
      src={publicId}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={blurDataUrl}
      fetchPriority={fetchPriority}
      loading={priority ? "eager" : "lazy"}
    />
  );
};

export default CImage;
