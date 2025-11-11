import { client } from "@/lib/sanity";

export type InternationalizedString = {
  _key: string;
  value: string;
};

export interface InternationalizedContent {
  language: string;
  blocks: any[]; // PortableText blocks
}

export interface FilterOption {
  label: InternationalizedString[];
  value: string;
}

export interface Stat {
  label: InternationalizedString[];
  value: string;
}

export interface StatsData {
  all: Stat[];
  casino: Stat[];
  sports: Stat[];
}

export interface UserInfo {
  username: InternationalizedString[];
  joinDate: InternationalizedString[];
}

export interface StatisticsModalData {
  _id: string;
  type: string;
  title: InternationalizedString[];
  userInfo: UserInfo;
  filters: {
    typeOptions: FilterOption[];
    currencyOptions: FilterOption[];
  };
  stats: StatsData;
  buttonText: InternationalizedString[];
}

export const fetchStatisticsModal =
  async (): Promise<StatisticsModalData | null> => {
    const query = `*[_type == "statisticsModal"][0] {
    _id,
    type,
    title,
    userInfo {
      username,
      joinDate
    },
    filters {
      typeOptions[] {
        label,
        value
      },
      currencyOptions[] {
        label,
        value
      }
    },
    stats {
      all[] {
        label,
        value
      },
      casino[] {
        label,
        value
      },
      sports[] {
        label,
        value
      }
    },
    buttonText
  }`;

    try {
      return await client.fetch(query);
    } catch (error) {
      console.error("Error fetching statistics modal data:", error);
      return null;
    }
  };
