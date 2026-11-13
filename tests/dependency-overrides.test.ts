import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join, resolve } from "node:path";
import test from "node:test";

// Resolve from each consumer so these exercise the overridden dependency,
// including nested installs, rather than an unrelated root copy.
const require = createRequire(import.meta.url);
const fromPackage = (name: string) =>
  createRequire(resolve("node_modules", name, "package.json"));

test("CLI and TypeScript lint consumers retain glob matching semantics", () => {
  for (const name of ["@oclif/core", "@typescript-eslint/typescript-estree"]) {
    const { minimatch } = fromPackage(name)("minimatch");
    assert.equal(minimatch("@sanity/cli", "@sanity/*"), true);
    assert.equal(minimatch("other/cli", "@sanity/*"), false);
    assert.equal(minimatch("src/page.tsx", "src/**/*.{ts,tsx}"), true);
    assert.equal(minimatch(".config.ts", "*.ts", { dot: true }), true);
    assert.equal(minimatch(".config.ts", "*.ts"), false);
  }
});

test("archive expansion and rimraf retain sync and async glob support", async (t) => {
  mkdirSync(".cache", { recursive: true });
  const root = mkdtempSync(resolve(".cache/dependency-glob-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const name of ["first.txt", "second.txt", "keep.json"]) {
    writeFileSync(join(root, name), name);
  }
  const { file } = require("archiver-utils");
  assert.deepEqual(file.expand({ cwd: root }, ["*.txt", "!second.txt"]), ["first.txt"]);
  const { rimraf, rimrafSync } = require("rimraf");
  await rimraf("first.*", { glob: { cwd: root } });
  rimrafSync("second.*", { glob: { cwd: root } });
  assert.deepEqual(file.expand({ cwd: root }, "*"), ["keep.json"]);
});

test("Sanity CLI ZIP reader can read and extract an archiver ZIP", async (t) => {
  mkdirSync(".cache", { recursive: true });
  const root = mkdtempSync(resolve(".cache/dependency-zip-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const archive = require("archiver")("zip");
  const chunks: Buffer[] = [];
  const finished = new Promise<Buffer>((resolve, reject) => {
    archive.on("data", (chunk: Buffer) => chunks.push(chunk));
    archive.on("end", () => resolve(Buffer.concat(chunks)));
    archive.on("error", reject);
  });
  archive.append("local fixture only", { name: "nested/fixture.txt" });
  await archive.finalize();
  const AdmZip = fromPackage("@sanity/runtime-cli")("adm-zip");
  const zip = new AdmZip(await finished);
  assert.equal(zip.getEntry("nested/fixture.txt").getData().toString(), "local fixture only");
  zip.extractAllTo(root);
  assert.equal(readFileSync(join(root, "nested/fixture.txt"), "utf8"), "local fixture only");
});
