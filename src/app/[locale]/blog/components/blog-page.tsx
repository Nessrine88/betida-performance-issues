"use client";

import React from "react";
import AllBlogs from "./all-blogs";
import TabLoader from "@/app/[locale]/tab-loader";
import { type LanguageCode } from "@/lib/helpers/localized-content";

function BlogPage({ locale, data }: { locale: LanguageCode; data: any[] }) {
  return (
    <div className="w-full overflow-hidden rounded-lg relative">
      <TabLoader />
      <AllBlogs locale={locale} data={data} />
    </div>
  );
}

export default BlogPage;
