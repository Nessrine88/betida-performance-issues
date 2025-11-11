"use client";
import { useTranslations } from "next-intl";
import { GlobalTabs } from "@/app/[locale]/components/global-components/GlobalTabs";

export function BonusesTabs() {
  const t = useTranslations("transactionTabs");

  const tabs = [
    { value: "all-bonuses", label: t("allBonuses") },
    { value: "manual", label: t("manual") },
    { value: "promotional", label: t("promotional") },
    { value: "drop", label: t("drop") },
    { value: "rakeback", label: t("rakeback") },
    { value: "reload", label: t("reload") },
    { value: "race-payout", label: t("racePayout") },
    { value: "sportsbook-promotion", label: t("sportsbookPromotion") },
  ];

  return (
    <GlobalTabs data={tabs} />
  );
}
