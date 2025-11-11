import { Suspense } from "react";

import { Funnel } from "lucide-react";
import { getSlugText } from "@/lib/helpers/slugify";
import { fetchSlots } from "@/lib/fetchers/slots";
import PublisherCardsCarousel from "@/app/[locale]/components/sections/casino/publisher-cards-carousel";
import CasinoBetsTable from "@/app/[locale]/components/sections/casino/casino-bets-table";
import { fetchPublishers } from "@/lib/fetchers/fetch-publishers";
import {
  fetchAllBets,
  fetchHighRollers,
  fetchMyBets,
} from "@/lib/fetchers/casino-table-data";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
import { Link } from "@/i18n/navigation";
import GlobalSortDropdown, { type SortOption } from "@/app/[locale]/components/global-components/global-sort-dropdown";
import BackButton from "@/app/[locale]/components/global-components/back-button";
import SearchBar from "@/app/[locale]/components/common/search-bar/search-bar";
import DropdownWithSearch from "@/app/[locale]/components/global-components/dropdown-with-search";
import GameCardLoader from "@/app/[locale]/components/pages/game/game-details/game-details-loader";
import GameDetailsGrid from "@/app/[locale]/components/pages/game/game-details/game-details-grid";

interface GroupDetailsProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GroupDetails({
  params,
}: GroupDetailsProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ?? "";
  const providerName = getSlugText(slug);
  const allSlots = await fetchSlots();
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


  const sortOptions: SortOption[] = [
    { label: "Newest", value: "createdAtDesc" },
    { label: "Oldest", value: "createdAtAsc" },
    { label: "Most Popular", value: "mostPopular" },
    { label: "Popular (24 hrs)", value: "popular24hr" },
    { label: "Popular (7 days)", value: "popular7days" },
    { label: "Popular (30 days)", value: "popular30days" },
    { label: "Featured", value: "featured" },
  ];
  const filterOptions: SortOption[] = [
    { label: "18 Games", value: "18-games" },
    { label: "3 Oaks", value: "3-oaks" },
    { label: "4ThePlayer", value: "4theplayer" },
    { label: "Amusnet", value: "amusnet" },
    { label: "Backseat Gaming", value: "backseat-gaming" },
    { label: "Belatra", value: "belatra" },
    { label: "BGaming", value: "bgaming" },
    { label: "Big Duckling Wings", value: "big-duckling-wings" },
    { label: "Big Time Gaming", value: "big-time-gaming" },
    { label: "Blueprint", value: "blueprint" },
    { label: "Bulletproof Games", value: "bulletproof-games" },
    { label: "Cascadia Gaming", value: "cascadia-gaming" },
    { label: "Delirium", value: "delirium" },
    { label: "Drip Drop Studios", value: "drip-drop-studios" },
    { label: "ELK Studios", value: "elk-studios" },
    { label: "Endorphina", value: "endorphina" },
    { label: "Fantasma Games", value: "fantasma-games" },
  ];

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
              <span>{providerName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="app-container">
        {/* Search Bar */}
        <div className="pb-6">
          <SearchBar tab={false} />
        </div>

        {/* Filter and Sort */}
        <div className="featured-part flex flex-col md:flex-row md:items-center gap-3  md:gap-4 md:justify-between mb-3 w-full">
          <div className="flex items-center gap-2 text-sm font-medium text-white/70 w-full md:w-fit">
            <span className="p-2 bg-background-2 inline-flex items-center justify-center rounded-lg">
              <Funnel />
            </span>
            <span className="text-sm font-semibold inline-flex items-center justify-center">
              Filter
            </span>
            <div className="w-full md:w-fit">
              <DropdownWithSearch sortOptions={filterOptions} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-fit">
            <GlobalSortDropdown sortOptions={sortOptions} />
          </div>
        </div>

        {/* Slots Grid with Suspense for loading states */}
        <div className="mt-6">
          <Suspense fallback={<GameCardLoader />}>
            <GameDetailsGrid data={allSlots} />
          </Suspense>
        </div>
        <div className="mt-6">
          <PublisherCardsCarousel publishersData={publishersData} />
        </div>
        {/* sports table */}
        <div className=" mt-6">
          <CasinoBetsTable betsData={betsData} />
        </div>
      </div>
    </div>
  );
}
