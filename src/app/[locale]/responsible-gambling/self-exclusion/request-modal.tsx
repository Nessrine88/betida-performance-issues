"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/components/ui/select";
import { Button } from "@/app/[locale]/components/ui/button";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import GlobalModal from "@/app/[locale]/components/global-components/global-modal/global-modal";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { usePathname, useRouter } from "@/i18n/navigation";

type Props = {
  tool: { title: any[]; redirectURL?: string };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: string;
};

const durations = [
  { value: "1day", label: "1 Day" },
  { value: "2day", label: "2 Day" },
  { value: "1week", label: "1 Week" },
  { value: "1month", label: "1 Month" },
  { value: "2month", label: "2 Month" },
  { value: "3months", label: "3 Months" },
];

export default function RequestModal({
  tool,
  open,
  onOpenChange,
  locale,
}: Props) {
  const t = useTranslations("selfExclusionModal");
  const router = useRouter();
  const pathname = usePathname();
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState("");
  const title = getLocalizedString(tool.title, locale as LanguageCode);

  const handleNext = () => {
    if (duration) {
      setStep(2);
    }
  };

  const handleConfirm = () => {
    const label = durations.find((d) => d.value === duration)?.label;
    toast.success(t("confirmed", { duration: label || "n/a" }));
    onOpenChange(false);
    setStep(1);
    setDuration("");
    router.push(pathname);
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep(1);
    setDuration("");
    router.push(pathname);
  };

  return (
    <GlobalModal
      title={title}
      open={open}
      onOpenChange={handleClose}
      className="w-full max-w-md"
    >
      {step === 1 ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              {t("duration")}
            </label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="w-full h-12 bg-background-1 text-foreground">
                <SelectValue placeholder={t("selectDuration")} />
              </SelectTrigger>
              <SelectContent>
                {durations.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleNext}
            disabled={!duration}
            className="w-full"
            variant="orangeGradient"
          >
            {t("next")}
          </Button>

          <p className="text-xs text-foreground/55 text-center">
            {t("disclaimer")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="text-sm text-foreground/80">
            {t("confirmMessage")}
          </div>

          <Button
            className="w-full"
            onClick={handleConfirm}
            variant="orangeGradient"
          >
            {t("confirm")}
          </Button>
        </div>
      )}
    </GlobalModal>
  );
}
