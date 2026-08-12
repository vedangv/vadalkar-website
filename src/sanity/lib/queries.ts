import { cache } from "react";
import type { PortableTextBlock } from "@portabletext/types";
import imageUrlBuilder from "@sanity/image-url";
import { groq } from "next-sanity";
import { client } from "./client";

const builder = imageUrlBuilder(client);
const REVALIDATE_SECONDS = 3_600;

type SanityImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export type SanityProject = {
  title: string;
  category: string;
  client: string;
  architect?: string;
  year: string;
  cost?: string;
  slug?: string;
  featured?: boolean;
  description?: string;
  image?: string;
  updatedAt: string;
};

type RawSanityProject = Omit<SanityProject, "image"> & {
  image?: SanityImageSource;
};

export type HomePageData = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  services?: Array<{ title: string; description: string }>;
  clients?: string[];
};

export type AboutPageData = {
  heroTitle?: string;
  heroDescription?: string;
  whoWeAre?: PortableTextBlock[];
  activities?: string[];
  infrastructure?: Array<{ title: string; description: string }>;
  milestones?: Array<{ year: string; title: string; description: string }>;
};

export type ContactPageData = {
  heroTitle?: string;
  heroDescription?: string;
  offices?: Array<{
    name: string;
    address: string;
    phone?: string;
    cell?: string;
    active?: boolean;
  }>;
};

export type SiteSettings = {
  experienceYears?: number;
  projectsDelivered?: number;
  sectorsServed?: number;
  officeLocations?: number;
  address?: string;
  phone?: string;
  email?: string;
  whatsappParams?: string;
};

const fetchOptions = { next: { revalidate: REVALIDATE_SECONDS } } as const;

function transformProject(project: RawSanityProject): SanityProject {
  return {
    ...project,
    image: project.image ? urlFor(project.image).url() : undefined,
  };
}

export const getProjects = cache(async (): Promise<SanityProject[]> => {
  const projects = await client.fetch<RawSanityProject[]>(
    groq`*[_type == "project"] | order(year desc) {
      title,
      category,
      client,
      architect,
      year,
      cost,
      "slug": slug.current,
      featured,
      description,
      image,
      "updatedAt": _updatedAt
    }`,
    {},
    fetchOptions,
  );

  return projects.map(transformProject);
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<SanityProject | null> => {
    const project = await client.fetch<RawSanityProject | null>(
      groq`*[_type == "project" && slug.current == $slug][0] {
        title,
        category,
        client,
        architect,
        year,
        cost,
        "slug": slug.current,
        featured,
        description,
        image,
        "updatedAt": _updatedAt
      }`,
      { slug },
      fetchOptions,
    );

    return project ? transformProject(project) : null;
  },
);

export const getHomePage = cache(() =>
  client.fetch<HomePageData | null>(groq`*[_type == "homePage"][0]`, {}, fetchOptions),
);

export const getAboutPage = cache(() =>
  client.fetch<AboutPageData | null>(groq`*[_type == "aboutPage"][0]`, {}, fetchOptions),
);

export const getContactPage = cache(() =>
  client.fetch<ContactPageData | null>(
    groq`*[_type == "contactPage"][0] {
      heroTitle,
      heroDescription,
      offices[] {
        name,
        address,
        phone,
        cell,
        active
      }
    }`,
    {},
    fetchOptions,
  ),
);

export const getSiteSettings = cache(() =>
  client.fetch<SiteSettings | null>(groq`*[_type == "siteSettings"][0]`, {}, fetchOptions),
);
