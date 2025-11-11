"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSidebarStore } from "@/store/sidebar-store";
import BackSVG from "../../components/common/svg_icons/back-svg";
import BlogIconSVG from "../../components/common/svg_icons/sidebar-icons/blog-icon-svg";

function BlogBackButton() {
  const t = useTranslations("BlogDetails");
  const { setRouteLoading } = useSidebarStore();

  return (
    <div className="app-container font-medium py-4 flex items-center gap-3 text-foreground">
      <Link
        href="/blog"
        prefetch
        aria-label={t("backToBlog")}
        onClick={() => setRouteLoading(true)}
      >
        <BackSVG />
      </Link>
      <BlogIconSVG />
      {t("blog")}
    </div>
  );
}

export default BlogBackButton;
