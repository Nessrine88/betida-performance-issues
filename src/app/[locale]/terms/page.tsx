import React from "react";
import { TermTitle } from "./components/term-title";
import { getSystemLanguage } from "@/lib/helpers/localized-content";
import { getTranslations } from "next-intl/server";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { fetchLegalDocument } from "@/lib/fetchers/terms/terms-of-service";

export default async function TermsOfService() {
  const langCode = await getSystemLanguage();
  const t = await getTranslations("termsOfService");
  const legalDoc = await fetchLegalDocument("termsOfService");

  if (!legalDoc) {
    return (
      <div className="bg-background-1 p-6 rounded-lg text-foreground h-auto space-y-4">
        <TermTitle title={t("title")} />
        <p>{t("noContent")}</p>
      </div>
    );
  }

  const sortedDescription =
    legalDoc.description
      ?.sort((a: any, b: any) => a.index - b.index)
      .map((item: any) => ({
        index: item.index,
        blocks:
          item.content.find((c: any) => c.language === langCode)?.blocks ||
          item.content[0]?.blocks ||
          [],
      })) || [];

  // Render first item (index 1 or lowest) without number
  const firstItem = sortedDescription[0];
  const restItems = sortedDescription.slice(1);

  return (
    <div className="bg-background-1 p-6 rounded-lg text-foreground h-auto space-y-4">
      <TermTitle title={t("title")} />
      {firstItem && (
        <div className="">
          <PortableText
            value={firstItem.blocks}
            components={portableTextComponents}
          />
        </div>
      )}
      {restItems.map((item: any) => (
        <div key={item.index}>
          <TermTitle title={`${item.index}.`} />
          <PortableText
            value={item.blocks}
            components={portableTextComponents}
          />
        </div>
      ))}
    </div>
  );
}
