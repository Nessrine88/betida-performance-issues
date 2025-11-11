import { client } from "@/lib/sanity";

export type InternationalizedString = {
  _key: string;
  value: string;
};

export interface FaqItem {
  _id: string;
  category: string;
  title: InternationalizedString[];
  content: InternationalizedString[];
}

export const fetchFaqs = async (): Promise<FaqItem[]> => {
  const query = `*[_type == "affiliateFaq"] {
    _id,
    category,
    title,
    content
  }`;

  try {
    const faqs = await client.fetch(query);
    return faqs; 
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
};
