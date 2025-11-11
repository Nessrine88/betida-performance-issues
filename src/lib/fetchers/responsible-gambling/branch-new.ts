import { client } from "@/lib/sanity";

export async function fetchRGBranchName() {
  const query = `*[_type == "RgBranchName"][0]{
    branchName,
    banner,
    content1,
    tipsForEffects,
    content2
  }`;

  const data = await client.fetch(query);
  return data;
}
