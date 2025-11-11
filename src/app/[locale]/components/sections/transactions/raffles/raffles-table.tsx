"use client";

import { GlobalTable } from "@/app/[locale]/components/global-components/global-table/global-table";
import { type BaseTransaction } from "@/lib/fetchers/deposit-transactions";
import type { ColumnType } from "@/types/global-table-types";
import dayjs from "dayjs";
import { useLocale } from "next-intl";

interface RafflesData {
  raffle_name: string;
  date: string;
  tickets: number;
}

const getLocalizedString = (strings: any[] | undefined, locale: string) => {
  if (!strings) {return ""};
  return (
    strings.find((s: any) => s._key === locale)?.value ||
    strings.find((s: any) => s._key === "en")?.value ||
    ""
  );
};

const renderRaffleName = (row: RafflesData) => {
  return (
    <span className="inline-flex items-center gap-2 font-medium">
      {row.raffle_name}
    </span>
  );
};
const renderTickets = (row: RafflesData) => {
  return (
    <span className="inline-flex items-center gap-2 font-medium">
      {row.tickets}
    </span>
  );
};

export default function RafflesTable({
  raffles,
}: {
  raffles: BaseTransaction[];
}) {
  const locale = useLocale();

  const processedData: RafflesData[] = raffles.map((t: BaseTransaction) => ({
    raffle_name: getLocalizedString(t.raffleName, locale),
    date: t.date,
    tickets: t.tickets || 0,
  }));

  const columns: ColumnType<RafflesData>[] = [
    {
      key: "raffle_name",
      label: "Raffle Name",
      render: renderRaffleName,
    },
    {
      key: "date",
      label: "Date",
      render: (row: RafflesData) => (
        <span className="font-medium">
          {dayjs(row.date).format("DD/MM/YYYY - hh:mm A")}
        </span>
      ),
    },
    {
      key: "tickets",
      label: "Tickets",
      align: "right",
      render: renderTickets,
    },
  ];

  return (
    <div className="w-full">
      <GlobalTable<RafflesData>
        columns={columns}
        data={processedData}
        emptyMessage="No Raffles found."
        maxHeight={440}
      />
    </div>
  );
}
