"use client";

import { useState } from "react";
import { ChevronRight, Link } from "lucide-react";
import { cn } from "@/lib/utils";
import RewardCard from "./reward-card";
import { Button } from "@/app/[locale]/components/ui/button";

export type Reward = {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
};
export default function NextLevelRewardsSection() {
  const [activeTab, setActiveTab] = useState<"rewards" | "how">("rewards");
  const rewards: Reward[] = [
    {
      id: "cashback",
      title: "1.1% Cashback",
      description: "Receive Cashback every Monday at 12:00 UTC",
      icon: "1.1_cashback_r8q2yv",
    },
    {
      id: "freespins",
      title: "Up to $5 in Free Spins or Bets",
      description: "Get your choice of Casino or Sportsbook Bonuses",
      icon: "Free_Spins_or_Bets_etttym",
    },
  ];

  return (
    <section className="app-container py-12 md:py-16">
      {/* ---- Tabs with gradient underline ---- */}
      <div className="relative flex border-b border-background-3 mb-8 md:max-w-3xl md:mx-auto">
        {(["rewards", "how"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={cn(
              "relative flex-1 py-3 text-sm font-medium transition-all duration-300",
              activeTab === t
                ? "text-foreground"
                : "text-foreground/55 hover:text-foreground"
            )}
            aria-label={t === "rewards" ? "Your Rewards" : "How It Works"}
          >
            {t === "rewards" ? "Your Rewards" : "How It Works"}
            {activeTab === t && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-t from-orange-1 to-yellow-1" />
            )}
          </button>
        ))}
      </div>

      {/* ---- Content (only “Your Rewards” is shown in the mock) ---- */}
      {activeTab === "rewards" ? (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center text-foreground">
            Next Level Rewards
          </h2>

          <div className="space-y-6">
            {rewards.map((r) => (
              <RewardCard key={r.id} reward={r} />
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="orangeGradient" size='large' aria-label="View All Rewards">
              View All Rewards
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-center text-sm text-foreground/55">
            Learn more about Rivalry VIP Program’s general{" "}
            <Link href="#" className="underline text-orange-1 hover:text-primary">
              Terms and Conditions
            </Link>
          </p>
        </div>
      ) : (
        <div className="text-center py-12 text-foreground/55">
          <p className="text-lg">How It Works section coming soon…</p>
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------
   Reward Card – reusable, responsive
   ------------------------------------------------- */
