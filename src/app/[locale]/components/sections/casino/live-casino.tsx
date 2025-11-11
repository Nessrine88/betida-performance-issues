import dynamic from "next/dynamic";

const GlobalCadCarousel = dynamic(
  () => import("@/app/[locale]/components/sections/home/games-and-sports/game-card-carousel"),{ loading: () => null }
);

const LiveCasino = ({ trendingSports }: { trendingSports: any }) => {
  const liveCasino = trendingSports;
  return (
    <div className="w-full">
      {/* Live Casino */}
      <GlobalCadCarousel title="Live Casino" items={liveCasino} />
    </div>
  );
};

export default LiveCasino;
