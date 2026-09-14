import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { getServerLocale, getDictionary, getLanguageDirection, getLocalizedSiteGlobals } from "@/i18n/server";
import { LanguageProvider } from "@/i18n/context";

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
  // SSR: Resolve language from cookie on server at request time
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const dir = getLanguageDirection(locale);
  const globalData = await getLocalizedSiteGlobals(locale);

  const gtmId = globalData?.gtmId || "G-4JRLEMT93M";
  const webmasterTag = globalData?.webmasterTag || "e1pF3HWCsSrAHsjdrwQH0-Is2Dj23MsTNl2VHMoPs0U";
  const footer = globalData?.footer;

  const footerProps = {
    about: {
      title: footer?.aboutTitle || dict.footer.aboutTitle,
      text: footer?.aboutText || dict.footer.aboutText,
    },
    quickLinks: {
      title: dict.footer.stepGuideTitle,
      links: footer?.quickLinks || [],
    },
    contact: {
      title: dict.footer.officialPortalsTitle,
      links: footer?.contactLinks || [],
    },
  };

  return (
    <html lang={locale} dir={dir}>
      <head>
        <meta name="google-site-verification" content={webmasterTag} />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} min-h-screen flex flex-col bg-white text-slate-900 antialiased`}
      >
        <LanguageProvider initialLocale={locale} initialDictionary={dict}>
          <Navbar siteTitle={dict.nav.brandTitle} />
          <div className="flex-1 w-full">{children}</div>
          <Footer {...footerProps} />
        </LanguageProvider>

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
