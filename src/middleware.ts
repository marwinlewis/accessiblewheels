import { NextRequest, NextResponse } from "next/server";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/i18n/languages";

// All non-default locales (22 Indian languages)
const NON_DEFAULT_LOCALES = SUPPORTED_LOCALES.filter((loc) => loc !== DEFAULT_LOCALE);

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Ignore static files, Next internals, and api routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/media") ||
    pathname.includes(".") // e.g. favicon.ico, sitemap.xml, robots.txt
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  // If URL starts with "/en", redirect to clean canonical URL without "/en"
  if (firstSegment === DEFAULT_LOCALE) {
    const cleanSegments = segments.slice(1);
    const newPath = cleanSegments.length > 0 ? `/${cleanSegments.join("/")}` : "/";
    return NextResponse.redirect(new URL(`${newPath}${search}`, request.url));
  }

  // If first segment is one of the supported 22 Indian languages (e.g. /hi, /ta/step-1)
  if (firstSegment && NON_DEFAULT_LOCALES.includes(firstSegment)) {
    const locale = firstSegment;
    const remainingSegments = segments.slice(1);
    const rewritePath = remainingSegments.length > 0 ? `/${remainingSegments.join("/")}` : "/";

    // Rewrite to underlying page with query param and header for SSR
    const targetUrl = new URL(`${rewritePath}${search}`, request.url);
    targetUrl.searchParams.set("lang", locale);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", locale);

    const response = NextResponse.rewrite(targetUrl, {
      request: {
        headers: requestHeaders,
      },
    });

    // Also persist locale in cookie
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });

    return response;
  }

  // If no language code is in the URL, English is the default
  // As requested: "If no country code is in url it will load in english by default."
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", DEFAULT_LOCALE);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set default English cookie if visiting root/unprefixed URLs
  response.cookies.set("NEXT_LOCALE", DEFAULT_LOCALE, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
