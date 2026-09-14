import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, isValidLocale, getLanguageDirection, getLanguage } from "./languages";
import { getDictionary } from "./translations";
import { GuidePageData, SiteGlobalsData, guidePages as baseGuidePages, siteGlobals as baseSiteGlobals } from "@/data/siteData";

/**
 * Resolves the active locale on the server side:
 * 1. Inspects the `x-locale` request header injected by middleware from the URL path.
 * 2. Falls back to the `NEXT_LOCALE` cookie.
 * 3. Defaults to `DEFAULT_LOCALE` ("en") if no country/language code is in the URL.
 */
export async function getServerLocale(): Promise<string> {
  try {
    const headerStore = await headers();
    const headerLocale = headerStore.get("x-locale");
    if (headerLocale && isValidLocale(headerLocale)) {
      return headerLocale.toLowerCase();
    }
  } catch {
    // headers() might not be available in some contexts
  }

  try {
    const cookieStore = await cookies();
    const cookieVal = cookieStore.get("NEXT_LOCALE")?.value;
    if (cookieVal && isValidLocale(cookieVal)) {
      return cookieVal.toLowerCase();
    }
  } catch {
    // fallback safely
  }

  return DEFAULT_LOCALE;
}

/**
 * Returns localized GuidePageData[] based on the resolved locale for SSR rendering.
 */
export async function getLocalizedGuidePages(locale?: string): Promise<GuidePageData[]> {
  const dict = getDictionary(locale);
  
  return baseGuidePages.map((basePage, index) => {
    const localizedStep = dict.steps.find((s) => s.slug === basePage.slug || s.order === basePage.order) || dict.steps[index];
    
    if (!localizedStep) return basePage;

    return {
      ...basePage,
      label: localizedStep.label || basePage.label,
      title: localizedStep.title || basePage.title,
      description: localizedStep.description || basePage.description,
      seo: {
        title: `${localizedStep.title} | ${dict.nav.brandTitle}`,
        description: localizedStep.description || basePage.seo.description,
      },
      keyPoints: basePage.keyPoints.map((baseKp, kpIdx) => {
        const localizedKp = localizedStep.keyPoints?.[kpIdx];
        if (!localizedKp) return baseKp;
        return {
          ...baseKp,
          title: localizedKp.title || baseKp.title,
          text: localizedKp.text || baseKp.text,
          linkLabel: localizedKp.linkLabel || baseKp.linkLabel,
        };
      }),
    };
  });
}

/**
 * Returns a specific localized GuidePageData for [slug]/page.tsx
 */
export async function getLocalizedGuidePage(slug: string, locale?: string): Promise<GuidePageData | null> {
  const pages = await getLocalizedGuidePages(locale);
  return pages.find((p) => p.slug === slug) || null;
}

/**
 * Returns localized SiteGlobalsData based on the resolved locale for SSR rendering.
 */
export async function getLocalizedSiteGlobals(locale?: string): Promise<SiteGlobalsData> {
  const dict = getDictionary(locale);
  const prefix = locale && locale !== DEFAULT_LOCALE ? `/${locale}` : "";

  return {
    ...baseSiteGlobals,
    title: dict.hero.title,
    seo: {
      title: `${dict.nav.brandTitle} - ${dict.nav.brandSubtitle}`,
      description: dict.seo.description,
    },
    footer: {
      aboutTitle: dict.footer.aboutTitle,
      aboutText: dict.footer.aboutText,
      quickLinks: [
        { label: "Home", url: prefix || "/" },
        { label: dict.footer.step1Link, url: `${prefix}/step-1` },
        { label: dict.footer.step2Link, url: `${prefix}/step-2` },
        { label: dict.footer.step3Link, url: `${prefix}/step-3` },
        { label: dict.footer.step4Link, url: `${prefix}/step-4` },
        { label: dict.footer.taxRulesLink, url: `${prefix}/#calculator` },
      ],
      contactLinks: [
        { label: dict.footer.udidPortalLink, url: "https://www.swavlambancard.gov.in/" },
        { label: dict.footer.parivahanLink, url: "https://sarathi.parivahan.gov.in/" },
        { label: dict.footer.mhiLink, url: "https://heavyindustries.gov.in/" },
        { label: dict.footer.maintainerLink, url: "https://www.linkedin.com/in/marwinlewis/" },
      ],
    },
  };
}

export { getDictionary, getLanguageDirection, getLanguage };
