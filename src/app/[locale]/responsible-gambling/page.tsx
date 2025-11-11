import { ResponsibleGamblingContent } from "@/app/[locale]/responsible-gambling/components/responsible-gambling-content";
import CImage from "@/lib/CIdImage";
import { fetchRGBranchName } from "@/lib/fetchers/responsible-gambling/branch-new";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";
import RGBrandContentSkeleton from "./skeletons/rg-brand-content-skeleton";

export default async function BrandNameSmartPage() {
  const data = await fetchRGBranchName();
  const locale = await getLocale();
  return (
    <div className="w-full bg-background-1 p-6 rounded-lg overflow-hidden space-y-7">
      <Suspense
        fallback={
          <div className="w-full h-36 md:h-52 xl:h-64 bg-gray-200 animate-pulse rounded-lg" />
        }
      >
        <div className="w-full h-36 md:h-52 xl:h-64 rounded-lg overflow-hidden">
          <CImage
            publicId={data?.banner}
            alt="template"
            width={968}
            height={250}
            className="w-full h-full object-cover"
            priority
            fetchPriority="high"
          />
        </div>
      </Suspense>
      <Suspense fallback={<RGBrandContentSkeleton />}>
        <div className="flex flex-col gap-7">
          <ResponsibleGamblingContent
            data={{
              branchName: getLocalizedString(
                data?.branchName,
                locale as LanguageCode
              ),
              content1:
                data?.content1?.find((c: any) => c.language === locale)
                  ?.blocks || [],
              content2:
                data?.content2?.find((c: any) => c.language === locale)
                  ?.blocks || [],
              tipsForEffects:
                data?.tipsForEffects?.find((c: any) => c.language === locale)
                  ?.items || [],
            }}
          />
        </div>
      </Suspense>
    </div>
  );
}
