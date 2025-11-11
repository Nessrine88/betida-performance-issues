"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const WhiteArrowSVG = dynamic(
  () => import("../../../components/common/svg_icons/white-arrow-svg"),
  { loading: () => null }
);

interface VipProgressAreaProps {
  progress: number;
}

export const VipProgressArea: React.FC<VipProgressAreaProps> = ({
  progress,
}) => {
  const t = useTranslations("profile");
  const { toggleVipProgressModalOpen } = useSidebarStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleProgressClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("modal", "vip");
    params.set("progress", "overview"); // add tab param first

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
    toggleVipProgressModalOpen(); // open modal after URL is pushed
  };

  return (
    <div className="w-full">
      <button
        aria-label="progress"
        onClick={handleProgressClick}
        className="w-full inline-grid grid-cols-5 text-base group cursor-pointer"
      >
        <span className="col-span-2 group-hover:translate-x-2 transition-all duration-300 text-start">
          {t("title")}
        </span>
        <span className="inline-flex items-center justify-center group-hover:translate-x-2 transition-all duration-300">
          <WhiteArrowSVG className="w-4" />
        </span>
        <span className="text-right col-span-2">{progress.toFixed(1)}%</span>
      </button>
    </div>
  );
};
