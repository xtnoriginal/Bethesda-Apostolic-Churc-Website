import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import Header from "@/components/Header.jsx";
import Footer from '@/components/Footer.jsx';

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bethesda Apostolic Church",
  description: "Welcome to Bethesda Apostolic Church - A place of worship, fellowship, and spiritual growth.",
  keywords: ["church", "apostolic", "bethesda", "worship", "fellowship", "christian"],
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <head>
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Providers>
          <Header />
          <main className="pt-20 md:pt-24">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
