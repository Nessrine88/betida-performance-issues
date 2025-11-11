"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useSidebarStore } from "@/store/sidebar-store";
import GlobalModal from "../../../global-components/global-modal/global-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Button } from "../../../ui/button";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content"; 
import {
  type Campaign,
  type InternationalizedString,
} from "@/lib/fetchers/affiliate/affiliate-campaign";

interface CampaignDownloadModalProps {
  campaigns: Campaign[];
  langCode: LanguageCode; 
}

export default function CampaignDownloadModal({
  campaigns,
  langCode, 
}: CampaignDownloadModalProps) {
  const { campaignDownloadModalOpen, toggleCampaignDownloadModalOpen } =
    useSidebarStore();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCampaign, setSelectedCampaign] = useState("allCampaigns");

  useEffect(() => {
    const modalParam = searchParams.get("modal");
    const campaignParam = searchParams.get("campaign");

    if (modalParam === "campaignDownload" && campaignParam) {
      setSelectedCampaign(campaignParam);
    } else {
      setSelectedCampaign("allCampaigns");
    }
  }, [searchParams]);

  const handleSelectChange = (value: string) => {
    setSelectedCampaign(value);
    const query = `${pathName}?modal=campaignDownload&campaign=${value}`;
    router.push(query, { scroll: false });
  };

  const handleApply = () => {
    toggleCampaignDownloadModalOpen();
  };

  const selectedCampaignName = useMemo(() => {
    const campaign = campaigns.find((c) => c.value === selectedCampaign);
    return campaign
      ? getLocalizedString(
          campaign.name as InternationalizedString[],
          langCode,
          "en"
        )
      : "Select Campaign";
  }, [campaigns, selectedCampaign, langCode]);

  return (
    <GlobalModal
      title="Export"
      open={campaignDownloadModalOpen}
      onOpenChange={() => {
        toggleCampaignDownloadModalOpen();
        router.push(pathName, { scroll: false });
      }}
      className="lg:min-w-96"
    >
      <div className="space-y-4 w-full">
        <Select value={selectedCampaign} onValueChange={handleSelectChange}>
          <SelectTrigger className="bg-background-2! transition-all duration-300 hover:bg-gray-500! cursor-pointer w-full">
            <SelectValue placeholder={selectedCampaignName} />
          </SelectTrigger>
          <SelectContent className="text-sm z-50">
            <SelectItem value="allCampaigns">All Campaigns</SelectItem>
            {campaigns.map((campaign) => (
              <SelectItem
                key={campaign.value}
                value={campaign.value}
                className="py-1 cursor-pointer"
              >
                {getLocalizedString(
                  campaign.name as InternationalizedString[],
                  langCode,
                  "en"
                )}{" "}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-full">
          <Button
            aria-label="export"
            fillWidth
            variant="orangeGradient"
            onClick={handleApply}
            className="w-full"
          >
            Export as CSV
          </Button>
        </div>
      </div>
    </GlobalModal>
  );
}
