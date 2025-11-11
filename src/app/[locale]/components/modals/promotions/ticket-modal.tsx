import { fetchRacesAndRaffles } from "@/lib/fetchers/races-raffles";
import TicketModalClient from "./ticket-modal-client";

export default async function TicketModal() {
  const racesData = await fetchRacesAndRaffles();
  const ticketData = racesData?.weeklyRaffle?.ticketData || null;

  return <TicketModalClient data={ticketData}  />;
}
