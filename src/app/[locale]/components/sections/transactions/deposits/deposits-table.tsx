"use client";
import { useSearchParams } from "next/navigation";
import { GlobalTable } from "@/app/[locale]/components/global-components/global-table/global-table";
import type { ColumnType } from "@/types/global-table-types";
import Image from "next/image";
import dayjs from "dayjs";
import { DepositsTabs } from "./deposits-tab";
import { type BaseTransaction } from "@/lib/fetchers/deposit-transactions";
import TabLoader from "@/app/[locale]/tab-loader";

interface DepositData {
  date: string;
  status: "Sent" | "Completed" | "Pending" | "Confirmed";
  view: string;
  type: "bitcoin" | "ethereum" | "binance";
  amount: string;
}

const renderStatus = (row: DepositData) => {
  return (
    <span className="inline-flex items-center gap-2 font-medium">
      <Image src="/icons/pointer-svg.svg" alt="status" height={16} width={16} />
      {row.status}
    </span>
  );
};

const renderView = (row: DepositData) => {
  return (
    <span className="inline-flex items-center gap-1 font-semibold">
      {row.view}
      {row.type === "bitcoin" ? (
        <Image src="/icons/bit-coin-svg.svg" alt="btc" height={16} width={16} />
      ) : row.type === "ethereum" ? (
        <Image src="/icons/ethereum-svg.svg" alt="eth" height={16} width={16} />
      ) : (
        <Image src="/icons/binance-svg.svg" alt="bnb" height={16} width={16} />
      )}
    </span>
  );
};

const renderAmount = (row: DepositData) => {
  const amountValue = parseFloat(row?.amount?.replace(/[$,]/g, ""));
  const isPositive = amountValue >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold ${
        isPositive ? "text-success" : "text-destructive"
      }`}
    >
      {row.amount}
      {row.type === "bitcoin" ? (
        <Image src="/icons/bit-coin-svg.svg" alt="btc" height={16} width={16} />
      ) : row.type === "ethereum" ? (
        <Image src="/icons/ethereum-svg.svg" alt="eth" height={16} width={16} />
      ) : (
        <Image src="/icons/binance-svg.svg" alt="bnb" height={16} width={16} />
      )}
    </span>
  );
};

export default function DepositTable({
  deposits,
}: {
  deposits: BaseTransaction[];
}) {
  const searchParams = useSearchParams();
  const activeSub = searchParams.get("tab") || "crypto";

  const processedData: DepositData[] = deposits
    .filter((t: BaseTransaction) => t.depositSubCategory === activeSub)
    .map((t: BaseTransaction) => ({
      date: t.date,
      status: t.status as DepositData["status"],
      view: t.viewText || "",
      type: t.cryptoType as DepositData["type"],
      amount: t.amount,
    }));

  const columns: ColumnType<DepositData>[] = [
    {
      key: "date",
      label: "Date",
      render: (row: DepositData) => (
        <span className="font-medium">
          {dayjs(row.date).format("DD/MM/YYYY - hh:mm A")}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: renderStatus,
    },
    {
      key: "view",
      label: "View",
      render: renderView,
    },
    {
      key: "amount",
      label: "Amount",
      align: "right",
      render: renderAmount,
    },
  ];

  return (
    <div className="w-full relative">
      <DepositsTabs />
      <TabLoader/>
      <GlobalTable<DepositData>
        columns={columns}
        data={processedData}
        emptyMessage="No deposits found."
        maxHeight={440}
      />
    </div>
  );
}
