"use client";
import OutlineCard from "../../global-components/cards/outline-card";
import React from "react";
import WhiteStarSVG from "../../common/svg_icons/white-star-svg";
import type { RewardData } from "@/types/vipClub";

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
  data: RewardData;
}

export default function RewardContent({ data }: Props) {
  return (
    <div className="text-foreground flex flex-col items-center gap-4 pt-6">
      {data.map((section, sectionIndex) => (
        <OutlineCard
          key={section._key || sectionIndex}
          lock={section.locked}
          title={
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="size-12 flex items-center justify-center shrink-0 rounded-full bg-background-2">
                  <WhiteStarSVG
                    className={`${section.locked ? "fill-foreground" : "fill-yellow-1"}`}
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="text-base font-semibold text-foreground">
                    {section.title[0]?.value || ""}
                  </div>
                  <p className="text-sm text-foreground/55 font-normal">
                    {section.description[0]?.value || ""}
                  </p>
                </div>
              </div>
            </div>
          }
          collapsable
          defaultOpen={false}
        >
          <div className="flex flex-col gap-6">
            {section.items.map((benefit, index) => (
              <div key={benefit._key || index} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  {renderIcon(benefit.icon)}
                  <span>{benefit.tier[0]?.value || ""}</span>
                </div>
                <ul className="list-disc list-inside text-sm text-foreground/55 space-y-1 px-2">
                  {benefit.perks.map((perk, i) => (
                    <li key={i}>{perk.value[0]?.value || ""}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </OutlineCard>
      ))}
    </div>
  );
}
