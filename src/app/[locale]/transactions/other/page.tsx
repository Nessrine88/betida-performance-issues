import { fetchTransactionsByCategory } from "@/lib/fetchers/deposit-transactions";
import OtherTable from "@/app/[locale]/components/sections/transactions/other/other-table";

export default async function OtherPage() {
  const other = await fetchTransactionsByCategory("other");
  return (
    <div className="w-full">
      <OtherTable other={other} />
    </div>
  );
}
