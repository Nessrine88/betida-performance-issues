import { client } from "@/lib/sanity";

export type InternationalizedString = {
  _key: string;
  value: string;
};

export interface Commission {
  _id: string;
  currencies: InternationalizedString[];
  available_commission: string;
  withdrawn_commission: string;
  lifetime_commission: string;
  type: string;
}

export const fetchCommissions = async (): Promise<Commission[]> => {
  const query = `*[_type == "commission"] {
    _id,
    currencies,
    available_commission,
    withdrawn_commission,
    lifetime_commission,
    type
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching commissions:", error);
    return [];
  }
};