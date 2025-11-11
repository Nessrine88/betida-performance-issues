"use client";
import { useSearchParams } from "next/navigation";
import { GlobalTable } from "@/app/[locale]/components/global-components/global-table/global-table";
import type { ColumnType } from "@/types/global-table-types";
import Image from "next/image";
import dayjs from "dayjs";
import ViewIconSvg from "@/app/[locale]/components/common/svg_icons/view-icon-svg";
import { WithdrawalsTabs } from "./withdrawals-tab";
import { type BaseTransaction } from "@/lib/fetchers/deposit-transactions";
import TabLoader from "@/app/[locale]/tab-loader";
import { Link } from "@/i18n/navigation";

interface WithdrawalData {
  date: string;
  status: "Sent" | "Completed" | "Pending" | "Confirmed";
  transaction_view_url: string;
  type: "bitcoin" | "ethereum" | "binance";
  amount: string;
}

const renderStatus = (row: WithdrawalData) => {
  return (
    <span className="inline-flex items-center gap-2 font-medium">
      {row.status}
    </span>
  );
};

const transactionViewUrl = (row: WithdrawalData) => {
  return (
    <Link
      prefetch
      scroll={false}
      href={row.transaction_view_url}
      target="_blank"
      className="inline-flex items-center gap-1 font-semibold transition-all duration-300 hover:scale-110"
    >
      <span>Transaction</span>
      <span className="mt-0.5">
        <ViewIconSvg />
      </span>
    </Link>
  );
};

const renderAmount = (row: WithdrawalData) => {
  const amountValue = parseFloat(row.amount.replace(/[$,]/g, ""));
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

export default function WithdrawalsTable({
  withdrawals,
}: {
  withdrawals: BaseTransaction[];
}) {
  const searchParams = useSearchParams();
  const activeSub = searchParams.get("tab") || "crypto";

  const processedData: WithdrawalData[] = withdrawals
    .filter((t: BaseTransaction) => t.withdrawalSubCategory === activeSub)
    .map((t: BaseTransaction) => ({
      date: t.date,
      status: t.status as WithdrawalData["status"],
      transaction_view_url: t.viewUrl || "",
      type: t.cryptoType as WithdrawalData["type"],
      amount: t.amount,
    }));

  const columns: ColumnType<WithdrawalData>[] = [
    {
      key: "date",
      label: "Date",
      render: (row: WithdrawalData) => (
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
      key: "transaction_view_url",
      label: "View",
      render: transactionViewUrl,
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
      <WithdrawalsTabs />
      <TabLoader />
      <GlobalTable<WithdrawalData>
        columns={columns}
        data={processedData}
        emptyMessage="No withdrawals found."
        maxHeight={440}
      />
    </div>
  );
}
