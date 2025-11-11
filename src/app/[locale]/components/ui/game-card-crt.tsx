"use client";

import { TRANSFORM_BY_SIZE } from "@/config/cloudinary";
import { useLQIP } from "@/lib/useLQIP";
import { CldImage } from "next-cloudinary";

export type GameCardCRTProps = {
  publicId: string; // Cloudinary public ID
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
  id?: number;
  players?: number;
  type?: string; // casino / sport
};

export default function GameCardCRT({
  publicId,
  alt,
  size = "sm",
  className = "",
  priority,
  id,
  players,
  type,
}: GameCardCRTProps) {
  const { name: transform, width } = TRANSFORM_BY_SIZE[size];
  const height = Math.round((width * 9) / 16);
  const blurDataURL = useLQIP(publicId);

  const fallbackTitle =
    alt ||
    publicId
      .split("/")
      .pop()
      ?.replace(/[_-]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()) ||
    "";

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-background-1/40 ring-1 ring-ring shadow-xl transition-transform duration-300 transform-gpu hover:scale-102 hover:brightness-105 hover:contrast-110 ${className}`}
      style={{ perspective: "1200px" }}
      key={type}
    >
      {/* Game Image */}
      <CldImage
        src={`${transform}/${encodeURIComponent(publicId)}`}
        alt={fallbackTitle}
        width={width}
        height={height}
        crop="fill"
        gravity="auto"
        priority={priority}
        placeholder="blur"
        blurDataURL={blurDataURL || "/default.webp"}
        fetchPriority={priority ? "high" : "auto"}
        className="w-full h-auto select-none object-cover will-change-transform transition-transform duration-300 ease-out group-hover:scale-103 rounded-2xl"
      />

      {/* Scanline / CRT overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,theme(colors-white)/10_0%,theme(colors-white)/10_0.25%,transparent_0.25%,transparent_0.5%)] mix-blend-overlay opacity-20" />

      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-20 bg-[radial-gradient(60%_60%_at_50%_35%,theme(colors-white)/10_0%,transparent_60%),radial-gradient(40%_40%_at_65%_70%,theme(colors-cyan-1)/10_0%,transparent_60%),radial-gradient(40%_40%_at_30%_80%,theme(colors-purple-1)/10_0%,transparent_60%)]" />

      <div className="pointer-events-none absolute inset-0 transition duration-300 [filter:contrast(1.08)_saturate(1.2)_brightness(1.1)] group-hover:[filter:contrast(1.15)_saturate(1.25)_brightness(1.1)]" />

      {/* Top/Bottom gradients */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background-1/5 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background-2/40 to-transparent pointer-events-none" />

      {/* Title / ID / Players */}
      <div className="absolute bottom-3 inset-x-3 z-10 pointer-events-none flex justify-between items-center text-foreground">
        <span className="text-xs font-semibold tracking-wide drop-shadow-sm">
          {fallbackTitle}
        </span>

        <div className="flex items-center gap-1">
          {id && (
            <div className="w-6 h-6 rounded-full bg-background text-foreground font-semibold text-xs flex items-center justify-center">
              {id}
            </div>
          )}
          {players && players > 0 && (
            <span className="text-xs font-medium">{players} 🎮</span>
          )}
        </div>
      </div>
    </div>
  );
}
