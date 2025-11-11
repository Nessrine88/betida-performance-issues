// components/modals/vip-progress-modal-client.tsx
"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { GlobalTabs } from "../../global-components/GlobalTabs";
import type { TabProps } from "../../global-components/GlobalTabs";
import GlobalModal from "../../global-components/global-modal/global-modal";
import { useSidebarStore } from "@/store/sidebar-store";
import { Suspense } from "react";
import OverviewContent from "./overview-content";
import RewardContent from "./reward-content";
import type { ModalData } from "@/types/vipClub";
import TabLoader from "@/app/[locale]/tab-loader";

interface Props {
  data: ModalData;
}

export default function VipProgressModalClient({ data }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const { vipProgressModalOpen, toggleVipProgressModalOpen } =
    useSidebarStore();

  const activeTab = searchParams.get("progress") || "overview";
  const tabs: TabProps[] = [
    { value: "overview", label: "Overview" },
    { value: "reward", label: "Rewards" },
  ];

  let content;
  switch (activeTab) {
    case "overview":
      content = (
        <Suspense
          fallback={
            <div className="h-96 bg-background-2 animate-pulse rounded-lg" />
          }
        >
          <OverviewContent data={data.overview} />
        </Suspense>
      );
      break;
    case "reward":
      content = (
        <Suspense
          fallback={
            <div className="h-96 bg-background-2 animate-pulse rounded-lg" />
          }
        >
          <RewardContent data={data.reward} />
        </Suspense>
      );
      break;
    default:
      content = (
        <Suspense
          fallback={
            <div className="h-96 bg-background-2 animate-pulse rounded-lg" />
          }
        >
          <OverviewContent data={data.overview} />
        </Suspense>
      );
  }

  const handleClose = () => {
    toggleVipProgressModalOpen();
    router.push(pathName);
  };

  return (
    <GlobalModal
      open={vipProgressModalOpen}
      onOpenChange={handleClose}
      className="min-h-60"
      title={<div className="text-lg font-semibold text-foreground">VIP</div>}
    >
      <GlobalTabs tabButtonFull data={tabs} tabName="progress" />
      <div className="relative w-full overflow-hidden rounded-lg">
        <TabLoader/>
        {content}
      </div>
    </GlobalModal>
  );
}
