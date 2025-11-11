"use client"; 

import type { ColumnType } from "@/types/global-table-types";
import { GlobalTable2 } from "@/app/[locale]/components/global-components/global-table/global-table-2";
import { Button } from "@/app/[locale]/components/ui/button";

interface DeviceData {
  device: string;
  ipAddress: string;
  created: string;
  updated: string;
  action?: string;
}

interface ApiTableProps {
  data: DeviceData[];
}

export default function ApiTable({ data }: ApiTableProps) {
  const loading = false; 
  console.log({ data });
  const columns: ColumnType<DeviceData>[] = [
    {
      key: "device",
      label: "Device",
      render: (row) => (
        <span className="font-medium text-sm capitalize pl-2.5">
          {row.device}
        </span>
      ),
    },
    {
      key: "ipAddress",
      label: "IP Address",
      render: (row) => (
        <span className="font-medium text-sm pl-2.5">{row.ipAddress}</span>
      ),
    },
    {
      key: "created",
      label: "Created",
      render: (row) => (
        <span className="font-medium text-sm pl-2.5">{row.created}</span>
      ),
    },
    {
      key: "updated",
      label: "Updated",
      render: (row) => (
        <span className="font-medium text-sm pl-2.5">{row.updated}</span>
      ),
    },
    {
      key: "action",
      label: "",
      render: () => (
        <Button variant="gray" size="sm" className="ml-auto">
          Deactivate
        </Button>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6">
      <GlobalTable2<DeviceData>
        columns={columns}
        data={data}
        loading={loading}
        emptyMessage="No device data found."
        maxHeight={440}
      />
    </div>
  );
}
