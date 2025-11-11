import { type Metadata } from "next";
import HomePage from "./home/page";

export const revalidate = 60; 
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://betida.com";
  const title = "BETIDA - Home";
  const description = "Welcome to BETIDA - Your ultimate gaming destination!";
  const ogImage = `${baseUrl}/logos/logo.webp`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: "BETIDA",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: baseUrl },
    icons: { icon: "/favicon.ico" },
  };
}

export default function Page() {
  return <HomePage />;
}
