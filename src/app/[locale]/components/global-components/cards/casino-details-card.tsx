import { Link } from "@/i18n/navigation";
import CImage from "@/lib/CIdImage";
import Image from "next/image";
import React from "react";

interface CardData {
  id: number;
  title: string;
  slug: { current: string };
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

interface CasinoDetailsCardProps {
  cardData: CardData;
  priority?: boolean;
}

function CasinoDetailsCard({
  cardData,
  priority = false,
}: CasinoDetailsCardProps) {
  const {
    title,
    slug,
    thumbnail,
    multiplier,
    minBet,
    betCurrency,
    prizeAmount,
    prizeCurrency,
    createdBy,
    createdByImage,
  } = cardData;

  const challengeText = `First to ${multiplier} with min ${minBet}`;

  return (
    <div className="w-full max-w-48 rounded-lg bg-sidebar flex flex-col overflow-hidden">
      <Link prefetch href={`/casino/games/${slug.current}`} className="block">
        <div className="relative aspect-3/2 h-62 w-full overflow-hidden rounded-t-lg">
          {" "}
          {/* 192/128 ≈ 3/2 */}
          <CImage
            publicId={thumbnail}
            alt={title}
            width={187}
            height={250}
            priority={priority}
            fetchPriority={priority ? "high" : "auto"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="text-base text-foreground font-semibold capitalize">
          {title}
        </div>
        <div className="text-xs text-foreground/55 font-normal flex flex-row flex-wrap gap-2">
          {challengeText}{" "}
          <Image
            src={
              betCurrency === "bitcoin"
                ? "/icons/bit-coin-svg.svg"
                : betCurrency === "ethereum"
                  ? "/icons/ethereum-svg.svg"
                  : betCurrency === "usdt"
                    ? "/icons/usdt-svg.svg"
                    : "/icons/binance-svg.svg"
            }
            alt="pointer"
            height={16}
            width={16}
          />{" "}
          bet
        </div>
        <div className="text-xs text-foreground font-semibold">
          Prize:{" "}
          <span className="text-foreground/55 flex flex-wrap gap-1">
            {prizeAmount}{" "}
            <Image
              src={
                prizeCurrency === "bitcoin"
                  ? "/icons/bit-coin-svg.svg"
                  : prizeCurrency === "ethereum"
                    ? "/icons/ethereum-svg.svg"
                    : prizeCurrency === "usdt"
                      ? "/icons/usdt-svg.svg"
                      : "/icons/binance-svg.svg"
              }
              alt="pointer"
              height={16}
              width={16}
            />
          </span>
        </div>
        <div className="text-xs text-foreground mt-auto flex items-center flex-row flex-wrap gap-2">
          Created By:
          {createdByImage && (
            <CImage
              publicId={createdByImage}
              alt=""
              width={12}
              height={12}
              className="w-3 h-3 flex-shrink-0"
            />
          )}
          <span className="text-foreground/55 ">{createdBy}</span>
        </div>
      </div>
    </div>
  );
}

export default CasinoDetailsCard;
