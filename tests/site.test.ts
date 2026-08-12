import assert from "node:assert/strict";
import test from "node:test";
import { absoluteUrl, serializeJsonLd, SITE_URL } from "../src/lib/site.ts";

test("builds absolute URLs from the configured site origin", () => {
  assert.equal(absoluteUrl("/projects"), `${SITE_URL}/projects`);
  assert.equal(absoluteUrl("/"), `${SITE_URL}/`);
});

test("serializes JSON-LD without a script-closing injection", () => {
  const serialized = serializeJsonLd({ title: "</script><script>alert(1)</script>" });
  assert.doesNotMatch(serialized, /<script/i);
  assert.match(serialized, /\\u003c\/script>/);
});
