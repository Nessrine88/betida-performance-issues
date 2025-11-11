import { fetchTransactionsByCategory } from "@/lib/fetchers/deposit-transactions";
import WithdrawalsTable from "@/app/[locale]/components/sections/transactions/withdrawals/withdrawals-table";

export default async function WithdrawalsPage() {
  const withdrawals = await fetchTransactionsByCategory("withdrawals");

  return (
    <div className="w-full">
      <WithdrawalsTable withdrawals={withdrawals} />
    </div>
  );
}
