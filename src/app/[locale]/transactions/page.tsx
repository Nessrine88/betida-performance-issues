import { fetchTransactionsByCategory } from "@/lib/fetchers/deposit-transactions";
import DepositTable from "@/app/[locale]/components/sections/transactions/deposits/deposits-table";

export default async function TransactionPage() {
  const deposits = await fetchTransactionsByCategory("deposits");

  return (
    <div className="w-full">
      <DepositTable deposits={deposits} />
    </div>
  );
}
