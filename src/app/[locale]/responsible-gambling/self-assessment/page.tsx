import {
  fetchSelfAssessmentContent,
  fetchSelfAssessmentQuestions,
} from "@/lib/fetchers/responsible-gambling/self-assessment-content";
import { getLocale } from "next-intl/server";
import SelfAssessmentClient from "./self-assessment-content";

export default async function SelfAssessmentPage() {
  const [content, questions, locale] = await Promise.all([
    fetchSelfAssessmentContent(),
    fetchSelfAssessmentQuestions(),
    getLocale(),
  ]);
  return (
    <SelfAssessmentClient
      content={content}
      questions={questions}
      locale={locale}
    />
  );
}
