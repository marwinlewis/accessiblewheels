import { siteGlobals, guidePages, shops, GuidePageData, ShopData, SiteGlobalsData } from '@/data/siteData';

export async function getSiteGlobals(): Promise<SiteGlobalsData> {
  return siteGlobals;
}

export async function getGuidePages(): Promise<GuidePageData[]> {
  return guidePages;
}

export async function getShopsList(): Promise<ShopData[]> {
  return shops;
}

export async function getGuidePage(slug: string): Promise<GuidePageData | null> {
  const page = guidePages.find((p) => p.slug === slug);
  return page || null;
}
