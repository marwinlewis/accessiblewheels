import { getGuidePages } from "@/utils/data";
import { NextResponse } from "next/server";

export async function GET() {
  const pages = await getGuidePages();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://adaptedvehicle.in";

  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  xml += `<url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`;

  for (const page of pages as any[]) {
    const slug = page.slug || `step-${page.order}`;
    xml += `<url><loc>${baseUrl}/${slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
  }

  xml += "</urlset>";

  const res = new NextResponse(xml);
  res.headers.set("Content-Type", "application/xml");
  return res;
}
