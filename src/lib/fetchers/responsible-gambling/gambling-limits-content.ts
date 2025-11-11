import { client } from "@/lib/sanity";

export async function fetchGamblingLimitsContent() {
  const query = `*[_type == "GamblingLimitsContent"][0]{
    title,
    description
  }`;

  const data = await client.fetch(query);
  return data;
}
