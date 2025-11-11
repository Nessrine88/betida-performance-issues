"use client";

import { Button } from "@/app/[locale]/components/ui/button";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import GlobalModal from "@/app/[locale]/components/global-components/global-modal/global-modal";
import { Headphones } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  learnMoreUrl?: string;
};

export default function SelfAssessmentResultModal({
  open,
  onOpenChange,
  learnMoreUrl,
}: Props) {
  const t = useTranslations("selfAssessmentResult");
  const router = useRouter();
  const pathname = usePathname();
  const handleSupport = () => {
    toast.info(t("contactSoon"));
    router.push(pathname);
  };

  const handleDone = () => {
    router.push(pathname);
    onOpenChange(false);
  };

  return (
    <GlobalModal
      title={t("title")}
      open={open}
      onOpenChange={() => {
        onOpenChange(false);
        router.push(pathname);
      }}
      className="w-full max-w-md"
    >
      <div className="rounded-lg w-full h-35 md:h-40 bg-background-3 flex items-center justify-center aspect-92/25">
        <Headphones className="h-20 md:h-30 w-20 md:w-30" />
      </div>

      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-foreground">
            {t("subtitle")}
          </h3>
          <p className="text-sm text-foreground/80">{t("description")}</p>
          <p className="text-sm text-foreground/80">{t("supportInfo")}</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleSupport}>
            {t("contactSupport")}
          </Button>

          <Button variant="outline" className="flex-1" asChild={!!learnMoreUrl}>
            {learnMoreUrl ? (
              <Link
                href={learnMoreUrl || "#"}
                target="_blank"
                onClick={() => router.push(pathname)}
                rel="noopener noreferrer"
              >
                {t("learnMore")}
              </Link>
            ) : (
              <span>{t("learnMore")}</span>
            )}
          </Button>
        </div>

        <Button
          onClick={handleDone}
          className="w-full"
          variant="orangeGradient"
        >
          {t("done")}
        </Button>
      </div>
    </GlobalModal>
  );
}
