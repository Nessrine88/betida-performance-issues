import { fetchRgSelfExclusion } from "@/lib/fetchers/responsible-gambling/self-exclusion";
import { getLocale } from "next-intl/server";
import SelfExclusionClient from "./selft-exclusion-client";

export default async function SelfExclusionPage() {
  const [data, locale] = await Promise.all([
    fetchRgSelfExclusion(),
    getLocale(),
  ]);

  return <SelfExclusionClient data={data} locale={locale} />;
}
