import React from "react";
import dynamic from "next/dynamic";
import { fetchTrendingGames } from "@/lib/fetchers/trending-games-data";
import { fetchTrendingSports } from "@/lib/fetchers/trending-sports-data";
import { fetchPublishers } from "@/lib/fetchers/fetch-publishers";
import {
  fetchAllBets,
  fetchHighRollers,
  fetchMyBets,
} from "@/lib/fetchers/casino-table-data";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
import TopCardSlider from "@/app/[locale]/components/sections/casino/top-card-slider";
import SearchBar from "../components/common/search-bar/search-bar";
import BranchAndSlots from "@/app/[locale]/components/sections/casino/brad-and-slots";
import BackRedirectHandler from "../components/common/Back-redirect-handler";
import { GlobalTabs } from "../components/global-components/GlobalTabs";

const PublisherCardsCarousel = dynamic(
  () => import("@/app/[locale]/components/sections/casino/publisher-cards-carousel"),
  { loading: () => null }
);
const LiveCasino = dynamic(() => import("@/app/[locale]/components/sections/casino/live-casino"), {
  loading: () => null,
});
const CasinoBetsTable = dynamic(
  () => import("@/app/[locale]/components/sections/casino/casino-bets-table"),
  { loading: () => null }
);
const tabs = [
  { value: "lobby", label: "Lobby" },
  { value: "new-release", label: "New Release" },
  { value: "BETIDA-originals", label: "BETIDA Originals" },
  { value: "slot", label: "Slot" },
  { value: "live-casino", label: "Live Casino" },
  { value: "BETIDA-exclusive", label: "BETIDA Exclusive" },
  { value: "BETIDA-engine", label: "BETIDA Engine" },
];

export default async function CasinoPage() {
  const trendingGames = await fetchTrendingGames();
  const trendingSports = await fetchTrendingSports();
  const publishersData = await fetchPublishers();
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
      <div className="pt-6">
        <TopCardSlider />
        <div className="py-6">
          <SearchBar tab={false} />
        </div>
        <div className="pb-2.5">
          <GlobalTabs data={tabs} />
        </div>
        <div className="pb-2.5">
          <BranchAndSlots
            trendingGames={trendingGames}
            trendingSports={trendingSports}
          />
        </div>
        <div className="py-9">
          <PublisherCardsCarousel publishersData={publishersData} />
        </div>
        <div className="pb-9">
          <LiveCasino trendingSports={trendingSports} />
        </div>
        <div className="pb-9">
          <CasinoBetsTable betsData={betsData} />
        </div>
      </div>
    </div>
  );
}
