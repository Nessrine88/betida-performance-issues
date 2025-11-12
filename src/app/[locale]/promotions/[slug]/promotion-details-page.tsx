"use client";

import { PortableText } from "next-sanity";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { GlobalTable } from "@/app/[locale]/components/global-components/global-table/global-table";
import type { ColumnType } from "@/types/global-table-types";
import CImage from "@/lib/CIdImage";
import { getLocalizedString, type LanguageCode } from "@/lib/helpers/localized-content";
import { Link } from "@/i18n/navigation";
import PromotionsSVG from "@/app/[locale]/components/common/svg_icons/promotions-svg";
import BackSVG from "@/app/[locale]/components/common/svg_icons/back-svg";
import PromotionsCard from "../components/promotions-card";
import { Button } from "../../components/ui/button";
import type { PromotionType } from "@/types/promotions-types";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

function PromotionsDetailsPage({
  promotion,
  relatedPromotions,
  locale,
}: {
  promotion: PromotionType;
  relatedPromotions: PromotionType[];
  locale: LanguageCode;
}) {
  const t = useTranslations("PromotionsDetails");

  if (!promotion) {
    return (
      <div className="app-container py-10 text-center text-foreground">
        {t("notFound")}
      </div>
    );
  }

  const title = getLocalizedString(promotion.title as any, locale) || t("untitled");
  const subtitle = getLocalizedString(promotion.subtitle, locale) || "";
  const howToEnter =
    promotion?.details?.howToEnter?.find((d) => d.language === locale)?.blocks || [];
  const selectedGames =
    promotion?.details?.selectedGames?.find((d) => d.language === locale)?.blocks || [];
  const leaderboardNote =
    promotion?.details?.leaderboardNote?.find((d) => d.language === locale)?.blocks || [];
  const terms =
    promotion?.details?.terms?.find((d) => d.language === locale)?.blocks || [];

  const prizeColumns: ColumnType<{ position: string; prize: string }>[] = [
    {
      key: "position",
      label: t("position"),
      render: (row) => <span>{row.position}</span>,
    },
    {
      key: "prize",
      label: t("prize"),
      align: "right",
      render: (row) => (
        <span>{getLocalizedString(row.prize as any, locale) || t("noPrize")}</span>
      ),
    },
  ];

  const leaderboardColumns: ColumnType<{ position: string; user: string; result: string }>[] =
    [
      { key: "position", label: t("position"), render: (row) => <span>{row.position}</span> },
      { key: "user", label: t("user"), render: (row) => <span>{row.user}</span> },
      { key: "result", label: t("result"), align: "right", render: (row) => <span>{row.result}</span> },
    ];

  return (
    <div className="w-full pb-10 space-y-10">
      <div className="w-full h-full">
        {/* Top header */}
        <div className="bg-background-1 h-fit">
          <div className="app-container font-medium py-4">
            <div className="flex flex-row items-center gap-3 text-foreground">
              <Link
                href={`/promotions?tab=${promotion?.category?.slug}`}
                aria-label={t("backTo", { category: promotion?.category?.slug })}
              >
                <BackSVG />
              </Link>
              <PromotionsSVG />
              {t("promotions")}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="app-container py-6 flex flex-col gap-4">
          <div className="bg-background-1 rounded-lg p-6 max-w-242 w-full mx-auto h-auto flex flex-col gap-6">
            {/* Image */}
            <div className="w-full h-auto relative aspect-video lg:aspect-92/25 flex items-center justify-center bg-muted-foreground rounded-lg">
              <CImage
                publicId={promotion.thumbnail}
                alt={title}
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
                fetchPriority="high"
              />
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && <p className="text-base text-foreground/55">{subtitle}</p>}
            </div>

            {/* How to Enter */}
            <AnimatePresence>
              {howToEnter.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-lg font-semibold text-foreground mb-2">{t("howToEnter")}</h2>
                  <div className="text-foreground/55">
                    <PortableText value={howToEnter} components={portableTextComponents} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Selected Games */}
            <AnimatePresence>
              {selectedGames.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-lg font-semibold text-foreground mb-2">{t("selectedGames")}</h2>
                  <div className="text-foreground/55">
                    <PortableText value={selectedGames} components={portableTextComponents} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Prize Breakdown */}
            {promotion?.details?.prizesBreakdown && (
              <motion.div layout>
                <h2 className="text-lg font-semibold text-foreground mb-2">{t("prizesBreakdown")}</h2>
                <GlobalTable
                  variant="rounded"
                  columns={prizeColumns}
                  data={promotion.details.prizesBreakdown.map((p: any) => ({
                    ...p,
                    prize: getLocalizedString(p.prize, locale) || t("noPrize"),
                  }))}
                  loading={false}
                  emptyMessage={t("noPrizes")}
                  maxHeight={400}
                />
              </motion.div>
            )}

            {/* Leaderboard */}
            {promotion?.details?.leaderboard && (
              <motion.div layout>
                <h2 className="text-lg font-semibold text-foreground mb-2">{t("leaderboard")}</h2>
                <GlobalTable
                  variant="rounded"
                  columns={leaderboardColumns}
                  data={promotion.details.leaderboard}
                  loading={false}
                  emptyMessage={t("noLeaderboard")}
                  maxHeight={400}
                />
                {leaderboardNote.length > 0 && (
                  <div className="text-xs text-foreground/55 mt-2">
                    <PortableText value={leaderboardNote} components={portableTextComponents} />
                  </div>
                )}
              </motion.div>
            )}

            {/* Terms */}
            <AnimatePresence>
              {terms.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-lg font-semibold text-foreground mb-2">{t("terms")}</h2>
                  <div className="text-foreground/55">
                    <PortableText value={terms} components={portableTextComponents} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop CTA */}
            {promotion?.redirectButtonUrl && (
              <div className="hidden md:flex justify-center pt-4">
                <Link href={promotion.redirectButtonUrl}>
                  <Button variant="orangeGradient" size="lg" className="w-full font-semibold">
                    {getLocalizedString(promotion.redirectButtonTitle, locale) || t("joinNow")}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile CTA */}
        {promotion?.redirectButtonUrl && (
          <div className="flex md:hidden justify-center pt-4 fixed w-full z-50 bottom-20 px-6 py-3.5 bg-background-2">
            <Link href={promotion.redirectButtonUrl}>
              <Button variant="orangeGradient" size="lg" className="w-full font-semibold">
                {getLocalizedString(promotion.redirectButtonTitle, locale) || t("joinNow")}
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Related Promotions */}
      <div className="w-full app-container">
        <div>
          <div className="font-semibold text-xl pb-4 border-b border-border mb-4">
            {t("relatedPromotions")}
          </div>

          {relatedPromotions.length > 0 ? (
            <div className="flex flex-row gap-3 overflow-x-auto tab-scrollbar pb-1">
              {relatedPromotions.map((related) => (
                <PromotionsCard
                  key={related._id}
                  card={related}
                  locale={locale}
                  redirect
                  redirectUrl="promotions"
                  className="max-w-48 shrink-0"
                />
              ))}
            </div>
          ) : (
            <p className="text-foreground/55 text-center py-6">{t("noRelatedPromotions")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PromotionsDetailsPage;
