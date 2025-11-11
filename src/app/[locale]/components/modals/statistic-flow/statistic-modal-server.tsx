"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import GlobalModal from "../../global-components/global-modal/global-modal";
import ProfileInfo from "../../common/profile-info/profile-info";
import GlobalSortDropdown from "../../global-components/global-sort-dropdown";
import { Button } from "../../ui/button";
import DownloadIconSVG from "../../common/svg_icons/download-icon-svg";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface StatisticsModalClientProps {
  data: any;
  langCode: LanguageCode;
}

export default function StatisticsModalClient({
  data,
  langCode,
}: StatisticsModalClientProps) {
  const router = useRouter();
  const { statisticModalOpen, toggleStatisticModalOpen } = useSidebarStore();
  const pathName = usePathname();
  const t = useTranslations("statisticsModal");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCurrency, setSelectedCurrency] = useState("all");
  console.log(selectedCurrency);
  const handleClose = () => {
    toggleStatisticModalOpen();
    router.push(pathName, { scroll: false });
  };

  const { title, userInfo, filters, stats, buttonText } = data || {};
  const localizedTitle = getLocalizedString(title, langCode);
  const localizedButtonText = getLocalizedString(buttonText, langCode);
  const username = getLocalizedString(userInfo?.username, langCode);
  const joinDate = getLocalizedString(userInfo?.joinDate, langCode);

  const currentStats = stats?.[selectedType] || stats?.all || [];
  const typeOptions =
    filters?.typeOptions?.map((opt: any) => ({
      label: getLocalizedString(opt.label, langCode),
      value: opt.value,
    })) || [];

  const currencyOptions =
    filters?.currencyOptions?.map((opt: any) => ({
      label: getLocalizedString(opt.label, langCode),
      value: opt.value,
    })) || [];

  return (
    <GlobalModal
      title={localizedTitle}
      open={statisticModalOpen}
      onOpenChange={handleClose}
      className="min-h-60"
    >
      <div className="w-full text-white space-y-2">
        <div className="w-full space-y-2">
          <div className="w-full text-sm">
            <div className="font-semibold">{username}</div>
            <div>{joinDate}</div>
          </div>
          <ProfileInfo popupItem />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          <div className="w-full space-y-1">
            <div className="text-white/55">{t("typeLabel")}</div>
            <GlobalSortDropdown
              fillWidth
              queryKey="type"
              sortIcon={false}
              sortText={false}
              sortOptions={typeOptions}
              onSortChange={(value) => setSelectedType(value)}
            />
          </div>

          <div className="w-full space-y-1">
            <div className="text-white/55">{t("currencyLabel")}</div>
            <GlobalSortDropdown
              fillWidth
              queryKey="currency"
              sortIcon={false}
              sortText={false}
              sortOptions={currencyOptions}
              onSortChange={(value) => setSelectedCurrency(value)}
            />
          </div>

          {currentStats.map((stat: any, index: number) => {
            const localizedLabel = getLocalizedString(stat.label, langCode);
            return (
              <div
                key={index}
                className="bg-background-2 p-3 rounded-lg space-y-1"
              >
                <div className="text-white/55 text-sm">{localizedLabel}</div>
                <div className="text-white font-semibold">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <div className="pt-4">
          <Button
            variant="greenGradient"
            fullWidth
            className="flex items-center justify-center gap-2"
          >
            <span>{localizedButtonText}</span>
            <DownloadIconSVG />
          </Button>
        </div>
      </div>
    </GlobalModal>
  );
}
