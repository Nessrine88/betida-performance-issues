import { client } from "../sanity";

export type InternationalizedString = {
  _key: string;
  value: string;
};

export type InternationalizedText = {
  _key: string;
  value: string; 
};

export type LocalizedQuestionData = {
  _id: string;
  title: string;
  content: string;
};

export interface QuestionData {
  _id: string;
  title: InternationalizedString[];
  content: InternationalizedText[];
}

export const fetchQuestions = async (): Promise<QuestionData[]> => {
  const query = `
    *[_type == "questions"] {
      _id,
      title,
      content
    }
  `;

  try {
    const data = await client.fetch<QuestionData[]>(query);
    return data || [];
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};