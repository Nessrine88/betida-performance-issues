export const BLOG_CATEGORIES = [
  "all",
  "crypto",
  "how-to-guides",
  "stake-news",
  "sport",
  "poker",
  "casino",
  "other",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];