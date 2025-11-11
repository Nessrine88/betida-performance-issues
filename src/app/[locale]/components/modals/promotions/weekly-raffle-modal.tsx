import { getSystemLanguage } from "@/lib/helpers/localized-content";
import { fetchRacesAndRaffles } from "@/lib/fetchers/races-raffles";
import WeeklyRaffleModalClient from "./weekly-raffle-modal-client";

export default async function WeeklyRaffleModal() {
  const langCode = await getSystemLanguage();
  const racesData = await fetchRacesAndRaffles();
  const weeklyRaffleData = racesData?.weeklyRaffle || null;

  return (
    <WeeklyRaffleModalClient data={weeklyRaffleData} langCode={langCode} />
  );
}
