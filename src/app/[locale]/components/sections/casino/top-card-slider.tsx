import React from "react";
import dynamic from "next/dynamic";
const TopCardsCarousel = dynamic(() => import("./top-card-carousel"), {
  loading: () => null,
});
import { fetchAllPromotions } from "@/lib/fetchers/promotions-data";
import { getTranslations } from "next-intl/server";

async function TopCardSlider() {
  const t = await getTranslations("gamesSports");
  const allPromotionsData = await fetchAllPromotions();

  return (
    <div className="">
      <TopCardsCarousel title={t("promotions")} items={allPromotionsData} />
    </div>
  );
}

export default TopCardSlider;
