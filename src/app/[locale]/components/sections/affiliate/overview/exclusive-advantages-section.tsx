"use client";

import dynamic from "next/dynamic";
import React from "react";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { type InternationalizedString } from "@/lib/fetchers/localized-blog";

const icons: Record<string, any> = {
  InstantPayoutIconSVG: dynamic(
    () => import("@/app/[locale]/components/common/svg_icons/instant-payout-icon-svg"),
    { loading: () => null }
  ),
  DollarBagIconSVG: dynamic(
    () => import("@/app/[locale]/components/common/svg_icons/dollar-bag-icon-svg"),
    { loading: () => null }
  ),
  PercentageIconSVG: dynamic(
    () => import("@/app/[locale]/components/common/svg_icons/percentage-icon-svg"),
    { loading: () => null }
  ),
  ListIconSVG: dynamic(
    () => import("@/app/[locale]/components/common/svg_icons/list-icon-svg"),
    { loading: () => null }
  ),
  LocalCurrencyIconSVG: dynamic(
    () => import("@/app/[locale]/components/common/svg_icons/local-currency-icon-svg"),
    { loading: () => null }
  ),
  GlobeIconSVG: dynamic(
    () => import("@/app/[locale]/components/common/svg_icons/globe-icon-svg"),
    { loading: () => null }
  ),
};

export interface AdvantageData {
  id: number;
  title: InternationalizedString[];
  details: InternationalizedString[];
  icon: string;
}

export interface ExclusiveAdvantagesData {
  title: InternationalizedString[];
  Advantages: AdvantageData[];
}

interface Props {
  data: ExclusiveAdvantagesData;
  langCode: LanguageCode;
}

const ExclusiveAdvantagesSection: React.FC<Props> = ({ data, langCode }) => {
  return (
    <div className="text-white w-full space-y-2">
      <h4 className="text-base font-semibold">
        {getLocalizedString(data.title, langCode, "en")}
      </h4>

      <div className="w-full bg-background-1 rounded-lg p-6 lg:p-7 2xl:p-8 overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-2 items-center xl:items-start gap-4 lg:gap-8">
          {data.Advantages.map((item) => {
            const Icon = icons[item.icon];
            return (
              <div
                key={item.id}
                className="inline-flex items-center space-x-4 w-full text-left transition-all duration-300"
              >
                <span className="size-20 rounded-lg shrink-0 inline-flex items-center justify-center bg-background">
                  <Icon className="w-9 h-9" />
                </span>
                <span className="gap-y-2 inline-flex flex-col">
                  <span className="text-xl font-semibold">
                    {getLocalizedString(item.title, langCode, "en")}
                  </span>
                  <span className="text-sm text-white/55">
                    {getLocalizedString(item.details, langCode, "en")}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveAdvantagesSection;
