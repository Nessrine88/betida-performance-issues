"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const GameCard = dynamic(
  () => import("@/app/[locale]/components/ui/game-card")
);
const GlobalCarousel = dynamic(
  () =>
    import(
      "@/app/[locale]/components/global-components/carousel/global-carousel"
    )
);

export interface GameData {
  src: string;
  alt: string;
  id: number;
  players?: number;
  blurDataURL?: string;
}

interface GlobalCadCarouselProps {
  title: string;
  type?: string;
  items: GameData[];
  priority?: boolean;
}

export default function GlobalCadCarousel({
  title,
  type,
  items,
  priority = true,
}: GlobalCadCarouselProps) {
  const renderGameCard = (item: any, index: number) => (
    <GameCard
      key={item.id}
      src={item.src}
      alt={item.alt}
      id={item.id}
      players={item.players}
      width={100}
      height={130}
      priority={priority ? index < 4 : false}
      type={type}
      blurDataUrl={item.blurDataURL}
    />
  );

  return (
    <div className="w-full">
      <Suspense fallback={<SkeletonCarousel />}>
        <GlobalCarousel
          title={title}
          items={items}
          renderItem={renderGameCard}
        />
      </Suspense>
    </div>
  );
}

export function SkeletonCarousel() {
  return (
    <div className="w-full h-auto animate-pulse">
      <div className="flex items-center justify-between mb-2.5">
        <div className="h-4 w-32 bg-muted rounded-sm" />
        <div className="flex gap-2">
          <div className="h-6 w-6 bg-muted rounded-sm" />
          <div className="h-6 w-6 bg-muted rounded-sm" />
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="min-w-35.75 h-49.5 bg-muted rounded-lg" />
        ))}
      </div>
    </div>
  );
}
