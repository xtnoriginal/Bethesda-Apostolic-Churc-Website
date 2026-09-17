import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import Header from "@/components/Header.jsx";
import Footer from '@/components/Footer.jsx';
import JsonLd from "@/components/JsonLd";
import { churchGraph } from "@/lib/jsonld";
import { siteUrl, siteName, siteDescription } from "@/lib/site";
import { defaultOgImage } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Harare, Zimbabwe`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: 'Religion',
  keywords: [
    'Bethesda Apostolic Church',
    'Apostolic Church Harare',
    'church in Harare',
    'church in Zimbabwe',
    'Sunday service Harare',
    'Bible courses Zimbabwe',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName,
    locale: 'en_ZW',
    url: '/',
    title: `${siteName} | Harare, Zimbabwe`,
    description: siteDescription,
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Harare, Zimbabwe`,
    description: siteDescription,
    images: [defaultOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  other: {
    'geo.region': 'ZW-HA',
    'geo.placename': 'Harare',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#0033A0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZW" suppressHydrationWarning className={`${inter.variable} font-sans`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <JsonLd data={churchGraph()} />
        <Providers>
          <Header />
          <main className="pt-20 md:pt-24">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}