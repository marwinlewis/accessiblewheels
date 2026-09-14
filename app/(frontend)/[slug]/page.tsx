import { Metadata } from "next";
import { getShopsList, getGuidePages } from "@/utils/data";
import { getServerLocale, getDictionary, getLocalizedGuidePages, getLocalizedGuidePage } from "@/i18n/server";
import Hero from "@/components/organisms/Hero";
import Tabs, { Tab } from "@/components/molecules/Tabs";
import CarModifiersPage from "@/components/templates/CarModifiers";
import ConcessionCalculator from "@/components/organisms/ConcessionCalculator";

export async function generateStaticParams() {
  const pages = await getGuidePages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const page = await getLocalizedGuidePage(slug, locale);
  const dict = getDictionary(locale);

  if (!page) {
    return {
      title: `Step Guide | ${dict.nav.brandTitle}`,
    };
  }

  return {
    title: `${page.title} | ${dict.nav.brandTitle}`,
    description:
      page.description ||
      page.seo?.description ||
      dict.seo.description,
  };
}

export default async function StepPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();

  const [pagesDocs, shopsDocs] = await Promise.all([
    getLocalizedGuidePages(locale),
    getShopsList(),
  ]);

  const stepIndex = pagesDocs.findIndex((p) => p.slug === slug);
  const activeTab = stepIndex >= 0 ? stepIndex : 0;

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
      {/* Hero section */}
      <Hero />

      {/* 4-Step Interactive Stepper focused on current step */}
      <div className="px-4 sm:px-6 lg:px-8">
        <Tabs tabs={tabs} openedTab={activeTab} />
      </div>

      {/* Tax Concession Calculator */}
      <ConcessionCalculator />
    </main>
  );
}
