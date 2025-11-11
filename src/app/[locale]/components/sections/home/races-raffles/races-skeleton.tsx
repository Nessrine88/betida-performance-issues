"use client";

import React from "react";
import { Skeleton } from "../../../ui/skeleton";

export default function RacesSkeleton() {
  return (
    <div className="w-full space-y-3 pt-9 animate-pulse">
      {/* Title */}
      <Skeleton className="h-5 w-44 rounded-md" />

      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 100k Race Card Skeleton */}
        <div className="bg-background-3 rounded-lg divide-y flex flex-col divide-border">
          {/* Top section */}
          <div className="p-5 flex items-center gap-5 justify-between">
            <div className="flex flex-col gap-4 w-full">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40 rounded-md" />
                <Skeleton className="h-4 w-64 rounded-md" />
                <Skeleton className="h-4 w-52 rounded-md" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="w-28 h-9 rounded-md" />
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
            </div>

            {/* Circular countdown placeholder */}
            <Skeleton className="w-16 h-16 rounded-full shrink-0" />
          </div>

          {/* Progress section */}
          <div className="p-5 flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded-md" />
            <div className="w-full rounded-full overflow-hidden h-3 bg-background-1">
              <Skeleton className="w-1/2 h-3 rounded-full" />
            </div>
            <Skeleton className="w-6 h-3 rounded-md" />
          </div>
        </div>

        {/* Weekly Raffle Card Skeleton */}
        <div className="bg-background-3 rounded-lg divide-y divide-border">
          <div className="p-5 flex items-center gap-5 justify-between">
            <div className="flex flex-col gap-4 w-full">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40 rounded-md" />
                <Skeleton className="h-4 w-64 rounded-md" />
                <Skeleton className="h-4 w-52 rounded-md" />
                <Skeleton className="h-3 w-40 rounded-md" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="w-28 h-9 rounded-md" />
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
            </div>

            <Skeleton className="w-16 h-16 rounded-full shrink-0" />
          </div>

          <div className="p-5 flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded-md" />
            <div className="w-full rounded-full overflow-hidden h-3 bg-background-1">
              <Skeleton className="w-2/3 h-3 rounded-full" />
            </div>
            <Skeleton className="w-6 h-3 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
