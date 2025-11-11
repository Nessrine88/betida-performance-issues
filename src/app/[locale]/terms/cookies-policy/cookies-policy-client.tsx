"use client";
import React from "react";
import { GlobalTable } from "@/app/[locale]/components/global-components/global-table/global-table";
import type { ColumnType } from "@/types/global-table-types";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";

type DynamicTableRow = Record<string, string>;

interface CookiesPolicyClientProps {
  legalDoc: any;
  langCode: string;
}

export function CookiesPolicyClient({
  legalDoc,
  langCode,
}: CookiesPolicyClientProps) {
  if (!legalDoc) {
    return (
      <div className="flex flex-col gap-1">
        <p>No content available.</p>
      </div>
    );
  }

  const tableData = legalDoc.table;
  const sortedDescription =
    legalDoc.description
      ?.filter((item: any) => !item.deleted)
      .sort((a: any, b: any) => a.index - b.index)
      .map((item: any) => ({
        index: item.index,
        blocks:
          item.content.find((c: any) => c.language === langCode)?.blocks ||
          item.content[0]?.blocks ||
          [],
      })) || [];

  // Render first item (index 1 or lowest) without number
  const firstItem = sortedDescription[0];
  const restItems = sortedDescription.slice(1);

  // Dynamic columns and data
  let dynamicColumns: ColumnType<DynamicTableRow>[] = [];
  let dynamicData: DynamicTableRow[] = [];

  if (tableData) {
    dynamicColumns = tableData.columns.map((col: any) => ({
      key: col.key.current,
      label: col.label,
      align: col.align,
      render: (row: DynamicTableRow) => (
        <span className="text-wrap">{row[col.key.current]}</span>
      ),
    }));

    dynamicData = tableData.rows.map((row: any) =>
      tableData.columns.reduce(
        (acc: DynamicTableRow, col: any, colIndex: number) => {
          acc[col.key.current] = row.cells[colIndex]?.value || "";
          return acc;
        },
        {}
      )
    );
  }

  return (
    <div className="bg-background-1 text-foreground h-auto space-y-4">
      {firstItem && (
        <div className="flex flex-col gap-1">
          <div className="-mt-3">
            <PortableText
              value={firstItem.blocks}
              components={portableTextComponents}
            />
          </div>
        </div>
      )}
      {dynamicData.length > 0 && dynamicColumns.length > 0 && (
        <GlobalTable
          variant="rounded"
          columns={dynamicColumns}
          data={dynamicData}
          loading={false}
          emptyMessage="No table data available."
          maxHeight={1000}
        />
      )}
      {restItems.map((item: any) => (
        <div key={item.index} id={item.index} className="">
          <PortableText
            value={item.blocks}
            components={portableTextComponents}
          />
        </div>
      ))}
    </div>
  );
}
