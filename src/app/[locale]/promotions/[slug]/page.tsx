import React from "react";
import PromotionsDetailsPage from "./promotion-details-page";
import {
  fetchAllPromotions,
  fetchCasinoPromotions,
  fetchCommunityPromotions,
  fetchPokerPromotions,
  fetchPromotionBySlug,
  fetchSportsPromotions,
  getAllPromotionSlugs,
} from "@/lib/fetchers/promotions-data";
import { getLocale } from "next-intl/server";
import type { LanguageCode } from "@/lib/helpers/localized-content";
import type { PromotionType } from "@/types/promotions-types";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPromotionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PromotionDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = (await getLocale()) as LanguageCode;
  const promotion = await fetchPromotionBySlug(slug);

  const [
    allPromotionsData,
    casinoPromotionData,
    pokerPromotionsData,
    communityPromotionsData,
    sportsPromotionsData,
  ] = await Promise.all([
    fetchAllPromotions(),
    fetchCasinoPromotions(),
    fetchPokerPromotions(),
    fetchCommunityPromotions(),
    fetchSportsPromotions(),
  ]);
  // Keep grouped structure for PromotionsDetailsPage
  const promotionsData: Record<string, PromotionType[]> = {
    allPromotionsData,
    casinoPromotionData,
    pokerPromotionsData,
    communityPromotionsData,
    sportsPromotionsData,
  };
  // Flatten grouped promotions into a single array to enable filtering
  const allPromotionsArray = Object.values(
    promotionsData
  ).flat() as PromotionType[];
  const related = allPromotionsArray
    .filter(
      (item: PromotionType) =>
        item.slug?.current !== slug &&
        item.category?.slug === promotion?.category?.slug // ← Fixed
    )
    .slice(0, 8);

  return (
    <PromotionsDetailsPage
      relatedPromotions={related}
      promotion={promotion as PromotionType}
      locale={locale}
    />
  );
}
