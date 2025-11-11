import type {
  InternationalizedString,
  InternationalizedContent,
} from "../fetchers/localized-blog";


export type LanguageCode = "en" | "tr" | "de" | "es";

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: "English",
  tr: "Türkçe",
  de: "Deutsch",
  es: "Español",
};

export const getLocalizedString = (
  content: InternationalizedString[] | undefined,
  language: LanguageCode = DEFAULT_LANGUAGE,
  fallbackLanguage: LanguageCode = DEFAULT_LANGUAGE
): string => {
  if (!content || !Array.isArray(content)) {
    return "";
  }

  const localizedContent = content.find((item) => item._key === language);
  if (localizedContent?.value) {
    return localizedContent.value;
  }

  if (language !== fallbackLanguage) {
    const fallbackContent = content.find(
      (item) => item._key === fallbackLanguage
    );
    if (fallbackContent?.value) {
      return fallbackContent.value;
    }
  }

  return content[0]?.value || "";
};

export const getLocalizedContent = (
  content: InternationalizedContent[] | undefined,
  language: LanguageCode = DEFAULT_LANGUAGE,
  fallbackLanguage: LanguageCode = DEFAULT_LANGUAGE
): any[] => {
  if (!content || !Array.isArray(content)) {
    return [];
  }

  const localizedContent = content.find((item) => item.language === language);
  if (localizedContent?.content) {
    return localizedContent.content;
  }

  if (language !== fallbackLanguage) {
    const fallbackContent = content.find(
      (item) => item.language === fallbackLanguage
    );
    if (fallbackContent?.content) {
      return fallbackContent.content;
    }
  }

  return content[0]?.content || [];
};

export const isLanguageAvailable = (
  content:
    | InternationalizedString[]
    | InternationalizedContent[]
    | undefined,
  language: LanguageCode
): boolean => {
  if (!content || !Array.isArray(content)) {
    return false;
  }

  if (content.length > 0 && "_key" in content[0]) {
    return (content as InternationalizedString[]).some(
      (item) => item._key === language
    );
  }

  if (content.length > 0 && "language" in content[0]) {
    return (content as InternationalizedContent[]).some(
      (item) => item.language === language
    );
  }

  return false;
};

export const getAvailableLanguages = (
  content:
    | InternationalizedString[]
    | InternationalizedContent[]
    | undefined
): LanguageCode[] => {
  if (!content || !Array.isArray(content)) {
    return [];
  }

  if (content.length > 0 && "_key" in content[0]) {
    return (content as InternationalizedString[])
      .map((item) => item._key as LanguageCode)
      .filter((lang) => lang in LANGUAGE_NAMES);
  }

  if (content.length > 0 && "language" in content[0]) {
    return (content as InternationalizedContent[])
      .map((item) => item.language)
      .filter((lang) => lang in LANGUAGE_NAMES);
  }

  return [];
};


export const formatLocalizedDate = (
  date: string | Date,
  language: LanguageCode = DEFAULT_LANGUAGE,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const localeMap: Record<LanguageCode, string> = {
    en: "en-US",
    tr: "tr-TR",
    de: "de-DE",
    es: "es-ES",
  };

  return new Intl.DateTimeFormat(localeMap[language], options).format(dateObj);
};

export const getRelativeTime = (
  date: string | Date,
  language: LanguageCode = DEFAULT_LANGUAGE
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const localeMap: Record<LanguageCode, string> = {
    en: "en-US",
    tr: "tr-TR",
    de: "de-DE",
    es: "es-ES",
  };

  const rtf = new Intl.RelativeTimeFormat(localeMap[language], {
    numeric: "auto",
  });

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return rtf.format(-diffInMinutes, "minute");
    }
    return rtf.format(-diffInHours, "hour");
  } else if (diffInDays < 7) {
    return rtf.format(-diffInDays, "day");
  } else if (diffInDays < 30) {
    const diffInWeeks = Math.floor(diffInDays / 7);
    return rtf.format(-diffInWeeks, "week");
  } else if (diffInDays < 365) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return rtf.format(-diffInMonths, "month");
  } else {
    const diffInYears = Math.floor(diffInDays / 365);
    return rtf.format(-diffInYears, "year");
  }
};

export const isValidLanguageCode = (code: string): code is LanguageCode => {
  return code in LANGUAGE_NAMES;
};

export const getSystemLanguage = (): LanguageCode => {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const browserLang = navigator.language.split("-")[0];
  return isValidLanguageCode(browserLang) ? browserLang : DEFAULT_LANGUAGE;
};
