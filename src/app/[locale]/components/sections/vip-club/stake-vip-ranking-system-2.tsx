import CImage from "@/lib/CIdImage";
import type { VipRankingLevel2 } from "@/types/vipClub";
import dynamic from "next/dynamic";

const RankingIcon = dynamic(
  () =>
    import("@/app/[locale]/components/common/svg_icons/level-icons/ranking-icon-svg"),
  { loading: () => null }
);

const iconMap: Record<string, any> = {
  "boost-icon-svg": dynamic(
    () =>
      import("@/app/[locale]/components/common/svg_icons/level-icons/ranking-icon-svg"),
    {
      loading: () => null,
    }
  ),
  "dedicated-host-icon-svg": dynamic(
    () =>
      import("@/app/[locale]/components/common/svg_icons/level-icons/ranking-icon-svg"),
    { loading: () => null }
  ),
  "recent-play-icon-svg": dynamic(
    () =>
      import("@/app/[locale]/components/common/svg_icons/level-icons/ranking-icon-svg"),
    { loading: () => null }
  ),
  "level-ups-icon-svg": dynamic(
    () =>
      import("@/app/[locale]/components/common/svg_icons/level-icons/ranking-icon-svg"),
    { loading: () => null }
  ),
  "bespoke-benefits-icon-svg": dynamic(
    () =>
      import("@/app/[locale]/components/common/svg_icons/level-icons/ranking-icon-svg"),
    { loading: () => null }
  ),
};

export interface AdvantageData {
  id: number;
  iconPublicId: string | null;
  title: string;
  details: string;
}

interface Props {
  data: VipRankingLevel2;
}

const StakeVipRankingSystem2: React.FC<Props> = ({ data }) => {
  const localizedTitle = data.title[0]?.value || "";

  const localizedAdvantages: AdvantageData[] = data.advantages.map(
    (adv: any) => ({
      id: adv.id,
      iconPublicId: adv.iconPublicId || null,
      title: adv.title[0]?.value || "",
      details: adv.details[0]?.value || "",
    })
  );

  return (
    <div className="text-foreground w-full space-y-6">
      <h2 className="text-center text-foreground/55 font-semibold text-xl">
        {localizedTitle}
      </h2>

      <div className="w-full bg-background-1 rounded-lg p-6 lg:p-7 2xl:p-8 overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-2 items-center xl:items-start gap-4 lg:gap-8">
          {localizedAdvantages.map((item) => {
            let IconComponent = RankingIcon;

            if (item.iconPublicId) {
              const CImageIcon: React.FC = () => (
                <CImage
                  publicId={item.iconPublicId || "pointer-svg_xrl2ka"}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                  priority
                  fetchPriority="high"
                />
              );
              CImageIcon.displayName = "CImageIcon";
              IconComponent = CImageIcon;
            } else {
              const mappedIcon = iconMap["ranking-icon-svg"];
              if (mappedIcon) {
                IconComponent = mappedIcon;
              }
            }

            return (
              <div
                key={item.id}
                className="inline-flex items-center space-x-4 w-full text-left transition-all duration-300"
              >
                <span className="size-20 rounded-lg shrink-0 inline-flex items-center justify-center bg-background">
                  <IconComponent />
                </span>
                <span className="gap-y-2 inline-flex flex-col">
                  <span className="text-xl font-semibold">{item.title}</span>
                  <span className="text-sm text-foreground/55">{item.details}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StakeVipRankingSystem2;
