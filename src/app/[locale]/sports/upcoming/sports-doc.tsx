"use client";
import { Button } from "@/app/[locale]/components/ui/button";
import React, { useState } from "react";

function SportsDoc() {
  const [isFullExpanded, setIsFullExpanded] = useState(true);

  const toggleFullExpand = () => {
    setIsFullExpanded(!isFullExpanded);
  };

  return (
    <div className="bg-background-1 p-4 md:p-6 rounded-lg shadow-md relative">
      <div
        className={`${isFullExpanded ? "max-h-none" : "max-h-[300px]"} overflow-hidden transition-all duration-300 relative`}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Calendar */}
          <div className="flex-1 w-full lg:w-1/2">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Sports Betting Calendar 2025 – Bet on Upcoming Sporting Events
            </h3>
            <p className="text-foreground/55 mb-6 leading-relaxed">
              {`2025 looks like it's set to be another bumper year for sports fans.
              There are contests and tournaments happening all over the world,
              with the best athletes and teams going head to head to find out
              who's best. The brand new FIFA Club World Cup gets underway, and
              soccer fans can also look forward to the Africa Cup of Nations and
              Women's Euros. Of course, we also have all the regular events for
              Formula 1, UFC, rugby, golf, tennis and more. BETIDA Sportsbook
              offers the best odds and betting for all your major sporting events.`}
            </p>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Major Sporting Events by Month
            </h2>

            {/* January */}
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              January
            </h3>
            <ul className="list-disc pl-5 text-foreground/55 mb-4 space-y-1">
              <li>Tennis Australian Open</li>
              <li>Playoffs</li>
              <li>MMA UFC</li>
              <li>{`Wrestling World Men's Greco-Roman Championships`}</li>
              <li>{`Handball World Men's Championship vs Armenia Tsurukyan`}</li>
              <li>College Football National Championship</li>
            </ul>

            {/* February */}
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              February
            </h3>
            <ul className="list-disc pl-5 text-foreground/55 mb-4 space-y-1">
              <li>American Football Pro Bowl and the Super Bowl</li>
              <li>UFC Fight Night 26 vs Adelaide Strikers Nossov in World</li>
              <li>Hockey IIHF World Junior Championship</li>
              <li>Basketball NBA All-Star Game</li>
            </ul>

            {/* March */}
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              March
            </h3>
            <ul className="list-disc pl-5 text-foreground/55 mb-4 space-y-1">
              <li>FIFA Australia vs China GP</li>
              <li>Basketball Copa Sudamericana March Madness</li>
            </ul>

            {/* April */}
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              April
            </h3>
            <ul className="list-disc pl-5 text-foreground/55 mb-4 space-y-1">
              <li>
                Soccer Copa del Rey and UEFA Champions League Quarter Finals
              </li>
              <li>
                Hockey NHL Playoffs and Tournament NBA Playoffs and Finals
              </li>
              <li>Golf Masters</li>
            </ul>

            {/* May */}
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              May
            </h3>
            <ul className="list-disc pl-5 text-foreground/55 mb-4 space-y-1">
              <li>
                Soccer UEFA Champions League Semi Finals and Final, Coppa Italia
                Final, and Spanish and European soccer leagues
              </li>
              <li>Tennis French Open</li>
            </ul>

            {/* June */}
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              June
            </h3>
            <ul className="list-disc pl-5 text-foreground/55 mb-4 space-y-1">
              <li>FIFA Spain vs Austria GP</li>
              <li>Ice Hockey Stanley Cup Grand Final</li>
              <li>Tennis Wimbledon Rugby</li>
            </ul>

            {/* July */}
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              July
            </h3>
            <ul className="list-disc pl-5 text-foreground/55 mb-4 space-y-1">
              <li>{`Women's Euros`}</li>
              <li>Tour de France</li>
            </ul>

            {/* August */}
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              August
            </h3>
            <ul className="list-disc pl-5 text-foreground/55 mb-4 space-y-1">
              <li>Major League Cricket</li>
              <li>
                Soccer European Leagues kick off EPL Serie A Bundesliga Ligue 1
              </li>
              <li>{`Rugby Women's Rugby World Championship`}</li>
              <li>Badminton US Open World Championships</li>
            </ul>

            {/* September */}
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              September
            </h3>
            <ul className="list-disc pl-5 text-foreground/55 mb-4 space-y-1">
              <li>{`American Football NFL Men's Volleyball World`}</li>
              <li>{`Cricket Ryder Women's World Cup`}</li>
              <li>Aussie Rules AFL Grand Final</li>
            </ul>

            {/* October */}
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              October
            </h3>
            <ul className="list-disc pl-5 text-foreground/55 mb-4 space-y-1">
              <li>Ice Hockey NHL Season starts</li>
              <li>
                Basketball NBA European Season starts Tennis Championships
              </li>
            </ul>

            {/* November */}
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              November
            </h3>
            <ul className="list-disc pl-5 text-foreground/55 mb-4 space-y-1">
              <li>Tennis WTA ATP and Davis Cup Finals Beach Volleyball</li>
              <li>Soccer Beach Arab World Cup</li>
            </ul>

            {/* December */}
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              December
            </h3>
            <ul className="list-disc pl-5 text-foreground/55 mb-4 space-y-1">
              <li>Ashes tests</li>
              <li>FIFA Club World Cup</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-6 mb-4">
              How to Bet on Upcoming Sports
            </h2>
            <p className="text-foreground/55 mb-4">
              BETIDA Africa Cup of Nations
            </p>
          </div>

          {/* Right Column: Side Content */}
          <div className="space-y-6 w-full lg:w-1/2">
            <div>
              <p className="text-foreground/55 leading-relaxed">
                You need to create an account to bet on upcoming sports at
                betida.com. You can then deposit local fiat currency and
                cryptocurrency to fund your sports bet. Learn how to deposit and
                withdraw funds to bet at betida.com here. With funds in your
                account, you can decide which upcoming sporting event to bet on
                and which type to place, choosing from any of the options
                introduced below.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Betting Odds, Types & Markets for Different Sports
              </h3>
              <ul className="list-disc pl-5 text-foreground/55 space-y-1">
                <li>
                  Moneyline: This type is straight up bet on the team that you
                  think will win.
                </li>
                <li>
                  For example, if you think the Newcastle United in the English
                  Premier League will win in Bournemouth, you would bet on
                  Newcastle United.
                </li>
                <li>
                  Handicap: A handicap is a wager that you can place on a team
                  to win, but they must do so by a certain amount.
                </li>
                <li>
                  For instance, in the EPL, if Southampton are playing
                  Manchester after they have lost 0-5 in Forest, you can bet on
                  Southampton to win by at least 0.5 goals.
                </li>
                <li>
                  Total/Over Under: Over/under bets are based on the total score
                  in a game. For example, the number of goals scored in NHL.
                </li>
                <li>
                  {`Props: Various outcomes as a match progresses. You're not tied
                  to the overall outcome like in a moneyline bet.`}
                </li>
                <li>
                  Futures: Overall outcomes like a player scoring the most goals
                  in a season.
                </li>
              </ul>
              <p className="text-sm text-foreground/55 mt-2">
                Spread: Bet on the most popular form of making your BETIDA
                Sportsbook. As it allows you to bet on whether a team will cover
                the spread.
              </p>
              <p className="text-sm text-foreground/55 mt-2">
                Parlays: A parlay is a single bet that links together two or
                more individual wagers for a high payout.
              </p>
              <p className="text-sm text-foreground/55 mt-2">
                Teasers: Allows you to spread the difference between the
                favorite to win a game and the underdog to win.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Pre-Match Betting vs Live Betting
              </h3>
              <p className="text-foreground/55 leading-relaxed">
                {`While pre-match bets are placed before the game begins, live bets
                are placed during the game. Both offer great in-play options, but
                it's important to understand the differences between pre-match and
                live betting so that you can decide which is right for you.`}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Upcoming Sports Betting Odds & Payouts
              </h3>
              <p className="text-foreground/55 leading-relaxed">
                betida.com has the best sports betting odds, all displayed in
                your timezone. You can adjust the way odds are displayed, as the
                account chooses from American, fractional, or decimal formats.
                Understanding the odds format is crucial as it shows you which
                fraction of your bet is the favorite and which is the underdog.
              </p>
              <p className="text-foreground/55 leading-relaxed">
                As for payouts, we have no delays. However, you can always
                enable two-factor authentication to secure your funds at BETIDA
                without processing a withdrawal. Learn more about funds.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Sports Betting Tips & Strategies
              </h3>
              <p className="text-foreground/55 leading-relaxed">
                {`While you're casual sports bettor or professional, coming some
                sporting events.`}
              </p>
              <ul className="list-disc pl-5 text-foreground/55 space-y-1 mt-2">
                <li>
                  The general online sports guide is perfect resource as you get
                  started.
                </li>
                <li>
                  Make sure you take advantage of the current promotions
                  available to boost your bankroll.
                </li>
                <li>You can earn even further by joining BETIDA VIP.</li>
                <li>
                  Best features and your favourite sports events on our upcoming
                  sports calendar.
                </li>
                <li>
                  If you need help with considering more unique forms of
                  betting, such as esports betting, or even political betting,
                  please contact our support team.
                </li>
                <li>
                  Learn more about responsible gaming, please do so responsibly.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                How to Live Stream Major Sports Events for Free
              </h3>
              <p className="text-foreground/55 leading-relaxed">
                At BETIDA, we enjoy sports access to all upcoming sports events,
                and you can watch the live by logging in to your account. If you
                are not in the location, you can place a bet on the match.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Best Bet Bonuses & Promotions in 2025
              </h3>
              <p className="text-foreground/55 leading-relaxed">
                When you use BETIDA Sportsbook, be sure to get a lot of unique
                bonuses to help you get on different sports, helping you bet
                more fun while placing your bets at BETIDA. For more information
                on different randoms, helping you bet more fun while placing
                your bets at BETIDA.
              </p>
              <p className="text-foreground/55 leading-relaxed">
                For loyal players, BETIDA VIP offers exclusive promotions and
                bonuses, personalized support, and access to VIP hosts for any
                questions about this.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Why Bet on Upcoming Sports at betida.com
              </h3>
              <p className="text-foreground/55 leading-relaxed">
                BETIDA is the best place to bet on sports, but also because we
                offer the most comprehensive selection of sports at no extra
                cost of creating an account on all your favourite sports to get
                access to thousands of betting markets on all your favourite
                sports.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-30 ${!isFullExpanded && "bg-gradient-to-t from-background-1 via-background-1 to-transparent"} flex items-end justify-center z-10 pb-6 rounded-b-lg`}
      >
        <Button
          aria-label="see more"
          variant="orangeGradient"
          onClick={toggleFullExpand}
        >
          {isFullExpanded ? "See Less" : "Show More"}
        </Button>
      </div>
    </div>
  );
}

export default SportsDoc;
