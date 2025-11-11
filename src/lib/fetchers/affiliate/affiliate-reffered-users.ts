import { client } from "@/lib/sanity";

export type InternationalizedString = {
  _key: string;
  value: string;
};

export interface ReferredUser {
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
  userLink: string;
}

export const fetchReferredUsers = async (): Promise<ReferredUser[]> => {
  const query = `*[_type == "referredUser"] {
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
    userLink
  }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching referred users:", error);
    return [];
  }
};