"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/app/[locale]/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { type LanguageCode } from "@/lib/helpers/localized-content";
import PromotionsCard from "./promotions-card";
import type { PromotionType } from "@/types/promotions-types";

function AllPromotions({
  data,
  locale,
}: {
  data: PromotionType[];
  locale: LanguageCode;
}) {
  const t = useTranslations("PromotionsPage");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(12);

  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerPage(4);
      } else if (width < 1024) {
        setCardsPerPage(8);
      } else if (width < 1280) {
        setCardsPerPage(10);
      } else {
        setCardsPerPage(12);
      }
    };
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const totalPages = Math.ceil(data.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (data?.length === 0) {
    return (
      <div className="text-center py-6 border border-border">
        <div className="size-24 bg-background flex items-center justify-center rounded-lg mx-auto border">
          <X className="text-white/55 size-12" />
        </div>
        <p className="pt-5">{t("noData")}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-auto">
      {/* Cards Grid */}
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {currentData.map((item, index) => (
          <PromotionsCard
            key={item._id}
            card={item}
            locale={locale}
            redirect
            redirectUrl="promotions"
            priority={index === 0}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {data?.length > 0 && (
        <div className="flex items-center justify-end gap-4 mt-6">
          <span className="text-sm text-foreground-muted">
            {t("pageOf", { current: currentPage, total: totalPages })}
          </span>
          <Button
            aria-label={t("prevPage")}
            variant="outline"
            className={`size-6 p-0.5 rounded-sm border ${
              currentPage > 1
                ? "border-foreground text-foreground bg-foreground/10 hover:bg-foreground/20"
                : "border-foreground-muted text-foreground-muted bg-transparent"
            } flex items-center justify-center`}
            disabled={currentPage === 1}
            onClick={handlePrev}
          >
            <ChevronLeft
              className={`size-6 ${
                currentPage > 1 ? "text-foreground" : "text-muted-foreground"
              }`}
            />
            <span className="sr-only">{t("prevPage")}</span>
          </Button>

          <Button
            aria-label={t("nextPage")}
            variant="outline"
            className={`size-6 p-0.5 rounded-sm border ${
              currentPage < totalPages
                ? "border-foreground text-foreground bg-foreground/10 hover:bg-foreground/20"
                : "border-foreground-muted text-foreground-muted bg-transparent"
            } flex items-center justify-center`}
            disabled={currentPage === totalPages}
            onClick={handleNext}
          >
            <ChevronRight
              className={`size-6 ${
                currentPage < totalPages
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            />
            <span className="sr-only">{t("nextPage")}</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default AllPromotions;
