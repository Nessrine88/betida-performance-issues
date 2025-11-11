"use client";
import { useTranslations } from "next-intl";
import { GlobalTabs } from "@/app/[locale]/components/global-components/GlobalTabs";

export function DepositsTabs() {
  const t = useTranslations("transactionTabs");

  const tabs = [
    { value: "crypto", label: t("cryptoTab") },
    { value: "local-currency", label: t("localCurrency") },
  ];

  return (
    <GlobalTabs data={tabs} />
  );
}
