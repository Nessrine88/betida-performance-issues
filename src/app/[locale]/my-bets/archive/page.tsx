import { fetchMyBetsData } from "@/lib/fetchers/my-bets/my-bets";
import MyBetsArchiveTable from "@/app/[locale]/components/sections/sports/my-bets-archive-table";

export interface Bet {
  _id: string;
  slug: string;
  type: "casino" | "sports" | "archive";
  gameTitle?: string;
  betId?: string;
  date?: string;
  betAmount?: string;
  multiplier?: string;
  profitLoss?: string;
  archiveDate?: string;
  betCount?: number;
}

export default async function MyBetsArchive() {
  const allBets = await fetchMyBetsData();
  const archiveBets = allBets.filter((bet: Bet) => bet.type === "archive");

  return <MyBetsArchiveTable archiveBets={archiveBets} />;
}
