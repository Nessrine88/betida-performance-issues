import { fetchTransactionsByCategory } from "@/lib/fetchers/deposit-transactions";
import RafflesTable from "@/app/[locale]/components/sections/transactions/raffles/raffles-table";

export default async function RafflesPage() {
  const raffles = await fetchTransactionsByCategory("raffles");
  return (
    <div className="w-full">
      <RafflesTable raffles={raffles} />
    </div>
  );
}
