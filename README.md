# Next.js + Payload CMS starter (Vercel, Neon, Blob)

A reusable website starter. The first instance is **Monarch Architects**, a fictional architecture studio (Turkish default, English second). All people, projects, numbers and contact details in the demo are invented.

* Next.js 16 (App Router) + React 19 · Payload 3.94.1 embedded · Lexical rich text
* Vercel · Neon Postgres (database) · Vercel Blob (media)
* Tailwind CSS v4 · GSAP + Lenis motion · a WebGL shader hero (ported from the `web-effects` repo)
* Native Payload localization (`tr` default, `en`), controlled page-builder blocks

> **Status:** see [`docs/HANDOFF.md`](docs/HANDOFF.md) for exactly what is done, verified, and still open.

## Local setup

Needs a Postgres database (a free Neon branch, or a local Postgres).

```bash
pnpm install --ignore-workspace
cp .env.example .env            # set PAYLOAD_SECRET and DATABASE_URL
pnpm migrate                    # applies src/migrations to DATABASE_URL
pnpm seed                       # fictional bilingual demo content + 11 photos (to ./media without a Blob token)
pnpm dev                        # http://localhost:3000  (redirects / → /tr)
```

`/admin` → first visit shows Payload's “create first user” form. **The first user becomes `admin`.** Registration is closed as soon as one user exists. Never ship default credentials.

`pnpm seed` **deletes all content collections (not users, not contact messages)** before re-creating them. That is the “reset demo content” command.

## Scripts

| Script | Purpose |
|---|---|
| `dev` | Next dev server |
| `migrate`, `migrate:create <name>` | Apply / create Payload (Drizzle) migrations |
| `seed` | Reset + seed demo content in the database `DATABASE_URL` points at |
| `generate:types`, `generate:importmap` | Payload types, admin import map |
| `build`, `vercel-build` | Next build; migrate + build (what Vercel runs) |
| `lint` | ESLint |
| `test-db:create` | Create a local throwaway Postgres database and print `TEST_DATABASE_URL` |
| `test:int`, `test:e2e`, `test` | Vitest integration tests; Playwright end-to-end tests; both (see Testing) |

**Schema changes ship as migrations** (`pnpm payload migrate:create <name>`); dev auto-push is disabled (`push: false`). Drizzle may ask “created or renamed?” interactively — in a non-interactive shell, answer via a TTY.

## Architecture

```
src/config/        locales.ts (single place for languages) · brand.ts (source-level brand preset)
src/collections/   Users (admin/editor roles) · Media · Pages · Services · Projects · Posts · Categories · ContactSubmissions
src/globals/       SiteSettings · HomePage · Services/Projects/Journal landings · ContactPage
src/blocks/        10 page-builder blocks (Hero, Rich text, Text+Image, Gallery, Stats, Services, Projects, Testimonials, CTA, FAQ)
src/app/(frontend)/[locale]/…   public routes, one tree for every language
src/components/    layout (Shell, Header, Footer…), home sections, blocks renderer, ui
src/lib/           queries (locale-explicit, no silent fallback), seo, i18n dictionary, motion
seed/              fictional content + photos      scripts/seed.ts   seed runner
```

Three concerns stay separate: **starter structure** (routes, schema, blocks), **brand preset** (`src/app/(frontend)/styles.css` tokens + `brand.ts`), **client content** (Payload). To start a client project: copy the repo, replace tokens/brand config/seed content, delete unused blocks/modules (`brandConfig.modules`).

### Localization policy
`fallback: false`. A missing translation is **not** silently replaced by Turkish: documents without a title in the requested language are treated as not translated (404 / hidden from lists). Fixed UI strings live in `src/lib/i18n/dictionary.ts`; editorial content lives in Payload. Page-builder blocks localise per *field*, so sections are added/reordered once and translated per language.

### Draft / preview / caching
Pages, services, projects, posts and the home page have drafts. Visitors only see published content. Admin **Preview** opens `/api/preview?path=…`, which requires a valid admin session (and `PREVIEW_SECRET` if set), enables Next Draft Mode, and redirects to a local path only. A banner shows while previewing.

**Live Preview** (admin edit view → *Live Preview* toggle) shows the page in an iframe next to the form, with Mobile/Tablet/Laptop widths, and follows your edits: pages, services, projects, posts and the home page autosave drafts (every ~1 s) and the iframe refreshes after each autosave (`<LivePreviewListener />` in the locale layout → `RefreshRouteOnSave`). The iframe loads the same `/api/preview` route (session required, Draft Mode), so what you see is the draft; visitors still only see published content. Autosaves never purge the public cache (`src/lib/revalidate.ts`). The landing pages (services/projects/blog/contact) have no drafts: their preview updates when you save, which publishes. Public routes are prerendered and cached (ISR). Any content change runs `revalidatePath('/', 'layout')` from collection/global `afterChange` hooks (`src/lib/revalidate.ts`), so published edits appear on the next request. Filters and pagination are path segments (`/projects/type/x`, `/blog/category/x/page/2`), not query strings, so they stay static.

### Contact form
`POST /api/contact` validates server-side, applies a honeypot and a minimum-time check, and stores the message via the Local API. The collection denies all public access (REST/GraphQL); only staff can read. **No e-mail is sent** — delivery is intentionally not implemented.

### Images
Every upload (admin, API or seed) is resized **once, at upload time,** with `sharp` into 480/800/1200/1600 px WebP copies (`imageSizes` in `src/collections/Media.ts`; sizes larger than the original are skipped). They are stored next to the original in the same storage (Vercel Blob now; S3/R2 or disk work the same), and pages pick one via `srcset`/`sizes` (`src/lib/media.ts`, `Photo`). No per-request image service is involved, so this is host-independent; Next's image optimizer is not used. Crop/focal point are off: images keep their natural ratio. Upload originals at ≤ 2400 px.

Media uploaded before the sizes existed has no `srcset` (it falls back to the original). Generate the missing sizes with `DRY_RUN=1 pnpm media:sizes` (preview) and then `pnpm media:sizes` against the environment's `DATABASE_URL` + `BLOB_READ_WRITE_TOKEN`; it re-uploads each original like the admin's *Replace file*. `ALL=1` regenerates every image (after changing widths or quality).

## Deploying to Vercel + Neon

1. **Neon**: create a project; copy the **pooled** connection string (host contains `-pooler`).
2. **Vercel**: import the repo. Framework preset Next.js. **Build command: `pnpm vercel-build`** (applies migrations, then builds — the build prerenders pages from the database, so migrations must run first). Pick a Vercel region close to the Neon region.
3. **Blob**: Storage tab → create a **public** Blob store and connect it to the project (this adds `BLOB_READ_WRITE_TOKEN`).
4. **Environment variables**: `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL` (production origin). Optional: `PREVIEW_SECRET`.
5. First deploy, then seed once from your machine with the production values (this **wipes content collections**): `DATABASE_URL=… BLOB_READ_WRITE_TOKEN=… PAYLOAD_SECRET=… pnpm seed`, and redeploy (or edit any content) so cached pages pick up the data. Then create the first admin at `/admin`.

## Testing

The tests **create and delete data**, and your `.env` or `.env.local` may point at the real database. So they only run against an explicit throwaway database, and refuse to start if `TEST_DATABASE_URL` equals `DATABASE_URL`:

```bash
# Create a local throwaway DB (password entry is hidden), then copy the printed line into .env.local
pnpm test-db:create
pnpm test:int     # ~10 s: access control, drafts, translations (no fallback), revalidation hook, dictionary parity, URL helpers
pnpm test:e2e     # ~5 min: resets + migrates + seeds the test DB, builds, starts the app, then drives Chromium
```

The database helper requires PostgreSQL's `createdb` and `dropdb` commands on `PATH`. The database name is always explicit. The reusable PowerShell script accepts `-Name`, `-Delete`, `-EnvVariable`, `-HostName`, `-Port`, and `-UserName`; it only allows localhost/loopback hosts. For example, run `New-PostgresDatabase.ps1 -Name another_project_test` to create a database, or add `-Delete` to delete that exact database. Deletion does not force-close active connections or allow deleting `postgres`, `template0`, or `template1`. The tests load `.env.local` before `.env`, so the printed line works in either file.

* `test:int` resets the test database (`payload run` drop + `payload migrate`) and uses the Local API with real access rules.
* `test:e2e` runs against a **production build** (`tests/e2e/server.mjs`, port 3100, local disk media, no Blob token, no preview secret). It covers routing/locale behaviour, the home loader (including a failing hero image), contact API validation and honeypot, anonymous access, preview auth/open-redirect, admin sign-in, and that publishing an edit refreshes the cached public page while a saved draft does not.
* The same suite covers both editions: URLs go through `tests/helpers/edition.ts`, and edition-specific tests skip themselves.
* **CI** (`.github/workflows/ci.yml`): GitHub Actions runs type-check, lint, `test:int` and `test:e2e` on every push to **`main` only** (and on a manual run, which refuses to run off `main`). It needs no secrets: the tests use a throwaway Postgres service container. Failed runs upload `test-results/` and `playwright-report/` as an artifact. Other branches are not tested by CI; run the suite locally there.
* **Schema drift guard** (`tests/int/schema.int.spec.ts`): fails when the collections plus the installed Payload/Drizzle versions would generate a migration that is not committed. It is what stops an automatic dependency update from reaching production with a changed schema.
* **Automatic dependency updates** (`.github/workflows/dependency-updates.yml`): runs every day (edit the `cron` line for weekly; it can also be started from the Actions tab). It looks up newer versions on the npm registry and splits them into candidates: minor/patch per lockstep group (`payload` + `@payloadcms/*`, `next`, `react`, `tailwind`, ...), minor/patch of everything else, **major updates (the newest major, plus the next major step when they differ, so a too-new major cannot block the step before it)**, and a lockfile refresh. Each candidate is applied on top of `main` and tested on its own in parallel (type-check, lint, integration + e2e tests). The ones that pass are combined, tested once more and committed straight to `main` by `github-actions[bot]`; if `main` is protected it opens a PR with auto-merge instead, and if the combination with majors fails it falls back to the minor/patch updates only. A major that fails is left out, reported in the run summary and in an issue (*Dependency updates need attention*), and is not retried until a newer version of that package appears (or until you run the workflow with *retry_failed*). Settings (lockstep groups, ignored packages, majors that must not move such as `@types/node`) live in `scripts/deps/config.json`. Note that a push by the bot deploys to Vercel like any other push, and does not trigger `ci.yml` (the exact tree was just tested).
* First-time Playwright setup: `pnpm exec playwright install chromium` (the CI image already has it).

## Limitations (also in the handoff)
Verified locally on Postgres: migration, seed, production build, edit→cache refresh. Not yet verified on Vercel/Neon/Blob (see `docs/HANDOFF.md`). Content-completeness indicator, email delivery are not built.
