"use client";
import { useSearchParams } from "next/navigation";
import { GlobalTable } from "@/app/[locale]/components/global-components/global-table/global-table";
import type { ColumnType } from "@/types/global-table-types";
import Image from "next/image";
import dayjs from "dayjs";
import { OtherTab } from "./other-tab";
import { useLocale } from "next-intl";
import { type BaseTransaction } from "@/lib/fetchers/deposit-transactions";
import TabLoader from "@/app/[locale]/tab-loader";

const getLocalizedString = (strings: any[] | undefined, locale: string) => {
  if (!strings) {return ""};
  return (
    strings.find((s: any) => s._key === locale)?.value ||
    strings.find((s: any) => s._key === "en")?.value ||
    ""
  );
};

interface OtherData {
  date: string;
  bonus_type: string;
  type: "bitcoin" | "ethereum" | "binance";
  amount: string;
}

const renderBonusType = (row: OtherData) => {
  return (
    <span className="inline-flex items-center gap-2 font-medium">
      {row.bonus_type}
    </span>
  );
};

const renderAmount = (row: OtherData) => {
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

export default function OtherTable({ other }: { other: BaseTransaction[] }) {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const activeSub = searchParams.get("tab") || "all-other";

  const processedData: OtherData[] = other
    .filter((t: BaseTransaction) => t.otherSubCategory === activeSub)
    .map((t: BaseTransaction) => ({
      date: t.date,
      bonus_type: getLocalizedString(t.bonusType, locale),
      type: t.cryptoType as OtherData["type"],
      amount: t.amount,
    }));

  const columns: ColumnType<OtherData>[] = [
    {
      key: "date",
      label: "Date",
      render: (row: OtherData) => (
        <span className="font-medium">
          {dayjs(row.date).format("DD/MM/YYYY - hh:mm A")}
        </span>
      ),
    },
    {
      key: "bonus_type",
      label: "Type",
      render: renderBonusType,
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
      <OtherTab />
      <TabLoader/>
      <GlobalTable<OtherData>
        columns={columns}
        data={processedData}
        emptyMessage="No Other found."
        maxHeight={440}
      />
    </div>
  );
}
