import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

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
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Vadalkar And Associates",
    description:
      "Structural & Civil Engineering Consultants in Mumbai since 1994",
    type: "website",
    locale: "en_IN",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Vadalkar And Associates",
  description:
    "Structural & Civil Engineering Consultants in Mumbai since 1994",
  url: "https://vadalkar-website.vercel.app",
  telephone: "+912224308872",
  email: "vadalkar@gmail.com",
  foundingDate: "1994",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "B-703, New Samadhan CHS Ltd, Senapati Bapat Road, Opp. Dadar Stn. (W)",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400028",
    addressCountry: "IN",
  },
  areaServed: "Mumbai, Maharashtra, India",
  serviceType: [
    "Structural Design",
    "Structural Analysis",
    "Structural Audit",
    "Repair Consulting",
    "Proof Checking",
    "STAADPro Consulting",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-nav">Skip to main content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
