"use client";

import DownloadIconSVG from "@/app/[locale]/components/common/svg_icons/download-icon-svg";
import FilterIconSVG from "@/app/[locale]/components/common/svg_icons/filter-icon-svg";
import GrayCard from "@/app/[locale]/components/global-components/cards/gray-card";
import CopyArea from "@/app/[locale]/components/global-components/copy-area";
import GlobalSortDropdown from "@/app/[locale]/components/global-components/global-sort-dropdown";
import type { SortOption } from "@/app/[locale]/components/global-components/global-sort-dropdown";
import AddCampaignModal from "@/app/[locale]/components/modals/affiliate/campaign/add-campaign-modal";
import CampaignDownloadModal from "@/app/[locale]/components/modals/affiliate/campaign/campaign-download-modal";
import CampaignFilterModal from "@/app/[locale]/components/modals/affiliate/campaign/campaign-filter-modal";
import { Button } from "@/app/[locale]/components/ui/button";
import { useSidebarStore } from "@/store/sidebar-store";
import { X } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import {
  type Campaign,
  type InternationalizedString,
} from "@/lib/fetchers/affiliate/affiliate-campaign";
import { toast } from "sonner";

interface Props {
  langCode: LanguageCode;
  campaigns: Campaign[];
}

export default function CampaignList({ langCode, campaigns }: Props) {
  const {
    toggleCampaignFilterModalOpen,
    toggleCampaignDownloadModalOpen,
    toggleAddCampaignModalOpen,
  } = useSidebarStore();
  const router = useRouter();
  const t = useTranslations("affiliateCampaigns");
  const [localCampaigns, setLocalCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCampaignFilterClick = () => {
    router.push("?modal=campaignFilter");
    toggleCampaignFilterModalOpen();
  };

  const handleDownloadModalClick = () => {
    router.push("?modal=campaignDownload");
    toggleCampaignDownloadModalOpen();
  };

  const handleAddCampaignModalClick = () => {
    router.push("?modal=AddCampaign");
    toggleAddCampaignModalOpen();
  };

  const sortOptions: SortOption[] = [
    { label: t("sort.createdAtDesc"), value: "createdAtDesc" },
    { label: t("sort.createdAtAsc"), value: "createdAtAsc" },
    { label: t("sort.ftdHigh"), value: "ftdHigh" },
    { label: t("sort.ftdLow"), value: "ftdLow" },
    { label: t("sort.commissionHigh"), value: "commissionHigh" },
    { label: t("sort.commissionLow"), value: "commissionLow" },
    { label: t("sort.referredHigh"), value: "referredHigh" },
    { label: t("sort.referredLow"), value: "referredLow" },
  ];

  useEffect(() => {
    // Use the campaigns data passed from the parent and localize names if needed for sorting
    if (campaigns) {
      const localizedCampaigns = campaigns.map((campaign) => ({
        ...campaign,
        localizedName: getLocalizedString(
          campaign.name as InternationalizedString[],
          langCode,
          "en"
        ),
      }));
      setLocalCampaigns(localizedCampaigns);
      setLoading(false);
    }
  }, [campaigns, langCode]);

  const handleSort = (sortValue: string) => {
    const sortedCampaigns = [...localCampaigns];
    switch (sortValue) {
      case "createdAtDesc":
        sortedCampaigns.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        break;
      case "createdAtAsc":
        sortedCampaigns.sort(
          (a, b) =>
            new Date(a.createdDate).getTime() -
            new Date(b.createdDate).getTime()
        );
        break;
      case "ftdHigh":
        sortedCampaigns.sort(
          (a, b) => b.firstTimeDeposits - a.firstTimeDeposits
        );
        break;
      case "ftdLow":
        sortedCampaigns.sort(
          (a, b) => a.firstTimeDeposits - b.firstTimeDeposits
        );
        break;
      case "commissionHigh":
        sortedCampaigns.sort(
          (a, b) =>
            parseFloat(
              b.overallCommission.replace("$", "").replace(" USD", "")
            ) -
              parseFloat(
                a.overallCommission.replace("$", "").replace(" USD", "")
              ) || 0
        );
        break;
      case "commissionLow":
        sortedCampaigns.sort(
          (a, b) =>
            parseFloat(
              a.overallCommission.replace("$", "").replace(" USD", "")
            ) -
              parseFloat(
                b.overallCommission.replace("$", "").replace(" USD", "")
              ) || 0
        );
        break;
      case "referredHigh":
        sortedCampaigns.sort((a, b) => b.referredUsers - a.referredUsers);
        break;
      case "referredLow":
        sortedCampaigns.sort((a, b) => a.referredUsers - b.referredUsers);
        break;
      // Fallback or explicit name-based sorting (if added later)
      default:
        // Prevent error if name-based sorting is attempted elsewhere
        console.warn(
          `Unhandled sort value: ${sortValue}. Using default order.`
        );
        break;
    }
    setLocalCampaigns(sortedCampaigns);
  };

  return (
    <div className="space-y-4">
      <div className="w-full flex flex-wrap gap-2 justify-between">
        <GlobalSortDropdown
          sortOptions={sortOptions}
          onSortChange={handleSort}
        />
        <div className="flex gap-2">
          <Button
            aria-label="filter"
            variant="gray"
            className="px-4!"
            onClick={handleCampaignFilterClick}
          >
            <FilterIconSVG />
          </Button>
          <Button
            aria-label="download"
            variant="gray"
            className="px-4!"
            onClick={handleDownloadModalClick}
          >
            <DownloadIconSVG />
          </Button>
          <Button
            variant="orangeGradient"
            className="px-4!"
            onClick={handleAddCampaignModalClick}
            aria-label="campaign"
          >
            {t("newCampaign")}
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="w-full space-y-4 py-10">
          <div className="size-10 bg-background-2 flex items-center justify-center rounded-lg mx-auto">
            <X className="text-foreground/55" />
          </div>
          <div className="text-center text-foreground/55">{t("loading")}</div>
        </div>
      ) : localCampaigns.length === 0 ? (
        <div className="w-full space-y-4 py-10">
          <div className="size-10 bg-background-2 flex items-center justify-center rounded-lg mx-auto">
            <X className="text-foreground/55" />
          </div>
          <div className="text-center text-foreground/55">
            {t("noCampaigns")}
          </div>
        </div>
      ) : (
        localCampaigns.map((campaign) => (
          <div className="w-full" key={campaign._id}>
            <GrayCard
              title={
                <div className="flex items-center justify-between w-full gap-2">
                  <span>
                    {getLocalizedString(
                      campaign.name as InternationalizedString[],
                      langCode,
                      "en"
                    )}
                  </span>
                  <span className="text-end">
                    {t("dateCreated")} {campaign.createdDate}
                  </span>
                </div>
              }
              collapsable
              defaultOpen={false}
            >
              <div className="grid grid-cols-1 xl:grid-cols-2 divide-x-0 xl:divide-x divide-y xl:divide-y-0 divide-background-2 space-y-3 pb-2">
                <div className="w-full space-y-4 pb-4 xl:pb-0 xl:pr-4">
                  <div className="font-semibold">{t("performanceSummary")}</div>
                  <div className="w-full space-y-3">
                    {[
                      [t("campaignCreatedDate"), campaign.createdDate],
                      [t("hits"), campaign.hits],
                      [t("referredUsers"), campaign.referredUsers],
                      [t("firstTimeDeposits"), campaign.firstTimeDeposits],
                      [t("totalDeposits"), campaign.totalDeposits],
                      [t("commissionRate"), campaign.commissionRate],
                      [t("overallCommission"), campaign.overallCommission],
                      [
                        t("availableCommission"),
                        getLocalizedString(
                          campaign.availableCommission as InternationalizedString[],
                          langCode,
                          "en"
                        ),
                      ],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="w-full flex items-start justify-between gap-2 text-sm xl:text-base"
                      >
                        <span>{label}:</span>
                        <span className="text-end">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full space-y-4 xl:pl-4">
                  <div className="font-semibold">{t("shareCampaign")}</div>
                  <CopyArea
                    code={campaign.campaignLink}
                    label={t("campaignLink")}
                    successMessage={t("campaignLinkCopied")}
                    errorMessage={t("campaignLinkError")}
                    emptyMessage={t("noCampaignLink")}
                  />
                </div>
              </div>
              <div className="pt-2 text-end border-t border-background-2">
                <Button
                  aria-label="export"
                  variant="gray"
                  onClick={() =>
                    toast.info("Export in csv feature is coming soon!")
                  }
                >
                  {t("exportCSV")}
                </Button>
              </div>
            </GrayCard>
          </div>
        ))
      )}
      <CampaignFilterModal langCode={langCode} campaigns={localCampaigns} />
      <CampaignDownloadModal langCode={langCode} campaigns={localCampaigns} />
      <AddCampaignModal />
    </div>
  );
}
