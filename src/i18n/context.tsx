"use client";

import React, { createContext, useContext, useState, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TranslationDictionary } from "./types";
import { Language, SUPPORTED_LANGUAGES, SUPPORTED_LOCALES, DEFAULT_LOCALE, getLanguageDirection, isValidLocale } from "./languages";
import { getDictionary } from "./translations";

interface LanguageContextValue {
  locale: string;
  dir: "ltr" | "rtl";
  t: TranslationDictionary;
  languages: Language[];
  setLocale: (locale: string) => void;
  isPending: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLocale?: string;
  initialDictionary?: TranslationDictionary;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLocale = DEFAULT_LOCALE,
  initialDictionary,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<string>(initialLocale);
  const [isPending, startTransition] = useTransition();

  const activeDict = initialDictionary && locale === initialLocale
    ? initialDictionary
    : getDictionary(locale);

  const dir = getLanguageDirection(locale);

  const setLocale = (newLocale: string) => {
    if (!isValidLocale(newLocale)) return;
    const cleanLocale = newLocale.toLowerCase();

    // 1. Update state immediately
    setLocaleState(cleanLocale);

    // 2. Set long-lived cookie for SSR (1 year)
    document.cookie = `NEXT_LOCALE=${cleanLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // 3. Update DOM attributes
    if (typeof document !== "undefined") {
      document.documentElement.lang = cleanLocale;
      document.documentElement.dir = getLanguageDirection(cleanLocale);
    }

    // 4. Update the URL to include or remove language code
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const segments = currentPath.split("/").filter(Boolean);

      // Strip previous locale prefix if present
      if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0].toLowerCase())) {
        segments.shift();
      }

      const basePath = segments.length > 0 ? `/${segments.join("/")}` : "";
      const newPath = cleanLocale === DEFAULT_LOCALE
        ? (basePath || "/")
        : `/${cleanLocale}${basePath}`;

      const newUrl = `${newPath}${window.location.search}${window.location.hash}`;

      startTransition(() => {
        // Navigate to the localized URL
        router.push(newUrl);
        router.refresh();
      });
    }
  };

  // Synchronize on mount if client URL has a locale prefix or query param
  useEffect(() => {
    if (typeof window !== "undefined") {
      const segments = window.location.pathname.split("/").filter(Boolean);
      const urlLocale = segments[0]?.toLowerCase();

      if (urlLocale && isValidLocale(urlLocale)) {
        if (urlLocale !== locale) {
          setLocaleState(urlLocale);
        }
      } else {
        // No language in URL -> default to English
        if (locale !== DEFAULT_LOCALE && (!urlLocale || !isValidLocale(urlLocale))) {
          setLocaleState(DEFAULT_LOCALE);
        }
      }
    }
  }, [pathname]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        dir,
        t: activeDict,
        languages: SUPPORTED_LANGUAGES,
        setLocale,
        isPending,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
