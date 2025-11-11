import BlogIconSVG from "@/app/[locale]/components/common/svg_icons/sidebar-icons/blog-icon-svg";
import { fetchRGRecognizeSign } from "@/lib/fetchers/responsible-gambling/recognize-sign";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { getLocale } from "next-intl/server";
import { PortableText } from "next-sanity";
import { Suspense } from "react";
import { Skeleton } from "@/app/[locale]/components/ui/skeleton";

export default async function RecogniseTheSignsPage() {
  const data = await fetchRGRecognizeSign();
  const locale = await getLocale();
  const content1 =
    data?.content1?.find((c: any) => c.language === locale)?.blocks || [];
  return (
    <div className="w-full bg-background-1 p-6 rounded-lg overflow-hidden space-y-7">
      <div className="rounded-lg w-full h-35 md:h-62.5 bg-background-3 flex items-center justify-center aspect-92/25">
        <BlogIconSVG className="h-20 md:h-30 w-20 md:w-30 fill-white/55!" />
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
          <div className="flex flex-col gap-2 space-y-4">
            {content1.length > 0 && (
              <PortableText
                value={content1}
                components={portableTextComponents}
              />
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
