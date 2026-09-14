import { Metadata } from "next";
import { getSiteGlobals, getGuidePages, getShopsList } from "@/utils/data";
import Hero from "@/components/organisms/Hero";
import Tabs, { Tab } from "@/components/molecules/Tabs";
import CarModifiersPage from "@/components/templates/CarModifiers";
import ConcessionCalculator from "@/components/organisms/ConcessionCalculator";

export async function generateMetadata(): Promise<Metadata> {
  const globalData = (await getSiteGlobals()) as any;

  return {
    title:
      globalData?.seo?.title ||
      "Adapted Vehicle & Driving Licence Guide for Disabled People in India",
    description:
      globalData?.seo?.description ||
      "A plain-language, step-by-step guide for disabled people in India: get a UDID card, buy and register an adapted vehicle, find a modification workshop, and apply for a driving licence — with current GST and road tax rules.",
    openGraph: {
      title: globalData?.seo?.title || "Adapted Vehicle India",
      description: globalData?.seo?.description || "",
      type: "website",
    },
  };
}

export default async function Page() {
  const [pagesDocs, shopsDocs] = await Promise.all([
    getGuidePages(),
    getShopsList(),
  ]);

  const tabs: Tab[] = pagesDocs.map((page: any, index: number) => ({
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
      {/* Inspiring Hero Section with Metrics */}
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
