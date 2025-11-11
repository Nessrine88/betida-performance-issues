import { client } from "@/lib/sanity";

export async function fetchDepositLimitsContent() {
  const query = `*[_type == "DepositLimitsContent"][0]{
    title,
    description,
    tableTitle
  }`;

  const data = await client.fetch(query);
  return data;
}
