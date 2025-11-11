import { fetchPokerPromotions } from "@/lib/fetchers/promotions-data";
import { getLocale } from "next-intl/server";
import { type LanguageCode } from "@/lib/helpers/localized-content";
import PromotionsPage from "../../components/promotions-page";

export const revalidate = 60;

export default async function PokerPromotionsPage() {
  const locale = await getLocale();
  const data = await fetchPokerPromotions();

  return <PromotionsPage locale={locale as LanguageCode} data={data} />;
}
