// app/[locale]/components/sections/home/hero-section.tsx
import { Suspense } from "react";
import CImage from "@/lib/CIdImage";
import { Link } from "@/i18n/navigation";
import ProfileInfo from "@/app/[locale]/components/common/profile-info/profile-info";
import PlayerStatus from "@/app/[locale]/components/global-components/player-status";

// Preload LCP image in <head>
const HeroImagePreload = ({ publicId }: { publicId: string }) => (
  <>
    <link
      rel="preload"
      as="image"
      href={`https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_auto,q_auto/${publicId}`}
      fetchPriority="high"
    />
    <link
      rel="preload"
      as="image"
      href={`https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_avif,q_auto/${publicId}`}
      type="image/avif"
    />
    <link
      rel="preload"
      as="image"
      href={`https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_webp,q_auto/${publicId}`}
      type="image/webp"
    />
  </>
);

interface IType {
  title: string;
  url: string;
  imagePublicId: string;
  players: number;
}

// Skeleton to prevent CLS
const ProfileSkeleton = () => (
  <div className="space-y-3 animate-pulse">
    <div className="h-8 w-32 bg-gray-700 rounded" />
    <div className="h-5 w-24 bg-gray-700 rounded" />
    <div className="h-10 w-full bg-gray-700 rounded-lg" />
  </div>
);

export default function HeroSection({ types }: { types: IType[] }) {
  const lcpImage = types[0]?.imagePublicId;

  return (
    <>
      {/* Preload LCP image */}
      {lcpImage && <HeroImagePreload publicId={lcpImage} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
        {/* User Info */}
        <div className="w-full col-span-1 sm:col-span-2 lg:col-span-1 text-white place-content-center">
          <Suspense fallback={<ProfileSkeleton />}>
            <ProfileInfo />
          </Suspense>
        </div>

        {/* Types Grid */}
        <div className="grid grid-cols-2 sm:col-span-2 gap-4 lg:gap-8 xl:gap-12">
          {types.map((type: IType, index: number) => (
            <div
              key={index}
              className="w-full transition-all duration-300 hover:-translate-y-1"
            >
              <Link
                href={type.url}
                aria-label={type?.title}
                className="relative w-full h-full space-y-2 block"
              >
                <span
                  className={`w-full bg-secondary rounded-lg overflow-hidden border border-transparent inline-block
                    aspect-366/284 hover:border-chart-${type.title === "Casino" ? "1" : "2"} duration-300`}
                >
                  <CImage
                    publicId={type.imagePublicId}
                    alt={`${type.title} type`}
                    width={648}
                    height={356}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover"
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                </span>

                <span className="text-white w-full inline-flex items-center justify-between">
                  <span className="text-sm font-semibold">{type.title}</span>
                  <Suspense
                    fallback={
                      <div className="h-5 w-12 bg-gray-700 rounded animate-pulse" />
                    }
                  >
                    <PlayerStatus players={type.players} />
                  </Suspense>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}