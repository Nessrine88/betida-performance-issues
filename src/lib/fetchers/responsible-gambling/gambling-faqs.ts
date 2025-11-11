import { client } from "@/lib/sanity";

export async function fetchRgGamblingFaqs() {
  const query = `*[_type == "RgGamblingFaqs"][0]{
    branchName,
    content
  }`;

  const data = await client.fetch(query);
  return data;
}
