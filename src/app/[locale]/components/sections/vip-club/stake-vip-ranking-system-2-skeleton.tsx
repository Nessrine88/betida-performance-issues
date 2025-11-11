import React from "react";

export function StakeVipRankingSystem2Skeleton() {
  return (
    <div className="pt-12 md:pt-16 app-container space-y-6">
      <div className="h-8 w-48 mx-auto bg-background-2 animate-pulse rounded" />
      <div className="bg-background-1 rounded-lg p-6 lg:p-7 2xl:p-8 overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-2 items-center xl:items-start gap-4 lg:gap-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="inline-flex items-center space-x-4 w-full h-20 bg-background-2 animate-pulse rounded-lg"
            >
              <div className="size-20 bg-background-3 animate-pulse rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-32 bg-background-2 animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-background-2 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
