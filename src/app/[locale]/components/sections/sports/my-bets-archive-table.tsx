"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import dayjs from "dayjs";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Download } from "lucide-react";
import { toast } from "sonner";

type ArchiveBetData = {
  _id: string;
  slug?: string;
  type: "archive";
  archiveDate: string;
  betCount: number;
};

export default React.memo(function MyBetsArchiveTable({
  archiveBets,
}: {
  archiveBets: ArchiveBetData[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = useMemo(
    () => Math.ceil(archiveBets.length / rowsPerPage),
    [archiveBets.length, rowsPerPage]
  );
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return archiveBets.slice(startIndex, endIndex);
  }, [archiveBets, currentPage, rowsPerPage]);

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

  const handleDownload = useCallback((row: ArchiveBetData) => {
    console.log(`Download archive for ${row.archiveDate}`);
    toast.info("Download feature is coming soon!");
  }, []);

  const columns: ColumnType<ArchiveBetData>[] = [
    {
      key: "archiveDate",
      label: "Date",
      render: (row: ArchiveBetData) => (
        <span className="font-medium">
          {dayjs(row?.archiveDate).format("MMMM D, YYYY")}
        </span>
      ),
    },
    {
      key: "betCount",
      label: "Count",
      render: (row: ArchiveBetData) => (
        <span className="font-medium">{row.betCount} bets</span>
      ),
    },
    {
      key: "slug",
      label: "View",
      align: "right",
      render: (row: ArchiveBetData) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDownload(row)}
          className="h-6 px-2"
        >
          <Download className="h-3 w-3 mr-1" />
          Download
        </Button>
      ),
    },
  ];

  return (
    <div className="w-full">
      <GlobalTable<ArchiveBetData>
        columns={columns}
        data={currentData}
        loading={false}
        emptyMessage="No archived bets found."
        maxHeight={440}
      />

      {archiveBets.length > 0 && (
        <div className="flex items-center justify-between gap-4 mt-6">
          {/* Limit Select */}
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
    </div>
  );
});
