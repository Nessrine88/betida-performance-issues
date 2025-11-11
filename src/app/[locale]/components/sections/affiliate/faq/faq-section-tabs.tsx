"use client";

import { useTranslations } from "next-intl";
import { GlobalTabs } from "@/app/[locale]/components/global-components/GlobalTabs";

export function FaqSectionTabs() {
  const t = useTranslations("affiliateFaq");

  const tabs = [
    { value: "general", label: t("generalTab") },
    { value: "affiliate-program", label: t("affiliateProgramTab") },
    { value: "earnings", label: t("earningsTab") },
  ];

  return (
    <GlobalTabs data={tabs} />
  );
}
