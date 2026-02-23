import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vadalkar And Associates | Structural & Civil Engineering Consultants",
  description:
    "Leading structural and civil engineering consultancy in Mumbai since 1994. Specializing in residential, commercial, industrial projects, structural audits, and STAADPro consulting.",
  keywords:
    "structural engineering, civil engineering, Mumbai, consultant, structural audit, STAADPro, Vadalkar",
  openGraph: {
    title: "Vadalkar And Associates",
    description:
      "Structural & Civil Engineering Consultants in Mumbai since 1994",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
