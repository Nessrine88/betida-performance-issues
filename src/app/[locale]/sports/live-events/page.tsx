import PlaySvg from "@/app/[locale]/components/common/svg_icons/play-svg";
import React from "react";
import SportsFilters from "../details/sports-filters";
import { GlobalAccordion } from "@/app/[locale]/components/global-components/global-accordion";
import CImage from "@/lib/CIdImage";
import {
  AmericonFootballSvg,
  BaseBallSvg,
  BasketBallSvg,
  CricketSvg,
  CS2Svg,
  ECricketSvg,
  FifaSvg,
  IceHockeySvg,
  NBA2KSvg,
  SoccerSvg,
  TableTennisSvg,
  TennisSvg,
} from "@/app/[locale]/components/common/svg_icons/live-events-icon";
import {
  GlobalIconTabs,
  type TabProps,
} from "@/app/[locale]/components/global-components/GlobalIconTabs";
import CasinoBetsTable from "@/app/[locale]/components/sections/casino/casino-bets-table";
import {
  fetchAllBets,
  fetchHighRollers,
} from "@/lib/fetchers/casino-table-data";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
import BackRedirectHandler from "@/app/[locale]/components/common/Back-redirect-handler";

interface LiveSportsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function LiveSportsPage({ searchParams }: LiveSportsPageProps) {
  const awaitedSearchParams = await searchParams;
  const allBets = await fetchAllBets();
  const highRollers = await fetchHighRollers();
  const raceBets = await fetchRaceLeaderboardTableData();
  const betsData = {
    allBets: allBets,
    highRollers: highRollers,
    "race-leaderboard": raceBets,
  };

  const display =
    (Array.isArray(awaitedSearchParams.display)
      ? awaitedSearchParams.display[0]
      : awaitedSearchParams.display) || "standard";
  const market =
    (Array.isArray(awaitedSearchParams.market)
      ? awaitedSearchParams.market[0]
      : awaitedSearchParams.market) || "winner";

  const tabsData: TabProps[] = [
    {
      value: "baseball",
      label: "Baseball",
      icon: (
        <div className="relative">
          <BaseBallSvg size={36} />
          <div className="absolute -top-1 -right-0 bg-background text-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
            1
          </div>
        </div>
      ),
    },
    {
      value: "basketball",
      label: "Basketball",
      icon: (
        <div className="relative">
          <BasketBallSvg size={36} />
          <div className="absolute -top-1 -right-0 bg-background text-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
            6
          </div>
        </div>
      ),
    },
    {
      value: "ice-hockey",
      label: "Ice Hockey",
      icon: (
        <div className="relative">
          <IceHockeySvg size={36} />
          <div className="absolute -top-1 -right-0 bg-background text-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </div>
        </div>
      ),
    },
    {
      value: "soccer",
      label: "Soccer",
      icon: (
        <div className="relative">
          <SoccerSvg size={36} />
          <div className="absolute -top-1 -right-0 bg-background text-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
            5
          </div>
        </div>
      ),
    },
    {
      value: "american-football",
      label: "American F.",
      icon: (
        <div className="relative">
          <AmericonFootballSvg size={36} />
          <div className="absolute -top-1 -right-0 bg-background text-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
            2
          </div>
        </div>
      ),
    },
    {
      value: "tennis",
      label: "Tennis",
      icon: (
        <div className="relative">
          <TennisSvg size={36} />
          <div className="absolute -top-1 -right-0 bg-background text-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
            13
          </div>
        </div>
      ),
    },
    {
      value: "table-tennis",
      label: "Table Tennis",
      icon: (
        <div className="relative">
          <TableTennisSvg size={36} />
          <div className="absolute -top-1 -right-0 bg-background text-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </div>
        </div>
      ),
    },
    {
      value: "cricket",
      label: "Cricket",
      icon: (
        <div className="relative">
          <CricketSvg size={36} />
          <div className="absolute -top-1 -right-0 bg-background text-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
            8
          </div>
        </div>
      ),
    },
    {
      value: "cs2",
      label: "CS2",
      icon: (
        <div className="relative">
          <CS2Svg size={36} />
          <div className="absolute -top-1 -right-0 bg-background text-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
            2
          </div>
        </div>
      ),
    },
    {
      value: "fifa",
      label: "FIFA",
      icon: (
        <div className="relative">
          <FifaSvg size={36} />
          <div className="absolute -top-1 -right-0 bg-background text-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
            5
          </div>
        </div>
      ),
    },
    {
      value: "nba2k",
      label: "NBA2K",
      icon: (
        <div className="relative">
          <NBA2KSvg size={36} />
          <div className="absolute -top-1 -right-0 bg-background text-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
            1
          </div>
        </div>
      ),
    },
    {
      value: "ecricket",
      label: "eCricket",
      icon: (
        <div className="relative">
          <ECricketSvg size={36} />
          <div className="absolute -top-1 -right-0 bg-background text-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
            1
          </div>
        </div>
      ),
    },
  ];

  const featuredData = [
    {
      name: "USA / MLB",
      matches: 65,
      contentImage: "live_sports_kyh0sq",
    },
  ];

  const featuredAccordionData = featuredData.map((item) => ({
    title: (
      <div className="flex items-center justify-between w-full gap-2 text-foreground text-base font-semibold">
        <span>{item.name}</span>
        <span className="ml-auto text-sm text-foreground/55">
          ({item.matches})
        </span>
      </div>
    ),
    content: (
      <div className="">
        <CImage
          publicId={item.contentImage}
          alt={`${item.name} content`}
          className="w-full h-auto object-cover rounded-lg"
          priority
          fetchPriority="high"
        />
      </div>
    ),
  }));

   const tableTabs = [
    { value: "allBets", label: "All Bets" },
    { value: "highRollers", label: "High Rollers" },
    { value: "race-leaderboard", label: "Race LeaderBoard" },
  ];

  return (
    <div className="app-container py-6">
      <BackRedirectHandler/>
      <div className="featured-part flex flex-col md:flex-row items-center gap-3 md:gap-4 md:justify-between mb-3">
        <div className="flex flex-row items-center gap-2 capitalize">
          <PlaySvg />
          Live Events
        </div>
        <SportsFilters display={display} market={market} />
      </div>
      <GlobalIconTabs
        data={tabsData}
        tabName="sport"
        bgColor="sidebar"
        className="mb-4"
        basePath="/sports/live-events"
      />
      <GlobalAccordion data={featuredAccordionData} />
      <div className="py-6">
        <CasinoBetsTable betsData={betsData} tableTabs={tableTabs} gameDetails/>
      </div>
    </div>
  );
}

export default LiveSportsPage;
