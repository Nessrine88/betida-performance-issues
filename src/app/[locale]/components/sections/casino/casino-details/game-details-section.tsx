"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/components/ui/select";
import { useSearchParams } from "next/navigation";
import { GlobalTabs } from "@/app/[locale]/components/global-components/GlobalTabs";
import Explanation from "./tabs/explanation";
import ProgressSVG from "@/app/[locale]/components/common/svg_icons/progress-svg";
import { getSlugText } from "@/lib/helpers/slugify";
import TrophySVG from "@/app/[locale]/components/common/svg_icons/troffee-svg";
import TabLoader from "@/app/[locale]/tab-loader";
import { Link, useRouter } from "@/i18n/navigation";

function GameDetailsSection({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("play-details") || "explanation";
  const router = useRouter();
  const [type, setType] = useState(searchParams.get("playReward") || "casino");
  const handleTypeChange = (value: string) => {
    setType(value);
    const params = new URLSearchParams(searchParams);
    params.set("playReward", value);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.get("playReward")) {
      params.set("playReward", "casino");
      router.push(`?${params.toString()}`);
    }
  }, [searchParams, router]);

  const tabs = [
    { value: "explanation", label: "Explanation" },
    { value: "challenges", label: "Challenges" },
  ];

  let content;
  switch (activeTab) {
    case "explanation":
      content = <Explanation />;
      break;
    case "challenges":
      content = (
        <div className="w-full p-6 flex flex-col items-center justify-center gap-3">
          <ProgressSVG />
          <p className="text-foreground/55 text-sm">
            There are no active challenges for the poker game
          </p>
        </div>
      );
      break;
    default:
      content = <Explanation />;
  }

  return (
    <div className="p-4 bg-background-1 rounded-lg relative">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between gap-2 lg:gap-6 mb-3 lg:mb-0">
        <div className="left flex flex-col lg:flex-row lg:items-center gap-2">
          <Link href="#" aria-label={slug}>
            <span className="text-foreground text-base font-semibold capitalize">
              {slug ? getSlugText(slug) : "Unknown"}
            </span>
          </Link>
          <Link href="#" aria-label="BETIDA">
            <span className="text-foreground/55 text-base font-normal capitalize">
              BETIDA {slug ? getSlugText(slug) : "Unknown"}
            </span>
          </Link>
        </div>
        <Select value={type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-full lg:w-fit !h-10 rounded-md !bg-background-2">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="casino"
              className="flex flex-row items-center gap-2 text-sm font-normal text-foreground/55"
            >
              <TrophySVG /> 15,000,00x{" "}
              <span className="text-sm font-semibold text-foreground">
                VeeMay77
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <GlobalTabs bgColor="background" data={tabs} tabName="play-details" />
      <div className="relative overflow-hidden">
        <TabLoader/>
        {content}
      </div>
    </div>
  );
}

export default GameDetailsSection;
