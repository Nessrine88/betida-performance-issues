"use client";

import React from "react";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { type InternationalizedString } from "@/lib/fetchers/localized-blog";

export interface CommissionItem {
  id: number;
  title: InternationalizedString[];
  details: InternationalizedString[];
  rate: InternationalizedString[];
}

export interface CommissionRulesData {
  title: InternationalizedString[];
  description: InternationalizedString[];
  rules: CommissionItem[];
}

interface Props {
  data: CommissionRulesData;
  langCode: LanguageCode;
}

const CommissionRulesSection: React.FC<Props> = ({ data, langCode }) => {
  return (
    <div className="text-white w-full space-y-4">
      <div className="space-y-1">
        <h4 className="text-base font-semibold">
          {getLocalizedString(data.title, langCode, "en")}
        </h4>
        <p className="text-sm text-white/55">
          {getLocalizedString(data.description, langCode, "en")}
        </p>
      </div>

      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-7">
        {data.rules.map((item) => (
          <div
            key={item.id}
            className="p-4 flex flex-col justify-between h-full w-full bg-background-1 rounded-lg gap-8"
          >
            <div className="space-y-2">
              <div className="text-xl font-semibold">
                {getLocalizedString(item.title, langCode, "en")}
              </div>
              <div className="text-sm text-white/55">
                {getLocalizedString(item.details, langCode, "en")}
              </div>
            </div>
            <div className="bg-background rounded-lg p-4 w-full text-white/55 text-sm min-h-20">
              {getLocalizedString(item.rate, langCode, "en")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommissionRulesSection;
