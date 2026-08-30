import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Tes Sky — Гэрэлтүүлгийн дэлгүүр",
    template: "%s — Tes Sky",
  },
  description:
    "Орчин үеийн гэрэлтүүлгийн бүтээгдэхүүний мэдээллийн каталог: таазны, хананы, ширээний гэрэл, LED болон ухаалаг гэрэлтүүлэг.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <head>
        {/* JS ажиллахгүй тохиолдолд (унтраасан, chunk 404, CSP хориглосон)
            .reveal элементүүд opacity:0-д мөнхөд үлдэхээс сэргийлнэ. */}
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <AnnouncementBar />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
