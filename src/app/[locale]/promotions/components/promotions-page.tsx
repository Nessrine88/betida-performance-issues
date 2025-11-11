"use client";
import React from "react";
import AllPromotions from "./all-promotions";
import TabLoader from "@/app/[locale]/tab-loader";
import { type LanguageCode } from "@/lib/helpers/localized-content";

function PromotionsPage({
  data,

  locale,
}: {
  data: any;

  locale: LanguageCode;
}) {
  return (
    <div className="w-full overflow-hidden rounded-lg relative">
      <TabLoader />
      <AllPromotions locale={locale} data={data} />
    </div>
  );
}

export default PromotionsPage;
