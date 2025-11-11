import { Suspense } from "react";
import SearchBar from "../../components/common/search-bar/search-bar";
import BackButton from "../../components/global-components/back-button";
import GameCardLoader from "../../components/pages/game/game-details/game-details-loader";
import CasinoBetsTable from "../../components/sections/casino/casino-bets-table";
import {
  fetchAllBets,
  fetchHighRollers,
  fetchMyBets,
} from "@/lib/fetchers/casino-table-data";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
import CasinoChallengeCardDetailsGrid from "../../components/pages/game/game-details/casino-challenge-card-details-grid";
import { GlobalTabs } from "../../components/global-components/GlobalTabs";
import {
  fetchActiveCasinoChallenges,
  fetchAllClaimedCasinoChallenges,
  fetchMyClaimedCasinoChallenges,
} from "@/lib/fetchers/casino-challenges";
import TabLoader from "../../tab-loader";
import { Link } from "@/i18n/navigation";

export default async function CasinoChallengesPage() {
  const activeChallenges = await fetchActiveCasinoChallenges();
  const allClaimedChallenges = await fetchAllClaimedCasinoChallenges();
  const myClaimedChallenges = await fetchMyClaimedCasinoChallenges();

  const challengesData: any[] = [
    { category: "active", data: activeChallenges },
    { category: "all-claimed", data: allClaimedChallenges },
    { category: "my-claimed", data: myClaimedChallenges },
  ];
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
            <Link href="/casino" aria-label="Back to casino" replace>
              <BackButton />
            </Link>
            <div className="flex gap-3 items-center text-lg capitalize">
              <span>Challenges</span>
            </div>
          </div>
        </div>
      </div>

      <div className="app-container">
        {/* Search Bar */}
        <div className="pb-6">
          <SearchBar tab={false} />
        </div>

        <Suspense fallback={<GameCardLoader />}>
          <div className="pb-6">
            <GlobalTabs
              data={[
                { value: "active", label: "Active" },
                { value: "all-claimed", label: "All Claimed" },
                { value: "my-claimed", label: "My Claimed" },
              ]}
              tabName="challengeTab"
            />
            <div className="w-full relative rounded-lg overflow-hidden">
              <TabLoader/>
              <CasinoChallengeCardDetailsGrid challengesData={challengesData} />
            </div>
          </div>
        </Suspense>

        {/* sports table */}
        <CasinoBetsTable betsData={betsData} />
      </div>
    </div>
  );
}
