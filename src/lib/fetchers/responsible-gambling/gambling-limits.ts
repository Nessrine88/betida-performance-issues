import { client } from "@/lib/sanity";

export async function fetchGamblingLimits() {
  const query = `*[_type == "GamblingLimit"] | order(createdAt desc) {
    limitType,
    limitAmount,
    limitPeriod,
    createdAt
  }`;

  const data = await client.fetch(query);
  return data;
}