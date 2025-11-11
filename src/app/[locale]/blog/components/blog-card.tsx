"use client";
import React from "react";
import { Link } from "@/i18n/navigation";
import dayjs from "dayjs";
import CImage from "@/lib/CIdImage";
import { useSidebarStore } from "@/store/sidebar-store";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { useTranslations } from "next-intl";

interface BlogCardProps {
  card: {
    title?: Array<{ _key: string; value: string }> | null;
    shortDescription?: Array<{ _key: string; value: string }> | null;
    thumbnail: string;
    slug?: { current: string } | null;
    publishDate?: string | null;
  };
  locale: LanguageCode;
  redirect?: boolean;
  priority?: boolean;
  redirectUrl?: string;
}

function BlogCard({
  card,
  locale,
  redirect,
  redirectUrl,
  priority,
}: BlogCardProps) {
  const t = useTranslations("BlogCard");
  const { setRouteLoading } = useSidebarStore();

  // Safely extract with fallback
  const title = getLocalizedString(card?.title as any, locale) || t("untitled");
  const shortDesc =
    getLocalizedString(card?.shortDescription as any, locale) || "";

  const content = (
    <div
      className={`w-full h-full lg:max-w-49 flex flex-col justify-between gap-6 rounded-lg bg-background-1 p-4 ${
        redirectUrl ? "cursor-pointer" : ""
      }`}
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
            priority={priority}
            fetchPriority={priority ? "high" : "auto"}
          />
        </div>
        <div className="flex flex-col">
          <div className="title text-base font-semibold text-foreground line-clamp-2">
            {title}
          </div>
          {shortDesc ? (
            <div className="title text-xs font-regular text-foreground/55 line-clamp-2 mt-1">
              {shortDesc}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="title text-sm font-regular text-foreground/55">
          {t("publishedAt")}
        </div>
        <div className="title text-sm font-regular text-foreground/55">
          {card?.publishDate
            ? dayjs(card.publishDate).format("MMM DD, YYYY")
            : "-"}
        </div>
      </div>
    </div>
  );

  // Wrap with Link if redirectUrl exists
  if (redirect && redirectUrl && card?.slug?.current) {
    return (
      <Link
        href={`/${redirectUrl}/${card.slug.current}`}
        onClick={() => setRouteLoading(true)}
        className="block h-full"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default BlogCard;
