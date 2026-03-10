import { ImageResponse } from "next/og";
import { categories, categorySlug, projects } from "@/data/projects";

export const alt = "Vadalkar And Associates - Project Category";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const categoryList = categories.filter((c) => c !== "All");

export function generateStaticParams() {
  return categoryList.map((cat) => ({ category: categorySlug(cat) }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = categoryList.find((c) => categorySlug(c) === slug);
  const categoryName = category ?? slug;
  const count = projects.filter((p) => p.category === category).length;

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
            fontSize: "24px",
            color: "#d97706",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: "24px",
          }}
        >
          Project Portfolio
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          {categoryName}
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            marginBottom: "auto",
          }}
        >
          {`${count} project${count !== 1 ? "s" : ""} completed`}
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "#d97706",
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
