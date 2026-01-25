import { NextResponse } from "next/server";

export async function GET() {
  const robotsTxt =
    "User-agent: *\ndisallow: /404/\n\nsitemap: https://accessiblewheels.vercel.app/sitemap.xml";

  const response = new NextResponse(robotsTxt);
  response.headers.set("Content-Type", "text/plain");

  return response;
}
