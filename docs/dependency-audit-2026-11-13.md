# Dependency audit — 2026-11-13

`npm audit --json` initially reported **25 vulnerable packages: 6 high and
19 moderate**. After remediation it reports **0**. These are npm's package-level
findings, including parent packages flagged through vulnerable children, rather
than 25 independent vulnerabilities.

## Exposure and root packages

| Root dependency / affected use | Initial findings | Final findings |
| --- | --- | --- |
| Public website runtime paths identified by source inspection | 0 | 0 |
| `sanity` / `next-sanity`: Studio and preview helpers | 5 moderate | 0 |
| `sanity`: CLI, code generation, archives and filesystem tooling | 6 high, 8 moderate | 0 |
| `eslint-config-next`: TypeScript lint tooling | 6 moderate | 0 |
| **Total** | **6 high, 19 moderate** | **0** |

The Studio/preview group comprised `uuid`, `@sanity/uuid`,
`@sanity/preview-url-secret`, `@sanity/visual-editing`, and `next-sanity`.
The CLI group comprised `@oclif/core`, `@oclif/plugin-help`, `@sanity/cli`,
`@sanity/codegen`, `@sanity/runtime-cli`, `adm-zip`, `archiver`, `archiver-utils`,
`glob`, `minimatch`, `rimraf`, `sanity`, `zip-stream`, and `zod`.
The lint group comprised `typescript-eslint` and its `eslint-plugin`, `parser`,
`type-utils`, `typescript-estree`, and `utils` packages. Shared `minimatch` is
counted once in the CLI group, although it also affects lint tooling.

The public site imports the query client and webhook helpers from `next-sanity`.
Its vulnerable preview chain belongs to the embedded `/studio` authoring route
and preview functionality. `src/sanity/lib/live.ts` is not imported by the site.
The UUID wrapper calls v4; the original UUID advisory concerns v3/v5/v6 buffer
handling. This is an exposure classification from source inspection, not a claim
that an audit proves the site free of vulnerabilities.

`npm audit --omit=dev --json` initially reported **19** (6 high, 13 moderate),
because Sanity's Studio and CLI are installed through production dependencies.
That installation classification must not be mistaken for public-page execution.
The remaining six findings were dev-only. Both installation groups finish at zero.

## Changes and compatibility

1. Override `@sanity/preview-url-secret`'s pinned `@sanity/uuid` 3.0.2 with
   **3.0.3**. The wrapper still exports UUID v4 and resolves to fixed `uuid`
   **11.1.1**. Audit: **25 → 20**.
2. Override CLI `adm-zip` **0.5.18 → 0.6.1**, affected `minimatch` versions
   **→ 11.0.1**, and affected `glob` versions **→ 14.0.2**. These are the first
   patched releases for the reported ranges. Unaffected minimatch 3/5 and newer
   glob/minimatch copies are preserved. Audit: **20 → 4**.
3. Upgrade and pin `sanity` **4.22.1 → 5.8.0**. Sanity 5.7.0 still uses the old
   codegen chain; 5.8.0 selects `@sanity/codegen` 5.10.1 and Zod 4.6.7 in this
   lockfile. Keep `next-sanity` 11.6.13 and Vision 4.22.0, whose declared peers
   support Sanity 5. React already meets Sanity 5's React 19.2 requirement.
   Do not blindly override Zod 3: the old codegen accesses `ZodError.errors`,
   which is incompatible with Zod 4.
4. Sanity 5 introduces additional CLI dependencies. Scope `uuid` **10.0.0 →
   11.1.1** to `typeid-js@1.2.0`, and `basic-ftp` **5.3.1 → 6.2.4** to
   `get-uri@6.0.5`. These clear the candidate's TypeID and FTP advisories.
   Final audit: **0**.

The targeted overrides are temporary compatibility measures. Remove them as
upstream consumers adopt patched ranges, rerunning the checks below. No
`npm audit fix --force`, framework upgrade, CMS migration, or dataset change was
used. Next.js 16.4.6's installed package-bundling documentation was consulted.

Sources: [UUID advisory](https://github.com/advisories/GHSA-w5hq-g745-h8pq),
[minimatch advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249),
[glob advisory](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4),
[Zod advisory](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5),
[Sanity 5 release notes](https://github.com/sanity-io/sanity/releases/tag/v5.0.0).
Exact dependency ranges were also checked with `npm view` and `npm ls`.

## Verification

Run each command separately, with `NODE_OPTIONS=--max-old-space-size=2048`.
The unit-test concurrency argument and Playwright's existing `workers: 1`
configuration keep tests serial.

```sh
export NODE_OPTIONS=--max-old-space-size=2048
export NEXT_TELEMETRY_DISABLED=1
npm run typecheck
npm run lint
npm test -- --test-concurrency=1
npm run build:offline
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:browser
npm audit --json
npm audit --omit=dev --json
npm ls --depth=0
```

Typecheck, lint, serial unit tests, and the offline production build passed for
each dependency group (19, then 22, then 24 unit tests). Consumer tests cover
matching, archive expansion, sync/async cleanup, ZIP reading/extraction, TypeID
UUID v7 buffer generation, and Unix/MLSD FTP listing parsing. The Studio browser
check uses fabricated authentication providers and never signs in.

The final production browser suite passed **77/77 tests** in installed Chrome
(51.3 seconds), including the Studio sign-in check. Both final audit commands
exited successfully with zero findings, and `npm ls --all --json` reported no
dependency-tree problems. `npm ci --dry-run --ignore-scripts --no-audit --no-fund`
also passed, validating the lockfile without changing the installed tree.

Live CMS authentication, dataset editing, real FTP transfers, and email delivery
are deliberately unverified. `blog/`, application content, deployment settings,
and live services are unchanged. All work is local; nothing was pushed or deployed.
