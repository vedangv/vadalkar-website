import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import { serializeJsonLd, SITE_EMAIL, SITE_IS_INDEXABLE, SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Vadalkar And Associates | Structural & Civil Engineering Consultants",
  description:
    "Leading structural and civil engineering consultancy in Mumbai since 1994. Specializing in residential, commercial, industrial projects, structural audits, and STAADPro consulting.",
  keywords:
    "structural engineering, civil engineering, Mumbai, consultant, structural audit, STAADPro, Vadalkar",
  alternates: { canonical: "/" },
  robots: {
    index: SITE_IS_INDEXABLE,
    follow: SITE_IS_INDEXABLE,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Vadalkar And Associates",
    description:
      "Structural & Civil Engineering Consultants in Mumbai since 1994",
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Vadalkar And Associates",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vadalkar And Associates",
    description: "Structural & Civil Engineering Consultants in Mumbai since 1994",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Vadalkar And Associates",
      inLanguage: "en-IN",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: "Vadalkar And Associates",
      description:
        "Structural & Civil Engineering Consultants in Mumbai since 1994",
      url: SITE_URL,
      telephone: "+912224308872",
      email: SITE_EMAIL,
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
    },
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
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        <a href="#main-content" className="skip-nav">Skip to main content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
          <ScrollToTop />
          <WhatsAppButton />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
