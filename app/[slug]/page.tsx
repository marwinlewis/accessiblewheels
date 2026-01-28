import Tabs, { Tab } from "@/components/molecules/Tabs";
import CarModifiersPage from "@/components/templates/CarModifiers";
import Main from "@/components/templates/Main";
import { getGlobals, getPage, getPages, getShops } from "@/utils/server/strapi";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;

  const response = await getPage(slug);
  const pagesData = await response.json();

  return {
    title: pagesData?.page?.[0]?.seo?.title || "",
    description: pagesData?.page?.[0]?.seo?.description || "",
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const activeTab = parseInt(slug.replace("step-", ""), 10) - 1;

  const response = await getPages();
  const pagesData = await response.json();

  const resShops = await getShops();
  const shopsData = await resShops.json();

  const resGlobal = await getGlobals();
  const globalData = await resGlobal.json();

  const tabs: Tab[] = [];
  let key = 1;

  for (let page of pagesData.pages) {
    tabs.push({
      id: key++,
      label: page.label,
      title: page.title,
      description: page.description,
      content: page.content || [],
      children: page.showMap ? (
        <CarModifiersPage shops={shopsData.shops} />
      ) : null,
    });
  }

  return (
    <Main
      title={globalData?.globals?.title}
      tabs={tabs}
      openedTab={activeTab}
    />
  );
}
