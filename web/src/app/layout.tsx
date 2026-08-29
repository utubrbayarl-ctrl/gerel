import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
  title: {
    default: "ГЭРЭЛ — Гэрэлтүүлгийн дэлгүүр",
    template: "%s — ГЭРЭЛ",
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
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
