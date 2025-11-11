import { fetchTransactionsByCategory } from "@/lib/fetchers/deposit-transactions";
import RacesTable from "@/app/[locale]/components/sections/transactions/races/races-table";

export default async function RacesPage() {
  const races = await fetchTransactionsByCategory("races");
  return (
    <div className="w-full">
      <RacesTable races={races} />
    </div>
  );
}
