import React from "react";
import { TermTitle } from "../components/term-title";
import { getSystemLanguage } from "@/lib/helpers/localized-content";
import { getTranslations } from "next-intl/server";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { fetchLegalDocument } from "@/lib/fetchers/terms/terms-of-service";

export default async function ProviderAvailabilityPolicy() {
  const langCode = await getSystemLanguage();
  const t = await getTranslations("providers");
  const legalDoc = await fetchLegalDocument("providers");

  if (!legalDoc) {
    return (
      <div className="bg-background-1 p-6 rounded-lg text-foreground h-auto space-y-4">
        <TermTitle title={t("title")} />
        <p>No content available.</p>
      </div>
    );
  }

  const sortedDescription =
    legalDoc?.description
      ?.sort((a: any, b: any) => (a?.index ?? 0) - (b?.index ?? 0))
      .map((item: any) => ({
        index: item?.index ?? 0,
        title:
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
        {sortedDescription.map((section: any) => (
          <div key={section.index} className="space-y-4">
            <PortableText
              value={section.blocks}
              components={portableTextComponents}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
