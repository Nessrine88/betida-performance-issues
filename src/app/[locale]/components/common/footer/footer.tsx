// src/app/components/footer/footer.tsx
"use client";

import dynamic from "next/dynamic";
import FacebookIconSVG from "../svg_icons/facebook-icon-svg";
import XIconSVG from "../svg_icons/x-Icon-svg";
import MessageIconSVG from "../svg_icons/message-Icon-svg";
import InstaIconSVG from "../svg_icons/Insta-Icon-svg";
import YoutubeIconSVG from "../svg_icons/youtube-Icon-svg";
import TiktokIconSVG from "../svg_icons/tiktok-Icon-svg";
import LinkedinIconSVG from "../svg_icons/linkedin-Icon-svg";
import { Dot } from "lucide-react";
import Image from "next/image";
import LanguageDropdown from "../../global-components/language-dropdown";
import { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import { useTranslations } from "next-intl";

const GlobalAccordion = dynamic(() =>
  import("../../global-components/global-accordion").then(
    (mod) => mod.GlobalAccordion
  )
);

const footerLinks = {
  Casino: [
    { text: "casinoGames", href: "/casino" },
    { text: "slots", href: "/casino/group/slots" },
    { text: "liveCasino", href: "/casino/group/live-casino" },
    { text: "roulette", href: "/casino/group/roulette" },
    { text: "blackjack", href: "/casino/group/blackjack" },
    { text: "poker", href: "/casino/games/poker" },
    { text: "publishers", href: "/casino/collection/provider" },
    { text: "promosCompetitions", href: "/promotions" },
    { text: "betidaEngine", href: "https://stake-engine.com/" },
  ],
  Sports: [
    { text: "sportsbook", href: "/sports" },
    { text: "liveSports", href: "/sports/live-events/tennis?tabName=allBets" },
    { text: "soccer", href: "/sports/soccer?tabName=myBets&tab=all-soccer" },
    {
      text: "basketball",
      href: "/sports/baseball?tabName=myBets&tab=all-baseball",
    },
    { text: "tennis", href: "/sports/tennis?tabName=myBets&tab=all-tennis" },
    { text: "betBonuses", href: "/promotions?tab=sports" },
    { text: "sportsRules", href: "/terms/sports-book" },
    { text: "racingRules", href: "/terms/racing-rules" },
  ],
  Support: [
    { text: "helpCenter", href: "https://help.stake.com/en/" },
    { text: "fairness", href: "/provably-fair" },
    { text: "gamblingHelpline", href: "https://gamblingtherapy.org/" },
    { text: "selfExclusion", href: "/terms/self-exclusion-policy" },
    { text: "lawEnforcementRequest", href: "/law-enforcement" },
  ],
  "About Us": [
    { text: "vipClub", href: "/vip-club" },
    { text: "affiliate", href: "/affiliate" },
    { text: "privacyPolicy", href: "/terms" },
    { text: "amlPolicy", href: "/terms/anti-money-laundering" },
    { text: "termsOfService", href: "/terms" },
  ],
  "Payment Info": [
    {
      text: "depositWithdrawals",
      href: "/blog/payment-methods-how-to-deposit-and-withdraw-funds",
    },
    { text: "currencyGuide", href: "/blog/local-currency-guide" },
    { text: "cryptoGuide", href: "/blog/what-is-crypto-gaming-and-betting" },
    {
      text: "supportedCrypto",
      href: "/blog/what-crypto-can-i-bet-with-on-betida-casino-and-sportsbook",
    },
    { text: "howToUseVault", href: "/blog/how-to-use-the-betida-vault" },
    {
      text: "howMuchToBet",
      href: "/blog/how-much-should-you-gamble-with-budget-calculator-and-responsible-gambling-tips",
    },
  ],
  FAQ: [
    { text: "howToGuides", href: "/blog?tab=how-to-guides" },
    {
      text: "onlineCasinoGuide",
      href: "/blog/guide-to-online-casinos-how-to-gamble-and-play-games-online",
    },
    {
      text: "sportsBettingGuide",
      href: "/blog/ultimate-guide-to-sports-betting-online-at-betida-sportsbook",
    },
    {
      text: "liveStreamSports",
      href: "/blog/how-to-watch-free-live-sports-streams",
    },
    {
      text: "betidaVipGuide",
      href: "/blog/betida-vip-program-explained-levels-and-rewards",
    },
    { text: "houseEdgeGuide", href: "/blog/what-is-casino-house-edge" },
  ],
};

const socialIcons = [
  { Icon: FacebookIconSVG, href: "#", label: "followFacebook" },
  { Icon: XIconSVG, href: "#", label: "followX" },
  { Icon: MessageIconSVG, href: "#", label: "followMessage" },
  { Icon: InstaIconSVG, href: "#", label: "followInstagram" },
  { Icon: YoutubeIconSVG, href: "#", label: "followYoutube" },
  { Icon: TiktokIconSVG, href: "#", label: "followTiktok" },
  { Icon: LinkedinIconSVG, href: "#", label: "followLinkedin" },
];

export default function Footer() {
  const t = useTranslations("footer");
  const { setRouteLoading } = useSidebarStore();

  const accordionData = Object.entries(footerLinks).map(
    ([titleKey, links]) => ({
      title: t(`sections.${titleKey}`),
      content: (
        <ul className="space-y-2.5 text-white/55">
          {links.map((link) => (
            <li key={link.text}>
              <Link
                prefetch
                aria-label={`go to ${t(`links.${link.text}`)}`}
                href={link.href}
                onClick={() => setRouteLoading(true)}
                className="hover:text-white transition-all duration-300 flex flex-row items-center gap-1"
              >
                <Dot className="text-muted" />
                {t(`links.${link.text}`)}
              </Link>
            </li>
          ))}
        </ul>
      ),
    })
  );

  return (
    <div className="app-container pb-10">
      {/* Mobile Accordion */}
      <div className="lg:hidden">
        <div className="flex flex-row justify-center items-center gap-3 w-full mb-6">
          <span>
            <Image
              src="/logos/logo.webp"
              alt="Betida logo"
              width={32}
              height={32}
              sizes="32px"
              loading="lazy"
              priority={false}
            />
          </span>
          <span className="text-lg font-semibold text-foreground">BETIDA</span>
        </div>
      </div>

      <div className="lg:hidden">
        <Suspense fallback={<FooterSkeleton />}>
          <GlobalAccordion data={accordionData} />
          <div className="">
            <div className="py-6 flex items-center justify-center gap-x-4">
              {socialIcons.map(({ Icon, href, label }, i) => (
                <Link
                  prefetch
                  key={i}
                  href={href}
                  className="group"
                  aria-label={t(label)}
                >
                  <Icon className="fill-white/55 group-hover:fill-white transition-all duration-300" />
                </Link>
              ))}
            </div>

            <div className="border-t border-border py-6 text-white/55 text-xs space-y-4">
              <p className="w-full">{t("copyright")}</p>
              <p className="w-full">{t("ownership")}</p>
              <p className="w-full">
                {t("responsibleGambling")}{" "}
                <Link href="#" className="underline hover:text-white">
                  Gamblingtherapy.org
                </Link>
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 justify-center text-white/55 text-xs">
              <div className="w-full text-center">{t("btcPrice")}</div>
              <LanguageDropdown />
              <div className="flex flex-row justify-center items-center gap-2 w-full">
                <Image
                  src="/logos/logo.webp"
                  alt="Betida logo"
                  width={32}
                  height={32}
                  sizes="32px"
                  loading="lazy"
                  priority={false}
                />
                <span className="text-sm font-semibold text-foreground">
                  BETIDA
                </span>
              </div>
              <div className="w-full flex items-center justify-center">
                <Image
                  src="/logos/gcb-logo.webp"
                  alt="Betida logo"
                  width={92}
                  height={52}
                  sizes="92px"
                  loading="lazy"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </Suspense>
      </div>

      {/* Desktop Footer */}
      <footer className="hidden lg:block bg-background-1 p-6 rounded-lg overflow-hidden text-sm">
        <div className="grid grid-cols-6 gap-6">
          {Object.entries(footerLinks).map(([titleKey, links]) => (
            <div key={titleKey} className="space-y-2.5">
              <h4 className="font-semibold text-white">
                {t(`sections.${titleKey}`)}
              </h4>
              <ul className="space-y-2.5 text-white/55">
                {links.map((link) => (
                  <li key={link.text} className="list-none!">
                    <Link
                      href={link.href}
                      onClick={() => setRouteLoading(true)}
                      className="hover:text-white transition-all duration-300"
                      aria-label={`go to ${t(`links.${link.text}`)}`}
                      prefetch
                    >
                      {t(`links.${link.text}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 flex items-center justify-center gap-x-4">
          {socialIcons.map(({ Icon, href, label }, i) => (
            <Link
              prefetch
              key={i}
              href={href}
              className="group"
              aria-label={t(label)}
            >
              <Icon className="fill-white/55 group-hover:fill-white transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="border-t border-border py-6 text-white/55 text-xs space-y-4">
          <p className="w-full">{t("copyright")}</p>
          <p className="w-full">{t("ownership")}</p>
          <p className="w-full">
            {t("responsibleGambling")}{" "}
            <Link href="#" className="underline hover:text-white">
              Gamblingtherapy.org
            </Link>
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 justify-center text-white/55 text-xs">
          <div className="w-full text-center">{t("btcPrice")}</div>
          <LanguageDropdown />
          <div className="flex flex-row justify-center items-center gap-2 w-full">
            <Image
              src="/logos/logo.webp"
              alt="Betida logo"
              width={32}
              height={32}
              sizes="32px"
              loading="lazy"
              priority={false}
            />
            <span className="text-sm font-semibold text-foreground">
              BETIDA
            </span>
          </div>
          <div className="w-full flex items-center justify-center">
            <Image
              src="/logos/gcb-logo.webp"
              alt="Betida logo"
              width={92}
              height={52}
              sizes="92px"
              loading="lazy"
              priority={false}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

export function FooterSkeleton() {
  return (
    <div className="w-full h-[500px] animate-pulse space-y-4 pb-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-sidebar rounded-lg p-4 space-y-2">
          <div className="h-5 w-32 bg-muted rounded" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((__, j) => (
              <div key={j} className="h-4 w-40 bg-muted/50 rounded" />
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-center gap-4 pt-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-6 w-6 bg-muted rounded-full" />
        ))}
      </div>
      <div className="border-t border-border py-6 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-muted/50 rounded" />
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="h-4 w-32 bg-muted rounded" />
        <div className="h-9 w-24 bg-muted rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
        </div>
        <div className="h-12 w-24 bg-muted rounded" />
      </div>
    </div>
  );
}
