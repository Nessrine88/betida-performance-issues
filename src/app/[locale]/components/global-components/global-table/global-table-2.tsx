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
import { Tooltip, TooltipTrigger, TooltipContent } from "../../../components/ui/tooltip";
import TooltipIconSVG from "../../common/svg_icons/tooltip-icon-svg";


export function GlobalTable2<T>({
    columns,
    data,
    loading = false,
    emptyMessage = "No data found",
    maxHeight = 440,
    className,
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
        <div className={`overflow-auto rounded-lg ${className}`} style={{ maxHeight }}>
            <Table>
                <TableHeader className="sticky top-0 z-10">
                    <TableRow className="bg-background hover:bg-background">
                        {columns.map((col) => (
                            <TableHead
                                key={String(col.key)}
                                className={`${alignClass(
                                    col.align
                                )} font-semibold text-foreground-muted pl-4 pr-1`}
                            >
                                <div className="flex items-center gap-1">
                                    <span>{col.label}</span>

                                    {col.tooltip && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="size-4 flex items-center justify-center bg-amber-400/30 rounded-full overflow-hidden cursor-pointer">
                                                    <TooltipIconSVG className="fill-amber-500" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">
                                                <p className="whitespace-break-spaces">{col.tooltip}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </div>
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
                                        ? "bg-transparent transition-all duration-300 hover:bg-background/50"
                                        : "bg-background hover:bg-background/50"
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
                                    <div className="size-10 bg-background flex items-center justify-center rounded-lg mx-auto">
                                        <X className="text-white/55" />
                                    </div>
                                    <div className="pt-5">{emptyMessage}</div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>{emptyMessage}</TableCell>
                            </TableRow>
                        )
                    ) : (
                        data.map((row, i) => (
                            <TableRow
                                key={i}
                                className={
                                    i % 2 === 0
                                        ? "bg-transparent transition-all duration-300 hover:bg-background/50"
                                        : "bg-background hover:bg-background/50"
                                }
                            >
                                {columns.map((col) => (
                                    <TableCell key={String(col.key)} className={alignClass(col.align)}>
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