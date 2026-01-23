import { NextResponse } from "next/server";

export async function GET() {
  const robotsTxt =
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">  <url><loc>https://accessiblewheels.vercel.app</loc></url></urlset>';

  const response = new NextResponse(robotsTxt);
  response.headers.set("Content-Type", "application/xml");

  return response;
}
