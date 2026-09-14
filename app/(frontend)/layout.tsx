import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { getSiteGlobals } from "@/utils/data";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = (await getSiteGlobals()) as any;
  const gtmId = globalData?.gtmId || "G-4JRLEMT93M";
  const webmasterTag = globalData?.webmasterTag || "e1pF3HWCsSrAHsjdrwQH0-Is2Dj23MsTNl2VHMoPs0U";
  const footer = globalData?.footer;

  const footerProps = {
    about: {
      title: footer?.aboutTitle || "About Adapted Vehicle India",
      text: footer?.aboutText || "",
    },
    quickLinks: {
      title: "Navigation & Steps",
      links: footer?.quickLinks || [],
    },
    contact: {
      title: "Government Portals & Contact",
      links: footer?.contactLinks || [],
    },
  };

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content={webmasterTag} />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} min-h-screen flex flex-col bg-white text-slate-900 antialiased`}
      >
        <Navbar siteTitle={globalData?.title} />
        <div className="flex-1 w-full">{children}</div>
        <Footer {...footerProps} />

        {gtmId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
            />
            <Script
              id="gtm"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gtmId}');`,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
