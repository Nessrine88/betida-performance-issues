import { client } from "@/lib/sanity";

export type InternationalizedString = {
  _key: string;
  value: string;
};

export interface InternationalizedContent {
  language: string;
  blocks: any[]; // PortableText blocks
}

export interface Timer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  storageKey: string;
}

export interface Link {
  url: string;
  text: string;
}

export interface User {
  position: number;
  currentPrize: string;
  wagered: number;
}

export interface Ticket {
  id: string;
  date: string;
  status: string;
}

export interface TicketSummary {
  totalEntries: number;
  nextDraw: Timer;
}

export interface EmptyState {
  message: InternationalizedString[];
  buttonText: InternationalizedString[];
}

export interface TicketData {
  tickets: Ticket[];
  ticketSummary: TicketSummary;
  emptyState: EmptyState;
}

export interface HundredRace {
  title: InternationalizedString[];
  description: InternationalizedContent[];
  modalDescription: InternationalizedContent[];
  goalAmount: number;
  user: User;
  timer: Timer;
}

export interface WeeklyRaffle {
  title: InternationalizedString[];
  description: InternationalizedContent[];
  modalDescription: InternationalizedContent[];
  ticketData: TicketData;
  goalAmount: number;
  ticketProgress: number;
  entries: number;
  timer: Timer;
  link: Link;
  buttonText: InternationalizedString[];
}

export interface RacesRaffles {
  _id: string;
  type: string;
  hundredRace: HundredRace;
  weeklyRaffle: WeeklyRaffle;
}

export const fetchRacesAndRaffles = async (): Promise<RacesRaffles | null> => {
  const query = `*[_type == "racesRaffles"][0] {
    _id,
    type,
    hundredRace {
      title,
      description[] {
        language,
        blocks
      },
      modalDescription[] {
        language,
        blocks
      },
      goalAmount,
      user {
        position,
        currentPrize,
        wagered
      },
      timer {
        days,
        hours,
        minutes,
        seconds,
        storageKey
      }
    },
    weeklyRaffle {
      title,
      description[] {
        language,
        blocks
      },
      modalDescription[] {
        language,
        blocks
      },
      ticketData {
        tickets[] {
          id,
          date,
          status
        },
        ticketSummary {
          totalEntries,
          nextDraw {
            days,
            hours,
            minutes,
            seconds,
            storageKey
          }
        },
      },
      goalAmount,
      ticketProgress,
      entries,
      timer {
        days,
        hours,
        minutes,
        seconds,
        storageKey
      },
      link {
        url,
        text
      },
      buttonText
    }
  }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching races and raffles:", error);
    return null;
  }
};

export const fetchTicketData = async (): Promise<TicketData | null> => {
  const query = `*[_type == "racesRaffles"][0].weeklyRaffle.ticketData {
    tickets[] {
      id,
      date,
      status
    },
    ticketSummary {
      totalEntries,
      nextDraw {
        days,
        hours,
        minutes,
        seconds,
        storageKey
      }
    },
    emptyState {
      message,
      buttonText
    }
  }`;

  try {
    const result = await client.fetch(query);
    return result || null;
  } catch (error) {
    console.error("Error fetching ticket data:", error);
    return null;
  }
};
