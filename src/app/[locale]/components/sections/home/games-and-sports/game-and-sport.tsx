"use client";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const GlobalCadCarousel = dynamic(
  () =>
    import(
      "@/app/[locale]/components/sections/home/games-and-sports/game-card-carousel"
    ),
  { loading: () => null }
);

const GameAndSport = ({
  trendingGames,
  trendingSports,
  priority = true,
}: {
  trendingGames: any;
  trendingSports: any;
  priority?: boolean;
}) => {
  const t = useTranslations("gamesSports");

  return (
    <div className="w-full">
      {/* trending games */}
        <GlobalCadCarousel
          type="casino"
          title={t("trendingGames")}
          items={trendingGames}
          priority={priority}
        />
      {/* trending sports */}
      <div className="pt-9">
          <GlobalCadCarousel
            type="sports"
            title={t("trendingSports")}
            items={trendingSports}
            priority={priority}
          />
      </div>
    </div>
  );
};

export default GameAndSport;
