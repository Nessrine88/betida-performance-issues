import { fetchStatisticsModal } from "@/lib/fetchers/statistics-modal";
import { getSystemLanguage } from "@/lib/helpers/localized-content";
import StatisticsModalClient from "./statistic-modal-server";

export default async function StatisticsModal() {
  const langCode = await getSystemLanguage();
  const data = await fetchStatisticsModal();
  
  return <StatisticsModalClient data={data} langCode={langCode} />;
}
