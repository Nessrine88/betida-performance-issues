import { getTranslations, getLocale } from "next-intl/server";
import React from "react";
import { GlobalAccordion } from "@/app/[locale]/components/global-components/global-accordion";
import type {
  QuestionData,
  LocalizedQuestionData,
} from "@/lib/fetchers/questions";
import type { LanguageCode } from "@/lib/helpers/localized-content";

interface QuestionProps {
  questions: QuestionData[];
}

async function Question({ questions }: QuestionProps) {
  const t = await getTranslations("questionSectionTitle");
  const locale = await getLocale();
  const getLocalizedString = (
    strings: QuestionData["title"] | QuestionData["content"] | undefined,
    loc: LanguageCode
  ): string => {
    if (!strings || strings.length === 0) {
      return "";
    }
    return (
      strings.find((s) => s._key === loc)?.value ||
      strings.find((s) => s._key === "en")?.value ||
      strings[0].value ||
      ""
    );
  };

  const localizedQuestions: LocalizedQuestionData[] = questions
    .map((q) => ({
      _id: q._id,
      title: getLocalizedString(q.title, locale as LanguageCode),
      content: getLocalizedString(q.content, locale as LanguageCode),
    }))
    .filter((q) => q.title && q.content);

  return (
    <div>
      <h2 className="text-foreground-muted text-base font-semibold pb-2.5">
        {t("title")}
      </h2>

      <GlobalAccordion
        data={localizedQuestions.map((q) => ({
          title: q.title,
          content: q.content,
        }))}
      />
    </div>
  );
}

export default Question;
