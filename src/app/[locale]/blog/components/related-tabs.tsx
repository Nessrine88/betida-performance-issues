"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useSidebarStore } from "@/store/sidebar-store";
import { Link } from "@/i18n/navigation";

interface RelatedTabProps {
  categories: string[];
}

const RelatedTab: React.FC<RelatedTabProps> = ({ categories }) => {
  const t = useTranslations("BlogDetails");
  const { setRouteLoading } = useSidebarStore();

  if (!categories?.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link
          href={`/blog?tab=${cat}`}
          onClick={()=>{setRouteLoading(true)}}
          key={cat}
          aria-label={t("goToCategory", { category: cat })}
          className="text-sm text-foreground/55 bg-background rounded-lg p-1 px-3 flex items-center justify-center -pt-1 hover:text-foreground transition-colors"
        >
          {cat}
        </Link>
      ))}
    </div>
  );
};

export default RelatedTab;
