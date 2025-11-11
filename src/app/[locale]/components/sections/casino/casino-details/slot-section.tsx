import dynamic from "next/dynamic";

const GlobalCadCarousel = dynamic(
  () => import("@/app/[locale]/components/sections/home/games-and-sports/game-card-carousel")
);

const SlotSection = ({ trendingSports }: { trendingSports: any }) => {
  return (
    <div className="w-full">
      {/* Slots */}
      <div className="pt-9">
        <GlobalCadCarousel title="Slots" items={trendingSports} type="sports" />
      </div>
    </div>
  );
};

export default SlotSection;
