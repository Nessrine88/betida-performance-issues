export const dynamic = 'auto';
import React from "react";
import {
  fetchAllBets,
  fetchHighRollers,
  fetchMyBets,
} from "@/lib/fetchers/casino-table-data";
import { fetchPublishers } from "@/lib/fetchers/fetch-publishers";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
import { Link } from "@/i18n/navigation";
import BackButton from "@/app/[locale]/components/global-components/back-button";
import SearchBar from "@/app/[locale]/components/common/search-bar/search-bar";
import CasinoBetsTable from "@/app/[locale]/components/sections/casino/casino-bets-table";
import ProviderCard from "./provider-card";
import { getTranslations } from "next-intl/server";
export const revalidate = 60;

async function ProviderPage() {
  const publishersData = await fetchPublishers();
  const myBets = await fetchMyBets();
  const allBets = await fetchAllBets();
  const highRollers = await fetchHighRollers();
  const raceBets = await fetchRaceLeaderboardTableData();
  const t = await getTranslations("PublishersPage");

  const betsData = {
    myBets,
    allBets,
    highRollers,
    "race-leaderboard": raceBets,
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Header */}
      <div className="bg-background-1 mb-2">
        <div className="app-container">
          <div className="flex flex-row items-center gap-2 p-2 pl-0">
            <Link href="/casino" prefetch aria-label="Back to casino" replace>
              <BackButton />
            </Link>
            <div className="flex gap-3 items-center text-lg capitalize">
              <span>{t("title")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="app-container">
        {/* Search Bar */}
        <div className="pb-0">
          <SearchBar tab={false} />
        </div>

        {/* Publishers Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {publishersData?.length > 0 ? (
            publishersData.map((publisher, index) => (
              <ProviderCard
                key={index}
                name={publisher?.name}
                img={publisher?.img}
                players={publisher?.players}
                index={index}
              />
            ))
          ) : (
            <div className="text-sm text-muted-foreground">{t("noData")}</div>
          )}
        </div>

        {/* Casino Bets Table */}
        <div className="mt-10">
          <CasinoBetsTable betsData={betsData} />
        </div>
      </div>
    </div>
  );
}

export default ProviderPage;
