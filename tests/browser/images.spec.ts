import { test, expect } from "./fixtures";
import { projects } from "../../src/data/projects";

test("image optimization is limited to this site's Sanity dataset", async ({ request }) => {
  const localImage = projects.find((project) => project.image?.endsWith(".jpg"))!.image!;
  const filename = `${Buffer.from(localImage).toString("hex")}-1200x800.jpg`;
  const allowed = await request.get("/_next/image", {
    params: { url: `https://cdn.sanity.io/images/offline/test/${filename}`, w: 640, q: 75 },
  });
  expect(allowed.status()).toBe(200);
  expect(allowed.headers()["content-type"]).toMatch(/^image\//);

  for (const path of ["another-project/test", "offline/another-dataset"]) {
    const disallowed = await request.get("/_next/image", {
      params: { url: `https://cdn.sanity.io/images/${path}/${filename}`, w: 640, q: 75 },
    });
    expect(disallowed.status()).toBe(400);
  }
});
