import { client } from "../sanity";

export type SocialLink = {
  platform: "facebook" | "x" | "instagram" | "linkedin";
  link?: string;
};

export type InternationalizedString = {
  _key: string;
  value: string;
};

export type InternationalizedContent = {
  language: "en" | "tr" | "de" | "es";
  content: any[];
};

export type CategoryReference = {
  _ref: string;
  _type: "reference";
};

export type LocalizedBlogCategory = {
  _id: string;
  _type: "localizedBlogCategories";
  categoryKey: string;
  categoryName: InternationalizedString[];
  slug: {
    _type: "slug";
    current: string;
  };
  order?: number;
};

export type LocalizedBlog = {
  _id: string;
  _type: "localizedBlogs";
  title: InternationalizedString[];
  slug: {
    _type: "slug";
    current: string;
  };
  thumbnail: string;
  shortDescription?: InternationalizedString[];
  description: InternationalizedContent[];
  publishDate: string;
  socialLinks?: SocialLink[];
  categories?: CategoryReference[];
  oldCategories?: string[];
};

export type LocalizedBlogWithCategories = Omit<
  LocalizedBlog,
  "categories"
> & {
  categories?: LocalizedBlogCategory[];
};


export const fetchLocalizedBlogCategories = async (): Promise<
  LocalizedBlogCategory[]
> => {
  const query = `
    *[_type == "localizedBlogCategories"] | order(order asc) {
      _id,
      _type,
      categoryKey,
      categoryName,
      slug,
      order
    }
  `;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching localized blog categories:", error);
    return [];
  }
};


export const fetchLocalizedBlogCategoryBySlug = async (
  slug: string
): Promise<LocalizedBlogCategory | null> => {
  const query = `
    *[_type == "localizedBlogCategories" && slug.current == $slug][0] {
      _id,
      _type,
      categoryKey,
      categoryName,
      slug,
      order
    }
  `;

  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
};

export const fetchLocalizedBlogCategoryByKey = async (
  categoryKey: string
): Promise<LocalizedBlogCategory | null> => {
  const query = `
    *[_type == "localizedBlogCategories" && categoryKey == $categoryKey][0] {
      _id,
      _type,
      categoryKey,
      categoryName,
      slug,
      order
    }
  `;

  try {
    return await client.fetch(query, { categoryKey });
  } catch (error) {
    console.error("Error fetching category by key:", error);
    return null;
  }
};


export const fetchAllLocalizedBlogs = async (): Promise<
  LocalizedBlogWithCategories[]
> => {
  const query = `
    *[_type == "localizedBlogs"] | order(publishDate desc) {
      _id,
      _type,
      title,
      slug,
      thumbnail,
      shortDescription,
      description,
      publishDate,
      socialLinks,
      "categories": categories[]-> {
        _id,
        _type,
        categoryKey,
        categoryName,
        slug,
        order
      }
    }
  `;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching all localized blogs:", error);
    return [];
  }
};


export const fetchLocalizedBlogsByCategoryId = async (
  categoryId: string
): Promise<LocalizedBlogWithCategories[]> => {
  const query = `
    *[_type == "localizedBlogs" && references($categoryId)] | order(publishDate desc) {
      _id,
      _type,
      title,
      slug,
      thumbnail,
      shortDescription,
      description,
      publishDate,
      socialLinks,
      "categories": categories[]-> {
        _id,
        _type,
        categoryKey,
        categoryName,
        slug,
        order
      }
    }
  `;

  try {
    return await client.fetch(query, { categoryId });
  } catch (error) {
    console.error("Error fetching blogs by category ID:", error);
    return [];
  }
};


export const fetchLocalizedBlogsByCategoryKey = async (
  categoryKey: string
): Promise<LocalizedBlogWithCategories[]> => {
  const query = `
    *[_type == "localizedBlogs" && references(*[_type == "localizedBlogCategories" && categoryKey == $categoryKey]._id)] | order(publishDate desc) {
      _id,
      _type,
      title,
      slug,
      thumbnail,
      shortDescription,
      description,
      publishDate,
      socialLinks,
      "categories": categories[]-> {
        _id,
        _type,
        categoryKey,
        categoryName,
        slug,
        order
      }
    }
  `;

  try {
    return await client.fetch(query, { categoryKey });
  } catch (error) {
    console.error("Error fetching blogs by category key:", error);
    return [];
  }
};


export const fetchLocalizedBlogBySlug = async (
  slug: string
): Promise<LocalizedBlogWithCategories | null> => {
  const query = `
    *[_type == "localizedBlogs" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      slug,
      thumbnail,
      shortDescription,
      description,
      publishDate,
      socialLinks,
      "categories": categories[]-> {
        _id,
        _type,
        categoryKey,
        categoryName,
        slug,
        order
      }
    }
  `;

  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
};


export const fetchRelatedLocalizedBlogs = async (
  currentBlogId: string,
  categoryIds: string[],
  limit: number = 3
): Promise<LocalizedBlogWithCategories[]> => {
  if (categoryIds.length === 0) {
    return [];
  }

  const query = `
    *[_type == "localizedBlogs" && _id != $currentBlogId && count((categories[]._ref)[@ in $categoryIds]) > 0]
    | order(publishDate desc)
    | [0...$limit] {
      _id,
      _type,
      title,
      slug,
      thumbnail,
      shortDescription,
      description,
      publishDate,
      socialLinks,
      "categories": categories[]-> {
        _id,
        _type,
        categoryKey,
        categoryName,
        slug,
        order
      }
    }
  `;

  try {
    return await client.fetch(query, { currentBlogId, categoryIds, limit });
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return [];
  }
};

export const fetchLatestLocalizedBlogs = async (
  limit: number = 5
): Promise<LocalizedBlogWithCategories[]> => {
  const query = `
    *[_type == "localizedBlogs"]
    | order(publishDate desc)
    | [0...$limit] {
      _id,
      _type,
      title,
      slug,
      thumbnail,
      shortDescription,
      description,
      publishDate,
      socialLinks,
      "categories": categories[]-> {
        _id,
        _type,
        categoryKey,
        categoryName,
        slug,
        order
      }
    }
  `;

  try {
    return await client.fetch(query, { limit });
  } catch (error) {
    console.error("Error fetching latest blogs:", error);
    return [];
  }
};
