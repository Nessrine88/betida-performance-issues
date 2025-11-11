import type { MetadataRoute } from "next";
import { fetchHero } from "@/lib/fetchers/home-page-details";
import { fetchPublishers } from "@/lib/fetchers/fetch-publishers";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://betida.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [heroTypes, publishers] = await Promise.all([
    fetchHero(),
    fetchPublishers(),
  ]);

  const heroUrls = heroTypes
    .map((t: any) => t.url)
    .filter(
      (url: string): url is string =>
        typeof url === "string" && url.startsWith("/")
    );

  const providerSlugs = publishers
    .map((p: any) => p.slug?.current ?? p.slug)
    .filter((slug): slug is string => typeof slug === "string");

  const providerDetailUrls = providerSlugs.map(
    (slug) => `/casino/collection/provider/${slug}`
  );

  const urls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/casino`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sports`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/casino/collection/provider`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    ...providerDetailUrls.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    ...heroUrls
      .filter(
        (path: string) =>
          !["/casino", "/sports", "/casino/collection/provider"].includes(path)
      )
      .map((path: string) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
  ];

  return urls;
}
