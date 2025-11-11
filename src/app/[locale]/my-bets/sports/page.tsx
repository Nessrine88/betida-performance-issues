import { fetchMyBetsData } from "@/lib/fetchers/my-bets/my-bets";
import MyBetsSportsTable from "@/app/[locale]/components/sections/sports/my-bets-sports-table";

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

export default async function MyBetsSports() {
  const allBets = await fetchMyBetsData();
  const sportsBets = allBets.filter((bet: Bet) => bet.type === "sports");

  return <MyBetsSportsTable sportsBets={sportsBets} />;
}
