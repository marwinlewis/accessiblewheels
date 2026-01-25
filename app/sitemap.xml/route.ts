import { getPages } from "@/utils/server/strapi";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await getPages();
  const pagesData = await response.json();

  const numberOfPages = pagesData?.pages?.length;

  let robotsTxt =
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://accessiblewheels.vercel.app</loc></url>';

  for (let i = 1; i <= numberOfPages; i++) {
    robotsTxt += `<url><loc>https://accessiblewheels.vercel.app/step-${i}</loc></url>`;
  }

  robotsTxt += "</urlset>";

  const res = new NextResponse(robotsTxt);
  res.headers.set("Content-Type", "application/xml");

  return res;
}
