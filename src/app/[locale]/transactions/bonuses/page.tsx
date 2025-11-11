import { fetchTransactionsByCategory } from "@/lib/fetchers/deposit-transactions";
import BonusesTable from "@/app/[locale]/components/sections/transactions/bonuses/bonuses-table";

export default async function BonusesPage() {
  const bonuses = await fetchTransactionsByCategory("bonuses");
  return (
    <div className="w-full">
      <BonusesTable bonuses={bonuses} />
    </div>
  );
}