# Code review — findings and fix list

Full review of the Vercel + Neon + Blob version (after the move from Cloudflare). Items are grouped in the order they should be done.
Tick an item when it is fixed **and** covered by a test or verified by hand. File references point at the code as it was when reviewed.

Step 1 status: fixed and verified locally on Postgres 16 — `tsc`, lint (0 errors), `pnpm test:int` (31 passed) and `pnpm test:e2e` (37 passed, 6 edition-specific skips). The migration was also checked on a database whose home page row was still `draft`.

## Step 1 — Bugs with real impact

- [x] **Home page draft leaks to anonymous visitors.** `HomePage` has drafts but `read: () => true` (`src/globals/HomePage.ts`). Payload swaps in the latest draft when read access returns `true` and the request asks for `?draft=true`, so `GET /api/globals/home-page?draft=true` returned unpublished content. Fix: visitors may only read the published document (`publishedOrStaff`); e2e test added.
  - ⚠️ **Data migration `20261124_220901_publish_home_page` is required with this fix.** `pnpm seed` stored the home page's main row as `_status = 'draft'` (visitors still saw it because access ignored the status). Without the migration the new rule would hide the live home page. It marks the main row `published`, i.e. exactly what visitors see today; draft saves live only in `_home_page_v`, so nothing unpublished is exposed. The seed now writes `_status: 'published'` explicitly. `vercel-build` runs migrations before the build, so a normal deploy applies it.
- [x] **Open redirect bypass in `/api/preview`.** `startsWith('/') && !startsWith('//')` lets `/\evil.com`, `/<TAB>/evil.com` and `/<LF>/evil.com` through; browsers resolve all of them to `evil.com`. Fix: `safeLocalPath()` in `src/lib/links.ts` resolves the path against a dummy origin, requires the same origin and refuses control characters/backslashes; unit + e2e tests added.
- [x] **Home page loader can stay up forever.** `Shell` shows the loader on the home page until the WebGL hero calls `onReady`, but `Hero` is only rendered when both hero images resolve. A deleted/missing hero image left the page covered. Fix: without a hero the home page renders `<ReleaseLoader />` (`Shell.tsx`), which lifts the loader on mount. (No automated test: it needs a deleted hero image.)
- [x] **Vercel Preview deployments may migrate the production database.** Preview deployments share the production `DATABASE_URL`, and `vercel-build` runs `pnpm migrate`. **Resolved:** Vercel → Settings → Build and Deployment → *Ignored Build Step* = "Only build production" (`if [ "$VERCEL_ENV" == "production" ]; then exit 1; else exit 0; fi`), so branches are not built or migrated anymore. Only `main` builds, and its migrations run on production as before.

## Step 2 — Correctness

- [x] **Blog pagination is wrong when posts are untranslated.** `getPosts` (`src/lib/queries/index.ts`) filters untranslated posts *after* paginating: short or empty pages, wrong `totalPages`. Same for `getRelatedPosts`. Fixed: `title: { exists: true }` is part of the DB query (`getPosts`, `getRelatedPosts`); `tests/int/listing.int.spec.ts`.
- [x] **Sitemap and hreflang point at 404s.** `sitemap.ts` lists every slug in every locale (untranslated → 404) and includes `seo.noIndex` pages; `buildMetadata` always emits alternates for all locales. Fixed: the sitemap queries each locale for translated, published docs and skips `noIndex`; alternates only list existing translations. Detail pages pass `getTranslatedLocales()` to `buildMetadata({ availableLocales })`. Also fixed while there: `pagination: false` alone still applies Payload's default limit of 10, so the sitemap uses `limit: 0`. Tested in `listing.int.spec.ts`.
- [x] **WebGL hero robustness** (`src/components/hero/hero-gl.ts`): clear the 8 s timeout on cleanup; release the context (`WEBGL_lose_context`); stop the rAF loop after error/fallback; catch shader compile/link errors and fall back instead of throwing into the error boundary; draw once under reduced motion; drop `preserveDrawingBuffer`. Fixed (cleanup deletes textures/buffer/program instead of `WEBGL_lose_context`, because React Strict Mode remounts on the same canvas); existing e2e loader/fallback tests pass.
- [x] **Enable `strictNullChecks`** (`tsconfig.json`). Enabled. (It immediately flagged a nullable WebGL context in the new hero cleanup.)
- [x] **`pnpm seed` wipes `contact-submissions`** (real customer messages on production). Fixed: the seed no longer deletes them.
- [x] **`siteUrl()` falls back to `http://localhost:3000`** in production if `NEXT_PUBLIC_SITE_URL` is missing. Fixed: falls back to `https://$VERCEL_PROJECT_PRODUCTION_URL` before localhost.

- [x] **Running the seed or tests rewrote `src/payload-types.ts` without `_objectKey`** (found while working on this list). Payload regenerates types whenever it starts outside production, and those runs have no Blob token. Fixed: `typescript.autoGenerate: false`; `pnpm generate:types` and `pnpm migrate:create` now set a dummy Blob token themselves.

Step 2 status: done. `tsc` (strict null checks), lint 0 errors, `test:int` 46 passed, `test:e2e` 38 passed.

## Step 3 — Performance

- [x] **No responsive images.** Phones download ≤ 2400 px originals. Use `next/image` (Blob in `remotePatterns`) or generate sizes at upload; add `fetchPriority="high"` to the LCP image. **Done:** sharp generates 480/800/1200/1600 WebP at upload (any host, any storage adapter), `srcset`/`sizes` on every content image, `fetchPriority="high"` on eager images; migration `responsive_image_sizes` (additive); `pnpm media:sizes` backfills existing uploads. Tests: upload through the API gets all sizes; a phone-width page loads a small width.
- [ ] ~~**Home loader delays LCP.**~~ **Decision: keep the loader in the template** (decide per client site). The prerendered HTML is hidden until images + shader are ready. Render the static (fallback) hero first and upgrade to WebGL; drop the loader.
- [ ] **Wrap queries in React `cache()`.** `getSettings` runs up to 4× per render (layout + page + both `generateMetadata`); landings run twice.
- [ ] **Over-fetching.** `depth: 2` everywhere; project page loads all projects at depth 2 just for the "next" link; related posts load full rich text. Use `select` / lower depth.
- [ ] **Revalidation purges the whole site on every save**, including draft saves and new uploads. Purge only when `doc._status` or `previousDoc._status` is `published`.
- [ ] Minor: `ScrollTop` sets state on every scroll event (rAF-throttle); sitemap queries run sequentially (`Promise.all`); consider `attachDatabasePool` (`@vercel/functions`) for Fluid compute; disable GraphQL if unused.

## Step 4 — Deployment / process

- [ ] CI runs only on `main` after the push, so Vercel deploys before tests finish; the dependency bot pushes majors straight to `main`. Run CI on pull requests and let Vercel wait for checks.
- [ ] First-admin registration is open on every fresh deploy until someone registers. Add a deploy-checklist step or an env-gated setup token.
- [ ] Security headers: HSTS, `frame-ancestors`/`X-Frame-Options`, `Referrer-Policy` (`next.config.ts` `headers()`).
- [ ] Payload `csrf` / `serverURL` set to the production origin.

## Step 5 — Cleanup

- [ ] Cloudflare leftovers: `public/_headers`, OpenNext / `.dev.vars` lines and duplicate `/media` in `.gitignore`.
- [ ] Template leftovers: `src/app/my-route/route.ts` (public), `.npmrc` (`legacy-peer-deps` is ignored by pnpm), `.yarnrc`, `images.localPatterns` in `next.config.ts`, unused `CONTACT_EMAIL_*` vars in `.env.example`, `package.json` description.
- [x] `Media` `beforeChange` dimension hook + `image-size` look redundant (Payload 3.94 probes dimensions without sharp) — verify with one upload, then remove. **Removed** (sharp now reads dimensions; the upload e2e test checks `width`).
- [ ] Merge the duplicate `blog/page/[n]` and `blog/category/[category]/page/[n]` pages; remove `void t` / unused `t` in `RenderBlocks.tsx`.
- [ ] Validate `social[].url` and `mapUrl` as `https?://` URLs.
- [ ] Docs drift: HANDOFF/README say Payload 3.94.1 / React 19.2.9 (installed: 3.94.2 / 19.3.1).

## Merged: `live-admin-preview` (reviewed)

- [x] Merged into this branch; conflicts resolved (HomePage now has live preview + autosave **and** the published-only read rule). Migration order: `live_preview_autosave` (additive `autosave` columns) → `publish_home_page`; the latter's schema snapshot was refreshed so the drift test stays green. Full suites pass, including the Live Preview UI test.
- Notes from the review (no action needed now):
  - `requestOrigin()` trusts `x-forwarded-host`. Fine: only signed-in editors render the admin and those responses are not cached.
  - Autosave every 1 s writes a draft version per editor per second to Neon; raise `interval` (e.g. 2000) if admin feels slow on cold starts.
  - "Save draft" (non-autosave) still purges the whole cache — covered by the Step 3 revalidation item.
  - The landing globals have Live Preview but no drafts: the iframe only changes after *Save*, which publishes immediately. Consider drafts there too if editors expect to try changes safely.

## Accessibility, i18n, UX

- [ ] `error.tsx` / `not-found.tsx` always use the default locale (`useParams()` in the error page).
- [ ] Hard-coded English: `loadingLabel="Loading"`, pagination `aria-label="Pagination"`.
- [ ] `<dd>` before `<dt>` in the stats block and home Archive (invalid `dl`).
- [ ] Contact form: `autoComplete="phone"` / `"message"` are invalid (`tel`, none); phone `maxLength` 120 vs server 40.
- [ ] Type-filter and blog pagination pages share one title/description (duplicate titles).
- [ ] No favicon (`src/app/icon.*`).
- [ ] Privacy / Cookies / Imprint are plain text; the contact form collects personal data — a KVKK privacy notice linked from the form is normally needed.
