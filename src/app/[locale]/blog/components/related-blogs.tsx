import React from "react";
import { fetchBlogsByCategory, type Blog } from "@/lib/fetchers/blog";
import BlogCard from "./blog-card";
import { getLocale, getTranslations } from "next-intl/server";
import { type LanguageCode } from "@/lib/helpers/localized-content";

interface RelatedBlogsProps {
  categories: string[];
  currentBlogId: string;
}

export default async function RelatedBlogs({
  categories,
  currentBlogId,
}: RelatedBlogsProps) {
  const t = await getTranslations("RelatedBlogs");
  const locale = (await getLocale()) as LanguageCode;

  if (categories.length === 0) {
    return null;
  }

  const fetched: Blog[] = [];

  for (const cat of categories) {
    const data = await fetchBlogsByCategory(cat);
    const filtered = data.filter((b) => b?._id !== currentBlogId);
    fetched.push(...filtered);
  }

  const uniqueBlogs = Array.from(
    new Map(fetched.map((b) => [b?._id, b])).values()
  ).slice(0, 10);

  if (uniqueBlogs.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        {t("title")}
      </h2>
      <div className="flex flex-row gap-3 overflow-x-auto tab-scrollbar pb-1">
        {uniqueBlogs.map((b) => (
          // <Link
          //   aria-label={t("goTo", {
          //     title: b.title ? getLocalizedString(b.title, locale) : "",
          //   })}
          //   href={`/blog/${b.slug.current}`}
          //   key={b._id}
          //   className="shrink-0 max-w-49"
          // >
          // </Link>
          <div key={b._id} className="shrink-0 max-w-49 h-full">
            <BlogCard card={b} locale={locale} redirect redirectUrl="blog" />
          </div>
        ))}
      </div>
    </div>
  );
}