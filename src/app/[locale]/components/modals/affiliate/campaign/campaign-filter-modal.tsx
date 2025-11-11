"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useSidebarStore } from "@/store/sidebar-store";
import GlobalModal from "../../../global-components/global-modal/global-modal";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "../../../ui/command";
import { Checkbox } from "../../../ui/checkbox";
import { Button } from "../../../ui/button";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content"; 
import {
  type Campaign,
  type InternationalizedString,
} from "@/lib/fetchers/affiliate/affiliate-campaign";

interface CampaignFilterModalProps {
  campaigns: Campaign[];
  langCode: LanguageCode; 
}

export default function CampaignFilterModal({
  campaigns,
  langCode, 
}: CampaignFilterModalProps) {
  const { campaignFilterModalOpen, toggleCampaignFilterModalOpen } =
    useSidebarStore();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedCampaigns = useMemo(() => {
    if (!campaigns.some((c) => c.value === "all")) {
      return [
        {
          value: "all",
          name: [{ _key: "en", value: "All" }] as InternationalizedString[],
        }, 
        ...campaigns,
      ];
    }
    return campaigns;
  }, [campaigns]);

  const individualValues = useMemo(
    () =>
      normalizedCampaigns.filter((c) => c.value !== "all").map((c) => c.value),
    [normalizedCampaigns]
  );

  useEffect(() => {
    const modalParam = searchParams.get("modal");
    if (modalParam) {
      if (modalParam.startsWith("campaignFilter=")) {
        const value = modalParam.split("=")[1];
        setSelectedCampaigns(value ? value.split(",") : []);
      } else if (modalParam === "campaignFilter") {
        setSelectedCampaigns([]);
      }
    }
  }, [searchParams]);

  const handleCampaignChange = (campaign: string) => {
    setSelectedCampaigns((prev) => {
      let updated: string[] = [];

      if (campaign === "all") {
        const allSelected =
          individualValues.every((v) => prev.includes(v)) &&
          individualValues.length > 0;
        updated = allSelected ? [] : [...individualValues];
      } else {
        if (prev.includes(campaign)) {
          updated = prev.filter((c) => c !== campaign);
        } else {
          updated = [...prev.filter((c) => c !== "all"), campaign];
        }
      }

      const modalValue =
        updated.length > 0
          ? `campaignFilter=${updated.join(",")}`
          : "campaignFilter";
      const newUrl = `${pathName}?modal=${modalValue}`;
      if (window.location.search !== `?modal=${modalValue}`) {
        router.push(newUrl, { scroll: false });
      }

      return updated;
    });
  };

  const isAllChecked =
    individualValues.length > 0 &&
    individualValues.every((v) => selectedCampaigns.includes(v));
  const isDisabled = selectedCampaigns.length === 0;

  const handleApply = () => toggleCampaignFilterModalOpen();

  const handleClear = () => {
    setSelectedCampaigns([]);
    setSearchTerm("");
    router.push(`${pathName}?modal=campaignFilter`, { scroll: false });
  };

  const filteredCampaigns = normalizedCampaigns.filter((c) => {
    const localizedName = getLocalizedString(
      c.name as InternationalizedString[],
      langCode,
      "en"
    );
    return localizedName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <GlobalModal
      title="Filter Campaigns"
      open={campaignFilterModalOpen}
      onOpenChange={() => {
        toggleCampaignFilterModalOpen();
        router.push(pathName, { scroll: false });
      }}
      className="lg:min-w-96"
    >
      <div className="space-y-4">
        <Command>
          <CommandInput
            placeholder="Search Campaign Name or Campaign ID..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            className="text-foreground placeholder:text-foreground/55"
          />
          <CommandList>
            {filteredCampaigns.map((campaign) => (
              <CommandItem
                key={campaign.value}
                value={campaign.value}
                onSelect={() => handleCampaignChange(campaign.value)}
                className="text-foreground py-2 px-4 hover:bg-background-2 cursor-pointer flex items-center gap-2"
              >
                <Checkbox
                  id={campaign.value}
                  checked={
                    campaign.value === "all"
                      ? isAllChecked
                      : selectedCampaigns.includes(campaign.value)
                  }
                  onCheckedChange={() => handleCampaignChange(campaign.value)}
                />
                {getLocalizedString(
                  campaign.name as InternationalizedString[],
                  langCode,
                  "en"
                )}{" "}
                {/* Use localized name */}
              </CommandItem>
            ))}
          </CommandList>
        </Command>

        <div className="flex justify-between">
          <Button
            variant="gray"
            onClick={handleClear}
            disabled={isDisabled}
            aria-label="clear"
          >
            Clear Selection
          </Button>

          <Button
            variant="orangeGradient"
            onClick={handleApply}
            disabled={isDisabled}
            aria-label="apply"
          >
            Apply
          </Button>
        </div>
      </div>
    </GlobalModal>
  );
}
