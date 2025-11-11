import { client } from "../sanity";

export type InternationalizedString = {
  _key: string;
  value: string;
};

export type BaseTransaction = {
  _key?: string;
  category: string;
  depositSubCategory?: string;
  withdrawalSubCategory?: string;
  bonusSubCategory?: string;
  otherSubCategory?: string;
  date: string;
  amount: string;
  status?: string;
  viewText?: string;
  viewUrl?: string;
  cryptoType?: string;
  bonusType?: InternationalizedString[];
  raffleName?: InternationalizedString[];
  tickets?: number;
  raceName?: InternationalizedString[];
  position?: number;
  prize?: string;
};

export async function fetchTransactions(): Promise<BaseTransaction[]> {
  const query = `
    *[_type == "transactions"][0] {
      "transactions": transactions[] {
        _key,
        category,
        depositSubCategory,
        withdrawalSubCategory,
        bonusSubCategory,
        otherSubCategory,
        "date": date,
        status,
        viewText,
        viewUrl,
        cryptoType,
        amount,
        bonusType,
        raffleName,
        tickets,
        raceName,
        position,
        prize
      }
    }.transactions
  `;

  try {
    const data = await client.fetch(query);
    return data || [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export const fetchTransactionsByCategory = async (
  category: string
): Promise<BaseTransaction[]> => {
  const query = `
    *[_type == "transactions"][0] {
      "transactions": transactions[category == $category] {
        _key,
        category,
        depositSubCategory,
        withdrawalSubCategory,
        bonusSubCategory,
        otherSubCategory,
        "date": date,
        status,
        viewText,
        viewUrl,
        cryptoType,
        amount,
        bonusType,
        raffleName,
        tickets,
        raceName,
        position,
        prize
      }
    }.transactions
  `;

  try {
    return await client.fetch(query, { category });
  } catch (error) {
    console.error("Error fetching transactions by category:", error);
    return [];
  }
};
