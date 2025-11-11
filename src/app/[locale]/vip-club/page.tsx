import dynamic from "next/dynamic";
import { Suspense } from "react";
import { fetchVipClub } from "@/lib/fetchers/vip-club";
import LiveSection from "@/app/[locale]/components/sections/vip-club/live-section";
import HeroSection from "@/app/[locale]/components/sections/vip-club/hero-section";
import StakeVipRankingSystem from "@/app/[locale]/components/sections/vip-club/stake-vip-ranking-system";
import NextLevelRewardsSkeleton from "@/app/[locale]/components/sections/vip-club/next-level-rewards-section.-sekeleton";

const NextLevelRewardsSection = dynamic(
  () => import("@/app/[locale]/components/sections/vip-club/next-level-rewards-section"),
  {
    loading: () => <NextLevelRewardsSkeleton />,
  }
);

const StakeVipRankingSystem2 = dynamic(
  () => import("@/app/[locale]/components/sections/vip-club/stake-vip-ranking-system-2"),
  {
    loading: () => (
      <div className="app-container">
        <div className="h-96 bg-background-2 animate-pulse rounded-lg" />
      </div>
    ),
  }
);

const TypeSection = dynamic(
  () => import("@/app/[locale]/components/sections/vip-club/type/type-section"),
  {
    loading: () => (
      <div className="py-12 md:py-16">
        <div className="h-96 bg-background-2 animate-pulse rounded-lg" />
      </div>
    ),
  }
);

export default async function VipClubPage() {
  const vipData = await fetchVipClub();
  if (!vipData) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading VIP Club data. Please try again later.
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 md:space-y-16 pb-12 md:pb-16">
      <div className="pt-9 app-container">
        <HeroSection />
      </div>
      
      <Suspense fallback={<NextLevelRewardsSkeleton />}>
        <NextLevelRewardsSection />
      </Suspense>
      
      <div className="app-container">
        <StakeVipRankingSystem data={vipData.stakeVipRankingLevel} />
      </div>
      <Suspense
        fallback={
          <div className="app-container">
            <div className="h-96 bg-background-2 animate-pulse rounded-lg" />
          </div>
        }
      >
        <div className="app-container">
          <StakeVipRankingSystem2 data={vipData.stakeVipRankingLevel2} />
        </div>
      </Suspense>
      <Suspense
        fallback={
          <div className="py-12 md:py-16 ">
            <div className="h-96 bg-background-2 animate-pulse rounded-lg" />
          </div>
        }
      >
        <TypeSection data={vipData.type} />
      </Suspense>
      <div className="app-container">
        <LiveSection />
      </div>
    </div>
  );
}
