import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adapted Vehicle",
  description: "Find car modification shops and customize your vehicle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        {/* Google Maps API - Add your API key to .env.local as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY */}
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
            async
          />
        )}
      </body>
    </html>
  );
}
