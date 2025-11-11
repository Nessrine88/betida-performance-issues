"use client";

import { Button } from "@/app/[locale]/components/ui/button";
import { toast } from "sonner";
import { GlobalTable } from "@/app/[locale]/components/global-components/global-table/global-table";
import DepositLimitSVG from "@/app/[locale]/components/common/svg_icons/deposit-limit-svg";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { Suspense } from "react";
import { Skeleton } from "@/app/[locale]/components/ui/skeleton";
import { useTranslations } from "next-intl";

type Props = {
  data: any;
  locale: string;
};

export default function DepositLimitContent({ data, locale }: Props) {
  const t = useTranslations("depositLimits");

  const handleAddLimit = () => {
    toast.info(t("toastComingSoon"));
  };

  const limits: any[] = [];

  const columns = [
    { key: "amount", label: "Amount", align: "left" as const },
    { key: "progress", label: "Progress", align: "center" as const },
    { key: "period", label: "Period", align: "center" as const },
    { key: "resetsAt", label: "Resets at", align: "center" as const },
    { key: "withholding", label: "Withholding", align: "right" as const },
  ];

  const title = getLocalizedString(data?.title, locale as LanguageCode);
  const descriptionBlocks =
    data?.description?.find((d: any) => d.language === locale)?.blocks || [];
  const tableTitle = getLocalizedString(
    data?.tableTitle,
    locale as LanguageCode
  );

  return (
    <div className="w-full bg-background-1 p-6 rounded-lg flex flex-col gap-6">
      <div className="rounded-lg w-full h-35 md:h-62.5 bg-background-3 flex items-center justify-center aspect-92/25">
        <DepositLimitSVG className="h-20 md:h-30 w-20 md:w-30" />
      </div>

      <div className="bg-background rounded-lg p-6 flex flex-col gap-4">
        <Suspense
          fallback={
            <div className="space-y-3">
              <Skeleton className="h-5 w-56" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          }
        >
          <div className="flex flex-col gap-1">
            <div className="text-base font-semibold text-foreground">
              {title}
            </div>
            <div className="text-sm text-foreground/55 font-normal">
              <PortableText
                value={descriptionBlocks}
                components={portableTextComponents}
              />
            </div>
          </div>
        </Suspense>

        <hr className="bg-foreground/15" />

        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-foreground">
            {tableTitle}
          </div>
          <Button
            aria-label="add limit"
            variant="outline"
            onClick={handleAddLimit}
          >
            {t("addLimitButton")}
          </Button>
        </div>

        <GlobalTable<any>
          data={limits}
          columns={columns}
          loading={false}
          emptyMessage={
            <div className="bg-background-2 rounded-lg px-4 py-3.5 text-foreground/55 w-full">
              {t("emptyMessage")}
            </div>
          }
          maxHeight={200}
          variant="rounded"
          className="w-full"
        />
      </div>
    </div>
  );
}
