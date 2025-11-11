import React from "react";
import { fetchAllLocalizedBlogs, fetchLocalizedBlogCategories } from "@/lib/fetchers/localized-blog";
import BlogIconSVG from "@/app/[locale]/components/common/svg_icons/sidebar-icons/blog-icon-svg";
import { GlobalTabs } from "@/app/[locale]/components/global-components/GlobalTabs";
import CImage from "@/lib/CIdImage";
import { getLocalizedString, getSystemLanguage } from "@/lib/helpers/localized-content";
import TabLoader from "../tab-loader";

export default async function Blog() {

  const categoriesData = await fetchLocalizedBlogCategories();
  const blogsData = await fetchAllLocalizedBlogs();
  const langCode = await getSystemLanguage();
  const tabs = categoriesData.map((category) => ({
    label: getLocalizedString(category.categoryName as any, langCode, 'en'),
    value: category.categoryKey,
  }));
  return (
    <div className="w-full h-full pb-10">
      <div className="bg-background-1 h-fit">
        <div className="app-container font-medium py-4">
          <div className="flex flex-row items-center gap-3 text-foreground">
            <BlogIconSVG />
            Blog
          </div>
        </div>
      </div>
      <div className="app-container py-6 flex flex-col gap-4">
        <GlobalTabs data={tabs} />
        <div className="w-full h-auto relative rounded-lg overflow-hidden">
          <TabLoader/>
          <div
            className="
              grid gap-2
              grid-cols-2
              sm:grid-cols-4
              md:grid-cols-3
              lg:grid-cols-5
              xl:grid-cols-6
            "
          >
            {blogsData.map((item, index) => (
              <div
                className="w-full lg:max-w-49 flex flex-col justify-between gap-6 rounded-lg bg-background-1 p-4"
                key={index}
              >
                <div className="flex flex-col gap-2.5">
                  <div className="h-25 rounded-lg w-full bg-background-1">
                    <CImage
                      publicId={item?.thumbnail}
                      alt={getLocalizedString(item?.title, langCode, 'en') || "thumbnail"}
                      height={100}
                      width={160}
                      className="object-cover w-full h-full rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="title text-base font-semibold text-foreground line-clamp-2">
                      {getLocalizedString(item?.title, langCode, 'en')}
                    </div>
                    <div className="title text-xs font-regular text-foreground/55 line-clamp-2 mt-1">
                      {getLocalizedString(item?.shortDescription, langCode, 'en') || ""}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="title text-sm font-regular text-foreground/55">
                    Published at
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
