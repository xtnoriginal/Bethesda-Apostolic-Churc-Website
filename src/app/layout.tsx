import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bethesda Apostolic Church",
  description: "Welcome to Bethesda Apostolic Church - A place of worship, fellowship, and spiritual growth.",
  keywords: ["church", "apostolic", "bethesda", "worship", "fellowship", "christian"],
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: '/favicon.ico',
  },
};

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
        {children}
      </body>
    </html>
  );
}
