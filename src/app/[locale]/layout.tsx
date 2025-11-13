import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import QueryClientWrapper from "@/providers/QueryClientWrapper";
import { type ReactNode } from "react";
import { routing } from "@/i18n/routing";
import NotFound from "./not-found";
import { setRequestLocale } from "next-intl/server";
import { fetchHero } from "@/lib/fetchers/home-page-details";

// Server Component
import GlobalProvider from "@/providers/GlobalProvider";

// Client Components (no SSR)
import CookieBot from "./components/common/cookie-bot";
import ServerSiteComponents from "./components/modals/server-site-components/server-site-components";


const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BETIDA - Casino & Sports Betting",
  description: "Welcome to BETIDA - Your ultimate gaming destination!",
  keywords: [
    "online casino",
    "sports betting",
    "live casino",
    "BETIDA",
    "gaming platform",
  ],
  openGraph: {
    title: "BETIDA",
    description: "Your ultimate gaming destination!",
    url: "https://betida.dev",
    siteName: "BETIDA",
    images: [
      {
        url: "https://betida.dev/detida.png",
        width: 1200,
        height: 630,
        alt: "BETIDA - Ultimate Gaming Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BETIDA",
    description: "Your ultimate gaming destination!",
    images: ["https://betida.dev/detida.png"],
    creator: "@BETIDAOfficial",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {NotFound()};

  setRequestLocale(locale);

  const hero = await fetchHero();
  const lcpImage = hero?.[0]?.imagePublicId;

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Preload LCP hero image */}
        {lcpImage && (
          <link
            rel="preload"
            as="image"
            href={`https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_auto,q_auto/${lcpImage}`}
            imageSrcSet={`
              https://res.cloudinary.com/dfogbvws/image/upload/w_400,c_fill,f_auto,q_auto/${lcpImage} 400w,
              https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_auto,q_auto/${lcpImage} 648w
            `}
            imageSizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </head>
      <body className="antialiased bg-black text-white">
        <NextIntlClientProvider>
          <QueryClientWrapper>
            <GlobalProvider>
              {children}
              {/* Client Components */}
              <CookieBot />
              <ServerSiteComponents />
            </GlobalProvider>
          </QueryClientWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
