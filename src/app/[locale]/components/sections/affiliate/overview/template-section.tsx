"use client";

import { Button } from "@/app/[locale]/components/ui/button";
import React from "react";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { type InternationalizedString } from "@/lib/fetchers/localized-blog";
import CImage from "@/lib/CIdImage";
import { Link } from "@/i18n/navigation";

export interface TemplateData {
  image: string;
  browseTemplateLink: string;
  title: InternationalizedString[];
  description: InternationalizedString[];
}

interface Props {
  data: TemplateData;
  langCode: LanguageCode;
}

const TemplateSection: React.FC<Props> = ({ data, langCode }) => {
  return (
    <div className="text-white w-full space-y-4">
      <div className="w-full h-36 md:h-52 xl:h-64 rounded-lg overflow-hidden">
        <CImage
          publicId={data.image}
          alt={getLocalizedString(data.title, langCode, "en") || "template"}
          width={968}
          height={250}
          className="w-full h-full object-cover"
          priority
          fetchPriority="high"
        />
      </div>
      <div className="flex flex-col xl:flex-row items-start gap-4 justify-between">
        <div className="space-y-1">
          <h4 className="text-base font-semibold">
            {getLocalizedString(data.title, langCode, "en")}
          </h4>
          <p className="text-sm text-white/55">
            {getLocalizedString(data.description, langCode, "en")}
          </p>
        </div>
        {data?.browseTemplateLink ? (
          <Link
            target="_blank"
            aria-label="browse link"
            href={data?.browseTemplateLink}
          >
            <Button aria-label="browse" variant="outline">
              {getLocalizedString(
                [
                  { _key: "en", value: "Browse Templates" },
                  { _key: "tr", value: "Şablonlara Göz At" },
                ],
                langCode,
                "en"
              )}
            </Button>
          </Link>
        ) : (
          <Button href="#" aria-label="browse" variant="outline">
            {getLocalizedString(
              [
                { _key: "en", value: "Browse Templates" },
                { _key: "tr", value: "Şablonlara Göz At" },
              ],
              langCode,
              "en"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TemplateSection;
