"use client";

import { useState, useEffect } from "react";
import type { ColumnType } from "@/types/global-table-types";
import { GlobalTable2 } from "@/app/[locale]/components/global-components/global-table/global-table-2";
import DropdownWithSearch from "@/app/[locale]/components/global-components/dropdown-with-search";
import type { SortOption } from "@/app/[locale]/components/global-components/global-sort-dropdown";
import { useTranslations } from "next-intl";
import { type InternationalizedString } from "@/lib/fetchers/localized-blog";

interface ReferredUsersData {
  first_Time_deposits: string;
  monthly_ftd: string;
  total_deposits: string;
  vip_users: string;
}

interface ReferredUser {
  _id: string;
  name: InternationalizedString[];
  value: string;
  createdDate: string;
  hits: number;
  referredUsers: number;
  firstTimeDeposits: number;
  totalDeposits: number;
  commissionRate: string;
  overallCommission: string;
  availableCommission: InternationalizedString[];
  userLink: string;
}

interface Props {
  referredUsers: ReferredUser[];
}

export default function ReferredUsersTable({ referredUsers }: Props) {
  const [data, setData] = useState<ReferredUsersData[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("affiliateReferredUsers");
  const sortOptions: SortOption[] = [
    { label: "Elvangorkem (lfxZCjVg)", value: "elvangorkem" },
    { label: "Fsfa (DIBMujZY)", value: "fsfa" },
    { label: "New Campaign (xyz123)", value: "newCampaign" },
  ];

  useEffect(() => {
    if (referredUsers) {
      const formattedData = referredUsers.map((user) => ({
        first_Time_deposits: user.firstTimeDeposits.toString(),
        monthly_ftd: "0",
        total_deposits: user.totalDeposits.toString(),
        vip_users: "0",
      }));
      setData(formattedData);
      setLoading(false);
    }
  }, [referredUsers]);

  const columns: ColumnType<ReferredUsersData>[] = [
    {
      key: "first_Time_deposits",
      label: t("firstTimeDeposits"),
      tooltip: t("firstTimeDepositsTooltip"),
      render: (row) => (
        <span className="font-medium text-sm pl-2 pr-1">
          {row.first_Time_deposits}
        </span>
      ),
    },
    {
      key: "monthly_ftd",
      label: t("monthlyFTD"),
      tooltip: t("monthlyFTDTooltip"),
      render: (row) => (
        <span className="font-medium text-sm pl-2 pr-1">{row.monthly_ftd}</span>
      ),
    },
    {
      key: "total_deposits",
      label: t("totalDeposits"),
      tooltip: t("totalDepositsTooltip"),
      render: (row) => (
        <span className="font-medium text-sm pl-2 pr-1">
          {row.total_deposits}
        </span>
      ),
    },
    {
      key: "vip_users",
      label: t("vipUsers"),
      tooltip: t("vipUsersTooltip"),
      render: (row) => (
        <span className="font-medium text-sm pl-2 pr-1">{row.vip_users}</span>
      ),
    },
  ];

  return (
    <div className="w-full space-y-5">
      <DropdownWithSearch sortOptions={sortOptions} />
      <div className="bg-background flex flex-row items-center gap-1 rounded-sm px-4 py-2 text-foreground/55 text-sm">
        <span>{t("totalReferredUsers")}</span>
        <span className="text-foreground">{referredUsers.length}</span>
      </div>
      <GlobalTable2<ReferredUsersData>
        columns={columns}
        data={data}
        loading={loading}
        emptyMessage={t("emptyMessage")}
        maxHeight={440}
      />
    </div>
  );
}
