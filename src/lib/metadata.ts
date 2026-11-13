import type { Metadata } from "next";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

// Next replaces nested metadata between segments. Set a complete social card
// per page so changing its URL cannot discard the image or inherit home copy.
export function pageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: "en_IN",
      siteName: "Vadalkar And Associates",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: title }],
    },
  };
}
