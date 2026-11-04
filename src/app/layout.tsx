import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { MainLayout } from "@/components/MainLayout";

export const metadata: Metadata = {
  metadataBase: new URL('https://andytudhope.africa'),
  title: "A Simple Path",
  description: "Nothing could enter it but the sincere act",
  authors: [{ name: "Andy Tudhope" }],
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    type: "website",
    title: "The Sincere Path",
    description: "Nothing could enter it but the sincere act",
    url: "https://andytudhope.africa",
    images: [
      {
        url: "/images/home/enso.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cryptowanderer",
    creator: "@cryptowanderer",
    title: "The Sincere Path",
    description: "Nothing could enter it but the sincere act",
    images: ["/images/home/enso.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Root layout loads these fonts for every App Router page. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Roboto:ital,wght@0,300;0,400;0,700;1,400&family=Roboto+Mono&display=swap"
        />
      </head>
      <body className="min-h-screen bg-white">
        <Navigation />
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
