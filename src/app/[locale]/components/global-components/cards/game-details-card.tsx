import { Button } from "@/app/[locale]/components/ui/button";
import { Link } from "@/i18n/navigation";
import CImage from "@/lib/CIdImage";
import Image from "next/image";
import React from "react";

function GameDetailsCard({
  type,
  title,
  subTitle,
  href,
  imageUrl,
  imagePublicId,
  playNow,
  priority,
}: {
  type?: string;
  title: string;
  subTitle: string;
  href?: string;
  imageUrl: string;
  imagePublicId?: string;
  playNow?: boolean;
  priority?: boolean;
}) {
  return (
    <div>
      <div className="w-full h-full min-w-[90vw] sm:min-w-98 max-h-fit sm:max-h-47 rounded-lg bg-sidebar p-6 flex flex-row gap-3 justify-between items-center">
        <div className="left flex flex-col justify-between h-full min-h-35">
          <div className="flex flex-col gap-3">
            {type && (
              <div className="capitalize badge px-2 py-1 rounded-full bg-foreground/15 text-xs w-fit font-normal text-foreground">
                {type}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div className="capitalize text-base text-foreground font-semibold">
                {title || "unknown"}
              </div>
              <div className="capitalize text-sm text-foreground-muted font-normal">
                {subTitle || "unknown"}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-3">
            {playNow && (
              <Button aria-label="play now" variant="outline" className="bg-background text-nowrap">
                Play Now
              </Button>
            )}{" "}
            {href && (
              <Link href={`${href}`} aria-label={`redirect to ${title} to read more about ${title}`}>
                <span className="text-foreground font-semibold text-md text-nowrap">
                  Read More
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="right rounded-lg h-full w-full max-h-35 max-w-35">
          {imagePublicId ? (
            <CImage
              publicId={imagePublicId}
              alt={title}
              width={140}
              height={140}
              priority={priority}
              fetchPriority={priority ? "high" : "auto"}
              className="object-cover rounded-lg"
            />
          ) : (
            <Image
              src={imageUrl}
              alt={title}
              height={140}
              width={140}
              priority={priority}
              fetchPriority={priority ? "high" : "auto"}
              placeholder="blur"
              blurDataURL="/default.webp"
              className="object-cover rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GameDetailsCard;
