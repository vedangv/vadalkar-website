// Loaded only by the local browser-test launcher, never by the application.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { require as requireTypeScript } from "tsx/cjs/api";

const root = new URL("../../", import.meta.url);
const { projects: localProjects } = requireTypeScript("../../src/data/projects.ts", import.meta.url);
const documents = readFileSync(new URL("data.ndjson", root), "utf8")
  .trim().split("\n").map((line) => JSON.parse(line));
const projects = localProjects.map((project) => ({
  ...project,
  updatedAt: "2026-01-01T00:00:00Z",
  image: project.image ? {
    asset: { _ref: `image-${Buffer.from(project.image).toString("hex")}-1200x800-jpg` },
  } : undefined,
})).sort((a, b) => b.year.localeCompare(a.year));

const originalFetch = globalThis.fetch;
globalThis.fetch = async (input, init) => {
  const url = new URL(typeof input === "string" || input instanceof URL ? input : input.url);
  if (url.hostname === "offline.api.sanity.io" && url.pathname.includes("/data/query/")) {
    const query = url.searchParams.get("query") || "";
    let result;
    if (query.includes('_type == "project"')) {
      const slug = url.searchParams.get("$slug");
      result = slug ? projects.find((project) => project.slug === JSON.parse(slug)) || null : projects;
    } else {
      result = documents.find((document) => query.includes(`_type == "${document._type}"`)) || null;
    }
    return Response.json({ result, ms: 0, query });
  }
  if (url.hostname === "cdn.sanity.io" && url.pathname.startsWith("/images/offline/")) {
    const encoded = url.pathname.split("/").pop().split("-")[0];
    const localPath = Buffer.from(encoded, "hex").toString();
    if (!localProjects.some((project) => project.image === localPath)) {
      throw new Error("Unknown offline image");
    }
    return new Response(readFileSync(new URL(`public${localPath}`, root)), {
      headers: { "Content-Type": localPath.endsWith(".gif") ? "image/gif" : "image/jpeg" },
    });
  }
  if (["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) {
    return originalFetch(input, init);
  }
  throw new Error(`External fetch blocked by offline tests: ${url.hostname}`);
};

// Next's font test hook keeps builds offline; system Arial is only a test substitute.
process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES = fileURLToPath(new URL("fonts.cjs", import.meta.url));
