import { type ReactNode } from "react";
import SecondLayout from "@/app/[locale]/components/layout/second-layout";
import TransactionsIconSvg from "@/app/[locale]/components/common/svg_icons/transaction-icon-svg";
import { getTranslations } from "next-intl/server";

export default async function TransactionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations("transactionsSidebar");

  const TransactionsLinks = [
    { name: t("deposits"), href: "/transactions" },
    { name: t("withdrawals"), href: "/transactions/withdrawals" },
    { name: t("bonuses"), href: "/transactions/bonuses" },
    { name: t("raffles"), href: "/transactions/raffles" },
    { name: t("races"), href: "/transactions/races" },
    { name: t("other"), href: "/transactions/other" },
  ];

  return (
    <SecondLayout
      layoutName={t("title")}
      layoutIcon={<TransactionsIconSvg />}
      links={TransactionsLinks}
    >
      {children}
    </SecondLayout>
  );
}
