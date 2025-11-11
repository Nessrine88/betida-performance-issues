import { client } from "@/lib/sanity";

export async function fetchRGRecognizeSign() {
  const query = `*[_type == "RgRecognizeSign"][0]{
    branchName,
    content1
  }`;

  const data = await client.fetch(query);
  return data;
}