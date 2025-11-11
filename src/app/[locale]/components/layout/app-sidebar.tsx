"use client";
import { useSidebarStore } from "@/store/sidebar-store";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedHamburger from "../global-components/animated-hamburger";
import { Button } from "../ui/button";

// sidebar icons
import PromotionsIconSVG from "../common/svg_icons/sidebar-icons/promotions-icon-svg";
import AffiliateIconSVG from "../common/svg_icons/sidebar-icons/affiliate-icon-svg";
import VipIconSVG from "../common/svg_icons/sidebar-icons/vip-icon-svg";
import BlogIconSVG from "../common/svg_icons/sidebar-icons/blog-icon-svg";
import ForumIconSVG from "../common/svg_icons/sidebar-icons/forum-icon-svg";
import SponsorShipIconSVG from "../common/svg_icons/sidebar-icons/sponsorships-icon-svg";
import ResponsibleIconSVG from "../common/svg_icons/sidebar-icons/responsible-icon-svg";
import LiveSupportIconSVG from "../common/svg_icons/sidebar-icons/live-support-icon-svg";
import CasinoIconSVG from "../common/svg_icons/sidebar-icons/casino-icon-svg";
import SportsIconSVG from "../common/svg_icons/sidebar-icons/sports-icon-svg";
import FavouritesIconSvg from "../common/svg_icons/sidebar-icons/favourites-icon-svg";
import RecentIconSvg from "../common/svg_icons/sidebar-icons/recent-icon-svg";
import ChallengesIconSvg from "../common/svg_icons/sidebar-icons/challenges-icon-svg";
import MyBetsIconSvg from "../common/svg_icons/sidebar-icons/my-bets-icon-svg";
import GameIconSvg from "../common/svg_icons/sidebar-icons/game-icon-svg";
import SidebarMenuSections from "./sidebar-menu-section";
import LiveEventsIconSvg from "../common/svg_icons/sidebar-icons/live-events-icon-svg";
import ClockSVG from "../common/svg_icons/clock-svg";
import FootballIconSvg from "../common/svg_icons/sidebar-icons/football-icon-svg";
import TennisIconSvg from "../common/svg_icons/sidebar-icons/tennis-icon-svg";
import BaseballIconSvg from "../common/svg_icons/sidebar-icons/baseball-icon-svg";
import AmericanFootballIconSvg from "../common/svg_icons/sidebar-icons/american-football-icon-svg";
import RacingIconSvg from "../common/svg_icons/sidebar-icons/racing-icon-svg";
import CricketIconSvg from "../common/svg_icons/sidebar-icons/cricket-icon-svg";
import GolfIconSVG from "../common/svg_icons/sidebar-icons/golf-icon-svg";
import RankingIcon from "../common/svg_icons/level-icons/ranking-icon-svg";
import AllSPortsIconSVG from "../common/svg_icons/sidebar-icons/all-sports-icon-svg";
import AllEsportsIconSVG from "../common/svg_icons/sidebar-icons/all-esports-svg";
import GlobeIconSVG from "../common/svg_icons/globe-icon-svg";
import { toast } from "sonner";
import { Link, usePathname } from "@/i18n/navigation";
import { type LanguageCode } from "@/lib/helpers/localized-content";
export interface MenuItem {
  text: string;
  icon?: any;
  href?: string;
  onClick?: () => void;
  navigateTo?: string;
  children?: MenuItem[];
  casinoOnly?: boolean;
  sportsOnly?: boolean;
  requiresAuth?: boolean;
  locale?: LanguageCode;
}

export const casinoItems: MenuItem[] = [
  {
    text: "Favourites",
    icon: FavouritesIconSvg,
    href: "/casino/favourites",
    requiresAuth: true,
  },
  {
    text: "Recent",
    icon: RecentIconSvg,
    href: "/casino/recent",
    requiresAuth: true,
  },
  { text: "Challenges", icon: ChallengesIconSvg, href: "/casino/challenges" },
  {
    text: "My Bets",
    icon: MyBetsIconSvg,
    href: "/my-bets",
    requiresAuth: true,
  },
  {
    text: "Games",
    icon: GameIconSvg,
    children: [
      { text: "New Releases", href: "/casino/group/new-releases" },
      { text: "Slots", href: "/casino/group/slots" },
      { text: "Stake Originals", href: "/casino/group/stake-originals" },
      {
        text: "ForuStake Exclusivesm",
        href: "/casino/group/foruStake-exclusivesm",
      },
      { text: "Live Casino", href: "/casino/group/live-casino" },
      { text: "Game Shows", href: "/casino/group/game-shows" },
      { text: "Burst Games", href: "/casino/group/burst-games" },
      { text: "Stake Poker", href: "/casino/group/stake-poker" },
      { text: "Bonus Buy", href: "/casino/group/bonus-buy" },
      { text: "Blackjack", href: "/casino/group/blackjack" },
      { text: "Baccarat", href: "/casino/group/baccarat" },
      { text: "Roulette", href: "/casino/group/roulette" },
      { text: "Publishers", href: "/casino/collection/provider" },
    ],
  },
];

export const sportItems: MenuItem[] = [
  { text: "Live Events", icon: LiveEventsIconSvg, href: "/sports/live-events" },
  { text: "Starting Soon", icon: ClockSVG, href: "/sports/upcoming" },
  {
    text: "My Bets",
    icon: MyBetsIconSvg,
    href: "/my-bets",
    requiresAuth: true,
  },
];

export const sportItems2: MenuItem[] = [
  {
    text: "Soccer",
    icon: FootballIconSvg,
    children: [
      { text: "Live & Upcoming", href: "/sports/soccer" },
      {
        text: "Outrights",
        href: "/sports/soccer?tabName=myBets&tab=outrights",
      },
      { text: "WC Qualification", href: "/sports/soccer" },
      { text: "WC Qualification,", href: "/sports/soccer" },
      {
        text: "View All",
        href: "/sports/soccer?tabName=myBets&tab=all-soccer",
      },
    ],
  },
  {
    text: "Tennis",
    icon: TennisIconSvg,
    children: [
      { text: "Live & Upcoming", href: "/sports/tennis" },
      {
        text: "Outrights",
        href: "/sports/tennis?tabName=myBets&tab=outrights",
      },
      { text: "WC Qualification", href: "/sports/tennis" },
      { text: "WC Qualification,", href: "/sports/tennis" },
      {
        text: "View All",
        href: "/sports/tennis?tabName=myBets&tab=all-tennis",
      },
    ],
  },
  {
    text: "Baseball",
    icon: BaseballIconSvg,
    children: [
      { text: "Live & Upcoming", href: "/sports/baseball" },
      {
        text: "Outrights",
        href: "/sports/baseball?tabName=myBets&tab=outrights",
      },
      { text: "WC Qualification", href: "/sports/baseball" },
      { text: "WC Qualification,", href: "/sports/baseball" },
      {
        text: "View All",
        href: "/sports/baseball?tabName=myBets&tab=all-baseball",
      },
    ],
  },
  {
    text: "Basketball",
    icon: SportsIconSVG,
    children: [
      { text: "Live & Upcoming", href: "/sports/basketball" },
      {
        text: "Outrights",
        href: "/sports/basketball?tabName=myBets&tab=outrights",
      },
      { text: "NBA Preseason", href: "/sports/basketball" },
      { text: "NBL", href: "/sports/basketball" },
      { text: "PBA, Philippine Cup", href: "/sports/basketball" },
      {
        text: "View All",
        href: "/sports/basketball?tabName=myBets&tab=all-basketball",
      },
    ],
  },
  {
    text: "American Football",
    icon: AmericanFootballIconSvg,
    children: [
      { text: "Live & Upcoming", href: "/sports/american-football" },
      {
        text: "Outrights",
        href: "/sports/american-football?tabName=myBets&tab=outrights",
      },
      { text: "NBA Preseason", href: "/sports/american-football" },
      { text: "NBL", href: "/sports/american-football" },
      { text: "PBA, Philippine Cup", href: "/sports/american-football" },
      {
        text: "View All",
        href: "/sports/american-football?tabName=myBets&tab=all-american-football",
      },
    ],
  },
  {
    text: "Racing",
    icon: RacingIconSvg,
    children: [
      { text: "Live & Upcoming", href: "/sports/racing" },
      {
        text: "Outrights",
        href: "/sports/racing?tabName=myBets&tab=outrights",
      },
      { text: "NBA Preseason", href: "/sports/racing" },
      { text: "NBL", href: "/sports/racing" },
      { text: "PBA, Philippine Cup", href: "/sports/racing" },
      {
        text: "View All",
        href: "/sports/racing?tabName=myBets&tab=all-racing",
      },
    ],
  },
  {
    text: "Cricket",
    icon: CricketIconSvg,
    children: [
      { text: "Live & Upcoming", href: "/sports/cricket" },
      {
        text: "Outrights",
        href: "/sports/cricket?tabName=myBets&tab=outrights",
      },
      { text: "NBA Preseason", href: "/sports/cricket" },
      { text: "NBL", href: "/sports/cricket" },
      { text: "PBA, Philippine Cup", href: "/sports/cricket" },
      {
        text: "View All",
        href: "/sports/cricket?tabName=myBets&tab=all-cricket",
      },
    ],
  },
  {
    text: "Golf",
    icon: GolfIconSVG,
    children: [
      { text: "Live & Upcoming", href: "/sports/golf" },
      { text: "Outrights", href: "/sports/golf?tabName=myBets&tab=outrights" },
      { text: "NBA Preseason", href: "/sports/golf" },
      { text: "NBL", href: "/sports/golf" },
      { text: "PBA, Philippine Cup", href: "/sports/golf" },
      { text: "View All", href: "/sports/golf?tabName=myBets&tab=all-golf" },
    ],
  },
  {
    text: "League of Legends",
    icon: RankingIcon,
    children: [
      { text: "Live & Upcoming", href: "/sports/league-of-legends" },
      {
        text: "Outrights",
        href: "/sports/league-of-legends?tabName=myBets&tab=outrights",
      },
      { text: "NBA Preseason", href: "/sports/league-of-legends" },
      { text: "NBL", href: "/sports/league-of-legends" },
      { text: "PBA, Philippine Cup", href: "/sports/league-of-legends" },
      {
        text: "View All",
        href: "/sports/league-of-legends?tabName=myBets&tab=all-league-of-legends",
      },
    ],
  },
  {
    text: "Dota 2",
    icon: RankingIcon,
    children: [
      { text: "Live & Upcoming", href: "/sports/dota-2" },
      {
        text: "Outrights",
        href: "/sports/dota-2?tabName=myBets&tab=outrights",
      },
      { text: "NBA Preseason", href: "/sports/dota-2" },
      { text: "NBL", href: "/sports/dota-2" },
      { text: "PBA, Philippine Cup", href: "/sports/dota-2" },
      {
        text: "View All",
        href: "/sports/dota-2?tabName=myBets&tab=all-dota-2",
      },
    ],
  },
];

export const sportItems3: MenuItem[] = [
  {
    text: "All Sports",
    icon: AllSPortsIconSVG,
    children: [
      {
        text: "Soccer",
        href: "/sports/soccer?tabName=myBets&tab=outrights",
      },
      {
        text: "Tennis",
        href: "/sports/tennis?tabName=myBets&tab=outrights",
      },
      {
        text: "Baseball",
        href: "/sports/baseball?tabName=myBets&tab=outrights",
      },
      {
        text: "Basketball",
        href: "/sports/basketball?tabName=myBets&tab=outrights",
      },
      {
        text: "American Football",
        href: "/sports/american-football?tabName=myBets&tab=outrights",
      },
      {
        text: "Racing",
        href: "/sports/racing?tabName=myBets&tab=outrights",
      },
      {
        text: "Cricket",
        href: "/sports/cricket?tabName=myBets&tab=outrights",
      },
      {
        text: "Golf",
        href: "/sports/golf?tabName=myBets&tab=outrights",
      },
      {
        text: "League of Legends",
        href: "/sports/league-of-legends?tabName=myBets&tab=outrights",
      },
      {
        text: "Dota 2",
        href: "/sports/dota-2?tabName=myBets&tab=outrights",
      },
    ],
  },
  {
    text: "All Esports",
    icon: AllEsportsIconSVG,
    children: [
      {
        text: "Age of Empires",
        href: "/sports/age-of-empires?tabName=myBets&tab=outrights",
      },
      {
        text: "Arena of Valor",
        href: "/sports/arena-of-valor?tabName=myBets&tab=outrights",
      },
      {
        text: "CS2",
        href: "/sports/cs2?tabName=myBets&tab=outrights",
      },
      {
        text: "CS2 Duels",
        href: "/sports/CS2-Duels?tabName=myBets&tab=outrights",
      },
      {
        text: "Dota 2",
        href: "/sports/dota-2?tabName=myBets&tab=outrights",
      },
      {
        text: "Dota 2 Duels",
        href: "/sports/dota-2-duels?tabName=myBets&tab=outrights",
      },
    ],
  },
  {
    text: "All Racing",
    icon: RacingIconSvg,
    children: [
      {
        text: "Horse Racing",
        href: "/sports/horse-racing?tabName=myBets&tab=outrights",
      },
      {
        text: "Greyhounds",
        href: "/sports/greyhounds?tabName=myBets&tab=outrights",
      },
      {
        text: "Harness Racing",
        href: "/sports/harness-racing?tabName=myBets&tab=outrights",
      },
    ],
  },
];

export const menuItems1: MenuItem[] = [
  {
    text: "Promotions",
    icon: PromotionsIconSVG,
    children: [
      {
        text: "$75k Weekly Raffle",
        onClick: () => {
          const { toggleWeeklyRaffleModalOpen } = useSidebarStore.getState();
          toggleWeeklyRaffleModalOpen();
        },
        navigateTo: "?modal=weeklyRaffle", // Add navigation target
      },
      {
        text: "$100k Race",
        onClick: () => {
          const { toggleHundredRaceModalOpen } = useSidebarStore.getState();
          toggleHundredRaceModalOpen();
        },
        navigateTo: "?modal=100kRace",
      },
      {
        text: "Pragmatic Drops & Wins",
        href: "/promotions/pragmatic-drops-and-wins",
      },
      { text: "View All", href: "/promotions?tab=all-promotions" },
    ],
    requiresAuth: true,
  },
  { text: "Affiliate", icon: AffiliateIconSVG, href: "/affiliate" },
  { text: "VIP Club", icon: VipIconSVG, href: "/vip-club" },
  { text: "Blog", icon: BlogIconSVG, href: "/blog" },
  {
    text: "Forum", icon: ForumIconSVG, 
    onClick: () => {
      toast.info("Forum is coming soon!");
    },
  },
];

export const menuItems2: MenuItem[] = [
  {
    text: "Sponsorships",
    icon: SponsorShipIconSVG,
    children: [
      // { text: "Drake", href: "/drake" },
      { text: "Betida F1 Team", href: "/sponsorships/batida-f1-team" },
      { text: "UFC", href: "/sponsorships/ufc" },
      {
        text: "Everton Football Club",
        href: "/sponsorships/everton-football-club",
      },
      {
        text: "Esporte Clube Juventude",
        href: "/sponsorships/esporte-clube-juventude",
      },
      { text: "FBC Melgar", href: "/sponsorships/fbc-melgar" },
      {
        text: "Enyimba Football Club",
        href: "/sponsorships/enyimba-football-club",
      },
      {
        text: "Trinbago Knight Riders",
        href: "/sponsorships/trinbago-knight-riders",
      },
      { text: "Fortaleza CEIF", href: "/sponsorships/fortaleza-ceif" },
      {
        text: "Club Deportivo Ñublense",
        href: "/sponsorships/club-deportivo-nublense",
      },
      { text: "Davis Cup", href: "/sponsorships/davis-cup" },
      { text: "Team Vitality", href: "/sponsorships/team-vitality" },
      { text: "Kun Agüero", href: "/sponsorships/kun-agueero" },
      { text: "Patrice Evra", href: "/sponsorships/patrice-evra" },
      { text: "Israel Adesanya", href: "/sponsorships/israel-adesanya" },
      { text: "Alex Pereira", href: "/sponsorships/alex-pereira" },
      {
        text: "Valentina Shevchenko",
        href: "/sponsorships/valentina-shevchenko",
      },
      { text: "Merab Dvalishvili", href: "/sponsorships/merab-dvalishvili" },
    ],
  },
  {
    text: "Responsible Gambling",
    icon: ResponsibleIconSVG,
    href: "/responsible-gambling",
  },
  {
    text: "Live Support",
    icon: LiveSupportIconSVG,
    onClick: () => {
      toast.info("Live support feature is coming soon!");
    },
  },
  {
    text: "Language",
    icon: GlobeIconSVG,
    children: [
      { text: "English", locale: "en", onClick: () => { } },
      { text: "Español", locale: "es", onClick: () => { } },
      { text: "Türkçe", locale: "tr", onClick: () => { } },
      { text: "Deutsch", locale: "de", onClick: () => { } },
      // { text: "日本語", href: "/?lang=ja" },
      // { text: "中文", href: "/?lang=zh" },
      // { text: "Português", href: "/?lang=pt" },
      // { text: "Pусский", href: "/?lang=ru" },
      // { text: "Français", href: "/?lang=fr" },
      // { text: "हिन्दी", href: "/?lang=hi" },
      // { text: "Indonesian", href: "/?lang=id" },
      // { text: "한국어", href: "/?lang=ko" },
      // { text: "Polski", href: "/?lang=pl" },
      // { text: "Tiếng Việt", href: "/?lang=vi" },
      // { text: "Suomen", href: "/?lang=fi" },
      // { text: "اَلْعَرَبِيَّةُ", href: "/?lang=ar" },
    ],
  },
];

export const menuSections = [
  { items: casinoItems, casinoActive: true },
  { items: sportItems, sportsActive: true },
  {
    items: sportItems2,
    sportsActive: true,
    type: "group",
    title: "Top Sports",
  },
  { items: sportItems3, sportsActive: true, type: "group" },
  { items: menuItems1, type: "group" },
  { items: menuItems2, type: "group" },
];

export default function AppSidebar() {
  const { mobileOpen, toggleMobileOpen, setRouteLoading } = useSidebarStore();
  const pathname = usePathname();

  const casinoActive = pathname.startsWith("/casino");
  const sportsActive = pathname.startsWith("/sports");

  return (
    <nav
      className={`hidden md:block z-50 sticky top-0 left-0 h-screen overflow-y-auto no-scrollbar border-r border-border bg-sidebar shrink-0
      transition-all duration-300`}
    >
      {/* top bar */}
      <div className="sticky top-0 left-0 z-40 flex items-center p-4 bg-sidebar">
        {/* Desktop hamburger */}
        <div className="hidden md:block">
          <AnimatedHamburger isOpen={mobileOpen} onClick={toggleMobileOpen} />
        </div>

        {/* Casino / Sports buttons */}
        <div
          className={`flex gap-2 items-center transition-all duration-300 overflow-hidden 
            ${mobileOpen
              ? "max-w-auto md:max-w-0 pl-4 md:pl-0"
              : "max-w-auto md:max-w-50 pl-4"
            }`}
        >
          <div onClick={() => setRouteLoading(true)}>
            <Button
              href="/casino"
              variant={casinoActive ? "purpleGradient" : "gray"}
              asChild
              aria-label="casino"
            >
              Casino
            </Button>
          </div>
          <div onClick={() => setRouteLoading(true)}>
            <Button
              href="/sports"
              variant={sportsActive ? "greenGradient" : "gray"}
              asChild
              aria-label="sports"
            >
              Sports
            </Button>
          </div>
        </div>
      </div>

      {/* menu sections */}
      <div className="text-sidebar-foreground flex flex-col gap-2 px-4 text-sm">
        {/* visible only in collapse state */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobileMenu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full flex items-start flex-col gap-2 overflow-hidden"
            >
              <Link
                className={`inline-block p-3 transition-all duration-300 rounded-lg 
                  ${pathname === "/casino"
                    ? "bg-linear-to-t from-purple-1 to-blue-1 hover:opacity-80"
                    : "bg-background-2 hover:bg-background-2/55"
                  }`}
                href="/casino"
                aria-label="to go casino"
                prefetch
              >
                <CasinoIconSVG />
              </Link>

              <Link
                className={`inline-block p-3 transition-all duration-300 rounded-lg 
                  ${pathname === "/sports"
                    ? "bg-linear-to-t from-cyan-1 to-green-1 hover:opacity-80"
                    : "bg-background-2 hover:bg-background-2/55"
                  }`}
                href="/sports"
                aria-label="go to sports"
                prefetch
              >
                <SportsIconSVG />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <SidebarMenuSections />
      </div>
    </nav>
  );
}
