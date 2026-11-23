# Monarch Architects — Next.js + Payload CMS starter (Vercel, Neon, Blob)

A reusable client-website starter. The first instance is **Monarch Architects**, a fictional architecture studio (Turkish default, English second). All people, projects, numbers and contact details in the demo are invented.

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

`pnpm seed` **deletes all content collections (not users)** before re-creating them. That is the “reset demo content” command.

## Scripts

| Script | Purpose |
|---|---|
| `dev` | Next dev server |
| `migrate`, `migrate:create <name>` | Apply / create Payload (Drizzle) migrations |
| `seed` | Reset + seed demo content in the database `DATABASE_URL` points at |
| `generate:types`, `generate:importmap` | Payload types, admin import map |
| `build`, `vercel-build` | Next build; migrate + build (what Vercel runs) |
| `lint`, `test:int`, `test:e2e` | ESLint; template tests (see Limitations) |

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
Pages, services, projects, posts and the home page have drafts. Visitors only see published content. Admin **Preview** opens `/api/preview?path=…`, which requires a valid admin session (and `PREVIEW_SECRET` if set), enables Next Draft Mode, and redirects to a local path only. A banner shows while previewing. Public routes are prerendered and cached (ISR). Any content change runs `revalidatePath('/', 'layout')` from collection/global `afterChange` hooks (`src/lib/revalidate.ts`), so published edits appear on the next request. Filters and pagination are path segments (`/projects/type/x`, `/blog/category/x/page/2`), not query strings, so they stay static.

### Contact form
`POST /api/contact` validates server-side, applies a honeypot and a minimum-time check, and stores the message via the Local API. The collection denies all public access (REST/GraphQL); only staff can read. **No e-mail is sent** — delivery is intentionally not implemented.

### Images
Payload crop/focal-point are off and Next’s image optimizer is **not** used. Upload pre-optimised WebP/AVIF (≤ 2400 px). Dimensions are read from the file header on upload (`image-size`) so layouts reserve space. Files live in Vercel Blob and are served straight from its public CDN URL (`disablePayloadAccessControl`).

## Deploying to Vercel + Neon

1. **Neon**: create a project; copy the **pooled** connection string (host contains `-pooler`).
2. **Vercel**: import the repo. Framework preset Next.js. **Build command: `pnpm vercel-build`** (applies migrations, then builds — the build prerenders pages from the database, so migrations must run first). Pick a Vercel region close to the Neon region.
3. **Blob**: Storage tab → create a **public** Blob store and connect it to the project (this adds `BLOB_READ_WRITE_TOKEN`).
4. **Environment variables**: `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL` (production origin). Optional: `PREVIEW_SECRET`.
5. First deploy, then seed once from your machine with the production values (this **wipes content collections**): `DATABASE_URL=… BLOB_READ_WRITE_TOKEN=… PAYLOAD_SECRET=… pnpm seed`, and redeploy (or edit any content) so cached pages pick up the data. Then create the first admin at `/admin`.
6. Vercel Hobby is non-commercial; use Pro for a client site.

## Limitations (also in the handoff)
Verified locally on Postgres: migration, seed, production build, edit→cache refresh. Not yet verified on Vercel/Neon/Blob (see `docs/HANDOFF.md`). Admin live-preview iframe, content-completeness indicator, email delivery, and the single-language branch are not built. The template’s `tests/` still target the old Payload starter page.
