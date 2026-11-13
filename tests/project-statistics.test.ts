import assert from "node:assert/strict";
import test from "node:test";
import { getProjectStatistics } from "../src/lib/project-statistics.ts";

test("statistics count only represented sectors and retain new CMS categories", () => {
  const result = getProjectStatistics([
    { category: "Residential", year: "1999", featured: true },
    { category: "Residential", year: "2000" },
    { category: "New sector", year: "2024", featured: true },
    { category: "", year: "Unknown" },
  ]);
  assert.equal(result.totalProjects, 4);
  assert.equal(result.sectorsServed, 2);
  assert.equal(result.featuredProjects, 2);
  assert.deepEqual(result.categories.slice(0, 2), [
    { name: "Residential", count: 2 }, { name: "New sector", count: 1 },
  ]);
  assert.deepEqual(result.decades, [
    { label: "1990s", count: 1 }, { label: "2000s", count: 1 },
    { label: "2010s", count: 0 }, { label: "2020s", count: 1 },
  ]);
});

test("an empty portfolio does not claim experience in sectors with no projects", () => {
  const result = getProjectStatistics([]);
  assert.equal(result.totalProjects, 0);
  assert.equal(result.sectorsServed, 0);
  assert.equal(result.featuredProjects, 0);
  assert.ok(result.categories.every(({ count }) => count === 0));
  assert.ok(result.decades.every(({ count }) => count === 0));
});
