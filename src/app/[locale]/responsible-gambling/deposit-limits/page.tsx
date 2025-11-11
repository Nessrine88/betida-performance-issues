import { fetchDepositLimitsContent } from "@/lib/fetchers/responsible-gambling/deposit-limits-content";
import { getLocale } from "next-intl/server";
import DepositLimitContent from "./deposit-limit-content";

export default async function DepositLimitsPage() {
  const [data, locale] = await Promise.all([
    fetchDepositLimitsContent(),
    getLocale(),
  ]);

  return <DepositLimitContent data={data} locale={locale} />;
}
