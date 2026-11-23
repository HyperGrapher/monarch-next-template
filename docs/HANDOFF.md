# Handoff — Vercel + Neon branch (`vercel`)

**Why:** On the Cloudflare Free plan the Payload admin (and uncached routes) hit Error 1102 (10 ms CPU), even after ISR caching. This branch moves the stack to Vercel + Neon Postgres + Vercel Blob. The Cloudflare version is on `main` before this merge (commit `8c75093`).

**Changed:** `@payloadcms/db-postgres` (Neon, pooled URL) · `@payloadcms/storage-vercel-blob` (local `./media` fallback without a token) · wrangler/OpenNext files and the D1 migrations removed · fresh Postgres migration `*_initial` · `vercel-build` = `migrate` + `build` · env-driven `serverURL`, debug logger removed · `projects.status` renamed `buildStatus` (it collided with Payload's `_status` Postgres enum; SQLite never enforced it) · media URLs left untouched when they are Blob CDN URLs.

**Verified locally (Postgres 16):** migrate, seed (11 images), `next build` (all public routes static), `next start`, edit through the API → cached page refreshes, preview/admin/media routes respond.

**NOT verified:** anything on real Vercel/Neon/Blob — build on Vercel, Blob uploads (admin and seed), admin CPU/latency, Neon cold starts, function region. `generate:importmap` was run with a dummy Blob token so the import map includes the Blob client handler.

**Steps to go live:** see README → "Deploying to Vercel + Neon". Content from the old D1 is not migrated (it was seed data only).

---

# Handoff — Monarch Architects starter

Branch: `claude/eloquent-lovelace-eykpo5` (not merged to `main`, no PR opened). Source brief: [`docs/monarch-architects-starter-prompt.md`](monarch-architects-starter-prompt.md). Design reference: the `web-effects` repo (`master`; `docs/monarch-website-brief.md`, `src/`).

## How to resume
```bash
git checkout claude/eloquent-lovelace-eykpo5 && pnpm install --ignore-workspace
cp .env.example .env     # set PAYLOAD_SECRET
pnpm migrate:local && pnpm seed:local && pnpm dev:local     # http://localhost:3000/tr
```
Create the first admin at `/admin` (first user → `admin`). Local state is in `.wrangler/` (gitignored).

## Done and verified (locally, miniflare D1/R2)
* Phase 1 audit: Next 16.4.6, React 19.2.9, Payload 3.94.1 + matching `db-d1-sqlite`, `storage-r2`, `richtext-lexical`; OpenNext retained (vinext **not** evaluated). `tsc` clean; `eslint` 0 errors (46 warnings, mostly `any`/unused in generated/template files; fixed the template’s stale `FlatCompat` config).
* CMS: Users (admin/editor), Media, Pages, Services, Projects, Posts, Categories, ContactSubmissions; globals SiteSettings, HomePage, Services/Projects/Journal landings, ContactPage; 10 blocks; localization `tr` (default) + `en`, `fallback:false`; drafts/versions; migration `20261122_205320_content_model` (applies on a fresh D1; preserves existing media alt text and gives existing users `admin`).
* Public site: `[locale]` routes — home (port of web-effects: WebGL shader hero, loader, header hide/show, menu dialog with focus trap, GSAP reveals, Lenis, scroll-to-top), services (+detail), projects (+detail, type filter), journal (+detail, category filter, pagination), About/generic pages, contact (form + API), designed 404/error, language switcher, hreflang/canonical/OG, sitemap, robots, Article/ProfessionalService JSON-LD.
* Seed: fully bilingual fictional content (4 services, 6 projects, 4 posts, 3 categories, About page with 6 block types, all globals).
* Checked in a real browser at 1440×900 and 390×844: all routes render, no horizontal overflow, no console errors, hero/loader/menu/focus/language switch/form states pass.
* Security checks (curl): anonymous cannot read/create submissions or list users; registration closes after the first user; editor cannot create/delete users or self-promote but can edit content; draft project is 404 to the public; `/api/preview` 401 without session and rejects `//evil.com`; honeypot returns silent success without storing.

## NOT done / not verified (be explicit when reporting)
1. **Cloudflare**: `next build` needs `CLOUDFLARE_API_TOKEN` (remote D1 binding) — it was **not** available in the session (the user said it was added to env, but no `CLOUDFLARE_*` variable was visible). So: production build, OpenNext/wrangler dry-run, **bundle size**, remote migration + seed, R2 upload on the deployed Worker, and **Workers Free CPU (10 ms)** are all unmeasured. SSR on every request with several D1 queries may exceed Free CPU; if so optimise (cache safe public reads) before asking to move to Paid. Don’t touch the live DB without explicit approval — `pnpm seed` **wipes content collections**.
2. Run order for the live DB: `pnpm deploy:database` (migrations) → seed (consider a staging D1 first). The live deployment today still runs the old schema.
3. **Phase 6 single-language branch**: not created. Central files are `src/config/locales.ts` (+ `localePath`), `brand.ts`; the `[locale]` route segment, `next.config.ts` redirect (`/` → `/${defaultLocale}`), `Header` switcher, and dictionary selection would need a small, documented diff. Note `localePath` already drops the prefix when one locale is configured, but route folders still include `[locale]`.
4. Not built: admin **Live Preview iframe** (only authenticated Draft Mode preview), content-completeness indicator for missing translations, Payload admin UI Turkish translation package, email delivery, WebSite/BreadcrumbList/Organization JSON-LD, rate limiting beyond honeypot/min-time, revalidation hooks (pages are `force-dynamic`), R2 custom media domain, vinext evaluation, per-locale slugs (slugs are shared by design).
5. Existing `tests/` (vitest/Playwright) still target the original Payload starter home page; not run or updated.
6. `payload.config.ts` still carries the debug logger and hardcoded `serverURL` (`…workers.dev`) from the template; it makes Payload return absolute media URLs, which the frontend strips to same-origin paths (`lib/media.ts`). Make `serverURL` env-driven per deployment.
7. Local-only scaffolding added: `wrangler.local.jsonc`, `WRANGLER_CONFIG` hook in `payload.config.ts`, `push:false` on the D1 adapter (migrations only).
8. Performance budgets (LCP, JS size) and accessibility audit (contrast, 200% zoom, screen reader) were not measured; reduced-motion handling is ported but only reviewed, not tested.

## Gotchas learned
* Array/block row `id`s are table-wide primary keys — seed namespaces them per document (`scripts/seed.ts: scope()`); keep ids identical across locales so translations merge into the same rows.
* `payload run` exits when the module finishes loading → seed uses top-level `await`.
* `drizzle-kit` migrate:create prompts interactively (“created or renamed?”) → needs a TTY; choose “create column”.
* Without `sharp`, Payload does not compute image width/height → Media `beforeChange` hook uses `image-size`.
* Next 16: `params`/`searchParams` are Promises; `PageProps`/`LayoutProps` globals only exist after Next generates them (the repo uses `src/lib/route.ts` types instead).
* Read `node_modules/next/dist/docs/` before changing Next conventions (see `AGENTS.md`).

## Suggested next steps (in order)
1. Provide `CLOUDFLARE_API_TOKEN` (or run on your machine): `pnpm build`, `opennextjs-cloudflare build`, record bundle size; deploy to a **staging** Worker/D1/R2; migrate + seed; test admin login, upload, preview, contact on the deployed Worker; record CPU per route.
2. Fix any Free-plan CPU hot spots; decide with the owner before using Paid.
3. Create the `single-language` branch from the finished bilingual state and document the diff in the README.
4. Update/replace `tests/` with tests for locales, preview auth, contact access, roles.
5. Add live preview iframe, completeness indicator, structured data, email provider if wanted.
