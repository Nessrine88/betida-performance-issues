"use client";
import { useTranslations } from "next-intl";
import { GlobalTabs } from "@/app/[locale]/components/global-components/GlobalTabs";

export function OtherTab() {
  const t = useTranslations("transactionTabs");

  const tabs = [
    { value: "all-other", label: t("allOther") },
    { value: "tips-received", label: t("tipsReceived") },
    { value: "vault-deposit", label: t("vaultDeposit") },
    { value: "vault-withdrawal", label: t("vaultWithdrawal") },
    { value: "campaign-withdrawal", label: t("campaignWithdrawal") },
    { value: "rain-received", label: t("rainReceived") },
    { value: "rainSent", label: t("rainSent") },
  ];

  return (
    <GlobalTabs data={tabs} />
  );
}
