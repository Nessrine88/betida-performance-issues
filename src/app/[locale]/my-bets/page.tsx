import { fetchMyBetsData } from "@/lib/fetchers/my-bets/my-bets";
import MyBetsCasinoTable from "@/app/[locale]/components/sections/sports/my-bets-casino-table";

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

export default async function MyBetsCasino() {
  const allBets = await fetchMyBetsData();
  const casinoBets = allBets.filter((bet: Bet) => bet.type === "casino");

  return <MyBetsCasinoTable casinoBets={casinoBets} />;
}
