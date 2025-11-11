"use client";
import { useLocale } from "next-intl";
import ProfileInfo from "../../common/profile-info/profile-info";
import OutlineCard from "../../global-components/cards/outline-card";
import React from "react";
import WhiteStarSVG from "../../common/svg_icons/white-star-svg";
import type { OverviewData } from "@/types/vipClub";

function renderIcon(icon: string) {
  switch (icon) {
    case "stroke-star":
      return <WhiteStarSVG className="stroke-foreground" />;
    case "fill-star":
      return <WhiteStarSVG className="fill-foreground" />;
    default:
      return <WhiteStarSVG className="stroke-foreground" />; 
  }
}

interface Props {
  data: OverviewData;
}

export default function OverviewContent({ data }: Props) {
  const locale = useLocale();
  const langKey = locale.split("-")[0];

  return (
    <div className="text-foreground flex flex-col items-center gap-4 pt-4">
      <div className="w-full rounded-xl overflow-hidden bg-background border border-border px-8 py-6">
        <ProfileInfo popupItem />
      </div>

      {data.map((section, sectionIndex) => {
        const sectionTitle =
          section.title.find((s) => s._key === langKey)?.value ||
          section.title.find((s) => s._key === "en")?.value ||
          section.title[0]?.value ||
          "";

        return (
          <OutlineCard
            key={section._key || sectionIndex}
            lock={section.locked}
            title={
              <div className="flex items-center gap-2">{sectionTitle}</div>
            }
            collapsable
            defaultOpen={false}
          >
            <div className="flex flex-col gap-6">
              {section.items.map((benefit, index) => {
                const benefitTier =
                  benefit.tier.find((s) => s._key === langKey)?.value ||
                  benefit.tier.find((s) => s._key === "en")?.value ||
                  benefit.tier[0]?.value ||
                  "";

                return (
                  <div
                    key={benefit._key || index}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      {renderIcon(benefit.icon)}
                      <span>{benefitTier}</span>
                    </div>
                    <ul className="list-disc list-inside text-sm text-foreground/55 space-y-1 px-2">
                      {benefit.perks.map((perk, i) => {
                        const perkText =
                          perk.value.find((s: any) => s._key === langKey)?.value ||
                          perk.value.find((s: any) => s._key === "en")?.value ||
                          perk.value[0]?.value ||
                          "";
                        return <li key={i}>{perkText}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </OutlineCard>
        );
      })}
    </div>
  );
}
