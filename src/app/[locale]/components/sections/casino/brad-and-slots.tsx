import dynamic from "next/dynamic";
import { Suspense } from "react";

const GlobalCadCarousel = dynamic(
  () => import("@/app/[locale]/components/sections/home/games-and-sports/game-card-carousel")
);

const BranchAndSlots = ({
  trendingSports,
  trendingGames,
}: {
  trendingSports: any;
  trendingGames: any;
}) => {
  return (
    <div className="w-full">
      {/* Brand New Originals */}
      <Suspense
        fallback={
          <div className="grid grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="w-35.75 m:w-31.75 h-49.5 bg-background-1 rounded-lg overflow-hidden"
              />
            ))}
          </div>
        }
      >
        <GlobalCadCarousel title="Brand New Originals" items={trendingGames} />
      </Suspense>
      {/* Slots */}
      <div className="pt-9">
        <Suspense
          fallback={
            <div className="grid grid-cols-4 gap-4 animate-pulse">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="w-35.75 m:w-31.75 h-49.5 bg-background-1 rounded-lg overflow-hidden"
                />
              ))}
            </div>
          }
        >
          <GlobalCadCarousel title="Slots" items={trendingSports} />
        </Suspense>
      </div>
    </div>
  );
};

export default BranchAndSlots;
