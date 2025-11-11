import { client } from "@/lib/sanity";

export async function fetchRgSelfExclusion() {
  const query = `*[_type == "RgSelfExclusion"][0]{
    branchName,
    tools[] {
      title,
      content,
      redirectURL
    }
  }`;

  const data = await client.fetch(query);
  return data;
}