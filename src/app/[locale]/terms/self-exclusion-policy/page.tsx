import React from "react";
import { TermTitle } from "../components/term-title";
import { getSystemLanguage } from "@/lib/helpers/localized-content";
import { getTranslations } from "next-intl/server";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { fetchLegalDocument } from "@/lib/fetchers/terms/terms-of-service";

export default async function SelfExclusionPage() {
  const langCode = await getSystemLanguage();
  const t = await getTranslations("selfExclusion");
  const legalDoc = await fetchLegalDocument("selfExclusion");

  if (!legalDoc) {
    return (
      <div className="bg-background-1 p-6 rounded-lg text-foreground h-auto space-y-4">
        <div className="-mb-1">
          <TermTitle title={t("title")} />
        </div>
        <p>No content available.</p>
      </div>
    );
  }

  const sortedDescription =
    legalDoc?.description
      ?.sort((a: any, b: any) => (a?.index ?? 0) - (b?.index ?? 0))
      .map((item: any) => ({
        index: item?.index ?? 0,
        title: item?.title
          ?.find((s: any) => s?._key === langCode)
          ?.value ?? item?.title?.[0]?.value ?? "",
        blocks:
          item?.content
            ?.find((c: any) => c?.language === langCode)
            ?.blocks ?? item?.content?.[0]?.blocks ?? [],
      })) ?? [];

  const firstItem = sortedDescription[0];
  const restItems = sortedDescription.slice(1);

  return (
    <div className="bg-background-1 p-6 rounded-lg text-foreground h-auto space-y-4">
      <div className="">
        <TermTitle title={t("title")} />
      </div>
      {firstItem && (
        <div className="">
          <PortableText
            value={firstItem.blocks}
            components={portableTextComponents}
          />
        </div>
      )}
      {restItems.map((item: any) => (
        <div key={item.index} className="space-y-4">
          <PortableText
            value={item.blocks}
            components={portableTextComponents}
          />
        </div>
      ))}
    </div>
  );
}