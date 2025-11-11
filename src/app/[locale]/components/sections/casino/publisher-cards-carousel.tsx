"use client";

import CImage from "@/lib/CIdImage";
import dynamic from "next/dynamic";
const GlobalCarousel = dynamic(
  () => import("@/app/[locale]/components/global-components/carousel/global-carousel"),{ loading: () => null }
);
const PlayerStatus = dynamic(
  () => import("@/app/[locale]/components/global-components/player-status"),{ loading: () => null }
);

export interface GameData {
  type?: string;
  image: string;
  title: string;
  subTitle: string;
  href?: string;
  playNow?: boolean;
}

export default function PublisherCardsCarousel({
  publishersData,
}: {
  publishersData: any;
}) {
  const publishers = publishersData;
  const renderGameCard = (publisher: any, index: number) => (
    <div className="flex flex-col gap-2">
      <div className="h-15 w-full min-w-35 rounded-lg bg-sidebar">
        <CImage
          publicId={publisher?.img}
          alt={publisher?.name}
          height={60}
          width={143}
          className="rounded-lg object-cover h-full w-full pointer-events-none"
          priority={index < 4}
        />
      </div>
      <PlayerStatus players={publisher?.players} />
    </div>
  );

  return (
    <GlobalCarousel
      title="Publishers"
      title_href="/casino/collection/provider"
      items={publishers}
      renderItem={renderGameCard}
    />
  );
}
