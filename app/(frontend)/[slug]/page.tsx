import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteGlobals, getGuidePages, getShopsList, getGuidePage } from "@/utils/data";
import Hero from "@/components/organisms/Hero";
import Tabs, { Tab } from "@/components/molecules/Tabs";
import CarModifiersPage from "@/components/templates/CarModifiers";
import ConcessionCalculator from "@/components/organisms/ConcessionCalculator";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = (await getGuidePage(slug)) as any;
  const globalData = (await getSiteGlobals()) as any;

  if (!page) {
    return {
      title: "Step Guide | Adapted Vehicle India",
    };
  }

  return {
    title: `${page.title} | ${globalData?.title || "Adapted Vehicle India"}`,
    description:
      page.seo?.description ||
      page.description ||
      "Complete step-by-step guide for Divyangjan vehicle adaptation and driving license in India.",
  };
}

export default async function StepPage({ params }: PageProps) {
  const { slug } = await params;
  const [pagesDocs, shopsDocs] = await Promise.all([
    getGuidePages(),
    getShopsList(),
  ]);

  const stepIndex = pagesDocs.findIndex((p: any) => p.slug === slug);
  const activeTab = stepIndex >= 0 ? stepIndex : 0;

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
