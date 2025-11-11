import dynamic from "next/dynamic";
import React from "react";
import type { VipLevelDisplay, VipLevelItem, VipRankingLevel1 } from "@/types/vipClub";

const WhiteTickIconSvgIcon = dynamic(
  () => import("@/app/[locale]/components/common/svg_icons/white-tick-icon-svg"),
  { loading: () => null }
);
const icons: Record<string, any> = {
  BronzeIconSvg: dynamic(
    () =>
      import("@/app/[locale]/components/common/svg_icons/level-icons/bronze-icon-svg"),
    { loading: () => null }
  ),
  SilverIconSvg: dynamic(
    () =>
      import("@/app/[locale]/components/common/svg_icons/level-icons/silver-icon-svg"),
    { loading: () => null }
  ),
  GoldIconSvg: dynamic(
    () => import("@/app/[locale]/components/common/svg_icons/level-icons/gold-icon-svg"),
    { loading: () => null }
  ),
  PlatinumIconSvg: dynamic(
    () =>
      import("@/app/[locale]/components/common/svg_icons/level-icons/platinum-icon-svg"),
    { loading: () => null }
  ),
};

const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(0)}M`;
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(0)}k`;
  }
  return `$${price}`;
};

const StakeVipRankingSystem: React.FC<{ data: VipRankingLevel1 }> = ({
  data,
}) => {
  const localizedTitle = data?.title[0]?.value || "";

  const levelEntries = data.levels.map((level) => {
    const key = level.icon
      .toLowerCase()
      .replace("icon", "")
      .replace("svg", "")
      .trim();
    const localizedItems = level.items.map(
      (item: VipLevelItem) => item?.value[0]?.value || ""
    );
    return [
      key,
      {
        progress: level.progress,
        icon: level.icon,
        price: formatPrice(level.price),
        items: localizedItems,
      } as VipLevelDisplay,
    ] as [string, VipLevelDisplay];
  });

  return (
    <section className="w-full text-white">
      {/* Title */}
      <h2 className="text-center text-white/55 font-semibold text-xl">
        {localizedTitle}
      </h2>

      {/* Progress bar */}
      <div className="flex items-center justify-center gap-4 lg:gap-6 py-9 max-w-4xl w-full mx-auto">
        {levelEntries.map(([key, level], index) => {
          const isActive = level.progress === "100%";
          const Icon = icons[level.icon as keyof typeof icons];

          return (
            <React.Fragment key={key}>
              {/* Circle */}
              <div
                className={`flex items-center justify-center size-12 lg:size-16 rounded-full shrink-0
                  ${isActive ? "bg-linear-to-t from-orange-1 to-yellow-1" : "bg-background-2"}
                `}
              >
                <Icon className="w-5 lg:w-8" />
              </div>

              {/* Connector (only if not last) */}
              {index < levelEntries.length - 1 && (
                <div className="h-1 flex-1 bg-background-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: level.progress }}
                    className="h-full bg-foreground"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Level cards */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex gap-4">
          {levelEntries.map(([key, level]) => {
            const isActive = level.progress === "100%";
            return (
              <div
                key={key}
                className={`rounded-lg overflow-hidden p-6 transition w-2xs shrink-0 space-y-6
                  ${isActive ? "bg-background-2" : "bg-background-1"}
                `}
              >
                <div className="w-full space-y-2">
                  {/* Level name */}
                  <span className="inline-block bg-foreground-3 text-white capitalize text-xs px-2 py-1 rounded-full">
                    {key} level
                  </span>

                  {/* Price */}
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold text-white">
                      {level.price}
                    </p>
                    <p className="text-sm text-white/55">Wager amount</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {level.items.map((item: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <div className="bg-foreground-3 size-5 rounded-full flex items-center justify-center shrink-0">
                        <WhiteTickIconSvgIcon />
                      </div>
                      <div>{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StakeVipRankingSystem;
