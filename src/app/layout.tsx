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
      <body className="min-h-screen bg-white">
        <Navigation />
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
