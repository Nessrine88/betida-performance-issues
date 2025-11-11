"use client";

import React, { useEffect, useState } from "react"; 
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import dynamic from "next/dynamic";
import { Pause } from "lucide-react";
import PlayIcon from "@/app/[locale]/components/common/svg_icons/play-icon";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { type InternationalizedString } from "@/lib/fetchers/localized-blog";
import CVideo from "@/lib/CVideo";

const icons: Record<string, any> = {
  AffiliateIconSVG: dynamic(
    () =>
      import(
        "@/app/[locale]/components/common/svg_icons/sidebar-icons/affiliate-icon-svg"
      ),
    { loading: () => null }
  ),
  LinkIconSVG: dynamic(
    () => import("@/app/[locale]/components/common/svg_icons/link-icon-svg"),
    { loading: () => null }
  ),
  FlowerIconSVG: dynamic(
    () => import("@/app/[locale]/components/common/svg_icons/flower-icon-svg"),
    { loading: () => null }
  ),
};

export interface StepData {
  id: number;
  step: InternationalizedString[];
  title: InternationalizedString[];
  video: string;
  icon: string;
}

export interface PartneringWithUsData {
  title: InternationalizedString[];
  steps: StepData[];
}

interface Props {
  data: PartneringWithUsData;
  langCode: LanguageCode;
}

export default function PartneringWithUsSection({ data, langCode }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const steps = data.steps;

  const initialId = Number(searchParams.get("step")) || steps[0].id;
  const initialStep = steps.find((s) => s.id === initialId) || steps[0];

  const [activeStep, setActiveStep] = useState(initialStep.id);
  const [selectedVideo, setSelectedVideo] = useState(initialStep.video);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleStepChange = (step: StepData) => {
    setActiveStep(step.id);
    setSelectedVideo(step.video);
    setIsLoading(true);
    router.push(`?step=${step.id}`, { scroll: false });
    setIsPlaying(true); 
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    setIsLoading(true);
    setIsPlaying(true);
  }, [selectedVideo]);

  if (!steps || steps.length === 0) {
    return <div className="text-white">No steps available</div>;
  }

  return (
    <div className="text-white w-full space-y-2">
      <h4 className="text-base font-semibold">
        {getLocalizedString(data.title, langCode, "en")}
      </h4>

      <div className="w-full bg-background-1 rounded-lg p-6 lg:p-7 2xl:p-8 overflow-hidden grid grid-cols-1 xl:grid-cols-2 items-center xl:items-start gap-4 lg:gap-10">
        <div className="space-y-4 w-full">
          {steps.map((item) => {
            const Icon = icons[item.icon];
            const isActive = activeStep === item.id;

            return (
              <button
                aria-label={getLocalizedString(item.title, langCode, "en")}
                key={item.id}
                className={`inline-flex items-center space-x-4 w-full text-left group cursor-pointer
                                    ${
                                      isActive
                                        ? "bg-background-2 rounded-lg"
                                        : "hover:bg-background-2 rounded-lg"
                                    } 
                                    transition-all duration-300 p-1`}
                onClick={() => handleStepChange(item)}
              >
                <span className="size-20 rounded-full shrink-0 inline-flex items-center justify-center bg-background">
                  <Icon className="w-9 h-9" />
                </span>
                <span
                  className={`gap-y-2 inline-flex flex-col transition-all duration-300 ${
                    isActive ? "" : "group-hover:scale-105"
                  }`}
                >
                  <span className="text-xl font-semibold">
                    {getLocalizedString(item.step, langCode, "en")}
                  </span>
                  <span className="text-sm text-white/55">
                    {getLocalizedString(item.title, langCode, "en")}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="w-full h-44 sm:h-60 lg:h-72 bg-background rounded-sm relative flex items-center justify-center overflow-hidden group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CVideo
            publicId={selectedVideo} 
            width={1280}
            height={720}
            className="w-full h-full object-cover"
            autoPlay={isPlaying}
            muted
            loop
            controls={false}
            onLoadedData={() => setIsLoading(false)}
          />
          {/* Video Loader Animation */}
          {isLoading && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-background/80 animate-fade-in"
              aria-label="Loading video"
            >
              <div className="relative w-16 h-16">
                <PlayIcon className="w-full h-full text-white/50 animate-pulse" />
                <div className="absolute inset-0 border-4 border-white/20 border-t-white/80 rounded-full animate-spin" />
              </div>
            </div>
          )}

          {!isLoading && (
            <button
              aria-label={isPlaying ? "Pause video" : "Play video"}
              onClick={togglePlayPause}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-foreground-3 rounded-full flex items-center justify-center text-gray-200 hover:bg-background-2 transition-colors
                            ${
                              isPlaying && !isHovered
                                ? "opacity-0 group-hover:opacity-100"
                                : "opacity-100"
                            }`}
            >
              <span>
                {isPlaying ? <Pause /> : <PlayIcon className="w-4" />}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
