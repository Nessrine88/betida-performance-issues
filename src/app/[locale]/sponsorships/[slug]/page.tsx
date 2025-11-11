import {
  fetchSponsorshipBySlug,
  type SponsorshipData,
} from "@/lib/fetchers/fetch-sponsorship";
import { PortableText } from "next-sanity";
import CImage from "@/lib/CIdImage";
import { Button } from "@/app/[locale]/components/ui/button";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import RedirectIcon from "@/app/[locale]/components/common/svg_icons/player-controls/redirect-icon";
import YouTubeEmbed from "@/app/[locale]/components/youtube-embaded";
import { getLocale, getTranslations } from "next-intl/server";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { Link } from "@/i18n/navigation";

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

export default async function SponsorshipPage({ params }: Props) {
  const t = await getTranslations("SponsorshipPage");
  const locale = (await getLocale()) as LanguageCode;

  let data: SponsorshipData | null = null;
  try {
    data = await fetchSponsorshipBySlug(params.slug);
  } catch (error) {
    console.error("Failed to fetch Sponsorship data:", error);
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>{t("loading")}</p>
      </div>
    );
  }

  const title = getLocalizedString(data.title, locale);
  const subtitle = getLocalizedString(data.subtitle, locale);
  const footerTitle = getLocalizedString(data.footerTitle, locale);
  const buttonText = getLocalizedString(data.buttonText, locale);

  const getSectionBlocks = (section: typeof data.section1) => {
    return section.text.find((tx) => tx.language === locale)?.blocks || [];
  };

  const renderSection = (section: typeof data.section1, index: number) => {
    const blocks = getSectionBlocks(section);
    if (!blocks.length) {
      return null;
    }

    return (
      <section key={index} className="py-10 px-4 bg-background">
        <div className="app-container grid md:grid-cols-2 gap-8 items-start">
          <div
            className={`order-${index === 1 ? 1 : 1} md:order-${index === 1 ? 1 : 2} space-y-4 md:space-y-6`}
          >
            <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-background-2">
              <CImage
                publicId={section.thumbnail}
                alt={`${title} Section ${index}`}
                className="object-cover h-full w-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div
            className={`order-${index === 1 ? 2 : 1} md:order-${index === 1 ? 2 : 1} space-y-4 flex flex-col h-full`}
          >
            <PortableText value={blocks} components={portableTextComponents} />
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background-2 backdrop-blur-sm py-4 md:py-6">
        <div className="app-container px-4 flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-foreground text-3xl lg:text-5xl font-semibold">
              {title}
            </h1>
            {subtitle && (
              <h2 className="text-foreground/55 text-xl">{subtitle}</h2>
            )}
          </div>
          {data.logo && (
            <div className="w-fit h-48">
              <CImage
                publicId={data.logo}
                alt={title}
                className="object-contain h-full w-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </header>

      {/* Section 1 */}
      {renderSection(data.section1, 1)}

      {/* Section 2 */}
      {renderSection(data.section2, 2)}

      {/* YouTube Embed */}
      {data.youtubeEmbed && (
        <section className="py-8 px-4 bg-background">
          <div className="app-container">
            <YouTubeEmbed embedCode={data.youtubeEmbed} />
          </div>
        </section>
      )}

      {/* Footer CTA */}
      {footerTitle && data.redirectUrl && buttonText && (
        <section className="py-6 px-4 bg-background-3 mb-6">
          <div className="app-container text-center space-y-4 flex flex-col md:flex-row items-center gap-3 md:gap-6 justify-center md:justify-between">
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground/55 mb-3">
              {footerTitle}
            </h3>
            <Link href={data.redirectUrl} aria-label={t("seeDetails")}>
              <Button variant="orangeGradient">
                {buttonText}
                <RedirectIcon />
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
