import { fetchStakeDrake } from "@/lib/fetchers/fetch-stake-drake";
import type {
  TSliderItem,
  TStakeDrakeData,
} from "@/lib/fetchers/fetch-stake-drake";
import SliderItem from "./components/slider-item";
import { PortableText } from "next-sanity";
import CImage from "@/lib/CIdImage";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { Link } from "@/i18n/navigation";

export const revalidate = 60;

export default async function StakeDrakePage() {
  let data: TStakeDrakeData | null = null;
  try {
    data = await fetchStakeDrake();
  } catch (error) {
    console.error("Failed to fetch betida Drake data:", error);
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const validSliderItems = data.videoSlider.filter(
    (item) =>
      (item.videoUrl && item.videoUrl.trim() !== "") ||
      (item.image && item.image.trim() !== "")
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background-2 backdrop-blur-sm py-6">
        <div className="app-container px-4 flex items-center justify-center">
          <h1 className="">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Return to home"
            >
              <span>
                <Image
                  src="/logos/logo.webp"
                  alt="Betida logo"
                  width={40}
                  height={40}
                  sizes="40px"
                  loading="lazy"
                  priority={false}
                />
              </span>
              <span className="text-3xl md:text-4xl font-semibold text-foreground flex flex-row flex-nowrap gap-2">
                <span className="hidden lg:block">BETIDA |</span>
                {data.title}
              </span>
            </Link>
          </h1>
        </div>
      </header>

      <section className="py-8 px-4 bg-background">
        <div className="app-container">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground/90">
            {data.journeySection.title}
          </h2>
          <div className="flex overflow-x-auto space-x-4 pb-4 tab-scrollbar scrollbar-track-gray-800 snap-x snap-mandatory">
            {validSliderItems.map((slide: TSliderItem, index: number) => (
              <SliderItem
                key={index}
                videoUrl={slide.videoUrl}
                imageUrl={slide.image}
                alt={slide.alt}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="app-container grid md:grid-cols-2 gap-8 items-start">
          <div className="order-1 md:order-1 space-y-6">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-background-2">
              <CImage
                publicId={data.giveawaysSection.image}
                alt="Drake Giveaways"
                className="object-cover h-full w-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="order-2 md:order-2 space-y-4 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {data.giveawaysSection.title}
              </h3>
              <PortableText
                value={data.giveawaysSection.description}
                components={portableTextComponents}
              />
            </div>
            <div className="text-sm text-foreground/15">
              <p>
                BETIDA & Drake collaborate to create an entirely new gaming &
                sports betting experience.
              </p>
            </div>
          </div>

          <div className="order-3 md:order-3 space-y-4 md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {data.historySection.title}
            </h3>
            <PortableText
              value={data.historySection.description}
              components={{
                block: ({ children }) => (
                  <p className="text-foreground/55 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                list: ({ children }) => (
                  <ul className="list-disc ml-6 text-foreground/55 mb-4">
                    {children}
                  </ul>
                ),
                listItem: ({ children }) => (
                  <li className="mb-2">{children}</li>
                ),
              }}
            />
            <div className="text-sm text-foreground/15 mb-4">
              <p>
                Music sensation Drake has been a long-time member of the BETIDA
                community. A high-betida player storming the high ranks of the
                VIP program...
              </p>
            </div>
          </div>
          <div className="order-4 md:order-4 space-y-6 md:col-span-2 lg:col-span-1">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-background-2">
              <CImage
                publicId={data.historySection.image}
                alt="betida History"
                className="object-cover h-full w-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="app-container pb-10 px-4 bg-background">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          {`Drake's picks`}
        </h3>
        <div className="text-sm text-foreground/55">
          <p>
            {`Explore some of Drake's favourite games and sports to truly entrench
            yourself in Drizzy's playstyle.`}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="flex flex-col gap-4 w-full">
            <CImage
              publicId="Drake_s_Favourite_Roulette"
              alt={`Drake's Favourite Roulette`}
              className="w-full h-39 object-cover rounded-lg border border-foreground/15 hover:scale-105 duration-300"
            />
            <Link
              href="/casino/group/roulette"
              aria-label="Drake's Favourite Roulette"
            >
              <Button
                aria-label="Drake's Favourite Roulette"
                className="w-full"
                variant="orangeGradient"
              >{`Drake's Favourite Roulette`}</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <CImage
              publicId="Drake_s_Favourite_NBA"
              alt="Drake_s_Favourite_NBA"
              className="w-full h-39 object-cover rounded-lg border border-foreground/15 hover:scale-105 duration-300"
            />
            <Link
              prefetch
              href="/sports/basketball?tabName=highRollers&tab=live-and-upcoming"
              aria-label="Drake's Favourite NBA"
            >
              <Button
                aria-label="Drake's Favourite NBA"
                className="w-full"
                variant="orangeGradient"
              >{`Drake's Favourite NBA`}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
