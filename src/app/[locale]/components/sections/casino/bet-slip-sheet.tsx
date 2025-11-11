"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/[locale]/components/ui/sheet";
import { Button } from "@/app/[locale]/components/ui/button";
import { TicketsPlane, X } from "lucide-react";
import SettingsIconSvg from "@/app/[locale]/components/common/svg_icons/settings-icon-svg";
import Image from "next/image";
import CImage from "@/lib/CIdImage";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BetSlipSettingsModal from "./bet-slip-settings-modal";
import { GlobalAccordion } from "@/app/[locale]/components/global-components/global-accordion";
import GlobalTooltip from "@/app/[locale]/components/global-components/global-tooltip";

interface BetSlipSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AccordionData {
  title: React.ReactNode;
  content: React.ReactNode;
}

export default function BetSlipSheet({
  open,
  onOpenChange,
}: BetSlipSheetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hasBets, setHasBets] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const settings = searchParams.get("settings") === "true";
    setIsSettingsOpen(settings);
  }, [searchParams]);

  const handleClearBets = () => {
    setHasBets(false);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const accordionData: AccordionData[] = [
    {
      title: (
        <p className="text-foreground flex flex-row items-center gap-3 justify-between">
          Multiple Bet
        </p>
      ),
      content: (
        <CImage
          publicId="multiple_bet_e3s0gq"
          alt="multiple bets"
          priority
          fetchPriority="high"
          className="w-full object-cover rounded-lg"
        />
      ),
    },
    {
      title: (
        <p className="text-foreground flex flex-row items-center gap-3 justify-between">
          Single Bet
        </p>
      ),
      content: (
        <CImage
          publicId="single_bet_hesnwn"
          alt="Single bets"
          priority
          fetchPriority="high"
          className="w-full object-cover rounded-lg"
        />
      ),
    },
    {
      title: (
        <p className="text-foreground flex flex-row items-center gap-3 justify-between">
          Repeat Bet
        </p>
      ),
      content: (
        <CImage
          publicId="repeat_bet_nqzeaf"
          alt="repeat bets"
          priority
          fetchPriority="high"
          className="w-full object-cover rounded-lg"
        />
      ),
    },
  ];

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-[400px] sm:w-[540px] p-0 bg-background-2 gap-0">
          <SheetHeader className="p-4 border-b border-foreground/20">
            <SheetTitle className="text-foreground flex items-center justify-between gap-2">
              <div className="flex flex-row items-center gap-2 text-xl">
                <TicketsPlane /> Bet Slip ({accordionData?.length || 0}){" "}
                <GlobalTooltip
                  tooltip={isCollapsed ? "Expand all" : "Collapse all"}
                >
                  <div
                    onClick={handleToggleCollapse}
                    className="text-xs text-foreground/55 duration-300 cursor-pointer"
                    style={{
                      transform: isCollapsed
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    ▼
                  </div>
                </GlobalTooltip>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Button
                  aria-label="settings"
                  variant="ghost"
                  onClick={() => {
                    setIsSettingsOpen(true);
                    const current = new URLSearchParams(
                      searchParams.toString()
                    );
                    current.set("settings", "true");
                    router.push(`?${current.toString()}`);
                  }}
                  className="cursor-pointer !p-0 hover:bg-transparent"
                >
                  <SettingsIconSvg />
                </Button>
                <SheetClose asChild>
                  <X
                    size={24}
                    className="border border-foreground-muted rounded-full p-1 mb-1 cursor-pointer"
                  />
                </SheetClose>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto p-2 bg-background">
            {hasBets ? (
              <GlobalAccordion
                data={accordionData}
                defaultOpen={!isCollapsed}
                key={`accordion-${isCollapsed}`}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <TicketsPlane size={48} className="text-foreground/55 mb-4" />
                <p className="text-foreground/55 text-sm mb-2">
                  Your bet slip is empty
                </p>
                <p className="text-foreground/55 text-xs">
                  Start adding bets to see them here
                </p>
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col gap-3 bg-background-3">
            <div className="p flex flex-row items-center gap-4 justify-between flex-wrap">
              <span className="text-foreground text-sm">Total BETIDA</span>
              <span className="text-sm text-foreground/55 flex flex-row items-center gap-1">
                0.0000000
                <Image
                  src="/icons/bit-coin-svg.svg"
                  alt="pointer"
                  height={16}
                  width={16}
                />
              </span>
            </div>
            <div className="p flex flex-row items-center gap-4 justify-between flex-wrap">
              <span className="text-foreground text-sm">Est. Payout</span>
              <span className="text-sm text-foreground/55 flex flex-row items-center gap-1">
                0.0000000
                <Image
                  src="/icons/bit-coin-svg.svg"
                  alt="pointer"
                  height={16}
                  width={16}
                />
              </span>
            </div>
            <div className="flex flex-row items-center gap-3 w-full">
              <Button
                aria-label="clear"
                variant="gray"
                className="w-full"
                onClick={handleClearBets}
              >
                Clear Bets
              </Button>
              <Button
                aria-label="place bet"
                variant="orangeGradient"
                className="w-full"
                disabled={!hasBets}
              >
                Place Bet
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <BetSlipSettingsModal
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </>
  );
}
