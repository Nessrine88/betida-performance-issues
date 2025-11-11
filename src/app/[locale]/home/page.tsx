import HeroSection from "@/app/[locale]/components/sections/home/hero-section";
import { PromotionSkeletonCarousel } from "../components/sections/home/promotions/promotion-cards-carousel";
import { fetchHero } from "@/lib/fetchers/home-page-details";
import { fetchTrendingGames } from "@/lib/fetchers/trending-games-data";
import { fetchTrendingSports } from "@/lib/fetchers/trending-sports-data";
import { fetchCasinoTableData } from "@/lib/fetchers/casino-table-data";
import { fetchSportsTableData } from "@/lib/fetchers/sports-table-data";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
import { fetchQuestions } from "@/lib/fetchers/questions";
import SearchBar from "../components/common/search-bar/search-bar";
import RacesAndRafflesSection from "@/app/[locale]/components/sections/home/races-raffles/races-raffles";
import { fetchRacesAndRaffles } from "@/lib/fetchers/races-raffles";
import BetsTable from "@/app/[locale]/components/sections/home/bets/bets-page";
import Question from "@/app/[locale]/components/sections/home/questions/question";
import { Suspense } from "react";
import { SkeletonCarousel } from "../components/sections/home/games-and-sports/game-card-carousel";
import GameAndSport from "../components/sections/home/games-and-sports/game-and-sport";
import Promotions from "../components/sections/home/promotions/promotions";
import RacesSkeleton from "../components/sections/home/races-raffles/races-skeleton";

type Metadata = {
  title: string;
  description: string;
  keywords?: string[];
  authors?: { name: string; url?: string }[];
  creator?: string;
  publisher?: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    locale: string;
    type: string;
  };
  twitter: {
    card: string;
    title?: string;
    description?: string;
    images?: string[];
    creator?: string;
    site?: string;
  };
  robots: {
    index: boolean;
    follow: boolean;
    googleBot: {
      index: boolean;
      follow: boolean;
      "max-video-preview": -1;
      "max-image-preview": "large";
      "max-snippet": -1;
    };
  };
  verification: {
    google?: string;
    yandex?: string;
    yahoo?: string;
  };
  viewport: string;
  themeColor?: Array<{ media: string; color: string }>;
  alternates: {
    canonical: string;
  };
  icons: {
    icon: string;
    shortcut: string;
    apple: string;
    other: {
      rel: string;
      url: string;
      sizes?: string;
    }[];
  };
};

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://betida.com";
  const title = "BETIDA - Home";
  const description = "Welcome to BETIDA - Your ultimate gaming destination!";
  // const bannerImage = "og-banner_etnrp1";
  const ogImageUrl = `${baseUrl}/detida.png`;
  const keywords = [
    "online casino",
    "sports betting",
    "trending games",
    "live sports",
    "promotions",
    "BETIDA casino",
  ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "BETIDA Team", url: "https://betida.com/" }],
    creator: "BETIDA",
    publisher: "BETIDA",
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: "BETIDA",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
      creator: "@BETIDAOfficial",
      site: "@BETIDAOfficial",
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
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || "",
      yandex: process.env.YANDEX_SITE_VERIFICATION || "",
      yahoo: process.env.YAHOO_SITE_VERIFICATION || "",
    },
    viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
    alternates: {
      canonical: baseUrl,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
      other: [
        {
          rel: "apple-touch-icon",
          url: "/apple-touch-icon.png",
          sizes: "180x180",
        },
        {
          rel: "icon",
          url: "/favicon-32x32.png",
          sizes: "32x32",
        },
      ],
    },
  };
}

export default async function HomePage() {
  const [hero, trendingGames, trendingSports, racesRaffles] = await Promise.all(
    [
      fetchHero(),
      fetchTrendingGames(),
      fetchTrendingSports(),
      fetchRacesAndRaffles(),
    ]
  );
  const casinoBets = await fetchCasinoTableData();
  const sportsBets = await fetchSportsTableData();
  const raceBets = await fetchRaceLeaderboardTableData();
  const questions = await fetchQuestions();
  const betsData = {
    casino: casinoBets,
    sports: sportsBets,
    "race-leaderboard": raceBets,
  };

  return (
    <div className="app-container pb-9">
      <div className="w-full pt-8">
        <HeroSection types={hero} />
      </div>
      {/* top search panel */}
      <div className="w-full pt-9">
        <SearchBar />
      </div>
      {/* Game & Sport */}
      <div className="w-full pt-6">
        <Suspense fallback={<SkeletonCarousel />}>
          <GameAndSport
            priority={false}
            trendingSports={trendingSports}
            trendingGames={trendingGames}
          />
        </Suspense>
      </div>

      {/* Promotions */}
      <div className="w-full pt-9">
        <Suspense
          fallback={
            <div className="min-h-56">
              <PromotionSkeletonCarousel />
            </div>
          }
        >
          <Promotions priority={false} />
        </Suspense>
      </div>

      {/* Races & Raffles */}
      <div className="w-full">
        <Suspense fallback={<RacesSkeleton />}>
          <RacesAndRafflesSection data={racesRaffles} />
        </Suspense>
      </div>
      {/* bets table section */}
      <div className="w-full pt-9">
        <BetsTable betsData={betsData} />
      </div>
      {/* bets table section */}
      {questions.length > 0 && (
        <div className="w-full pt-9">
          <Question questions={questions} />
        </div>
      )}
    </div>
  );
}
