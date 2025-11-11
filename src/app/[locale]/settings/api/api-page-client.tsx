"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import CopyArea from "@/app/[locale]/components/global-components/copy-area";
import { Button } from "@/app/[locale]/components/ui/button";
import ApiTable from "./api-table/api-table";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";

interface ApiPageClientProps {
  apiPageData: any;
  langCode: string;
  tableData: any[]; 
}

export default function ApiPageClient({
  apiPageData,
  langCode,
  tableData,
}: ApiPageClientProps) {
  const [reveal, setReveal] = useState(false);
  const t = useTranslations("settingsAPI"); 

  const handleReveal = () => setReveal(true);

  const localizedDisclaimer =
    apiPageData?.disclaimer?.find((d: any) => d.language === langCode)
      ?.blocks || [];
  const localizedActiveTokensDescription =
    apiPageData?.activeTokensDescription?.find(
      (d: any) => d.language === langCode
    )?.blocks || [];

  return (
    <>
      <div className="divide-y divide-border bg-background-3 rounded-lg overflow-hidden border-border">
        <div className="p-6 divide-y divide-border">
          <div className="w-full pb-4 space-y-4">
            <h3 className="font-semibold text-xl">{t("tokenCreationTitle")}</h3>
            <PortableText
              value={localizedDisclaimer}
              components={portableTextComponents}
            />
          </div>

          {/* token area start */}
          <div className="pt-4 max-w-lg w-full">
            <CopyArea
              reveal={reveal}
              label={t("tokenLabel")}
              code="b50e8e10b9da944ab4553c9feb451d75bdc224fbbcf68da0c7244c8f62621d437f1442e23da405ed583a9cdff0124c4d"
            />
          </div>
        </div>

        <div className="flex pt-4 pb-6 px-6 gap-2 items-center justify-between">
          <div className="font-semibold text-base">{t("doNotShare")}</div>

          <div className="max-w-32 w-full">
            <Button
              variant="orangeGradient"
              fullWidth
              onClick={handleReveal}
              disabled={reveal}
              className={`${reveal ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {reveal ? t("revealed") : t("reveal")}
            </Button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border bg-background-3 rounded-lg overflow-hidden border-border">
        <div className="p-6 divide-y divide-border">
          <div className="w-full pb-4 space-y-4">
            <h3 className="font-semibold text-xl">{t("activeTokensTitle")}</h3>
            <PortableText
              value={localizedActiveTokensDescription}
              components={portableTextComponents}
            />
          </div>

          <div className="pt-6">
            <ApiTable data={tableData} /> 
          </div>
        </div>
      </div>
    </>
  );
}
