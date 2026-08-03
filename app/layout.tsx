import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import ReduxProvider from "@/store/Provider";
import CartInitializer from "@/components/providers/CartInitializer";

// Optional
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vitaminsea.in"),

  title: {
    default: "Vitamin Sea",
    template: "%s | Vitamin Sea",
  },

  description:
    "Premium handmade seashell jewellery and ocean-inspired accessories crafted with love.",

  keywords: [
    "Vitamin Sea",
    "Handmade Jewellery",
    "Seashell Accessories",
    "Pearl Jewellery",
    "Beach Accessories",
    "Ocean Inspired",
  ],

  authors: [
    {
      name: "Vitamin Sea",
    },
  ],

  creator: "Vitamin Sea",

  openGraph: {
    title: "Vitamin Sea",
    description:
      "Premium handmade seashell jewellery and ocean-inspired accessories.",

    type: "website",

    locale: "en_IN",

    siteName: "Vitamin Sea",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vitamin Sea",
    description:
      "Premium handmade sea accessories.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        geistSans.variable,
        geistMono.variable,
        "font-sans"
      )}
    >
      <body className="min-h-screen bg-slate-50 text-gray-900">
        <ReduxProvider>
          <CartInitializer />

          {/* <Header /> */}

          <main className="flex min-h-screen flex-col">
            {children}
          </main>

          {/* <Footer /> */}
        </ReduxProvider>
      </body>
    </html>
  );
}