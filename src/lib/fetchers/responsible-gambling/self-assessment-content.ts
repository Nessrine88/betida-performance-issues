import { client } from "@/lib/sanity";

export async function fetchSelfAssessmentContent() {
  const query = `*[_type == "SelfAssessmentContent"][0]{
    title,
    description
  }`;

  const data = await client.fetch(query);
  return data;
}

export async function fetchSelfAssessmentQuestions() {
  const query = `*[_type == "SelfAssessmentQuestions"][0]{
    questions,
    learnMoreUrl
  }`;

  const data = await client.fetch(query);
  return data;
}
