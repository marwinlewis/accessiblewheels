import { Google_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { getGlobals } from "@/utils/server/strapi";

const geistSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await getGlobals();
  const globalData = await res.json();
  const { GTM_ID, webmasterTag } = globalData?.globals || "";
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content={webmasterTag} />
      </head>
      <body className={`${geistSans.variable}`}>{children}</body>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      />
      <Script
        id="gtm"
        strategy="afterInteractive"
        defer
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GTM_ID}');`,
        }}
      />
    </html>
  );
}
