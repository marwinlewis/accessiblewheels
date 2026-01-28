import Tabs, { Tab } from "@/components/molecules/Tabs";
import CarModifiersPage from "@/components/templates/CarModifiers";
import Main from "@/components/templates/Main";
import { getGlobals, getPages, getShops } from "@/utils/server/strapi";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const res = await getGlobals();
  const globalData = await res.json();

  return {
    title: globalData?.globals?.seo?.title || "",
    description: globalData?.globals?.seo?.description || "",
  };
}

export default async function Page() {
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

  return <Main title={globalData?.globals?.title} tabs={tabs} />;
}
