import CampaignList from "@/app/[locale]/components/sections/affiliate/campaings/campaings-list";
import CampaignsTable from "@/app/[locale]/components/sections/affiliate/campaings/campaings-table";
import { fetchCampaigns } from "@/lib/fetchers/affiliate/affiliate-campaign";
import type { LanguageCode } from "@/lib/helpers/localized-content";

interface Props {
  langCode: LanguageCode;
  t: any;
}

export default async function CampaignsContent({ langCode, t }: Props) {
  const campaigns = await fetchCampaigns();

  return (
    <div className="w-full bg-background-1 rounded-lg p-6 overflow-hidden space-y-6">
      <div className="space-y-4 lg:space-y-2">
        <h3 className="text-white font-semibold text-xl lg:text-2xl 2xl:text-3xl">
          {t("title")}
        </h3>
        <p className="text-white/55 text-base">{t("description")}</p>
      </div>
      <div className="w-full">
        <CampaignsTable campaigns={campaigns} />
      </div>
      <div className="w-full">
        <CampaignList langCode={langCode} campaigns={campaigns} />
      </div>
    </div>
  );
}