import { getSystemLanguage } from "@/lib/helpers/localized-content";
import { fetchRacesAndRaffles } from "@/lib/fetchers/races-raffles";
import HundredRaceModalClient from "./hundred-race-modal-client";

export default async function HundredRaceModal() {
  const langCode = await getSystemLanguage();
  const racesData = await fetchRacesAndRaffles();
  const hundredRaceData = racesData?.hundredRace || null;

  return <HundredRaceModalClient data={hundredRaceData} langCode={langCode} />;
}
