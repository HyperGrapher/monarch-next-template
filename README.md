# Monarch Architects — Next.js + Payload CMS starter (Cloudflare Workers, D1, R2)

A reusable client-website starter. The first instance is **Monarch Architects**, a fictional architecture studio (Turkish default, English second). All people, projects, numbers and contact details in the demo are invented.

* Next.js 16 (App Router) + React 19 · Payload 3.94.1 embedded · Lexical rich text
* Cloudflare Workers via OpenNext · D1 (database) · R2 (media)
* Tailwind CSS v4 · GSAP + Lenis motion · a WebGL shader hero (ported from the `web-effects` repo)
* Native Payload localization (`tr` default, `en`), controlled page-builder blocks

> **Status:** see [`docs/HANDOFF.md`](docs/HANDOFF.md) for exactly what is done, verified, and still open.

## Local setup (no Cloudflare account needed)

```bash
pnpm install --ignore-workspace
cp .env.example .env            # set PAYLOAD_SECRET
pnpm migrate:local              # creates the local D1 schema (wrangler.local.jsonc)
pnpm seed:local                 # fictional bilingual demo content + 11 photos into local R2
pnpm dev:local                  # http://localhost:3000  (redirects / → /tr)
```

`/admin` → first visit shows Payload's “create first user” form. **The first user becomes `admin`.** Registration is closed as soon as one user exists. Never ship default credentials.

`pnpm seed` / `pnpm seed:local` **delete all content collections (not users)** before re-creating them. That is the “reset demo content” command.

## Scripts

| Script | Purpose |
|---|---|
| `dev` / `dev:local` | Next dev against remote bindings / local miniflare bindings |
| `migrate:local`, `payload migrate` | Apply D1 migrations (local / the bound remote DB) |
| `seed:local`, `seed` | Reset + seed demo content (local / remote) |
| `generate:types`, `generate:importmap` | Wrangler + Payload types, admin import map |
| `build`, `preview`, `deploy` | Next build; OpenNext preview; migrate + deploy to Cloudflare |
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
Pages, services, projects, posts and the home page have drafts. Visitors only see published content. Admin **Preview** opens `/api/preview?path=…`, which requires a valid admin session (and `PREVIEW_SECRET` if set), enables Next Draft Mode, and redirects to a local path only. A banner shows while previewing. Frontend routes render dynamically on each request (`force-dynamic`), so published edits appear immediately; there is no ISR to invalidate. Trade-off: every public view runs D1 queries — measure CPU on the Free plan before launch.

### Contact form
`POST /api/contact` validates server-side, applies a honeypot and a minimum-time check, and stores the message via the Local API. The collection denies all public access (REST/GraphQL); only staff can read. **No e-mail is sent** — delivery is intentionally not implemented.

### Images
Workers have no `sharp`: Payload crop/focal-point are off and Next’s image optimizer is **not** used. Upload pre-optimised WebP/AVIF (≤ 2400 px). Dimensions are read from the file header on upload (`image-size`) so layouts reserve space. The frontend uses same-origin `/api/media/file/…` paths.

## Cloudflare

* Bindings: `D1`, `R2` (see `wrangler.jsonc`). One Worker, D1 and R2 bucket **per client**.
* The production build/preview uses **remote** bindings, so it needs `CLOUDFLARE_API_TOKEN` (non-interactive). Cloudflare’s own build has it.
* First deploy of this schema: `pnpm deploy:database` (runs `payload migrate` against the remote D1), then `pnpm deploy:app`. The migration also grants the `admin` role to existing users and moves existing media `alt` text into the Turkish locale.
* Set production vars: `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`. `serverURL` is currently hardcoded in `payload.config.ts` — change it per deployment.
* R2 public delivery: media is served through Payload (`/api/media/file/…`). For a custom media domain, attach one to the bucket, then adapt the Media `url` handling and CORS.

## Limitations (also in the handoff)
Not yet verified on Cloudflare: Workers Free CPU limits, bundle size, remote migration/seed, R2 upload. Admin live-preview iframe, content-completeness indicator, email delivery, and the single-language branch are not built. The template’s `tests/` still target the old Payload starter page.
