import React from "react";
import PlayerStatus from "../global-components/player-status";
import CImage from "@/lib/CIdImage";
import { slugify } from "@/lib/helpers/slugify";
import { useSidebarStore } from "@/store/sidebar-store";
import { Link } from "@/i18n/navigation";

interface GameCardProps {
  src: string;
  alt: string;
  blurDataUrl?: string;
  type?: string;
  width?: number;
  height?: number;
  id: number;
  players?: number;
  priority?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({
  src = "/default.webp",
  alt = "game card",
  blurDataUrl,
  type,
  width = 143,
  height = 188,
  id,
  players,
  priority,
}) => {
  const { setRouteLoading } = useSidebarStore();

  return (
    <Link
      href={
        type !== "sports"
          ? `/casino/${slugify(alt)}`
          : `/${type}/${slugify(alt)}`
      }
      onClick={() => setRouteLoading(true)}
      className="group block pt-2 w-full"
      aria-label={`go to ${alt}`}
    >
      <div
        className={`
          relative overflow-hidden rounded-lg bg-background-1/40 ring-1 ring-ring shadow-xl 
          transition-transform duration-300 transform-gpu hover:scale-102 hover:brightness-105 hover:contrast-110 
          flex flex-col gap-2 min-w-35.75 md:min-w-31.75 w-full h-auto
          before:absolute before:inset-0 before:pointer-events-none 
          before:bg-[repeating-linear-gradient(to_bottom,theme(colors.white)/10_0%,theme(colors.white)/10_0.25%,transparent_0.25%,transparent_0.5%)]
          before:mix-blend-overlay before:opacity-20
          after:absolute after:inset-0 after:pointer-events-none after:mix-blend-soft-light after:opacity-20
          after:bg-[radial-gradient(60%_60%_at_50%_35%,theme(colors.white)/10_0%,transparent_60%),radial-gradient(40%_40%_at_65%_70%,theme(colors.cyan.1)/10_0%,transparent_60%),radial-gradient(40%_40%_at_30%_80%,theme(colors.purple.1)/10_0%,transparent_60%)]
        `}
      >
        <CImage
          publicId={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto select-none object-cover ease-out group-hover:scale-103 rounded-lg transition-transform duration-200 pointer-events-none"
          sizes="(max-width: 640px) 127px, 143px"
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          blurDataUrl={blurDataUrl}
        />

        {/* Gradients */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background-1/5 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background-2/40 to-transparent pointer-events-none" />

        {/* ID Badge */}
        {id && (
          <div className="absolute top-1.5 left-1.5 w-8 h-8 rounded-full bg-background text-foreground font-semibold text-base flex items-center justify-center z-10">
            {id}
          </div>
        )}
      </div>

      {players && players > 0 && (
        <div className="pt-2">
          <PlayerStatus key={id} players={players} />
        </div>
      )}
    </Link>
  );
};

export default React.memo(GameCard);
