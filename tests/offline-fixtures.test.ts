import { test } from "node:test";
import { execFileSync } from "node:child_process";

test("offline previews mock images and block external fetch, HTTP, and DNS", () => {
  // Keep global transport patches isolated from the route/unit test processes.
  execFileSync(process.execPath, [
    "--import", new URL("./fixtures/offline.mjs", import.meta.url).href,
    "--input-type=module", "-e", `
      import assert from "node:assert/strict";
      import { get } from "node:https";
      import { request } from "node:http";
      import { lookup } from "node:dns/promises";
      import { readFileSync } from "node:fs";
      import { require as requireTypeScript } from "tsx/cjs/api";
      const { projects } = requireTypeScript("./src/data/projects.ts", import.meta.url);
      const path = projects.find(project => project.image)?.image;
      const url = "https://cdn.sanity.io/images/offline/test/" + Buffer.from(path).toString("hex") + "-1200x800.jpg";
      const expected = readFileSync("public" + path);
      assert.deepEqual(Buffer.from(await (await fetch(url)).arrayBuffer()), expected);
      const native = await new Promise((resolve, reject) => {
        get(url, async response => {
          try {
            const chunks = [];
            for await (const chunk of response) chunks.push(chunk);
            resolve(Buffer.concat(chunks));
          } catch (error) { reject(error); }
        }).on("error", reject);
      });
      assert.deepEqual(native, expected);
      assert.equal((await lookup("cdn.sanity.io")).family, 4);
      await assert.rejects(lookup("example.invalid"), /External DNS blocked/);
      await assert.rejects(fetch("https://example.invalid/"), /External fetch blocked/);
      assert.throws(() => get("https://example.invalid/"), /External HTTP blocked/);
      assert.throws(() => request({ hostname: "example.invalid", path: "/" }), /External HTTP blocked/);
      assert.throws(() => get("https://cdn.sanity.io/images/another-project/test/image.jpg"), /External HTTP blocked/);
    `,
  ], { stdio: "pipe" });
});
