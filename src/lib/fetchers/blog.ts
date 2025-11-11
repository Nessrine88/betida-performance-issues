import { cache } from "react"; // ✅ import cache
import { client } from "../sanity";

export type SocialLink = {
  platform: string;
  link: string;
};

export type Blog = {
  _id: string;
  thumbnail: string;
  title: Array<{ _key: string; value: string }>;
  shortDescription?: Array<{ _key: string; value: string }>;
  description: Array<{ language: string; blocks: any[] }>;
  publishDate: string;
  socialLinks?: SocialLink[];
  categories: string[];
  slug: { _type: "slug"; current: string };
};

// --- Cached fetchers ---
export const fetchAllBlogs = cache(async (): Promise<Blog[]> => {
  const query = `
    *[_type == "blogs"] | order(publishDate desc) {
      _id,
      slug,
      thumbnail,
      title,
      shortDescription,
      description,
      publishDate,
      socialLinks,
      categories
    }
  `;
  return client.fetch<Blog[]>(query);
});

export const fetchBlogsByCategory = cache(
  async (category: string): Promise<Blog[]> => {
    if (category === "all") {
      const query = `
      *[_type == "blogs"] | order(publishDate desc) {
        _id,
        slug,
        thumbnail,
        title,
        shortDescription,
        publishDate,
        categories
      }
    `;
      return client.fetch<Blog[]>(query);
    }

    const query = `
    *[_type == "blogs" && $category in categories] | order(publishDate desc) {
      _id,
      slug,
      thumbnail,
      title,
      shortDescription,
      publishDate,
      categories
    }
  `;
    return client.fetch<Blog[]>(query, { category });
  }
);

export const fetchBlogBySlug = cache(
  async (slug: string): Promise<Blog | null> => {
    const query = `
    *[_type == "blogs" && slug.current == $slug][0] {
      _id,
      slug,
      thumbnail,
      title,
      shortDescription,
      description,
      publishDate,
      socialLinks,
      categories
    }
  `;
    return client.fetch<Blog | null>(query, { slug });
  }
);

export const getAllSlugs = cache(async (): Promise<string[]> => {
  const query = `*[_type == "blogs" && defined(slug.current)] { "slug": slug.current }`;
  const results: { slug: string }[] = await client.fetch(query);
  return results.map((r) => r.slug);
});
