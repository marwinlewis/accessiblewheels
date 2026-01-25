import Tabs, { Tab } from "@/components/molecules/Tabs";
import CarModifiersPage from "@/components/templates/CarModifiers";
import { getGlobals, getPage, getPages, getShops } from "@/utils/server/strapi";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const res = await getGlobals();
  const globalData = await res.json();

  return {
    title: globalData?.globals?.seoTitle || "",
    description: globalData?.globals?.seoDescription || "",
  };
}

export default async function Page() {
  const response = await getPages();
  const pagesData = await response.json();

  const resShops = await getShops();
  const shopsData = await resShops.json();

  const tabs: Tab[] = [
    {
      id: 1,
      label: pagesData?.pages?.[0]?.label,
      title: pagesData?.pages?.[0]?.title,
      description: pagesData?.pages?.[0]?.description,
      content: pagesData?.pages?.[0]?.content || [],
    },
    {
      id: 2,
      label: pagesData?.pages?.[1]?.label,
      title: pagesData?.pages?.[1]?.title,
      description: pagesData?.pages?.[1]?.description,
      content: pagesData?.pages?.[1]?.content || [],
      children: <CarModifiersPage shops={shopsData.shops} />,
    },
    {
      id: 3,
      label: pagesData?.pages?.[2]?.label,
      title: pagesData?.pages?.[2]?.title,
      description: pagesData?.pages?.[2]?.description,
      content: pagesData?.pages?.[2]?.content || [],
    },
    {
      id: 4,
      label: pagesData?.pages?.[3]?.label,
      title: pagesData?.pages?.[3]?.title,
      description: pagesData?.pages?.[3]?.description,
      content: pagesData?.pages?.[3]?.content || [],
    },
  ];

  return <Tabs tabs={tabs} />;
}
