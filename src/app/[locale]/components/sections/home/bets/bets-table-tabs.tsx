"use client";
import { useTranslations } from "next-intl";
import { GlobalTabs } from "../../../global-components/GlobalTabs";

export function BetsTableTabs() {
  const t = useTranslations("betsTableTabs");

  const tabs = [
    { value: "casino", label: t("casino") },
    { value: "sports", label: t("sports") },
    { value: "race-leaderboard", label: t("race-leaderboard") },
  ];

  return (
    <GlobalTabs data={tabs} />
  );
}
