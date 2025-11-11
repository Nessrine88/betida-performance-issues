"use client";
import { VipProgressArea } from "./vip-progress-area";
import UnauthenticatedArea from "./unauthenticated-area";
import WhiteArrowSVG from "../svg_icons/white-arrow-svg";
import WhiteStarSVG from "../svg_icons/white-star-svg";
import {
  getLocalizedString,
  getSystemLanguage,
} from "@/lib/helpers/localized-content";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/auth-store";
import { Suspense } from "react";

interface ProfileInfoProps {
  popupItem?: boolean;
}

export default function ProfileInfo({ popupItem }: ProfileInfoProps) {
  const t = useTranslations("profile");
  const langCode = getSystemLanguage();

  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <Suspense fallback={<ProfileInfoSkeleton />}>
        <UnauthenticatedArea />
      </Suspense>
    );
  }

  const localizedLevel = getLocalizedString(
    [{ _key: "level", value: user.level }],
    langCode,
    "en"
  );
  const localizedNextLevel = getLocalizedString(
    [{ _key: "nextLevel", value: user.nextLevel }],
    langCode,
    "en"
  );

  return (
    <div className="w-full">
      <div className="w-full space-y-8">
        <div className="font-medium text-2xl capitalize">{user.username}</div>
        <div className="w-full space-y-6">
          {popupItem ? (
            <div className="w-full inline-grid grid-cols-5 text-base">
              <span className="col-span-2 text-start">{t("title")}</span>
              <span className="inline-flex items-center justify-center">
                <WhiteArrowSVG className="w-4" />
              </span>
              <span className="text-right col-span-2">
                {typeof user.vipProgress === "number"
                  ? user.vipProgress.toFixed(1)
                  : "0.0"}
                %
              </span>
            </div>
          ) : (
            <VipProgressArea progress={user.vipProgress ?? 0} />
          )}

          {/* progress bar */}
          <div className="w-full bg-background-1 rounded-full">
            <div
              className="bg-linear-to-t from-orange-1 to-yellow-1 h-3 rounded-full"
              style={{ width: `${user.vipProgress}%` }}
            />
          </div>

          <div className="w-full grid grid-cols-5 text-sm">
            <div className="flex items-center gap-2 justify-start col-span-2">
              <WhiteStarSVG className="stroke-foreground" />
              <span>{localizedLevel}</span>
            </div>
            <div className="flex items-center justify-center">
              <WhiteArrowSVG className="w-4" />
            </div>
            <div className="flex items-center gap-2 justify-end col-span-2">
              <WhiteStarSVG className="fill-foreground" />
              <span>{localizedNextLevel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileInfoSkeleton() {
  return (
    <div className="w-full">
      <div className="w-full space-y-4">
        {/* Title skeleton */}
        <div className="h-9 w-3/4 mx-auto lg:mx-0 bg-foreground/700 animate-pulse rounded" />
        {/* Button skeleton */}
        <div className="text-center lg:text-left">
          <div className="h-10 w-32 mx-auto lg:mx-0 bg-foreground/700 animate-pulse rounded" />
        </div>
        {/* Text and social icons skeleton */}
        <div className="text-sm font-semibold">
          <div className="w-full text-center lg:text-left">
            <div className="h-4 w-5/6 mx-auto lg:mx-0 bg-foreground/700 animate-pulse rounded" />
          </div>
          <div className="flex items-center justify-center lg:justify-start mt-2 gap-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="size-8 rounded-lg bg-foreground/700 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
