"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ColumnType } from "@/types/global-table-types";
import { GlobalTable2 } from "@/app/[locale]/components/global-components/global-table/global-table-2";
import CommissionManage from "./commission-manage";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { useTranslations } from "next-intl";
import { type Commission } from "@/lib/fetchers/affiliate/affiliate-commission";
import { type InternationalizedString } from "@/lib/fetchers/localized-blog";

interface CommissionData {
  currencies: string;
  available_commission: string;
  withdrawn_commission: string;
  lifetime_commission: string;
  type: string;
}

interface Props {
  commissions: Commission[];
  langCode: LanguageCode;
}

export default function CommissionTable({ commissions, langCode }: Props) {
  const [data, setData] = useState<CommissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("affiliateCommission");

  useEffect(() => {
    if (commissions) {
      const formattedData = commissions.map((commission) => ({
        currencies: getLocalizedString(
          commission.currencies as InternationalizedString[],
          langCode,
          "en"
        ),
        available_commission: commission.available_commission,
        withdrawn_commission: commission.withdrawn_commission,
        lifetime_commission: commission.lifetime_commission,
        type: commission.type,
      }));
      setData(formattedData);
      setLoading(false);
    }
  }, [commissions, langCode]);

  const renderCurrencyIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "bitcoin":
        return (
          <Image
            src="/icons/bit-coin-svg.svg"
            alt="bitcoin"
            height={16}
            width={16}
          />
        );
      case "ethereum":
        return (
          <Image
            src="/icons/ethereum-svg.svg"
            alt="ethereum"
            height={16}
            width={16}
          />
        );
      case "binance":
        return (
          <Image
            src="/icons/binance-svg.svg"
            alt="binance"
            height={16}
            width={16}
          />
        );
      default:
        return (
          <Image
            src="/icons/pointer-svg.svg"
            alt="currency"
            height={16}
            width={16}
          />
        );
    }
  };

  const columns: ColumnType<CommissionData>[] = [
    {
      key: "currencies",
      label: t("currencies"),
      render: (row) => (
        <span className="font-medium text-sm capitalize pl-2.5">
          {row.currencies}
        </span>
      ),
    },
    {
      key: "available_commission",
      label: t("availableCommission"),
      render: (row) => (
        <div className="flex items-center gap-1 pl-2.5">
          <span className="font-medium text-sm">
            {row.available_commission}
          </span>
          {renderCurrencyIcon(row.type)}
        </div>
      ),
    },
    {
      key: "withdrawn_commission",
      label: t("withdrawnCommission"),
      render: (row) => (
        <div className="flex items-center gap-1 pl-2.5">
          <span className="font-medium text-sm">
            {row.withdrawn_commission}
          </span>
          {renderCurrencyIcon(row.type)}
        </div>
      ),
    },
    {
      key: "lifetime_commission",
      label: t("lifetimeCommission"),
      render: (row) => (
        <div className="flex items-center gap-1 pl-2.5">
          <span className="font-medium text-sm">{row.lifetime_commission}</span>
          {renderCurrencyIcon(row.type)}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6">
      <CommissionManage />

      <GlobalTable2<CommissionData>
        columns={columns}
        data={data}
        loading={loading}
        emptyMessage={t("emptyMessage")}
        maxHeight={440}
      />
    </div>
  );
}
