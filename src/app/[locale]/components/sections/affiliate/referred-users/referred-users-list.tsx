"use client";

import { useState, useEffect } from "react";
import GrayCard from "@/app/[locale]/components/global-components/cards/gray-card";
import CopyArea from "@/app/[locale]/components/global-components/copy-area";
import GlobalSortDropdown from "@/app/[locale]/components/global-components/global-sort-dropdown";
import type { SortOption } from "@/app/[locale]/components/global-components/global-sort-dropdown";
import { Button } from "@/app/[locale]/components/ui/button";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { type ReferredUser } from "@/lib/fetchers/affiliate/affiliate-reffered-users";
import { type InternationalizedString } from "@/lib/fetchers/localized-blog";
import { toast } from "sonner";

interface Props {
  langCode: LanguageCode;
  referredUsers: ReferredUser[];
}

export default function ReferredUsersList({ langCode, referredUsers }: Props) {
  const t = useTranslations("affiliateReferredUsers");
  const [localReferredUsers, setLocalReferredUsers] = useState<ReferredUser[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const sortOptions: SortOption[] = [
    { label: t("sort.depositsHigh"), value: "depositsHigh" },
    { label: t("sort.depositsLow"), value: "depositsLow" },
    { label: t("sort.commissionHigh"), value: "commissionHigh" },
    { label: t("sort.commissionLow"), value: "commissionLow" },
    { label: t("sort.registeredDesc"), value: "registeredDesc" },
    { label: t("sort.registeredAsc"), value: "registeredAsc" },
    { label: t("sort.lastDepositDesc"), value: "lastDepositDesc" },
    { label: t("sort.lastDepositAsc"), value: "lastDepositAsc" },
  ];

  useEffect(() => {
    if (referredUsers) {
      setLocalReferredUsers(referredUsers);
      setLoading(false);
    }
  }, [referredUsers]);

  const handleSort = (sortValue: string) => {
    const sortedUsers = [...localReferredUsers];
    switch (sortValue) {
      case "depositsHigh":
        sortedUsers.sort((a, b) => b.totalDeposits - a.totalDeposits);
        break;
      case "depositsLow":
        sortedUsers.sort((a, b) => a.totalDeposits - b.totalDeposits);
        break;
      case "commissionHigh":
        sortedUsers.sort(
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
        sortedUsers.sort(
          (a, b) =>
            parseFloat(
              a.overallCommission.replace("$", "").replace(" USD", "")
            ) -
              parseFloat(
                b.overallCommission.replace("$", "").replace(" USD", "")
              ) || 0
        );
        break;
      case "registeredDesc":
        sortedUsers.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        break;
      case "registeredAsc":
        sortedUsers.sort(
          (a, b) =>
            new Date(a.createdDate).getTime() -
            new Date(b.createdDate).getTime()
        );
        break;
      case "lastDepositDesc":
        break;
      case "lastDepositAsc":
        break;
      default:
        break;
    }
    setLocalReferredUsers(sortedUsers);
  };

  return (
    <div className="space-y-4">
      <div className="w-full">
        <GlobalSortDropdown
          sortOptions={sortOptions}
          onSortChange={handleSort}
        />
      </div>

      {loading ? (
        <div className="w-full space-y-4 py-10">
          <div className="size-10 bg-background-2 flex items-center justify-center rounded-lg mx-auto">
            <X className="text-white/55" />
          </div>
          <div className="text-center text-white/55">{t("loading")}</div>
        </div>
      ) : localReferredUsers.length === 0 ? (
        <div className="w-full space-y-4 py-10">
          <div className="size-10 bg-background-2 flex items-center justify-center rounded-lg mx-auto">
            <X className="text-white/55" />
          </div>
          <div className="text-center text-white/55">
            {t("noReferredUsers")}
          </div>
        </div>
      ) : (
        localReferredUsers.map((user) => (
          <div className="w-full" key={user._id}>
            <GrayCard
              title={
                <div className="flex items-center justify-between w-full gap-2">
                  <span>
                    {getLocalizedString(
                      user.name as InternationalizedString[],
                      langCode,
                      "en"
                    )}
                  </span>
                  <span className="text-end">
                    {t("dateCreated")} {user.createdDate}
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
                      [t("userCreatedDate"), user.createdDate],
                      [t("userHits"), user.hits],
                      [t("referredUsers"), user.referredUsers],
                      [t("firstTimeDeposits"), user.firstTimeDeposits],
                      [t("totalDeposits"), user.totalDeposits],
                      [t("commissionRate"), user.commissionRate],
                      [t("overallCommission"), user.overallCommission],
                      [
                        t("availableCommission"),
                        getLocalizedString(
                          user.availableCommission as InternationalizedString[],
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
                  <div className="font-semibold">{t("shareUser")}</div>
                  <CopyArea
                    code={user.userLink}
                    label={t("userLink")}
                    successMessage={t("userCodeCopied")}
                    errorMessage={t("failedToCopyUserCode")}
                    emptyMessage={t("noUserCodeAvailable")}
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
    </div>
  );
}
