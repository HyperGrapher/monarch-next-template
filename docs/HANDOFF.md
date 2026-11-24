# Handoff — Monarch Architects starter

Branch: `main` (deployed to Vercel: https://monarch-next-template.vercel.app). Stack: Next 16.4.6 · React 19.2.9 · Payload 3.94.1 · **Neon Postgres** (`@payloadcms/db-postgres`) · **Vercel Blob** (`@payloadcms/storage-vercel-blob`). Source brief: [`monarch-architects-starter-prompt.md`](monarch-architects-starter-prompt.md). Design reference: the `web-effects` repo.

History: the site first ran on Cloudflare Workers + D1 + R2 (OpenNext). The Free plan's 10 ms CPU limit caused Error 1102 on the admin and uncached routes even after ISR caching, so it was moved to Vercel + Neon + Blob. The last Cloudflare version is commit `8c75093`.

## How to resume
```bash
pnpm install --ignore-workspace
cp .env.example .env          # DATABASE_URL (Neon pooled), PAYLOAD_SECRET; BLOB_READ_WRITE_TOKEN optional locally
pnpm migrate && pnpm seed && pnpm dev     # http://localhost:3000/tr
```
Without `BLOB_READ_WRITE_TOKEN`, uploads/seed images go to `./media` (gitignored, local only — never seed production that way). `pnpm seed` **wipes content collections** of whatever `DATABASE_URL` points at. Vercel build command is `pnpm vercel-build` (migrate, then build; the build prerenders from the DB).

## Done and verified
* CMS: Users (admin/editor), Media, Pages, Services, Projects, Posts, Categories, ContactSubmissions; globals SiteSettings, HomePage, landings, ContactPage; 10 blocks; localization `tr` (default) + `en`, `fallback:false`; drafts/versions.
* Public site: `[locale]` routes (home with WebGL hero, services, projects, journal, pages, contact, 404/error, language switcher, hreflang/canonical/OG, sitemap, robots, JSON-LD). Checked earlier in a real browser at 1440×900 and 390×844.
* Caching: all public routes are prerendered (ISR). Content changes call `revalidatePath('/', 'layout')` from `afterChange`/`afterDelete` hooks (`src/lib/revalidate.ts`). Filters/pagination are path segments (`/projects/type/x`, `/blog/category/x/page/2`) so they stay static.
* Postgres: fresh migrations in `src/migrations` (`initial`, `blob_object_key`, `publish_home_page` — data only, see `docs/CODE-REVIEW.md`). Verified locally on Postgres 16: migrate, seed, build, start, edit → cached page refreshes.
* Live check (Vercel): pages `x-vercel-cache: PRERENDER` (~0.3–0.5 s), images from the Blob CDN, `/tr/yok` 404, `/api/users` 403 anonymous, sitemap/robots OK, 6 projects in the API.
* Security (checked on the Cloudflare build, same code): anonymous cannot read/create submissions or list users; registration closes after the first user; editor cannot create/delete users or self-promote; draft content is 404 publicly; `/api/preview` needs a session and rejects `//evil.com`; honeypot returns silent success.
* Fixed after the move: `projects.status` renamed `buildStatus` (collided with Payload's `_status` Postgres enum); OG image URL for Blob images was `https://site.comhttps://…` — now uses `absoluteUrl()` in `src/lib/seo.ts` (blog JSON-LD too).

## NOT done / not verified
1. **Admin on Vercel**: first-admin creation worked (user did it); admin edit → public page refresh, media upload, preview mode, and the contact form have not been verified on the live site by the agent (no admin login). Admin latency / Neon cold starts / function region not measured.
2. **Single-language edition**: the `single-language` branch is being retired (all branches except `main` will be deleted). The code stays edition-aware (`src/config/locales.ts`, `tests/helpers/edition.ts`), so a single-language site can be recreated by editing `locales.ts`, the clean-URL rewrites and new migrations. **Vercel Preview deployments share the production database and `vercel-build` migrates**, so any pushed branch with a migration changes production.
3. Not built: translation-completeness indicator, Payload admin Turkish UI translation, email delivery for the contact form, WebSite/BreadcrumbList/Organization JSON-LD, rate limiting beyond honeypot/min-time, per-locale slugs (shared by design).
4. Tests: `pnpm test:int` (vitest, Local API, real access rules) and `pnpm test:e2e` (Playwright against a production build) exist and pass; they need `TEST_DATABASE_URL` (throwaway DB; they refuse to run if it equals `DATABASE_URL`). CI: GitHub Actions (`.github/workflows/ci.yml`) runs tsc, lint, `test:int` and `test:e2e` on pushes to `main` only (Postgres service container, no secrets); the steps were replayed from a pristine clone locally, the first GitHub run is the real proof. A schema-drift test (`tests/int/schema.int.spec.ts`) fails if the schema changes without a committed migration. Contact-form email, rate limiting and a11y/perf are untested.
5. Performance budgets (LCP, JS size) and accessibility audit (contrast, 200% zoom, screen reader) not measured; reduced motion is ported but only reviewed.
6. Old `?type=` / `?category=` / `?page=` query URLs no longer filter (replaced by path segments).
7. Vercel Hobby is non-commercial only; a client site needs Pro.

## Automatic dependency updates
`.github/workflows/dependency-updates.yml` (daily 04:23 UTC; change the cron for weekly): plan → test every candidate in parallel → combine the passing ones, test again, commit to `main` (PR + auto-merge fallback if `main` is protected). Candidates: minor/patch per lockstep group, minor/patch of the rest, majors (the newest major plus the next major step when they differ, e.g. TypeScript 7 and 6; the highest passing one wins), lockfile refresh. Use *Run workflow*, not *Re-run jobs*, after changing the workflow: a re-run uses the workflow file of the original commit. Failing majors are reported (run summary + issue "Dependency updates need attention") and not retried until a newer version exists (cache `deps-failed-*`; manual run input `retry_failed` ignores it). Scripts in `scripts/deps/` (plain Node, registry metadata only, no third-party tool); settings in `scripts/deps/config.json`. Shared steps: `.github/actions/{setup,verify}` (also used by `ci.yml`). CI runs on Node 26 (`.github/actions/setup`) with Node-24-based action versions (checkout v7, setup-node v7, cache v6, upload-artifact v7, download-artifact v8, pnpm/action-setup v6); Vercel's Node version is a separate project setting and should match what CI tests. Each candidate writes `result/<id>.json` (unique names: the merge job downloads all of them into one folder). `tsconfig.json` has no `baseUrl` (removed in TS 7; `paths` are relative). TypeScript 7 is still blocked by typescript-eslint (`lint` fails). Bot pushes use `GITHUB_TOKEN`, so they deploy on Vercel but do not trigger `ci.yml`. Not verified on GitHub yet: the first real run (the planner, combine step and a candidate were replayed locally; `actionlint` is clean). If the repo's *Settings → Actions → General → Workflow permissions* is read-only it still works (the job asks for `contents: write`); PR fallback needs *Allow GitHub Actions to create pull requests*.

## Live Preview (merged from `live-admin-preview`)
`livePreview()` / `autosaveDrafts` / `requestOrigin()` in `src/lib/preview.ts`, set per collection/global (`admin.livePreview`). The iframe URL must be **absolute** (the admin posts messages with it as target origin; a relative URL throws) and same-origin (the session cookie must reach `/api/preview`), so it is built from the request host, not from `NEXT_PUBLIC_SITE_URL`. `<LivePreviewListener />` (client, only rendered in Draft Mode, only active inside an iframe, adds `html[data-embedded]` which hides the draft banner) calls `router.refresh()` on Payload's `payload-document-event` (Payload checks the message origin exactly = `window.location.origin`). Drafts autosave (`versions.drafts.autosave`, 1 s) so unsaved typing shows up; this added `autosave` columns to the `_*_v` tables (migration `live_preview_autosave`, additive). `revalidateAfterChange` skips autosaves. In Payload 3.94 Live Preview is a toggle (`#live-preview-toggler`) inside the edit view, not a tab/route. The landing globals have no drafts, so their preview updates on save (= publish). E2E: `admin.e2e.spec.ts` drives the real admin UI. If Playwright's browser build differs from the one installed (dependency bot bumps `@playwright/test`), run `pnpm exec playwright install chromium`.

## Gotchas learned
* Array/block row `id`s are table-wide primary keys — seed namespaces them per document (`scripts/seed.ts: scope()`); keep ids identical across locales.
* `payload run` exits when the module finishes loading → seed uses top-level `await`.
* `migrate:create` can prompt interactively (“created or renamed?”) → needs a TTY. Switching storage adapters can add columns (Blob adds `media._objectKey`) → create a migration.
* `src/app/(payload)/admin/importMap.js` must be regenerated (`pnpm generate:importmap`) when adapters change; the Blob plugin only registers when `BLOB_READ_WRITE_TOKEN` is set, and the token must look like `vercel_blob_rw_<id>_<secret>`.
* Draft/Postgres enum names derive from field names: don't name a select field `status` on a collection with drafts.
* Without `sharp`, Payload does not compute image width/height → Media `beforeChange` hook uses `image-size`.
* Hero WebGL images load with CORS (needed for Blob CDN); loader has an 8 s safety timeout and a fallback if an image fails.
* Next 16: `params`/`searchParams` are Promises; route types live in `src/lib/route.ts`. Read `node_modules/next/dist/docs/` before changing Next conventions (see `AGENTS.md`).
* `neon.ts` / `@neon/config` come from `neon init`; the app itself only uses `DATABASE_URL`.

## Gotchas (added with the tests / single-language work)
* Next matches dynamic routes **before** `fallback` rewrites (relevant to the single-language edition's clean-URL rewrite: it must be `afterFiles`, excluding `/admin` and `/api`).
* `payload.db.migrate()` cannot load the migration `.ts` files under vitest (type-only named imports); tests shell out to the `payload` CLI. `payload migrate:fresh --force-accept` still prompts, so the test reset uses `dropDatabase` + `migrate`.
* Playwright's `request` context keeps cookies: after `first-register` it is signed in. Use fresh contexts for anonymous checks.
* `generate:types` / `migrate:create` without `BLOB_READ_WRITE_TOKEN` drop the Blob `_objectKey` column/type. Use a dummy `vercel_blob_rw_dummy_x` token when generating, and never commit a `payload-types.ts` that lost `_objectKey`.

## Suggested next steps
0. Work through `docs/CODE-REVIEW.md` (full review with a checklist; step 1 is done).
1. Check the first CI run on GitHub (Actions tab); consider branch protection / requiring the check before deploys if you want CI to gate Vercel.
2. Completeness indicator, extra structured data, email provider if wanted.
3. A single-language edition, if a client needs one: edit `src/config/locales.ts`, add clean-URL rewrites, generate migrations on its own Neon DB + Vercel project.
