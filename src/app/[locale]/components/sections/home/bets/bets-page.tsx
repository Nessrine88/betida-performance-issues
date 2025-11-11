"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GlobalTable } from "@/app/[locale]/components/global-components/global-table/global-table";
import type { BetData } from "@/types/bets-table-types";
import { BetsTableTabs } from "./bets-table-tabs";
import dayjs from "dayjs";
import type { ColumnType } from "@/types/global-table-types";
import TabLoader from "@/app/[locale]/tab-loader";
import PointerSVG from "../../../common/svg_icons/pointer-svg";
import CryptoIcon from "../../../common/svg_icons/crypto-coins/crypto-icon";

export interface BetsTableProps {
  betsData: {
    casino: BetData[];
    sports: BetData[];
    "race-leaderboard": BetData[];
  };
}

const renderPayout = (row: BetData) => {
  const payoutValue = parseFloat(row.payout.replace(/[$,]/g, ""));
  const isPositive = payoutValue >= 0;
  return (
    <span
      className={`inline-flex items-end gap-1 ${
        isPositive ? "text-success" : "text-destructive"
      } font-semibold`}
    >
      {row.payout}
      <CryptoIcon type={(row.type as any) || "default"} />
    </span>
  );
};

const renderBetAmount = (row: BetData) => {
  const betValue = parseFloat(row.betAmount.replace(/[$,]/g, ""));
  const isPositive = betValue >= 0;
  return (
    <span
      className={`inline-flex items-end md:items-center gap-1 ${
        isPositive ? "text-success" : "text-destructive"
      } font-semibold"`}
    >
      {row.betAmount}
      <CryptoIcon type={(row.type as any) || "default"} />
    </span>
  );
};

const renderMultiplier = (row: BetData) => (
  <span className="text-foreground font-medium">{row.multiplier}</span>
);

export default function BetsTable({ betsData }: BetsTableProps) {
  const t = useTranslations("betsTableColumns");
  const searchParams = useSearchParams();
  const tab =
    (searchParams.get("tab") as keyof BetsTableProps["betsData"]) || "casino";
  const [data, setData] = useState<BetData[]>(betsData[tab] || []);

  useEffect(() => {
    setData(betsData[tab] || []);
  }, [tab, betsData]);

  const desktopColumns: ColumnType<BetData>[] = [
    {
      key: "game",
      label: t("game"),
      render: (row: any) => (
        <span className="font-medium inline-flex items-center gap-1">
          <PointerSVG />
          {row.game}
        </span>
      ),
    },
    {
      key: "user",
      label: t("user"),
      render: (row: any) => (
        <span className="font-medium inline-flex items-center gap-1">
          <PointerSVG />
          {row.user}
        </span>
      ),
    },
    {
      key: "time",
      label: t("time"),
      render: (row: any) => (
        <span className="font-medium">{dayjs(row.time).format("hh:mm A")}</span>
      ),
    },
    {
      key: "betAmount",
      label: t("betAmount"),
      render: renderBetAmount,
    },
    {
      key: "multiplier",
      label: t("multiplier"),
      render: renderMultiplier,
    },
    {
      key: "payout",
      label: t("payout"),
      align: "right",
      render: renderPayout,
    },
  ];
  const mobileColumns: ColumnType<BetData>[] = [
    {
      key: "game",
      label: t("game"),
      render: (row: any) => (
        <span className="font-medium inline-flex items-center gap-1">
          <PointerSVG />
          {row.game}
        </span>
      ),
    },

    {
      key: "payout",
      label: t("payout"),
      align: "right",
      render: renderPayout,
    },
  ];

  return (
    <div className="w-full">
      <BetsTableTabs />
      <div className="w-full overflow-hidden rounded-lg relative">
        <TabLoader />
        <div className="hidden md:block">
          <GlobalTable<BetData>
            columns={desktopColumns}
            data={data}
            // loading={loading}
            emptyMessage={`No ${tab.replace("-", " ")} bets found.`}
            maxHeight={440}
          />
        </div>
        <div className="block md:hidden">
          <GlobalTable<BetData>
            columns={mobileColumns}
            data={data}
            // loading={loading}
            emptyMessage={`No ${tab.replace("-", " ")} bets found.`}
            maxHeight={440}
          />
        </div>
      </div>
    </div>
  );
}
