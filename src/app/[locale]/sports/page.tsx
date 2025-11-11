import SearchBar from "@/app/[locale]/components/common/search-bar/search-bar";
import { GlobalTabs } from "@/app/[locale]/components/global-components/GlobalTabs";
import CImage from "@/lib/CIdImage";
import {
  fetchAllBets,
  fetchHighRollers,
  fetchMyBets,
} from "@/lib/fetchers/casino-table-data";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
import { fetchTrendingSports } from "@/lib/fetchers/trending-sports-data";
import CasinoBetsTable from "@/app/[locale]/components/sections/casino/casino-bets-table";
import GlobalCadCarousel from "@/app/[locale]/components/sections/home/games-and-sports/game-card-carousel";
import dynamic from "next/dynamic";
import React from "react";
import BackRedirectHandler from "../components/common/Back-redirect-handler";
import TabLoader from "../tab-loader";
const TopCardSlider = dynamic(
  () => import("@/app/[locale]/components/sections/casino/top-card-slider")
);

const tabs = [
  { value: "lobby", label: "Lobby" },
  { value: "my-bets", label: "My Bets" },
  { value: "favorites", label: "Favorites" },
  { value: "starting-soon", label: "Starting Soon" },
];

export default async function SportsPage() {
  const topSports = await fetchTrendingSports();
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
    <div className="app-container">
      <BackRedirectHandler />
      <div className="py-6 flex flex-col gap-6">
        <TopCardSlider />
        <SearchBar tab={false} />
        <div className="flex flex-col">
          <GlobalTabs data={tabs} />
          <div className="w-full relative rounded overflow-hidden">
            <TabLoader />
            <GlobalCadCarousel
              title="Top Sorts"
              items={topSports}
              type="sports"
            />
          </div>
        </div>

        <div className="h-fit w-full rounded-lg bg-sidebar">
          <CImage
            height={810}
            width={1200}
            publicId="sports-banner-02"
            alt="sports name"
            priority
            fetchPriority="high"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
        <CasinoBetsTable betsData={betsData} />
      </div>
    </div>
  );
}
