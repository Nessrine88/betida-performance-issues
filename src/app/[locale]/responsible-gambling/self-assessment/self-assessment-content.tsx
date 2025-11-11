"use client";

import { useState } from "react";
import CheckCircleSVG from "@/app/[locale]/components/common/svg_icons/check-circle-svg";
import { Button } from "@/app/[locale]/components/ui/button";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { Suspense } from "react";
import { Skeleton } from "@/app/[locale]/components/ui/skeleton";
import { useTranslations } from "next-intl";
import SelfAssessmentModal from "./self-assessment-modal";
import SelfAssessmentResultModal from "./result-modal";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";

type Props = {
  content: any;
  questions: any;
  locale: string;
};

export default function SelfAssessmentClient({
  content,
  questions,
  locale,
}: Props) {
  const t = useTranslations("selfAssessment");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);

  const handleStart = () => {
    setModalOpen(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set(`assessment_start_modal`, "true");
    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };
  // const handleSupport = () => toast.info(t("supportSoon"));
  // Update handleDone
  const handleDone = async (
    payload: { question: string; answer: "yes" | "no" }[]
  ) => {
    setModalOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.set(`assessment_result_modal`, "true");
    router.push(`?${params.toString()}`, {
      scroll: false,
    });
    setResultOpen(true);
    toast.success(`Data submitted for ${payload.length} question`);
    // todo: need to implement api for data submission
    // try {
    //   const res = await fetch("/api/self-assessment", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   });

    //   if (res) {
    //     const params = new URLSearchParams(searchParams.toString());
    //     params.set(`assessment_result_modal`, "true");
    //     router.push(`?${params.toString()}`, {
    //       scroll: false,
    //     });
    //     setResultOpen(true);
    //     router.push(pathname);
    //   } else {
    //     toast.error("Failed to submit");
    //     router.push(pathname);
    //   }
    // } catch {
    //   toast.error("Network error");
    //   router.push(pathname);
    // }
  };

  const title = getLocalizedString(content?.title, locale as LanguageCode);
  const descriptionBlocks =
    content?.description?.find((d: any) => d.language === locale)?.blocks || [];

  return (
    <>
      <div className="w-full bg-background-1 p-6 rounded-lg flex flex-col gap-6">
        <div className="rounded-lg w-full h-35 md:h-62.5 bg-background-3 flex items-center justify-center aspect-92/25">
          <CheckCircleSVG className="h-20 md:h-30 w-20 md:w-30" />
        </div>

        <div className="bg-background rounded-lg p-6 flex flex-col gap-4">
          <Suspense
            fallback={
              <div className="space-y-3">
                <Skeleton className="h-5 w-56" />
                <Skeleton className="h-4 w-full" />
              </div>
            }
          >
            <div className="text-base font-semibold text-foreground">
              {title}
            </div>
            <div className="text-sm text-foreground/55 font-normal">
              <PortableText
                value={descriptionBlocks}
                components={portableTextComponents}
              />
            </div>
          </Suspense>

          <hr className="bg-foreground/15" />

          <div className="flex justify-between items-center">
            <Link
              href={questions?.learnMoreUrl || "#"}
              className="text-sm text-foreground/55 hover:text-foreground"
            >
              {t("learnMore")}
            </Link>
            <div className="flex gap-2">
              {/* <Button variant="outline" onClick={handleSupport} size="sm">
                {t("contactSupport")}
              </Button> */}
              <Button variant="outline" onClick={handleStart}>
                {t("button")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Question Modal */}
      <SelfAssessmentModal
        questions={questions?.questions || []}
        locale={locale}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onDone={handleDone}
      />

      {/* Result Modal */}
      <SelfAssessmentResultModal
        open={resultOpen}
        onOpenChange={setResultOpen}
        learnMoreUrl={questions?.learnMoreUrl}
      />
    </>
  );
}
