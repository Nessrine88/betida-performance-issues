"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { getLocalizedString } from "@/lib/helpers/localized-content";

const PromotionDetailsCard = dynamic(
  () => import("@/app/[locale]/promotions/components/promotion-card-details")
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
}

interface PromotionCadsCarouselProps {
  title: string;
  items: any[];
  priority?: boolean;
}

export default function PromotionCadsCarousel({
  title,
  items,
  priority,
}: PromotionCadsCarouselProps) {
  const t = useTranslations("PromotionsDetails");

  const localizedItems = useMemo(() => {
    return items.map((item) => ({
      ...item,
      _localizedTitle:
        getLocalizedString(item.title, undefined) || t("untitled"),
      _localizedSubtitle: getLocalizedString(item.subtitle, undefined) || "",
    }));
  }, [items, t]);

  const renderGameCard = (item: any, index: number) => (
    <PromotionDetailsCard
      type={item?.type}
      imagePublicId={item?.thumbnail}
      title={item._localizedTitle}
      subTitle={item._localizedSubtitle}
      href={`/promotions/${item?.slug?.current}`}
      priority={priority ? index < 3 : false}
    />
  );

  return (
    <GlobalCarousel
      title={title}
      items={localizedItems}
      renderItem={renderGameCard}
    />
  );
}

export function PromotionSkeletonCarousel() {
  return (
    <div className="w-full h-auto animate-pulse">
      <div className="flex items-center justify-between mb-2.5">
        <div className="h-4 w-32 bg-muted rounded-sm" />
        <div className="flex gap-2">
          <div className="h-6 w-6 bg-muted rounded-sm" />
          <div className="h-6 w-6 bg-muted rounded-sm" />
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="min-w-98 min-h-47 bg-muted/40 rounded-lg p-6 flex gap-3 justify-between items-center"
          >
            <div className="flex flex-col justify-between w-full h-full gap-4">
              <div className="flex flex-col gap-2">
                <div className="w-20 h-4 bg-muted rounded-full" />
                <div className="w-36 h-5 bg-muted rounded" />
                <div className="w-24 h-4 bg-muted rounded" />
              </div>
              <div className="flex gap-3">
                <div className="w-20 h-8 bg-muted rounded-md" />
                <div className="w-20 h-6 bg-muted rounded-sm" />
              </div>
            </div>
            <div className="h-[140px] w-[140px] bg-muted rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
