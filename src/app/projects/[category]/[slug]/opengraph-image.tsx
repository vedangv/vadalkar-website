import { ImageResponse } from "next/og";
import { projects, categorySlug } from "@/data/projects";

export const alt = "Vadalkar And Associates - Project";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const featuredProjects = projects.filter((p) => p.featured && p.slug);

export function generateStaticParams() {
  return featuredProjects.map((p) => ({
    category: categorySlug(p.category),
    slug: p.slug!,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1e3a5f",
            color: "#ffffff",
            fontSize: "48px",
            fontFamily: "system-ui",
          }}
        >
          Vadalkar And Associates
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "80px",
          backgroundColor: "#1e3a5f",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              textTransform: "uppercase",
              backgroundColor: "#d97706",
              color: "#1e3a5f",
              padding: "8px 20px",
              fontWeight: 700,
            }}
          >
            {project.category}
          </div>
          <div
            style={{
              fontSize: "18px",
              backgroundColor: "#334155",
              color: "#ffffff",
              padding: "8px 20px",
              fontWeight: 700,
            }}
          >
            {project.year}
          </div>
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
            marginBottom: "24px",
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            marginBottom: project.cost ? "12px" : "auto",
          }}
        >
          {`Client: ${project.client}`}
        </div>
        {project.cost ? (
          <div
            style={{
              fontSize: "24px",
              color: "#d97706",
              fontWeight: 700,
              marginBottom: "auto",
            }}
          >
            {`Rs. ${project.cost} Lakhs`}
          </div>
        ) : null}
        <div
          style={{
            fontSize: "20px",
            color: "#64748b",
          }}
        >
          Vadalkar And Associates
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
