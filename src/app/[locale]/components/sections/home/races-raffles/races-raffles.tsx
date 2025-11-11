"use client";

import VipIconSVG from "@/app/[locale]/components/common/svg_icons/sidebar-icons/vip-icon-svg";
import TooltipIconSVG from "@/app/[locale]/components/common/svg_icons/tooltip-icon-svg";
import CircularCountdown from "@/app/[locale]/components/global-components/circular-countdown";
import { Button } from "@/app/[locale]/components/ui/button";
import { useSidebarStore } from "@/store/sidebar-store";
import { Ticket } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { getLocalizedString } from "@/lib/helpers/localized-content";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import RacesSkeleton from "./races-skeleton";

interface RacesRafflesProps {
  data: any; // From SSR fetch
}

export default function RacesAndRafflesSection({ data }: RacesRafflesProps) {
  const router = useRouter();
  const {
    toggleHundredRaceModalOpen,
    toggleWeeklyRaffleModalOpen,
    toggleTicketModalOpen,
  } = useSidebarStore.getState();
  const isAuthenticated = useAuthStore((state) => state.user);
  const authLoaded = useAuthStore((state) => state.loaded);
  const t = useTranslations("racesRaffles");

  // Extract dynamic data from Sanity
  const { hundredRace, weeklyRaffle } = data || {};
  const raceTitle = getLocalizedString(hundredRace?.title, "en");
  const raceTimer = hundredRace?.timer || {
    days: 5,
    hours: 21,
    minutes: 25,
    seconds: 39,
    storageKey: "race_timer",
  };
  const raffleTitle = getLocalizedString(weeklyRaffle?.title, "en");
  const raffleTimer = weeklyRaffle?.timer || {
    days: 5,
    hours: 21,
    minutes: 25,
    seconds: 39,
    storageKey: "raffle_timer",
  };
  const raffleDescription =
    weeklyRaffle?.description?.find((d: any) => d.language === "en")?.blocks ||
    [];
  const raffleLink = weeklyRaffle?.link || {
    url: "https://www.kick.com/Eddie",
    text: "www.kick.com/Eddie",
  };
  //   const buttonText = t("viewTickets");

  // Mock user/ticket data - in real, fetch from user store or API
  const userWagered = 500; // Replace with real user data
  const totalTickets = 3; // Replace with real
  const goalAmount = hundredRace?.goalAmount || 1000;
  const raffleGoal = weeklyRaffle?.goalAmount || 1000;
  const raffleProgress = Math.min((userWagered / raffleGoal) * 100, 100);

  // Calculate race progress dynamically
  const raceProgress =
    userWagered && goalAmount
      ? Math.min((userWagered / goalAmount) * 100, 100)
      : 0;

  // Handlers
  const openHundredRaceModal = () => {
    router.push("?modal=100kRace", { scroll: false });
    toggleHundredRaceModalOpen();
  };

  const openWeeklyRaffleModal = () => {
    router.push("?modal=weeklyRaffle", { scroll: false });
    toggleWeeklyRaffleModalOpen();
  };

  const openTicketModal = () => {
    router.push("?modal=ticket", { scroll: false });
    toggleTicketModalOpen();
  };

  if (authLoaded === false) {
    return <RacesSkeleton />; // placeholder shown while store initializes
  }

  if (!isAuthenticated) {
    return null; // hide for anonymous users
  }

  return (
    <div className="w-full text-foreground space-y-3 pt-9">
      <h2 className="text-foreground-muted text-base font-semibold">
        {t("racesAndRaffleTitle")}
      </h2>

      {/* card area start */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 100k race card (dynamic) */}
        <div className="bg-background-3 rounded-lg divide-y flex flex-col divide-border">
          <div className="h-full">
            <div className="p-5 flex items-center gap-5 justify-between grow">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-semibold text-xl">{raceTitle}</h3>
                  <PortableText
                    value={
                      hundredRace?.description?.find(
                        (d: any) => d.language === "en"
                      )?.blocks || []
                    }
                    components={portableTextComponents}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="max-w-72">
                    <Button variant="gray">{t("leaderboard")}</Button>
                  </div>

                  <button
                    onClick={openHundredRaceModal}
                    name="tooltip button"
                    aria-labelledby="labeldiv"
                    aria-label="tooltip icon"
                    className="bg-foreground shrink-0 size-4 
                  flex items-center justify-center rounded-full 
                  cursor-pointer transition-all duration-300 hover:scale-110"
                  >
                    <TooltipIconSVG className="fill-black w-2! h-3!" />
                  </button>
                </div>
              </div>

              <CircularCountdown
                days={raceTimer.days}
                hours={raceTimer.hours}
                minutes={raceTimer.minutes}
                seconds={raceTimer.seconds}
                storageKey={raceTimer.storageKey}
              />
            </div>
          </div>

          <div className="p-5 flex items-center gap-2">
            <VipIconSVG />
            {userWagered > 0 ? (
              <div className="w-full flex items-center gap-2">
                <div className="w-full bg-background-1 rounded-full overflow-hidden h-3">
                  <div
                    className="bg-linear-to-t from-orange-1 to-yellow-1 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${raceProgress}%` }}
                  />
                </div>
                <span>{raceProgress.toFixed(0)}%</span>
              </div>
            ) : (
              <span>{t("notEnteredYet")}</span>
            )}
          </div>
        </div>

        {/* Weekly Raffle (dynamic) */}
        <div className="bg-background-3 rounded-lg divide-y divide-border">
          <div className="p-5 flex items-center gap-5 justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-xl">{raffleTitle}</h3>
                <PortableText
                  value={raffleDescription}
                  components={portableTextComponents}
                />
                <Link
                  href={raffleLink.url}
                  className="text-foreground/55 underline"
                >
                  {raffleLink.text}
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <div className="max-w-72">
                  <Button
                    variant={totalTickets > 0 ? "orangeGradient" : "gray"}
                    onClick={totalTickets > 0 ? openTicketModal : undefined}
                  >
                    {totalTickets > 0
                      ? `${totalTickets} Ticket${totalTickets > 1 ? "s" : ""}`
                      : t("zeroTickets")}
                  </Button>
                </div>

                <button
                  onClick={openWeeklyRaffleModal}
                  name="tooltip button"
                  aria-labelledby="labeldiv"
                  aria-label="tooltip icon"
                  className="bg-foreground shrink-0 size-4 
                  flex items-center justify-center rounded-full 
                  cursor-pointer transition-all duration-300 hover:scale-110"
                >
                  <TooltipIconSVG className="fill-background w-2! h-3!" />
                </button>
              </div>
            </div>

            <CircularCountdown
              days={raffleTimer.days}
              hours={raffleTimer.hours}
              minutes={raffleTimer.minutes}
              seconds={raffleTimer.seconds}
              storageKey={raffleTimer.storageKey}
            />
          </div>

          <div className="p-5 flex items-center gap-2">
            <Ticket />
            {totalTickets > 0 ? (
              <div className="w-full flex items-center gap-2">
                <div className="w-full bg-background-1 rounded-full overflow-hidden h-3">
                  <div
                    className="bg-linear-to-t from-orange-1 to-yellow-1 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${raffleProgress}%` }}
                  />
                </div>
                <span>{raffleProgress.toFixed(0)}%</span>
              </div>
            ) : (
              <span>{t("noTicketsYet")}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
