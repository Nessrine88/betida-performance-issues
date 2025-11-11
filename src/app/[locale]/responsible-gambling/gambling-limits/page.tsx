import { fetchGamblingLimitsContent } from "@/lib/fetchers/responsible-gambling/gambling-limits-content";
import { getLocale } from "next-intl/server";
import GamblingLimitPageContent from "./gambling-page-content";

export default async function GamblingLimitsPage() {
  const [data, locale] = await Promise.all([
    fetchGamblingLimitsContent(),
    getLocale(),
  ]);

  return <GamblingLimitPageContent data={data} locale={locale} />;
}
