import { fetchAllPromotions } from "@/lib/fetchers/promotions-data";
import PromotionsPage from "../components/promotions-page";
import { getLocale } from "next-intl/server";
import { type LanguageCode } from "@/lib/helpers/localized-content";

export const revalidate = 60;

export default async function AllPromotionsPage() {
  const locale = await getLocale();
  const allPromotionsData = await fetchAllPromotions();

  return (
    <PromotionsPage locale={locale as LanguageCode} data={allPromotionsData} />
  );
}
