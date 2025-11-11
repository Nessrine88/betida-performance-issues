import { ResponsibleGamblingContent } from "@/app/[locale]/responsible-gambling/components/responsible-gambling-content";
import BlogIconSVG from "@/app/[locale]/components/common/svg_icons/sidebar-icons/blog-icon-svg";
import { fetchRgGamblingFaqs } from "@/lib/fetchers/responsible-gambling/gambling-faqs";
import { Suspense } from "react";
import { Skeleton } from "@/app/[locale]/components/ui/skeleton";
import { getLocale } from "next-intl/server";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";

export default async function ResponsibleGamblingFAQ() {
  const data = await fetchRgGamblingFaqs();
  const locale = await getLocale();
  const branchName = getLocalizedString(
    data?.branchName,
    locale as LanguageCode
  );
  const content1 =
    data?.content?.find((c: any) => c.language === locale)?.blocks || [];
  return (
    <div className="w-full bg-background-1 p-6 rounded-lg overflow-hidden space-y-7">
      <div className="rounded-lg w-full h-35 md:h-62.5 bg-background-3 flex items-center justify-center aspect-92/25">
        <BlogIconSVG className="h-20 md:h-30 w-20 md:w-30 fill-foreground/55!" />
      </div>
      <div className="flex flex-col gap-7">
        <Suspense
          fallback={
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-9/12" />
            </div>
          }
        >
          <div className="flex flex-col gap-7">
            <ResponsibleGamblingContent
              data={{
                branchName,
                content1,
              }}
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
