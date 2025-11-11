import dynamic from "next/dynamic";
import ReferAndEarn from "@/app/[locale]/components/sections/affiliate/overview/refer-earn-section/refer-earn-section";
import PartneringWithUsSection from "@/app/[locale]/components/sections/affiliate/overview/partnering-with-us";
import { getSystemLanguage } from "@/lib/helpers/localized-content";
import { fetchAffiliateOverview } from "@/lib/fetchers/affiliate/affiliate-overview";

const ExclusiveAdvantagesSection = dynamic(
  () => import("@/app/[locale]/components/sections/affiliate/overview/exclusive-advantages-section"),
  { loading: () => null }
);
const CommissionRulesSection = dynamic(
  () => import("@/app/[locale]/components/sections/affiliate/overview/commission-rules-section"),
  { loading: () => null }
);
const TemplateSection = dynamic(
  () => import("@/app/[locale]/components/sections/affiliate/overview/template-section"),
  { loading: () => null }
);

export default async function OverviewPage() {
  const overviewData = await fetchAffiliateOverview();
  const langCode = await getSystemLanguage();

  if (!overviewData) {
    return <div>Affiliate overview data not available</div>;
  }
  
  return (
    <div className="w-full">
      <ReferAndEarn data={overviewData.referAndEarn} langCode={langCode} />
      <div className="pt-9">
        <PartneringWithUsSection
          data={overviewData.partneringWithUs}
          langCode={langCode}
        />
      </div>
      <div className="pt-9">
        <ExclusiveAdvantagesSection
          data={overviewData.exclusiveAdvantages}
          langCode={langCode}
        />
      </div>
      <div className="pt-9">
        <CommissionRulesSection
          data={overviewData.commissionRules}
          langCode={langCode}
        />
      </div>
      <div className="pt-9">
        <TemplateSection data={overviewData.templates} langCode={langCode} />
      </div>
    </div>
  );
}
