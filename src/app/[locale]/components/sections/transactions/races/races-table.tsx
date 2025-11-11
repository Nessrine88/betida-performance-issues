"use client";

import { GlobalTable } from "@/app/[locale]/components/global-components/global-table/global-table";
import { type BaseTransaction } from "@/lib/fetchers/deposit-transactions";
import type { ColumnType } from "@/types/global-table-types";
import dayjs from "dayjs";
import { useLocale } from "next-intl";

interface RacesData {
  race_name: string;
  date: string;
  position: number;
  prize: string;
}

const getLocalizedString = (strings: any[] | undefined, locale: string) => {
  if (!strings) {return ""};
  return (
    strings.find((s: any) => s._key === locale)?.value ||
    strings.find((s: any) => s._key === "en")?.value ||
    ""
  );
};

const renderRaceName = (row: RacesData) => {
  return (
    <span className="inline-flex items-center gap-2 font-medium">
      {row.race_name}
    </span>
  );
};
const renderPosition = (row: RacesData) => {
  return (
    <span className="inline-flex items-center gap-2 font-medium">
      {row.position}
    </span>
  );
};
const renderPrize = (row: RacesData) => {
  return (
    <span className="inline-flex items-center gap-2 font-medium">
      {row.prize}
    </span>
  );
};

export default function RacesTable({ races }: { races: BaseTransaction[] }) {
  const locale = useLocale();

  const processedData: RacesData[] = races.map((t: BaseTransaction) => ({
    race_name: getLocalizedString(t.raceName, locale),
    date: t.date,
    position: t.position || 0,
    prize: t.prize || "",
  }));

  const columns: ColumnType<RacesData>[] = [
    {
      key: "race_name",
      label: "Race Name",
      render: renderRaceName,
    },
    {
      key: "date",
      label: "Date",
      render: (row: RacesData) => (
        <span className="font-medium">
          {dayjs(row.date).format("DD/MM/YYYY - hh:mm A")}
        </span>
      ),
    },
    {
      key: "position",
      label: "Position",
      render: renderPosition,
    },
    {
      key: "prize",
      label: "Prize",
      align: "right",
      render: renderPrize,
    },
  ];

  return (
    <div className="w-full">
      <GlobalTable<RacesData>
        columns={columns}
        data={processedData}
        emptyMessage="No Races found."
        maxHeight={440}
      />
    </div>
  );
}
