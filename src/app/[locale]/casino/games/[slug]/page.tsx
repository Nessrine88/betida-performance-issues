import { fetchAllBets, fetchHighRollers, fetchMyBets } from "@/lib/fetchers/casino-table-data";
import { fetchPublishers } from "@/lib/fetchers/fetch-publishers";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
import { fetchTrendingSports } from "@/lib/fetchers/trending-sports-data";
import CasinoBetsTable from "@/app/[locale]/components/sections/casino/casino-bets-table";
import PlayerComponent from "@/app/[locale]/components/sections/casino/casino-details/player-component";
import PlayerControls from "@/app/[locale]/components/sections/casino/casino-details/player-controls";
import SlotSection from "@/app/[locale]/components/sections/casino/casino-details/slot-section";
import PublisherCardsCarousel from "@/app/[locale]/components/sections/casino/publisher-cards-carousel";
import GameDetailsSection from "@/app/[locale]/components/sections/casino/casino-details/game-details-section";

export default async function GameDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
const publishersData = await fetchPublishers();
  const trendingSports = await fetchTrendingSports();
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
      <div className="pt-6">
        <PlayerComponent />
        <div className="pt-4">
          <PlayerControls />
        </div>
        <div className="pt-6">
          <GameDetailsSection slug={slug}/>
        </div>
        <div className="pb-2.5">
          <SlotSection trendingSports={trendingSports} />
        </div>
        <div className="py-9">
          <PublisherCardsCarousel publishersData={publishersData} />
        </div>
        <div className="pb-9">
          <CasinoBetsTable gameDetails betsData={betsData} />
        </div>
      </div>
    </div>
  );
}
