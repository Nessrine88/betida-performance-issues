"use client";
import type { PromotionCard } from "@/types/promotions-types";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import React from "react";

function GameDetailsCard2({
  card,
  redirect,
  redirectUrl,
}: {
  card: PromotionCard;
  redirect?: boolean;
  redirectUrl?: string;
}) {
  const router = useRouter();
  return (
    <div
      className={`w-full lg:max-w-49 flex flex-col justify-between gap-6 rounded-lg bg-background-1 p-4 ${
        redirectUrl && "cursor-pointer"
      }`}
      onClick={() => {
        if (redirect) {
          router.push(`/${redirectUrl}/${card?.slug}`);
        }
      }}
    >
      <div className="flex flex-col gap-2.5">
        <div className="h-25 rounded-lg w-full bg-background-1">
          <Image
            src={card?.thumbnail || "/default.webp"}
            alt={card?.title}
            height={100}
            width={160}
            loading="lazy"
            className="object-cover w-full h-full rounded-sm"
          />
        </div>
        <div className="flex flex-col">
          <div className="title text-base font-semibold text-foreground">
            {card?.title}
          </div>
          <div className="title text-sm font-regular text-foreground/55">
            {card?.subtitle}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="title text-sm font-regular text-foreground/55">
          Ends at
        </div>
        <div className="title text-sm font-regular text-foreground/55">
          {dayjs(card?.endsAt).format("hh:mm a")}{" "}
          {dayjs(card?.endsAt).format("DD/MM/YY")}
        </div>
      </div>
    </div>
  );
}

export default GameDetailsCard2;
