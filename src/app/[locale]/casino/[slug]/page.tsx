import React from "react";
import dynamic from "next/dynamic";
import { fetchPublishers } from "@/lib/fetchers/fetch-publishers";
import {
  fetchAllBets,
  fetchHighRollers,
  fetchMyBets,
} from "@/lib/fetchers/casino-table-data";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
import { fetchTrendingSports } from "@/lib/fetchers/trending-sports-data";
import BackRedirectHandler from "../../components/common/Back-redirect-handler";

const PlayerComponent = dynamic(
  () =>
    import(
      "../../components/sections/casino/casino-details/player-component"
    ),
  { loading: () => null }
);
const PlayerControls = dynamic(
  () =>
    import(
      "../../components/sections/casino/casino-details/player-controls"
    ),
  { loading: () => null }
);
const PlayDetails = dynamic(
  () =>
    import(
      "../../components/sections/casino/casino-details/play-details"
    ),
  { loading: () => null }
);
const SlotSection = dynamic(
  () =>
    import(
      "../../components/sections/casino/casino-details/slot-section"
    ),
  { loading: () => null }
);
const PublisherCardsCarousel = dynamic(
  () =>
    import(
      "../../components/sections/casino/publisher-cards-carousel"
    ),
  { loading: () => null }
);
const CasinoBetsTable = dynamic(
  () => import("../../components/sections/casino/casino-bets-table"),
  { loading: () => null }
);

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const gameTitle = "Angel vs Sinner Eternal Battle Enhanced RTP";
  const description =
    "Dive into the thrilling Angel vs Sinner Eternal Battle Enhanced RTP by Pragmatic Play on BETIDA. Enjoy top slots and betting!";
  const canonicalUrl = `http://localhost:3000/casino/${slug}`;
  const imageUrl = `http://localhost:3000/images/casino/${slug}.jpg`;
  const publishedTime = "2023-01-01T00:00:00Z";
  const modifiedTime = "2025-09-16T20:59:00Z"; // 08:59 PM +06

  return {
    title: `${gameTitle} | Casino Details - BETIDA`,
    description,
    canonical: canonicalUrl,
    openGraph: {
      title: `${gameTitle} | Casino Details - BETIDA`,
      description,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${gameTitle} Thumbnail`,
        },
      ],
      siteName: "BETIDA",
      type: "article",
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: `${gameTitle} | Casino Details - BETIDA`,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      "casino",
      "slots",
      "pragmatic play",
      "angel vs sinner",
      "rtp",
      "betting",
      "online casino",
      gameTitle,
    ],
    authors: [{ name: "BETIDA Team" }],
    publisher: "BETIDA",
    metadataBase: new URL("http://localhost:3000"),
  };
}

export default async function CasinoDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
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
      <BackRedirectHandler />
      <div className="pt-6" id={slug}>
        <PlayerComponent />
        <div className="pt-4">
          <PlayerControls />
        </div>
        <div className="hidden lg:block pt-6">
          <PlayDetails />
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
