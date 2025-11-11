"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import dayjs from "dayjs";
import Image from "next/image";
import type { ColumnType } from "@/types/global-table-types";
import { GlobalTable } from "@/app/[locale]/components/global-components/global-table/global-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/components/ui/select";
import { Button } from "@/app/[locale]/components/ui/button";
import { ChevronLeft, ChevronRight, File} from "lucide-react";
import GlobalModal from "@/app/[locale]/components/global-components/global-modal/global-modal";
import BetsPlayModalContent from "./bets-play-modal";

const renderPayout = (row: SportsBetData) => {
  const payoutValue = parseFloat(row.profitLoss.replace(/[$,]/g, "")) || 0;
  const isPositive = payoutValue >= 0;
  return (
    <span
      className={`inline-flex items-end gap-1 ${
        isPositive ? "text-success" : "text-destructive"
      } font-semibold`}
    >
      {row.profitLoss}
      <Image
        src="/icons/usdt-svg.svg"
        alt="pointer"
        height={16}
        width={16}
      />
    </span>
  );
};

const renderBetAmount = (row: SportsBetData) => {
  const betValue = parseFloat(row.betAmount.replace(/[$,]/g, "")) || 0;
  const isPositive = betValue >= 0;
  return (
    <span
      className={`inline-flex items-end md:items-center gap-1 ${
        isPositive ? "text-success" : "text-destructive"
      } font-semibold`}
    >
      {row.betAmount}
      <Image
        src="/icons/usdt-svg.svg"
        alt="pointer"
        height={16}
        width={16}
      />
    </span>
  );
};

const renderMultiplier = (row: SportsBetData) => (
  <span className="text-foreground font-medium">{row.multiplier}</span>
);

type SportsBetData = {
  _id: string;
  slug: string;
  type: "sports";
  gameTitle: string;
  betId: string;
  date: string;
  betAmount: string;
  multiplier: string;
  profitLoss: string;
};

export default React.memo(function MyBetsSportsTable({
  sportsBets,
}: {
  sportsBets: SportsBetData[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SportsBetData | null>(null);

  const totalPages = useMemo(
    () => Math.ceil(sportsBets.length / rowsPerPage),
    [sportsBets.length, rowsPerPage]
  );
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sportsBets.slice(startIndex, endIndex);
  }, [sportsBets, currentPage, rowsPerPage]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const updateRowsPerPage = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        if (width < 640) {
          setRowsPerPage(5);
        } else if (width < 1024) {
          setRowsPerPage(8);
        } else {
          setRowsPerPage(10);
        }
      }, 150);
    };

    updateRowsPerPage();
    window.addEventListener("resize", updateRowsPerPage);
    return () => {
      window.removeEventListener("resize", updateRowsPerPage);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage]);

  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const openBetDetailsModal = useCallback((row: SportsBetData) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  }, []);

  const desktopColumns: ColumnType<SportsBetData>[] = [
    {
      key: "gameTitle",
      label: "Event",
      render: (row: SportsBetData) => (
        <span className="font-medium inline-flex items-center gap-1 text-left hover:underline">
          {row.gameTitle}
        </span>
      ),
    },
    {
      key: "betId",
      label: "Bet ID",
      render: (row: SportsBetData) => (
        <button
          onClick={() => openBetDetailsModal(row)}
          className="font-medium text-left hover:underline text-foreground flex flex-row items-center gap-1"
        >
            <File size={16} className="text-foreground/55"/>
          {row.betId}
        </button>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (row: SportsBetData) => (
        <span className="font-medium text-foreground/55">
          {dayjs(row.date).format("hh:mm A, MMM DD")}
        </span>
      ),
    },
    {
      key: "betAmount",
      label: "Bet Amount",
      render: renderBetAmount,
    },
    {
      key: "multiplier",
      label: "Odds",
      render: renderMultiplier,
    },
    {
      key: "profitLoss",
      label: "Profit/Loss",
      align: "right",
      render: renderPayout,
    },
  ];

  const mobileColumns: ColumnType<SportsBetData>[] = [
    {
      key: "gameTitle",
      label: "Event",
      render: (row: SportsBetData) => (
        <span className="font-medium inline-flex items-center gap-1">
          <Image
            src="/icons/pointer-svg.svg"
            alt="pointer"
            height={16}
            width={16}
          />
          {row.gameTitle}
        </span>
      ),
    },
    {
      key: "betId",
      label: "Bet ID",
      render: (row: SportsBetData) => (
        <button
          onClick={() => openBetDetailsModal(row)}
          className="font-medium text-left hover:underline text-foreground"
        >
          {row.betId}
        </button>
      ),
    },
    {
      key: "profitLoss",
      label: "Profit/Loss",
      align: "right",
      render: renderPayout,
    },
  ];

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <GlobalTable<SportsBetData>
          columns={desktopColumns}
          data={currentData}
          loading={false}
          emptyMessage="No sports bets found."
          maxHeight={440}
        />
      </div>
      <div className="block md:hidden">
        <GlobalTable<SportsBetData>
          columns={mobileColumns}
          data={currentData}
          loading={false}
          emptyMessage="No sports bets found."
          maxHeight={440}
        />
      </div>

      {sportsBets.length > 0 && (
        <div className="flex items-center justify-between gap-4 mt-6">
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(val) => setRowsPerPage(parseInt(val))}
          >
            <SelectTrigger className="w-18 !h-9 rounded-md !bg-background-2">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground-muted">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              className={`
                size-6 p-0.5 rounded-sm border
                ${
                  currentPage > 1
                    ? "border-foreground text-foreground bg-foreground/10 hover:bg-foreground/20"
                    : "border-foreground-muted text-foreground-muted bg-transparent"
                }
                flex items-center justify-center
              `}
              disabled={currentPage === 1}
              onClick={handlePrev}
              aria-label="previous"
            >
              <ChevronLeft
                className={`size-6 ${
                  currentPage > 1 ? "text-foreground" : "text-muted-foreground"
                }`}
              />
              <span className="sr-only">Previous Page</span>
            </Button>

            <Button
              variant="outline"
              className={`
                size-6 p-0.5 rounded-sm border
                ${
                  currentPage < totalPages
                    ? "border-foreground text-foreground bg-foreground/10 hover:bg-foreground/20"
                    : "border-foreground-muted text-foreground-muted bg-transparent"
                }
                flex items-center justify-center
              `}
              disabled={currentPage === totalPages}
              onClick={handleNext}
              aria-label="next"
            >
              <ChevronRight
                className={`size-6 ${
                  currentPage < totalPages
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              />
              <span className="sr-only">Next Page</span>
            </Button>
          </div>
        </div>
      )}

      <GlobalModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
        }}
        title={selectedRow?.gameTitle || ""}
      >
        <BetsPlayModalContent
          selectedRow={selectedRow}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      </GlobalModal>
    </div>
  );
});
