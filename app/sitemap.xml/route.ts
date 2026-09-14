import { getGuidePages } from "@/utils/data";
import { NextResponse } from "next/server";
import { SUPPORTED_LANGUAGES, DEFAULT_LOCALE } from "@/i18n/languages";

export async function GET() {
  const pages = await getGuidePages();
  const baseUrl = (process.env.NEXT_PUBLIC_API_ORIGIN || "https://accessiblewheels.vercel.app").replace(/\/$/, "");

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  // 1. Home pages for all languages (English default at "/" and Indian languages at "/{code}")
  for (const lang of SUPPORTED_LANGUAGES) {
    const isDefault = lang.code === DEFAULT_LOCALE;
    const loc = isDefault ? `${baseUrl}/` : `${baseUrl}/${lang.code}`;

    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />\n`;

    for (const altLang of SUPPORTED_LANGUAGES) {
      const altHref = altLang.code === DEFAULT_LOCALE ? `${baseUrl}/` : `${baseUrl}/${altLang.code}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${altLang.code}" href="${altHref}" />\n`;
    }

    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${isDefault ? "1.0" : "0.9"}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 2. Step guide pages for all languages (e.g. /step-1 and /hi/step-1, /ta/step-1, etc.)
  for (const page of pages as any[]) {
    const slug = page.slug || `step-${page.order}`;

    for (const lang of SUPPORTED_LANGUAGES) {
      const isDefault = lang.code === DEFAULT_LOCALE;
      const loc = isDefault ? `${baseUrl}/${slug}` : `${baseUrl}/${lang.code}/${slug}`;

      xml += `  <url>\n`;
      xml += `    <loc>${loc}</loc>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/${slug}" />\n`;

      for (const altLang of SUPPORTED_LANGUAGES) {
        const altHref = altLang.code === DEFAULT_LOCALE ? `${baseUrl}/${slug}` : `${baseUrl}/${altLang.code}/${slug}`;
        xml += `    <xhtml:link rel="alternate" hreflang="${altLang.code}" href="${altHref}" />\n`;
      }

      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${isDefault ? "0.8" : "0.7"}</priority>\n`;
      xml += `  </url>\n`;
    }
  }

  xml += "</urlset>";

  const res = new NextResponse(xml);
  res.headers.set("Content-Type", "application/xml; charset=utf-8");
  res.headers.set("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=43200");
  return res;
}
