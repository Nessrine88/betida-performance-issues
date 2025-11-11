import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({locales: ['en', 'tr', 'de', 'es'], defaultLocale: 'en', localePrefix: 'as-needed'})