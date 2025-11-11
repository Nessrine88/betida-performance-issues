import { Suspense } from "react";
import { fetchSlots } from "@/lib/fetchers/slots";
import CasinoBetsTable from "@/app/[locale]/components/sections/casino/casino-bets-table";
import {
  fetchAllBets,
  fetchHighRollers,
  fetchMyBets,
} from "@/lib/fetchers/casino-table-data";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
import { Link } from "@/i18n/navigation";
import BackButton from "../../components/global-components/back-button";
import SearchBar from "../../components/common/search-bar/search-bar";
import GameCardLoader from "../../components/pages/game/game-details/game-details-loader";
import GameDetailsGrid from "../../components/pages/game/game-details/game-details-grid";

export default async function RecentCasinoPage() {
  const allSlots = await fetchSlots(); // todo: replace this data with recent casino data
  const myBets = await fetchMyBets();
  const allBets = await fetchAllBets();
  const highRollers = await fetchHighRollers();
  const raceBets = await fetchRaceLeaderboardTableData();
  const betsData = {
    myBets: myBets,
    allBets: allBets,
    highRollers: highRollers,
    "race-leaderboard": raceBets,
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Header */}
      <div className="bg-background-1 mb-2">
        <div className="app-container">
          <div className="flex flex-row items-center gap-2 p-2 pl-0">
            <Link prefetch href="/casino" aria-label="Back to casino" replace>
              <BackButton />
            </Link>
            <div className="flex gap-3 items-center text-lg capitalize">
              <span>Recent</span>
            </div>
          </div>
        </div>
      </div>

      <div className="app-container">
        {/* Search Bar */}
        <div className="pb-6">
          <SearchBar tab={false} />
        </div>

        {/* Slots Grid with Suspense for loading states */}
        <Suspense fallback={<GameCardLoader />}>
          <GameDetailsGrid data={allSlots} />
        </Suspense>

        {/* sports table */}
        <CasinoBetsTable betsData={betsData} />
      </div>
    </div>
  );
}
