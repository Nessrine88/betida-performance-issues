"use client";

import React from "react";
import Link from "next/link";
import CImage from "@/lib/CIdImage";
import { useSidebarStore } from "@/store/sidebar-store";
import PlayerStatus from "@/app/[locale]/components/global-components/player-status";

interface ProviderCardProps {
    name: string;
    img: string;
    players: number;
    index: number;
}

const ProviderCard: React.FC<ProviderCardProps> = ({
    name,
    img,
    players,
    index,
}) => {
    const { setRouteLoading } = useSidebarStore();
    return (
        <Link
            prefetch
            href={`/casino/group/${name}`}
            onClick={()=>{setRouteLoading(true)}}
            className="group"
            aria-label={`Go to ${name} provider page`}
        >
            <div className="flex flex-col gap-2">
                <div className="h-15 w-full min-w-35 rounded-lg bg-sidebar overflow-hidden">
                    <CImage
                        publicId={img}
                        alt={name}
                        height={60}
                        width={143}
                        className="rounded-lg object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
                        priority={index < 8}
                    />
                </div>
                <PlayerStatus players={players} />
            </div>
        </Link>
    );
};

export default ProviderCard;
