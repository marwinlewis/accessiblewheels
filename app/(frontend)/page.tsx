import { Metadata } from "next";
import { getShopsList } from "@/utils/data";
import { getServerLocale, getDictionary, getLocalizedGuidePages } from "@/i18n/server";
import Hero from "@/components/organisms/Hero";
import Tabs, { Tab } from "@/components/molecules/Tabs";
import CarModifiersPage from "@/components/templates/CarModifiers";
import ConcessionCalculator from "@/components/organisms/ConcessionCalculator";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.seo.title,
    description: dict.seo.description,
    openGraph: {
      title: dict.seo.title,
      description: dict.seo.description,
      type: "website",
    },
  };
}

export default async function Page() {
  const locale = await getServerLocale();

  const [pagesDocs, shopsDocs] = await Promise.all([
    getLocalizedGuidePages(locale),
    getShopsList(),
  ]);

  const tabs: Tab[] = pagesDocs.map((page, index) => ({
    id: page.order || index + 1,
    label: page.label || `Step ${index + 1}`,
    slug: page.slug || `step-${index + 1}`,
    title: page.title,
    description: page.description,
    keyPoints: page.keyPoints || [],
    showMap: Boolean(page.showMap),
    children: page.showMap ? (
      <CarModifiersPage shops={shopsDocs as any} />
    ) : null,
  }));

  return (
    <main className="w-full">
      {/* Hero Section with Metrics */}
      <Hero />

      {/* 4-Step Interactive Roadmap & Guide */}
      <div className="px-4 sm:px-6 lg:px-8">
        <Tabs tabs={tabs} openedTab={0} />
      </div>

      {/* Interactive Divyangjan Tax Savings Calculator */}
      <ConcessionCalculator />
    </main>
  );
}
