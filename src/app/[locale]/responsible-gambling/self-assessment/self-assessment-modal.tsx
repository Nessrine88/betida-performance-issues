"use client";

import { useState } from "react";
import { Button } from "@/app/[locale]/components/ui/button";
import { Progress } from "@/app/[locale]/components/ui/progress";
import GlobalModal from "@/app/[locale]/components/global-components/global-modal/global-modal";
import { useTranslations } from "next-intl";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { toast } from "sonner";
import { usePathname, useRouter } from "@/i18n/navigation";

type Props = {
  questions: any[];
  locale: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDone: (payload: { question: string; answer: "yes" | "no" }[]) => void;
};

export default function SelfAssessmentModal({
  questions,
  locale,
  open,
  onOpenChange,
  onDone,
}: Props) {
  const t = useTranslations("selfAssessmentModal");
  const router = useRouter();
  const pathname = usePathname();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<("yes" | "no")[]>(
    new Array(questions.length).fill(null)
  );

  const q = questions[current];
  const questionText = getLocalizedString(q?.text, locale as LanguageCode);
  const progress = ((current + 1) / questions.length) * 100;

  const handleAnswer = (value: "yes" | "no") => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const payload = questions.map((qus: any, i: number) => ({
        question: getLocalizedString(qus.text, locale as LanguageCode),
        answer: newAnswers[i]!,
      }));
      onDone(payload);
    }
  };

  if (!q) {
    toast.info(
      `Didn't found any assessment question. Please click to contact section from Navbar`
    );
    return null;
  }

  return (
    <GlobalModal
      title={t("title")}
      open={open}
      onOpenChange={() => {
        onOpenChange(false);
        router.push(pathname);
      }}
      className="w-full max-w-lg"
    >
      <div className="px-6">
        <div className="mt-2 text-end text-xs text-foreground/55 mb-2">
          {`${current + 1} / ${questions.length} `}
        </div>
        <Progress value={progress} className="h-2" />
        <div className="mt-2 text-xs text-foreground/55">
          {t("progress", { current: current + 1, total: questions.length })}
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6">
        <div className="text-sm text-foreground/80">{questionText}</div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => handleAnswer("yes")}
            className="flex-1"
            variant="greenGradient"
          >
            {t("yes")}
          </Button>
          <Button
            variant="purpleGradient"
            onClick={() => handleAnswer("no")}
            className="flex-1"
          >
            {t("no")}
          </Button>
        </div>
      </div>
    </GlobalModal>
  );
}
