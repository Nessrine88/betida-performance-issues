import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

// Fetch Law Enforcement data
export async function fetchLawEnforcement() {
  const query = groq`
    *[_type == "lawEnforcement"][0]{
      sections[]{
        title,
        description
      }
    }
  `;

  try {
    const data = await client.fetch(query);
    return data || { sections: [] };
  } catch (error) {
    console.error("Failed to fetch law enforcement data:", error);
    return { sections: [] };
  }
}
