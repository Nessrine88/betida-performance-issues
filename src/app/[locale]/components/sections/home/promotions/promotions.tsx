import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import React from "react";
const PromotionCadsCarousel = dynamic(
  () => import("./promotion-cards-carousel"),
  { loading: () => null }
);
import { fetchAllPromotions } from "@/lib/fetchers/promotions-data";
export default async function Promotions({
  priority = true,
}: {
  priority?: boolean;
}) {
  const t = await getTranslations("Promotions");
  const promotions = await fetchAllPromotions();
  return (
    <div className="w-full min-h-56">
      <PromotionCadsCarousel
        title={t("title")}
        items={promotions}
        priority={priority}
      />
    </div>
  );
}
