import React from "react";
import { TermTitle } from "../components/term-title";
import { getSystemLanguage } from "@/lib/helpers/localized-content";
import { getTranslations } from "next-intl/server";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { fetchLegalDocument } from "@/lib/fetchers/terms/terms-of-service";

export default async function AffiliateTermsPage() {
  const langCode = await getSystemLanguage();
  const t = await getTranslations("affiliateTerms");
  const legalDoc = await fetchLegalDocument("affiliateTerms");

  if (!legalDoc) {
    return (
      <div className="bg-background-1 p-6 rounded-lg text-foreground h-auto space-y-4">
        <TermTitle title={t("title")} />
        <p>No content available.</p>
      </div>
    );
  }

  const sortedDescription =
    legalDoc.description
      ?.sort((a: any, b: any) => a.index - b.index)
      .map((item: any) => ({
        index: item?.index ?? 0,
        termTitle:
          item?.title?.find((s: any) => s?._key === langCode)?.value ??
          item?.title?.[0]?.value ??
          "",
        blocks:
          item?.content?.find((c: any) => c?.language === langCode)?.blocks ??
          item?.content?.[0]?.blocks ??
          [],
      })) ?? [];

  return (
    <div className="bg-background-1 p-6 rounded-lg text-foreground h-auto space-y-4">
      <TermTitle title={t("title")} />
      <div className="">
        {sortedDescription.map((term: any) => (
          <div key={term.index} className="space-y-4">
            <PortableText
              value={term.blocks}
              components={portableTextComponents}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
