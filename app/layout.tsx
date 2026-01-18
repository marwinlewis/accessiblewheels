import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adapted Vehicle Car Modifications in India | Cars for Handicapped",
  description:
    "Find ARAI licensed adapted vehicle car modification shops near you and customize your vehicle for enhanced accessibility and comfort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>{children}</body>
    </html>
  );
}
