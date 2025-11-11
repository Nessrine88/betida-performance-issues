import SettingsIconSvg from "@/app/[locale]/components/common/svg_icons/settings-icon-svg";
import BackButton from "@/app/[locale]/components/global-components/back-button";
import { GlobalAccordion } from "@/app/[locale]/components/global-components/global-accordion";
import { GlobalTabs } from "@/app/[locale]/components/global-components/GlobalTabs";
import {
  fetchAllBets,
  fetchHighRollers,
  fetchMyBets,
} from "@/lib/fetchers/casino-table-data";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
import SportsFilters from "../details/sports-filters";
import CasinoBetsTable from "@/app/[locale]/components/sections/casino/casino-bets-table";
import { ArrowDownAZ } from "lucide-react";
import { getSlugText } from "@/lib/helpers/slugify";
import CImage from "@/lib/CIdImage";
import BackRedirectHandler from "@/app/[locale]/components/common/Back-redirect-handler";
import TabLoader from "@/app/[locale]/tab-loader";
import { Link } from "@/i18n/navigation";

export default async function SportsDetails({
  params,
  searchParams: searchParamsPromise,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { slug } = await params;
  const searchParams = await searchParamsPromise;
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

  const display =
    (Array.isArray(searchParams.display)
      ? searchParams.display[0]
      : searchParams.display) || "standard";
  const market =
    (Array.isArray(searchParams.market)
      ? searchParams.market[0]
      : searchParams.market) || "winner";

  const featuredData = [
    {
      name: "International",
      flag: "flag_ar",
      matches: 65,
      contentImage: "sports-details-placeholder",
    },
    {
      name: "Argentina",
      flag: "flag_ar",
      matches: 14,
      contentImage: "sports-details-placeholder",
    },
  ];
  const allData = [
    {
      name: "International",
      flag: "flag_ar", // Example flag URL (Argentina for International? Adjust as needed)
      matches: 65,
      contentImage: "sports-details-placeholder",
    },
    {
      name: "Argentina",
      flag: "flag_ar",
      matches: 14,
      contentImage: "sports-details-placeholder",
    },
    {
      name: "Australia",
      flag: "flag_au",
      matches: 4,
      contentImage: "sports-details-placeholder",
    },
    {
      name: "Belgium",
      flag: "flag_be",
      matches: 2,
      contentImage: "sports-details-placeholder",
    },
    {
      name: "Brazil",
      flag: "flag_br",
      matches: 21,
      contentImage: "sports-details-placeholder",
    },
    {
      name: "Canada",
      flag: "flag_ca",
      matches: 1,
      contentImage: "sports-details-placeholder",
    },
    {
      name: "Chile",
      flag: "flag_cl",
      matches: 1,
      contentImage: "sports-details-placeholder",
    },
    {
      name: "China",
      flag: "flag_cn",
      matches: 7,
      contentImage: "sports-details-placeholder",
    },
  ];

  const featuredAccordionData = featuredData.map((item) => ({
    title: (
      <div className="flex items-center gap-2 text-foreground text-base font-semibold">
        <CImage
          publicId={item.flag}
          alt={`${item.name} flag`}
          width={24}
          height={16}
          className="w-6 h-4 rounded object-cover"
        />
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

  const allAccordionData = allData.map((item) => ({
    title: (
      <div className="flex items-center gap-2 text-foreground text-base font-semibold">
        <div className="w-6 h-4 bg-background-rounded-lg">
          <CImage
            publicId={item.flag}
            alt={`${item.name} flag`}
            width={24}
            height={16}
            className="w-6 h-4 rounded object-cover"
          />
        </div>
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

  const tabs = [
    {
      value: "live-and-upcoming",
      label: "Live & Upcoming",
      ariaLabel: "Live and Upcoming",
    },
    { value: "outrights", label: "Outrights", ariaLabel: "Live and Upcoming" },
    {
      value: `all-${slug.toLocaleLowerCase()}`,
      label: `All ${slug}`,
      ariaLabel: "Live and Upcoming",
    },
  ];

  return (
    <div className="flex flex-col gap-4 mb-4">
      <BackRedirectHandler />
      <div className="bg-background-1 mb-2">
        <div className="app-container">
          <div className="flex flex-row items-center gap-2 p-2 pl-0">
            <Link
              href="/sports?tabName=race-leaderboard&tab=lobby"
              aria-label="Back to sports"
              replace
              prefetch
            >
              <BackButton />
            </Link>

            <div className="flex gap-3 items-center text-lg capitalize">
              <span>{getSlugText(slug)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="app-container">
        <GlobalTabs data={tabs} />
        <div className="w-full relative">
          <TabLoader />
          {/* featured */}
          <div className="featured-part relative flex flex-col md:flex-row items-center gap-3 md:gap-4 md:justify-between mb-3">
            <div className="flex flex-row items-center gap-2 capitalize">
              <SettingsIconSvg />
              <span>Featured {getSlugText(slug)}</span>
            </div>
            <SportsFilters display={display} market={market} />
          </div>
          <GlobalAccordion data={featuredAccordionData} />
          {/* all */}
          <div className="featured-part flex flex-col md:flex-row items-center gap-3 md:gap-4 md:justify-between mb-3 mt-4">
            <div className="flex flex-row items-center gap-2 capitalize">
              <ArrowDownAZ />
              <span>All {getSlugText(slug)}</span>
            </div>
            <SportsFilters display={display} market={market} />
          </div>
          <GlobalAccordion data={allAccordionData} />
        </div>
        {/* sports table */}
        <div className="mt-6">
          <CasinoBetsTable betsData={betsData} />
        </div>

      </div>
    </div>
  );
}
