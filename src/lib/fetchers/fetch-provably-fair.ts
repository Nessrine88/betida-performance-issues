import { client } from "../sanity";

export type ProvablyFairContent = {
  _id: string;
  type: string;
  slug: { _type: "slug"; current: string };
  description: any[];
};

export const fetchProvablyFairByType = async (
  type: string
): Promise<ProvablyFairContent[]> => {
  const query = `
    *[_type == "provablyFair" && type == $type]{
      _id,
      type,
      slug,
      description
    }
  `;
  return await client.fetch(query, { type });
};
