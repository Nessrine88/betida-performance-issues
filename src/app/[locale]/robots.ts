import type { MetadataRoute } from "next";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://betida.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/auth/",
      },
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: "/auth/",
      },
      {
        userAgent: ["Applebot", "Bingbot"],
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
