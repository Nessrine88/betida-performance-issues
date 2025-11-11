"use client";

import { useState } from "react";
import ClockSVG from "@/app/[locale]/components/common/svg_icons/clock-svg";
import { Skeleton } from "@/app/[locale]/components/ui/skeleton";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import RequestModal from "./request-modal";
import { Button } from "@/app/[locale]/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";

type Props = {
  data: any;
  locale: string;
};

export default function SelfExclusionClient({ data, locale }: Props) {
  const t = useTranslations("selfExclusion");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const openModal = (tool: any) => {
    setSelectedTool(tool);
    setModalOpen(true);
  };

  return (
    <div className="w-full bg-background-1 p-6 rounded-lg overflow-hidden flex flex-col gap-6 md:gap-8">
      {/* Banner */}
      <div className="rounded-lg w-full h-35 md:h-62.5 bg-background-3 flex items-center justify-center aspect-92/25">
        <ClockSVG className="h-20 md:h-30 w-20 md:w-30" />
      </div>

      <Suspense
        fallback={
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-background rounded-lg p-6 space-y-4">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <div className="flex justify-between items-center pt-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-9 w-28 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        }
      >
        {data?.tools?.map((tool: any, index: number) => {
          const title = getLocalizedString(tool.title, locale as LanguageCode);
          const content =
            tool.content?.find((c: any) => c.language === locale)?.text || "";

          return (
            <div
              key={index}
              className="bg-background rounded-lg p-6 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <div className="text-base text-foreground font-semibold">
                  {title}
                </div>
                <div className="text-sm text-foreground/55 font-normal">
                  {content}
                </div>
              </div>
              <hr className="bg-foreground/55" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Link href={tool.redirectURL || "#"} aria-label="learn more">
                  <p className="text-foreground/55 text-sm">
                    {t("learnMore")}
                    <span className="text-foreground pl-2">{title}</span>
                  </p>
                </Link>
                <Button
                  value="bordered"
                  onClick={() => {
                    openModal(tool);
                    const params = new URLSearchParams(searchParams.toString());
                    params.set(`${t("request")}_${title}_modal`, "true");
                    router.push(`?${params.toString()}`, {
                      scroll: false,
                    });
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-md border border-foreground/30 hover:border-foreground/60 text-foreground transition-colors w-fit"
                  aria-label="request"
                >
                  {t("request")} {title}
                </Button>
              </div>
            </div>
          );
        })}
      </Suspense>
      {selectedTool && (
        <RequestModal
          locale={locale}
          tool={selectedTool}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      )}
    </div>
  );
}
