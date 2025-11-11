// pages/cookies-policy.tsx (or app/cookies-policy/page.tsx) - SSR component
import React from "react";
import { TermTitle } from "../components/term-title"; // Adjust path
import { getSystemLanguage } from "@/lib/helpers/localized-content";
import { getTranslations } from "next-intl/server";
import { fetchLegalDocument } from "@/lib/fetchers/terms/terms-of-service";
import { CookiesPolicyClient } from "./cookies-policy-client";

export default async function CookiesPolicy() {
  const langCode = await getSystemLanguage();
  const t = await getTranslations("cookiesPolicy");
  const legalDoc = await fetchLegalDocument("cookiesPolicy");

  return (
    <div className="bg-background-1 p-6 rounded-lg text-foreground h-auto space-y-4">
      <TermTitle title={t("title")} />
      <CookiesPolicyClient legalDoc={legalDoc} langCode={langCode} />
    </div>
  );
}
