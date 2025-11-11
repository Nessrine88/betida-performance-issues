"use client";

import { GlobalAccordion } from "@/app/[locale]/components/global-components/global-accordion";
import { FaqSectionTabs } from "./faq-section-tabs";
import { useSearchParams } from "next/navigation";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
// import { useTranslations } from "next-intl";
import { type InternationalizedString } from "@/lib/fetchers/localized-blog";
import { type FaqItem } from "@/lib/fetchers/affiliate/affiliate-faq";
import { X } from "lucide-react";
import TabLoader from "@/app/[locale]/tab-loader";

interface FaqData {
  general: FaqItem[];
  "affiliate-program": FaqItem[];
  earnings: FaqItem[];
}

export default function FaqSection({
  faqs,
  langCode,
}: {
  faqs: FaqItem[];
  langCode: LanguageCode;
}) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";
  // const t = useTranslations("affiliateFaq");

  const key = activeTab as keyof FaqData;

  const data = faqs
    .filter((faq) => faq.category === key)
    .map((faq) => ({
      title: getLocalizedString(
        faq.title as InternationalizedString[],
        langCode,
        "en"
      ),
      content: getLocalizedString(
        faq.content as InternationalizedString[],
        langCode,
        "en"
      ),
    }));

  return (
    <div className="w-full relative">
      <FaqSectionTabs />
      <TabLoader/>
      {data?.length === 0 ? (
        <div className="w-full space-y-4 py-10 text-center">
          <div className="size-10 bg-background-2 flex items-center justify-center rounded-lg mx-auto">
            <X className="text-white/55" />
          </div>
          <div className="text-white/55 text-sm">
            No FAQs available for this category.
          </div>
        </div>
      ) : (
        <GlobalAccordion data={data} />
      )}
    </div>
  );
}
