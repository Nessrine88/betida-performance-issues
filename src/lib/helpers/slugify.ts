// @ts-nocheck
export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

export const getSlugText = (text: string, maxLength: number = 100): string => {
  const deSlugified = text?.replace(/-/g, ' ');
  const sentence = deSlugified?.split('.')[0].trim();
  const truncated = sentence.length > maxLength ? sentence?.substring(0, maxLength)?.trim() + '...' : sentence;
  return truncated;
};