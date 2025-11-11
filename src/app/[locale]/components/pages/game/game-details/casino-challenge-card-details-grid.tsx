"use client";
import { Button } from "@/app/[locale]/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CasinoDetailsCard from "@/app/[locale]/components/global-components/cards/casino-details-card";

export interface ChallengeSlot {
  id: number;
  title: string;
  slug: { current: string };
  provider: string;
  thumbnail: string;
  multiplier: string;
  minBet: string;
  betCurrency: string;
  prizeAmount: string;
  prizeCurrency: string;
  createdBy: string;
  createdByImage?: string;
  category: string;
}

interface ChallengesData {
  category: string;
  data: ChallengeSlot[];
}

interface GridProps {
  challengesData: ChallengesData[];
}

const CasinoChallengeCardDetailsGrid: React.FC<GridProps> = memo(
  ({ challengesData }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [cardsPerPage, setCardsPerPage] = useState<number>(12);

    const searchParams = useSearchParams();
    const category = searchParams.get("challengeTab") || "active";

    const categoryData = challengesData.find((cd) => cd.category === category);
    const filteredData = categoryData ? categoryData.data : [];

    useEffect(() => {
      setCurrentPage(1);
    }, [category]);

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      const updateCardsPerPage = (): void => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const width = window?.innerWidth ?? 0;
          if (width < 640) {
            setCardsPerPage(4);
          } else if (width < 1024) {
            setCardsPerPage(10);
          } else if (width < 1280) {
            setCardsPerPage(12);
          } else {
            setCardsPerPage(14);
          }
        }, 100);
      };

      updateCardsPerPage();
      window?.addEventListener("resize", updateCardsPerPage);
      return () => {
        window?.removeEventListener("resize", updateCardsPerPage);
        clearTimeout(timeoutId);
      };
    }, []);

    const totalPages = Math.ceil((filteredData.length ?? 0) / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const handlePrev = useCallback((): void => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }, []);

    const handleNext = useCallback((): void => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }, [totalPages]);

    const getNoDataMessage = () => {
      switch (category) {
        case "active":
          return "No active challenges found";
        case "all-claimed":
          return "No all claimed challenges found";
        case "my-claimed":
          return "No my claimed challenges found";
        default:
          return "No challenges found";
      }
    };

    if (filteredData.length === 0) {
      return (
        <div className="text-center py-6 border border-border">
          <div className="size-24 bg-background flex items-center justify-center rounded-lg mx-auto border">
            <X className="text-white/55 size-12" />
          </div>
          <p className="pt-5">{getNoDataMessage()}</p>
        </div>
      );
    }


    return (
      <div className="w-full h-auto">
        <div
          className="
          grid gap-4
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-6
        "
        >
          {currentData.map((item, index) => (
            <div key={item.id ?? index} className="flex justify-center w-full">
              <CasinoDetailsCard
                cardData={item}
                priority={index < 4}
              />
            </div>
          ))}
        </div>

        {filteredData.length > cardsPerPage && (
          <div className="flex items-center justify-end gap-4 mt-6">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              aria-label="previous"
              variant="outline"
              className={`
              size-6 p-0.5 rounded-sm border
              ${currentPage > 1
                  ? "border-foreground text-foreground bg-foreground/10 hover:bg-foreground/20"
                  : "border-muted text-muted-foreground bg-transparent"
                }
              flex items-center justify-center
            `}
              disabled={currentPage === 1}
              onClick={handlePrev}
            >
              <ChevronLeft
                className={`size-6 ${currentPage > 1 ? "text-foreground" : "text-muted-foreground"
                  }`}
              />
              <span className="sr-only">Previous Page</span>
            </Button>

            <Button
              aria-label="next"
              variant="outline"
              className={`
              size-6 p-0.5 rounded-sm border
              ${currentPage < totalPages
                  ? "border-foreground text-foreground bg-foreground/10 hover:bg-foreground/20"
                  : "border-muted text-muted-foreground bg-transparent"
                }
              flex items-center justify-center
            `}
              disabled={currentPage === totalPages}
              onClick={handleNext}
            >
              <ChevronRight
                className={`size-6 ${currentPage < totalPages
                    ? "text-foreground"
                    : "text-muted-foreground"
                  }`}
              />
              <span className="sr-only">Next Page</span>
            </Button>
          </div>
        )}
      </div>
    );
  }
);

CasinoChallengeCardDetailsGrid.displayName = "CasinoChallengeCardDetailsGrid";

export default CasinoChallengeCardDetailsGrid;
