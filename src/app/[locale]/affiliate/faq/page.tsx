import { fetchFaqs } from "@/lib/fetchers/affiliate/affiliate-faq";
import { getSystemLanguage } from "@/lib/helpers/localized-content";
import FaqSection from "@/app/[locale]/components/sections/affiliate/faq/faq-section";
// import { getTranslations } from "next-intl/server";

export default async function FaqPage() {
  const langCode = await getSystemLanguage();
  // const t = await getTranslations("affiliateFaq");
  const faqs = await fetchFaqs();

  return (
    <div className="w-full">
      <FaqSection faqs={faqs} langCode={langCode} />
    </div>
  );
}