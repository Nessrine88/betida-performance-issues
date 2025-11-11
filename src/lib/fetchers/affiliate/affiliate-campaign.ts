import { client } from "@/lib/sanity";

export type InternationalizedString = {
  _key: string;
  value: string;
};

export interface Campaign {
  _id: string;
  name: InternationalizedString[];
  value: string;
  createdDate: string;
  hits: number;
  referredUsers: number;
  firstTimeDeposits: number;
  totalDeposits: number;
  commissionRate: string;
  overallCommission: string;
  availableCommission: InternationalizedString[];
  campaignLink: string;
}

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const query = `*[_type == "campaign"] {
    _id,
    name,
    value,
    createdDate,
    hits,
    referredUsers,
    firstTimeDeposits,
    totalDeposits,
    commissionRate,
    overallCommission,
    availableCommission,
    campaignLink
  }`;
  try {
    const result = await client.fetch(query);
    return result || [];
  } catch (error) {
    console.error("Error fetching campaigns data:", error);
    return [];
  }
};