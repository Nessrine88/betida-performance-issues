"use client";
import CImage from "@/lib/CIdImage";
import { useSidebarStore } from "@/store/sidebar-store";
import dayjs from "dayjs";
import { useRouter } from "@/i18n/navigation";
import React from "react";
import { useTranslations } from "next-intl";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import type { PromotionType } from "@/types/promotions-types";

interface PromotionsCardProps {
  card: PromotionType;
  locale: LanguageCode;
  redirect?: boolean;
  redirectUrl?: string;
  className?: string;
  priority?: boolean;
}

function PromotionsCard({
  card,
  locale,
  redirect,
  redirectUrl,
  className,
  priority,
}: PromotionsCardProps) {
  const t = useTranslations("PromotionsCard");
  const router = useRouter();
  const { setRouteLoading } = useSidebarStore();

  const handleClick = () => {
    if (redirect && redirectUrl && card?.slug) {
      router.push(`/${redirectUrl}/${card.slug?.current}`);
      setRouteLoading(true);
    }
  };

  // Safely extract localized strings
  const title = getLocalizedString(card?.title, locale) || t("untitled");
  const subtitle = getLocalizedString(card?.subtitle, locale) || "";

  return (
    <div
      className={`w-full flex flex-col justify-between gap-6 rounded-lg bg-background-1 p-4 
        ${redirectUrl ? "cursor-pointer" : ""} ${className}`}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2.5">
        <div className="h-25 rounded-lg w-full bg-background-1">
          <CImage
            publicId={card?.thumbnail}
            alt={title}
            height={100}
            width={160}
            className="object-cover w-full h-full rounded-sm"
            sizes="(max-width: 768px) 100vw, 160px"
            priority={false}
            fetchPriority={priority ? "high" : "auto"}
          />
        </div>
        <div className="flex flex-col">
          <div className="title text-base font-semibold text-foreground line-clamp-2">
            {title}
          </div>
          {subtitle ? (
            <div className="title text-sm font-regular text-foreground/55 line-clamp-2 mt-1">
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="title text-sm font-regular text-foreground/55">
          {t("endsAt")}
        </div>
        <div className="title text-sm font-regular text-foreground/55">
          {card?.endsAt
            ? `${dayjs(card.endsAt).format("hh:mm A")} ${dayjs(card.endsAt).format("DD/MM/YY")}`
            : "-"}
        </div>
      </div>
    </div>
  );
}

export default PromotionsCard;
