import CarModifiersPage from "@/components/templates/CarModifiers";
import { getPage, getShops } from "@/utils/server/strapi";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const res = await getPage("main");
  const pageData = await res.json();

  return {
    title: pageData?.page?.title || "",
    description: pageData?.page?.description || "",
  };
}

export default async function Page() {
  const pageResponse = await getPage("main");
  const pageData = await pageResponse.json();
  const res = await getShops();
  const data = await res.json();
  return <CarModifiersPage page={pageData.page} shops={data.shops} />;
}
