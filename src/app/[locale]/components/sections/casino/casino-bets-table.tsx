"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import Image from "next/image";
import type { ColumnType } from "@/types/global-table-types";
import type { BetData } from "@/types/bets-table-types";
import { GlobalTable } from "@/app/[locale]/components/global-components/global-table/global-table";
import { GlobalTabs } from "@/app/[locale]/components/global-components/GlobalTabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/components/ui/select";
import { Switch } from "@/app/[locale]/components/ui/switch";
import GlobalModal from "@/app/[locale]/components/global-components/global-modal/global-modal";
import BetDetailsModalContent from "./bet-details-modal";
import BetSlipSheet from "./bet-slip-sheet";
import TabLoader from "@/app/[locale]/tab-loader";

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
      {row.type === "bitcoin" ? (
        <Image
          src="/icons/bit-coin-svg.svg"
          alt="pointer"
          height={16}
          width={16}
        />
      ) : row.type === "ethereum" ? (
        <Image
          src="/icons/ethereum-svg.svg"
          alt="pointer"
          height={16}
          width={16}
        />
      ) : row.type === "binance" ? (
        <Image
          src="/icons/binance-svg.svg"
          alt="pointer"
          height={16}
          width={16}
        />
      ) : (
        <Image
          src="/icons/pointer-svg.svg"
          alt="pointer"
          height={16}
          width={16}
        />
      )}
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
      {row.type === "bitcoin" ? (
        <Image
          src="/icons/bit-coin-svg.svg"
          alt="pointer"
          height={16}
          width={16}
        />
      ) : row.type === "ethereum" ? (
        <Image
          src="/icons/ethereum-svg.svg"
          alt="pointer"
          height={16}
          width={16}
        />
      ) : row.type === "binance" ? (
        <Image
          src="/icons/binance-svg.svg"
          alt="pointer"
          height={16}
          width={16}
        />
      ) : (
        <Image
          src="/icons/pointer-svg.svg"
          alt="pointer"
          height={16}
          width={16}
        />
      )}
    </span>
  );
};

const renderMultiplier = (row: BetData) => (
  <span className="text-foreground font-medium">{row.multiplier}</span>
);
type TableDataType = {
  myBets?: BetData[];
  allBets: BetData[];
  highRollers: BetData[];
  "race-leaderboard": BetData[];
};
export default function CasinoBetsTable({
  gameDetails,
  betsData,
  tableTabs,
}: {
  gameDetails?: boolean;
  betsData: TableDataType;
  tableTabs?: { value: string; label: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tabName") || "myBets";
  const [data, setData] = useState<BetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [ghostMode, setGhostMode] = useState(
    searchParams.get("ghostMode") === "true"
  );
  const [limit, setLimit] = useState(searchParams.get("limit") || "10");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const updateUrl = useCallback(
    (params: Record<string, string>) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          currentParams.delete(key);
        } else {
          currentParams.set(key, value);
        }
      });
      router.push(`?${currentParams.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    const modal = searchParams.get("modal") === "true";
    const sheet = searchParams.get("sheet") === "true";
    const betId = searchParams.get("betId");

    setIsModalOpen(modal);
    setIsSheetOpen(sheet);

    // FIXED: Use params (synchronous) instead of state (async/stale)
    if (sheet && modal) {
      setIsModalOpen(false);
      updateUrl({ modal: "false" });
    }

    if (betId && data.length > 0) {
      const row = data.find((item: any) => item.betId === betId);
      if (row) {
        setSelectedRow({
          ...row,
          betId: `sport:${betId}`,
          odds: row?.odds || 1.82,
          event: row?.event || "",
          market: row?.market || "1st Set - Winner",
          selection: row?.selection || "Rusuvoi, Emil",
          score: row?.score || "0-3 40-15",
        });
      }
    }
  }, [searchParams, data, updateUrl]);

  useEffect(() => {
    setLoading(true);
    try {
      if (betsData) {
        const tabKey = tab;
        let tabData = (betsData as any)[tabKey] || [];
        if (limit) {
          tabData = tabData.slice(0, parseInt(limit));
        }
        setData(tabData);
      } else {
        setData([]);
      }
    } finally {
      setLoading(false);
    }
  }, [tab, ghostMode, limit, betsData]);

  const desktopColumns: ColumnType<BetData>[] = [
    {
      key: "game",
      label: "Game",
      render: (row: any) => (
        <button
          aria-label="game"
          onClick={() => {
            setSelectedRow({
              ...row,
              betId: `sport:${row.id || Math.floor(Math.random() * 1000000000)}`,
              odds: row.odds || 1.82,
              event: row.event || "",
              market: row.market || "1st Set - Winner",
              selection: row.selection || "Rusuvoi, Emil",
              score: row.score || "0-3 40-15",
            });
            setIsModalOpen(true);
            setIsSheetOpen(false);
            updateUrl({ modal: "true", betId: row.id || "" });
          }}
          className="font-medium inline-flex items-center gap-1 text-left hover:underline"
        >
          <Image
            src="/icons/pointer-svg.svg"
            alt="pointer"
            height={16}
            width={16}
          />
          {row.game}
        </button>
      ),
    },
    {
      key: "user",
      label: "User",
      render: (row: any) => (
        <span className="font-medium inline-flex items-center gap-1">
          <Image
            src="/icons/pointer-svg.svg"
            alt="pointer"
            height={16}
            width={16}
          />
          {row.user}
        </span>
      ),
    },
    {
      key: "time",
      label: "Time",
      render: (row: any) => (
        <span className="font-medium">{dayjs(row.time).format("hh:mm A")}</span>
      ),
    },
    {
      key: "betAmount",
      label: "Bet Amount",
      render: renderBetAmount,
    },
    {
      key: "multiplier",
      label: "Multiplier",
      render: renderMultiplier,
    },
    {
      key: "payout",
      label: "Payout",
      align: "right",
      render: renderPayout,
    },
  ];
  const mobileColumns: ColumnType<BetData>[] = [
    {
      key: "game",
      label: "Game",
      render: (row: any) => (
        <span className="font-medium inline-flex items-center gap-1">
          <Image
            src="/icons/pointer-svg.svg"
            alt="pointer"
            height={16}
            width={16}
          />
          {row.game}
        </span>
      ),
    },

    {
      key: "payout",
      label: "Payout",
      align: "right",
      render: renderPayout,
    },
  ];
  const defaultTabs = [
    { value: "myBets", label: "My Bets" },
    { value: "allBets", label: "All Bets" },
    { value: "highRollers", label: "High Rollers" },
    { value: "race-leaderboard", label: "Race LeaderBoard" },
  ];

  return (
    <div className="w-full relative overflow-hidden rounded-md">
      <GlobalTabs
        data={tableTabs ? tableTabs : defaultTabs}
        tabName="tabName"
        extraContent={
          gameDetails && (
            <div className="flex flex-row text-nowrap items-center gap-3">
              <Switch
                checked={ghostMode}
                onCheckedChange={(val) => setGhostMode(val)}
              />{" "}
              Ghost Mode {ghostMode ? "on" : "off"}{" "}
              <Select value={limit} onValueChange={(val) => setLimit(val)}>
                <SelectTrigger className="w-18 !h-9 rounded-md !bg-background">
                  <SelectValue placeholder="Limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )
        }
      />

      <TabLoader/>

      <div className="hidden md:block">
        <GlobalTable<BetData>
          columns={desktopColumns}
          data={data}
          loading={loading}
          emptyMessage={`No ${tab?.replace("-", " ")} bets found.`}
          maxHeight={440}
        />
      </div>
      <div className="block md:hidden">
        <GlobalTable<BetData>
          columns={mobileColumns}
          data={data}
          loading={loading}
          emptyMessage={`No ${tab?.replace("-", " ")} bets found.`}
          maxHeight={440}
        />
      </div>
      <GlobalModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) {
            updateUrl({ modal: "false" });
          }
        }}
        title={selectedRow?.game || ""}
      >
        <BetDetailsModalContent
          selectedRow={selectedRow}
          onClose={() => {
            setIsModalOpen(false);
            updateUrl({ modal: "false" });
          }}
          onOpenSheet={() => {
            setIsSheetOpen(true);
            updateUrl({ sheet: "true" });
          }}
        />
      </GlobalModal>

      <BetSlipSheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          setIsSheetOpen(open);
          if (!open) {
            updateUrl({ sheet: "false" });
          }
        }}
      />
    </div>
  );
}
