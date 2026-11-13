// Loaded only by the local browser-test launcher, never by the application.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import http from "node:http";
import https from "node:https";
import dns from "node:dns";
import { EventEmitter } from "node:events";
import { Readable } from "node:stream";
import { syncBuiltinESMExports } from "node:module";
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
const isLoopback = (hostname) => ["localhost", "127.0.0.1", "::1", "[::1]"].includes(hostname);

function fixtureImage(url) {
  if (url.hostname !== "cdn.sanity.io" || !url.pathname.startsWith("/images/offline/test/")) return null;
  const encoded = url.pathname.split("/").pop().split("-")[0];
  const localPath = Buffer.from(encoded, "hex").toString();
  if (!localProjects.some((project) => project.image === localPath)) throw new Error("Unknown offline image");
  return {
    body: readFileSync(new URL(`public${localPath}`, root)),
    headers: { "content-type": localPath.endsWith(".gif") ? "image/gif" : "image/jpeg" },
  };
}

// Next's optimizer uses native HTTP and DNS, independently of global fetch.
// This address is only a fixture: no request or socket is opened to it.
const imageAddress = { address: "93.184.216.34", family: 4 };
const originalLookup = dns.lookup.bind(dns);
const originalPromiseLookup = dns.promises.lookup.bind(dns.promises);
dns.promises.lookup = async (hostname, options) => {
  if (isLoopback(hostname)) return originalPromiseLookup(hostname, options);
  if (hostname !== "cdn.sanity.io") throw new Error(`External DNS blocked by offline tests: ${hostname}`);
  return options?.all ? [imageAddress] : imageAddress;
};
dns.lookup = (hostname, options, callback) => {
  if (isLoopback(hostname)) return originalLookup(hostname, options, callback);
  const done = typeof options === "function" ? options : callback;
  queueMicrotask(() => {
    if (hostname !== "cdn.sanity.io") return done(new Error(`External DNS blocked by offline tests: ${hostname}`));
    if (options?.all) done(null, [imageAddress]);
    else done(null, imageAddress.address, imageAddress.family);
  });
};
for (const transport of [http, https]) {
  const originalRequest = transport.request.bind(transport);
  transport.request = (input, options, callback) => {
    const url = typeof input === "string" || input instanceof URL
      ? new URL(input)
      : new URL(`${input.protocol || (transport === https ? "https:" : "http:")}//${input.hostname || input.host || "localhost"}${input.port ? `:${input.port}` : ""}${input.path || "/"}`);
    if (isLoopback(url.hostname)) return originalRequest(input, options, callback);
    const fixture = fixtureImage(url);
    if (!fixture) throw new Error(`External HTTP blocked by offline tests: ${url.hostname}`);
    const request = new EventEmitter();
    const done = typeof options === "function" ? options : callback;
    request.end = () => {
      queueMicrotask(() => {
        const response = Readable.from([fixture.body]);
        response.statusCode = 200;
        response.headers = fixture.headers;
        done?.(response);
        request.emit("response", response);
      });
      return request;
    };
    return request;
  };
  transport.get = (...args) => transport.request(...args).end();
}
syncBuiltinESMExports();

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
  const fixture = fixtureImage(url);
  if (fixture) return new Response(fixture.body, { headers: fixture.headers });
  if (isLoopback(url.hostname)) {
    return originalFetch(input, init);
  }
  throw new Error(`External fetch blocked by offline tests: ${url.hostname}`);
};

// Next's font test hook keeps builds offline; system Arial is only a test substitute.
process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES = fileURLToPath(new URL("fonts.cjs", import.meta.url));
