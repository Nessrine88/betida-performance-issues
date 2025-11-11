"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Skeleton } from "../../../components/ui/skeleton";
import React from "react";
import type { GlobalTableProps } from "@/types/global-table-types";
import { X } from "lucide-react";

export function GlobalTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data found",
  maxHeight = 440,
  className,
  variant = "normal",
}: GlobalTableProps<T>) {
  const alignClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  return (
    <div className={`overflow-auto ${className}`} style={{ maxHeight }}>
      <Table className="table-auto min-w-max w-full border-collapse">
        <TableHeader
          className={`${
            variant === "rounded" ? "bg-transparent" : "bg-background"
          } sticky top-0 z-10`}
        >
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={`${alignClass(
                  col.align
                )} font-semibold text-foreground-muted`}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            [...Array(5)].map((_, i) => (
              <TableRow
                key={i}
                className={
                  i % 2 === 0
                    ? variant === "rounded"
                      ? "bg-background-2 hover:bg-background-1 rounded-lg"
                      : "bg-sidebar"
                    : variant === "rounded"
                    ? "bg-transparent hover:bg-background-1 rounded-lg"
                    : "bg-background"
                }
              >
                {columns.map((col, j) => (
                  <TableCell key={j} className={alignClass(col.align)}>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            typeof emptyMessage === "string" ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6 border border-border"
                >
                  <div className="size-10 bg-background-2 flex items-center justify-center rounded-lg mx-auto">
                    <X className="text-white/55" />
                  </div>
                  <div className="pt-5">{emptyMessage}</div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )
          ) : (
            data.map((row, i) => (
              <TableRow
                key={i}
                className={
                  i % 2 === 0
                    ? variant === "rounded"
                      ? "bg-background-2 hover:bg-background-1"
                      : "bg-sidebar"
                    : variant === "rounded"
                    ? "bg-transparent hover:bg-background"
                    : "bg-background"
                }
              >
                {columns.map((col, j) => (
                  <TableCell
                    key={String(col.key)}
                    className={`${alignClass(col.align)} ${
                      variant === "rounded" && j === 0 ? "rounded-l-lg" : ""
                    } ${
                      variant === "rounded" && j === columns.length - 1
                        ? "rounded-r-lg"
                        : ""
                    }`}
                  >
                    {col.render ? col.render(row) : (row[col.key] as any)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
