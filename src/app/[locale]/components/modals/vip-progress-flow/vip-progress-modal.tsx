import { fetchVipClub } from "@/lib/fetchers/vip-club";
import VipProgressModalClient from "./vip-progress-modal-client";

export default async function VipProgressModal() {
  const vipData = await fetchVipClub();
  const modalData = vipData?.modalData;

  if (!modalData) {
    return <div>Error loading VIP modal data.</div>;
  }

  return <VipProgressModalClient data={modalData} />;
}
