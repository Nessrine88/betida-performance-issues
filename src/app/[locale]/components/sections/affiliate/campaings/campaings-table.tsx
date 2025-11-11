"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { GlobalTable2 } from "@/app/[locale]/components/global-components/global-table/global-table-2";
import { type ColumnType } from "@/types/global-table-types";
import { useTranslations } from "next-intl";
import { type Campaign } from "@/lib/fetchers/affiliate/affiliate-campaign";

interface CampaignsData {
  campaign_hits: string;
  referred_Users: string;
  first_time_deposits: string;
  total_deposits: string;
  overall_commission: string;
  tooltip?: string | ReactNode;
}

interface Props {
  campaigns: Campaign[];
}

export default function CampaignsTable({ campaigns }: Props) {
  const [data, setData] = useState<CampaignsData[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("affiliateCampaigns");

  useEffect(() => {
    // Map the fetched Campaign data to CampaignsData format to match the mock JSON
    if (campaigns) {
      const formattedData = campaigns.map((campaign) => ({
        campaign_hits: campaign.hits.toString(),
        referred_Users: campaign.referredUsers.toString(),
        first_time_deposits: campaign.firstTimeDeposits.toString(),
        total_deposits: campaign.totalDeposits.toString(),
        overall_commission: campaign.overallCommission,
      }));
      setData(formattedData);
      setLoading(false);
    }
  }, [campaigns]);

  const columns: ColumnType<CampaignsData>[] = [
    {
      key: "campaign_hits",
      label: t("campaignHits"),
      tooltip: t("campaignHitsTooltip"),
      render: (row) => (
        <span className="font-medium text-sm pl-2 pr-1">
          {row.campaign_hits}
        </span>
      ),
    },
    {
      key: "referred_Users",
      label: t("referredUsers"),
      tooltip: t("referredUsersTooltip"),
      render: (row) => (
        <span className="font-medium text-sm pl-2 pr-1">
          {row.referred_Users}
        </span>
      ),
    },
    {
      key: "first_time_deposits",
      label: t("firstTimeDeposits"),
      tooltip: t("firstTimeDepositsTooltip"),
      render: (row) => (
        <span className="font-medium text-sm pl-2 pr-1">
          {row.first_time_deposits}
        </span>
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
      key: "overall_commission",
      label: t("overallCommission"),
      tooltip: t("overallCommissionTooltip"),
      render: (row) => (
        <span className="font-medium text-sm pl-2 pr-1">
          {row.overall_commission} USD
        </span>
      ),
    },
  ];

  return (
    <div className="w-full">
      <GlobalTable2<CampaignsData>
        columns={columns}
        data={data}
        loading={loading}
        emptyMessage={t("emptyMessage")}
        maxHeight={440}
      />
    </div>
  );
}
