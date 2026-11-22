# Coding Agent Brief: Monarch Architects — Reusable Next.js + Payload Client Website Starter

> **Purpose:** Build a polished, production-minded, reusable starter template for small and medium-sized company websites. The first instance is a fictional architecture studio named **Monarch Architects**. The finished application must also work as a live demonstration of the website and its Payload CMS editing experience.
>
> **Primary implementation:** Bilingual Turkish / English.
>
> **Secondary deliverable:** A separate single-language Git branch, derived from the bilingual implementation, without duplicating the application or maintaining two unrelated codebases.
>
> **Deployment target:** Cloudflare Workers, with Cloudflare D1 for the database and R2 for uploaded media. Use the official Payload Cloudflare integration as the reference implementation and validate the deployment path before building the full website.

---

## 0. Instructions to the coding agent

Read this entire brief before making changes. Then inspect the existing repository and its current dependencies, scripts, Next.js version, Payload version, package manager, TypeScript configuration, and Git state.

The developer will create a Next.js application and add the Payload dependency before asking you to work. **Do not replace the existing project with a new scaffold, overwrite working configuration blindly, or upgrade major dependencies without first checking compatibility.** Integrate with the application that already exists.

Work in small, verifiable stages. Build the Cloudflare/Payload integration proof first, then the CMS schema and seed data, then the public website. Run the relevant type checks, linting, tests, production build, and Cloudflare preview/deployment checks as far as credentials and account access permit.

When a Cloudflare account secret, account ID, database ID, bucket, custom domain, or other external credential is missing, create a clearly documented placeholder and explain the one-time setup step. Do not invent credentials, claim that a remote deployment succeeded when it did not, or commit secrets.

If you find a material incompatibility between the installed Payload version and the official Cloudflare D1 adapter, stop and report the exact mismatch before silently mixing incompatible package versions. Prefer a coherent, supported dependency set over an apparently complete but broken integration.

## 1. Product goal

Build a reusable company website starter that can be customized for future freelance clients with different industries, identities, content, and visual designs.

The first demo instance represents **Monarch Architects**, a fictional architecture and interior-design studio. It should feel like a real, carefully art-directed architecture studio website—not a generic CMS starter, SaaS landing page, or default Payload template.

The project has two equally important surfaces:

1. **The public demo website:** A complete, attractive architecture-company website with realistic Turkish and English content. This is what a prospective client sees when given the demo URL.
2. **The CMS demonstration:** A polished Payload admin experience showing how a client can edit page titles, paragraphs, images, services, projects, blog posts, navigation details, and SEO metadata without changing code. The admin must be authenticated and must not expose editing or registration publicly.

The architecture must separate the reusable starter from the Monarch brand. A future client should be able to receive a different design, colors, typography, logo, content, and page-block selection without rewriting the CMS core.

### Core principles

- Design-led, editorial, premium, responsive.
- Content is managed through Payload, not hardcoded in React components.
- Clients can freely edit the content fields and rearrange approved page sections, but cannot break the design system with arbitrary HTML, CSS, or unbounded layout controls.
- Strong defaults; minimal configuration for a new client.
- One independent deployment/database/storage environment per client website. Do not build multi-tenancy for this starter.
- Avoid unnecessary abstractions, dependencies, plugins, and infrastructure.
- Keep the application easy for another developer or coding agent to understand and extend.

## 2. First-stage technical validation: Cloudflare deployment spike

**Do this before building the complete UI.** The most important technical risk is the combination of the installed Next.js version, installed Payload version, Payload's D1 adapter, R2 storage adapter, and the Cloudflare Worker runtime.

### Required reference implementations

Inspect the latest official Payload Cloudflare template and its current source, not a random third-party tutorial:

- Payload Cloudflare D1 template: <https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1>
- Template README: <https://github.com/payloadcms/payload/blob/main/templates/with-cloudflare-d1/README.md>
- Payload Cloudflare announcement: <https://blog.cloudflare.com/payload-cms-workers/>
- Payload localization: <https://payloadcms.com/docs/configuration/localization>
- Payload R2 storage: <https://payloadcms.com/docs/upload/storage-adapters>
- Payload live preview: <https://payloadcms.com/docs/live-preview/overview>
- Cloudflare Next.js deployment guidance: <https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/>
- Cloudflare OpenNext adapter: <https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/>
- Cloudflare Workers limits: <https://developers.cloudflare.com/workers/platform/limits/>
- Cloudflare D1 pricing/limits: <https://developers.cloudflare.com/d1/platform/pricing/> and <https://developers.cloudflare.com/d1/platform/limits/>
- Cloudflare R2 pricing: <https://developers.cloudflare.com/r2/pricing/>

### Adapter decision

Use **OpenNext initially** for this Payload-integrated Next.js starter, because the official Payload D1/R2 template currently demonstrates the Next.js + Payload integration with `@opennextjs/cloudflare`, `@payloadcms/db-d1-sqlite`, and `@payloadcms/storage-r2`.

Cloudflare currently recommends vinext as its default path for new Next.js-on-Workers projects. However, do not switch this project to vinext merely because it is the newer recommendation. First verify that the exact installed Payload release, its Next.js integration, D1 adapter, R2 adapter, Payload admin routes, local development, migrations, media upload, and draft/live preview all work with vinext. If that end-to-end compatibility is not established, retain the official Payload/OpenNext path.

Do not combine OpenNext and vinext in the same deployment configuration. Keep one deployment adapter and one set of build/deploy scripts.

### Dependency and version checks

- Keep all Payload packages on exactly compatible versions: `payload`, `@payloadcms/next`, `@payloadcms/db-d1-sqlite`, `@payloadcms/storage-r2`, `@payloadcms/richtext-lexical`, and any other Payload package used.
- Check the latest official template's package versions and peer dependency requirements.
- The official template source may be ahead of the stable package release. Do not combine a v4 beta adapter with a v3 stable Payload installation, or mix incompatible Next/React/Payload versions.
- If the installed Payload version cannot use the official D1 adapter yet, explain the options and the compatibility limitation. Do not quietly substitute an undocumented adapter.
- Generate Cloudflare environment types with Wrangler and use typed bindings where possible.
- Access Worker bindings using the supported Cloudflare context mechanism for the selected adapter. Avoid `process.env` assumptions for runtime bindings where the Cloudflare integration requires bindings/context.

### Cloudflare free-plan reality

The explicit first target is **Cloudflare Workers Free**, with D1 and R2. Do not upgrade to Workers Paid by default.

Important current-platform correction (verify again when implementing): Cloudflare removed the old compressed Worker bundle limits of 3 MB on Free / 10 MB on Paid on September 4, 2026. The current documented bundle limit is 64 MiB uncompressed on both plans. The current Free-plan constraints that matter most are 100,000 requests/day and 10 ms CPU time per HTTP request (versus a much larger CPU allowance on Paid). See the current official limits and changelog:

- <https://developers.cloudflare.com/workers/platform/limits/>
- <https://developers.cloudflare.com/changelog/post/2026-09-04-increased-worker-size-limit/>

The official Payload Cloudflare template README may still contain the old 3 MB recommendation. Treat that specific bundle-size explanation as potentially stale; do not repeat it without checking the current Cloudflare documentation. However, do not assume the Payload app will fit the Free CPU budget just because the bundle can now be deployed. Authentication, admin rendering, rich text, SSR, uploads and other operations may exceed 10 ms CPU on some requests.

**Free-plan-first policy:**
1. Attempt deployment on Workers Free first. Do not enable Paid billing or upgrade the account without the developer's explicit approval.
2. Check the actual uncompressed Worker bundle size using the current Wrangler dry-run/deploy output. The bundle must remain within the currently documented 64 MiB limit.
3. Test representative public SSR requests, admin login, admin list/edit screens, D1 reads/writes/migrations, R2 uploads, preview/draft requests and publishing/cache invalidation. Record CPU usage and errors for each path where observable.
4. If a request exceeds Free CPU, profile and optimize the implementation first: reduce unnecessary imports and server-side work, avoid expensive per-request transformations, cache safe public reads, minimize payload/response processing, and keep image processing in R2/CDN or at upload time rather than doing heavyweight transformations in the Worker.
5. If the app still cannot operate reliably within Free limits, stop and report the exact failing operation, evidence and options. Ask the developer before switching to Workers Paid. Do not silently deploy to Paid.
6. Keep the deployment configuration portable so the same project can move to Paid Workers later with minimal changes.

D1 and R2 have separate Free allowances and limits. Check their current pricing/limits independently; their free allowances do not remove Workers CPU/request constraints.

At minimum:

1. Build and run locally with local D1/R2 bindings.
2. Run the adapter's bundle/dry-run command and record the uncompressed Worker size.
3. Deploy a minimal staging version to **Workers Free** early if Cloudflare credentials are available.
4. Verify admin login, D1 migrations, CRUD operations, R2 upload/read, public SSR, draft preview, and revalidation on the deployed Worker.
5. Measure bundle size and CPU usage, and record whether every critical workflow works within Free limits. If not, optimize and retest before requesting approval for Paid.

The site must still be easy to move to a paid Worker or another compatible host later. Avoid hard-coding Cloudflare-specific assumptions into page components or content schemas.

## 3. Technology and application structure

Use the existing project versions where compatible. The intended stack is:

- Next.js App Router.
- React and TypeScript with strict checking.
- Payload CMS embedded in the Next.js application.
- Payload Local API for server-side frontend queries where practical; do not make unnecessary HTTP requests from the frontend to its own API.
- Payload Lexical rich-text editor.
- Payload D1 adapter from the official Cloudflare template.
- Payload R2 storage adapter for media uploads.
- Cloudflare Workers + OpenNext deployment configuration initially.
- Cloudflare D1 database.
- Cloudflare R2 bucket for uploaded media.
- Tailwind CSS if it is already present or is the established styling choice. Keep styling organized around reusable design tokens and components.
- Use a small, well-supported animation library only if needed. Prefer CSS transitions for simple effects.

Do not add a component library merely to assemble a marketing site. Build a small, consistent set of project-specific components.

### Suggested directory organization

Adapt this to the existing repository rather than forcing a restructure, but keep these responsibilities clear:

```text
src/
  app/
    (frontend)/
      [locale]/
        page.tsx
        about/page.tsx
        services/page.tsx
        services/[slug]/page.tsx
        projects/page.tsx
        projects/[slug]/page.tsx
        blog/page.tsx
        blog/[slug]/page.tsx
        contact/page.tsx
    (payload)/
      admin/[[...segments]]/page.tsx
      api/[...slug]/route.ts
    api/
      preview/route.ts
      contact/route.ts
  components/
    layout/
    navigation/
    sections/
    blocks/
    forms/
    ui/
  config/
    brand.ts
    locales.ts
    navigation.ts
    site.ts
  collections/
    Users.ts
    Media.ts
    Pages.ts
    Services.ts
    Projects.ts
    Posts.ts
    Categories.ts
    ContactSubmissions.ts
  globals/
    SiteSettings.ts
    HomePage.ts
    ServicesLanding.ts
    AboutPage.ts
    ContactPage.ts
  blocks/
    Hero.ts
    RichTextSection.ts
    TextImage.ts
    ImageGallery.ts
    Stats.ts
    ServicesGrid.ts
    ProjectsGrid.ts
    Testimonials.ts
    CallToAction.ts
    FAQ.ts
  lib/
    payload/
    queries/
    seo/
    i18n/
  payload.config.ts
  payload-types.ts
public/
  fonts/                  # only if local font files are licensed and available
  demo/                   # optional local placeholder assets
```

The exact folder names can differ. Do not create empty folders or abstractions without a concrete use.

## 4. Brand and visual direction: Monarch Architects

Create a distinctive visual identity suitable for a boutique architecture studio.

### Brand concept

- Name: **Monarch Architects**
- Industry: Architecture, interior architecture, adaptive reuse, and spatial design.
- Positioning: Thoughtful contemporary architecture that balances context, material, light, function, and human experience.
- Brand voice: Confident, thoughtful, restrained, warm, and precise. Avoid exaggerated luxury claims and generic agency slogans.
- Example English tagline: “Spaces shaped around the way we live.”
- Example Turkish tagline: “Yaşamın ritmine göre şekillenen mekânlar.”

All company details, copy, images, addresses, project names, awards, team members, and statistics are fictional demo content. Do not present fictional achievements as real facts about a real firm. Avoid fabricated third-party awards or testimonials that look verifiable.

### Visual direction

Aim for an editorial architecture-journal feel:

- Warm off-white / limestone backgrounds, charcoal typography, and one restrained earthy accent such as muted olive, bronze, or terracotta.
- Strong typographic hierarchy with generous negative space.
- Large architectural photography and carefully composed image grids.
- Precise alignment, subtle borders, considered spacing, and restrained motion.
- A confident, typographic hero rather than a generic centered SaaS headline.
- Asymmetric editorial layouts where appropriate, without sacrificing responsive clarity.
- Subtle hover states and transitions. Motion should support the content, not compete with it.
- Use a responsive mobile menu, accessible focus states, and reduced-motion support.

Do not lock the reusable starter to this palette or typography. Define design tokens centrally using CSS variables and a brand configuration. The Monarch theme is one preset, not the architecture of the whole application.

### Reusability rule

Keep Monarch-specific copy and data in CMS seed data and brand configuration. Avoid hardcoding the name “Monarch Architects”, its colors, address, contact details, or tagline in reusable layout components. A new client should be able to change the brand configuration and content without searching through the source code for the previous client's name.

## 5. Public website routes and page scope

The bilingual edition should include the following minimum pages:

| Page | Route intent | Purpose |
|---|---|---|
| Home | `/tr` and `/en` | Brand introduction, selected services/projects, studio story, CTA |
| Services index | `/tr/services` and `/en/services` | Overview of all services |
| Service detail | `/tr/services/[slug]` and `/en/services/[slug]` | Individual service information and related projects |
| About | `/tr/about` and `/en/about` | Studio approach, values, team, capabilities |
| Projects index | `/tr/projects` and `/en/projects` | Portfolio overview and optional categories/filters |
| Project detail | `/tr/projects/[slug]` and `/en/projects/[slug]` | Project story, metadata, image gallery |
| Blog index | `/tr/blog` and `/en/blog` | Journal listing, categories, pagination |
| Blog detail | `/tr/blog/[slug]` and `/en/blog/[slug]` | Article, author, date, image, related posts |
| Contact | `/tr/contact` and `/en/contact` | Contact details, map/link, contact form |

The project portfolio is included because it is a natural part of an architecture-company demo and demonstrates repeatable CMS entries. Keep it a clean module that can be disabled or removed for clients who do not need a project portfolio.

Use a consistent route strategy. Keep locale handling centralized; do not scatter locale checks and Turkish/English string conditionals throughout components. Shared route segments such as `services`, `projects`, and `blog` are acceptable for the first release. If localized route segments are implemented, use one centralized route map and ensure links, canonical URLs, sitemaps, and alternate-language URLs all agree.

The root path `/` should redirect deterministically to the configured default locale in the bilingual version (Turkish by default), rather than depending on unreliable client-only language detection. Do not render duplicate copies of the site at `/` and `/tr`.

## 6. Bilingual content model and localization

The main implementation must support Turkish (`tr`) and English (`en`) from the beginning.

Use Payload's native Localization feature for CMS content. Do not store two hand-maintained copies of each post/page in separate collections. Configure the locales centrally, with Turkish as the default locale for this demo.

### Localization requirements

- Mark editorial fields as localized: titles, subtitles, descriptions, rich text, CTA labels, alt text/captions where appropriate, SEO titles/descriptions, blog body, service details, project narratives, navigation labels, and page-block text.
- Keep language-independent values shared: internal IDs, numeric dimensions, dates, order values, email addresses, phone numbers, image references, coordinates, and other facts that do not need translation.
- Make the locale selector obvious in Payload Admin.
- The editor should be able to switch between Turkish and English while editing the same record.
- Do not silently publish the fallback language as if it were a completed translation. Missing translations should be visible to the editor and should have a documented fallback policy.
- For the demo, seed complete Turkish and English content for all main pages, services, projects, and posts.
- Add a simple content-completeness indicator or clear admin guidance for missing translations if it can be implemented without fragile customizations.
- Ensure the frontend queries the requested locale intentionally. Avoid accidental fallback that makes untranslated content appear complete.
- Add `hreflang` alternates for Turkish and English and correct canonical URLs.

Payload's **Admin UI language** and the **website content locale** are separate concepts. Configure Payload admin interface language support if the available translation package supports Turkish, but do not confuse that with translating website content.

## 7. CMS collections and globals

Keep the model intentionally understandable for a small-company editor. Use sensible field names, helpful labels/descriptions, tabs or field groups, and clear collection navigation.

### 7.1 Users

- Authentication-enabled Payload collection.
- No public registration.
- Implement at least `admin` and `editor` roles using Payload access control.
- Admin can manage users and all content.
- Editor can manage content and media but cannot manage users or alter sensitive system configuration.
- Do not expose user data or administrative operations through public endpoints.
- Provide a documented secure first-admin creation process using environment variables or Payload's first-user flow. Never ship default credentials.

### 7.2 Media

- Payload upload collection backed by Cloudflare R2 in production.
- Fields: alt text (localized where suitable), caption (localized), optional credit/source note, focal point if supported, and useful categorization.
- Ensure frontend image output uses the public media URL and Next.js image configuration is compatible with the chosen R2 custom domain.
- Use meaningful alt text. Do not use an image filename as the only alt text.
- Do not store production media in the Worker bundle or D1.
- Document the R2 public delivery/custom-domain configuration and any required CORS settings.

### 7.3 Pages

Create a flexible Pages collection for ordinary content pages, such as About and other future pages.

Suggested fields:

- Title (localized)
- Slug (localized only if the routing/query implementation safely supports it; otherwise use stable slugs and explain the decision)
- Intro/excerpt (localized)
- Featured image
- Page layout / content blocks
- SEO group (localized title, description, social image, no-index toggle)
- Draft/publish status and versions

Do not create a giant universal page schema with dozens of unrelated fields. Use a controlled block-based layout builder.

### 7.4 HomePage global

Store homepage-specific content in a Global, not in a component constant:

- Announcement bar (optional)
- Hero eyebrow, headline, rich text/subtitle, hero media, primary and secondary CTA
- Selected services heading and relation/selection
- Featured projects heading and selected project relationships
- Studio introduction heading/text/image
- Optional statistics
- Testimonials (optional; mark them clearly as fictional demo entries)
- Final CTA
- Localized SEO fields

All content that an editor should change must be stored in Payload.

### 7.5 Services collection + ServicesLanding global

Services collection fields:

- Name/title (localized)
- Slug
- Short description (localized)
- Icon or small visual identifier (optional; choose from a controlled set, not arbitrary icon-code strings)
- Cover image
- Detail page content blocks
- Related projects
- Display order
- Featured toggle
- SEO metadata
- Draft/publish status

ServicesLanding global:

- Page hero/intro content
- Section titles and optional CTA
- SEO fields

### 7.6 Projects collection

Fields:

- Project title (localized)
- Slug
- Short summary (localized)
- Project type/category (relationship or taxonomy)
- Location
- Completion year
- Area / dimensions (shared numeric/text values with units)
- Client (optional; omit in demo if it creates false real-world implications)
- Cover image
- Gallery with captions/alt text
- Detail narrative / layout blocks (localized)
- Related services
- Featured toggle and display order
- SEO metadata
- Draft/publish status

Build a visually strong projects listing and detail template. Use real CMS relations for selected projects; do not hardcode project cards in the homepage.

### 7.7 Posts + Categories

Posts:

- Title, slug, excerpt, featured image
- Rich-text body using Lexical
- Author relation or author name
- Categories/tags
- Published date
- Reading-time display if it can be calculated reliably
- SEO metadata
- Draft/publish status and versions

Categories:

- Name and slug (localized where useful)
- Optional description

Blog requirements:

- Listing with pagination or a small, scalable pagination strategy.
- Category filter/navigation.
- Detail page with readable article typography, featured image, date, and related posts.
- Never render raw HTML from content. Render Lexical data through a safe, maintained renderer.

### 7.8 ContactSubmissions

Implement a simple, secure contact form.

- Store submissions in a Payload collection or another appropriately protected D1-backed path.
- Public users may create submissions only.
- Public users must never read, list, update, or delete submissions.
- Admins can review them in the CMS.
- Validate all fields server-side.
- Add a honeypot and basic abuse protections appropriate to Workers.
- Keep email delivery optional and environment-driven. Do not pretend an email was sent if no provider is configured.
- Include a clear success/failure state in both languages.

### 7.9 SiteSettings global

Store editable, non-structural company details here:

- Company name (localized only if the brand uses translated naming)
- Tagline
- Logo and optional alternate logo
- Favicon/site icon if appropriate
- Header announcement text
- Main navigation labels and visibility/order where useful
- Footer description
- Address and contact details
- Email and phone
- Social links
- Copyright text
- Default SEO metadata and social image

Keep the visual design tokens and component implementation in source configuration, not in editable content fields. The CMS should allow content editing, not accidental redesign of every component.

## 8. Controlled page builder / content blocks

A major feature of this starter is that clients must be able to change page titles and text blocks, add/remove predefined sections, and reorder sections without coding.

Use Payload Blocks fields for the page layout. Each block should be a reusable, strongly typed CMS schema with a matching frontend renderer.

Implement at least these block types:

1. **Hero** — eyebrow, heading, rich text, image/video poster, CTA buttons, controlled layout variant.
2. **Rich Text Section** — heading, Lexical content, optional narrow/wide reading width.
3. **Text + Image** — heading, rich text, image, image-left/right variant, background variant.
4. **Image Gallery** — selected media, captions, controlled grid/masonry-style variants.
5. **Statistics** — a repeatable set of number + label items; no fake animation required.
6. **Services Grid** — heading, intro, selected services, controlled card variant.
7. **Projects Grid** — heading, intro, selected projects, count/layout options.
8. **Testimonials** — quote, person/company fields; seed clearly fictional demo data only.
9. **Call to Action** — heading, description, button label/link, background variant.
10. **FAQ** — repeatable question/answer items.

For every block:

- Use localized fields for text content.
- Use a small number of controlled style/layout variants.
- Supply sensible defaults and clear admin labels/instructions.
- Add validation where a field is required for a valid block.
- Make the frontend renderer handle absent optional values gracefully.
- Keep the design responsive and accessible.
- Never allow editors to enter raw arbitrary HTML/CSS/JavaScript.

### Reordering and editing experience

- Editors can add, remove, and reorder blocks.
- A page title and all visible text are editable.
- Add clear block labels in the Payload sidebar so a nontechnical editor can distinguish “Hero”, “Text + Image”, “Project Grid”, etc.
- Add help text explaining image ratios and recommended copy lengths when useful.
- Use Payload's Live Preview / Preview functionality where compatible with the selected Cloudflare deployment path.
- Provide desktop/mobile preview sizing if supported reliably.

### Do not build a visual page-builder product

This is a controlled content editor, not Webflow or Elementor. The developer owns component design, spacing systems, responsive behavior, and allowed layouts. The client owns content, media, ordering, and a few safe presentation variants.

## 9. Public frontend design and UX requirements

### Shared layout

- Responsive header with brand logo, primary nav, language switcher, and a clear contact CTA.
- Mobile navigation with keyboard and screen-reader support.
- Footer with concise studio summary, contact details, navigation, and social links.
- Consistent page container widths, spacing, typography, and buttons.
- Visible focus indicators and sufficient color contrast.

### Homepage

The homepage should demonstrate the breadth of the content system without feeling cluttered:

1. Distinctive hero with a large architectural image and strong headline.
2. Short studio introduction.
3. Featured services.
4. Featured projects.
5. A concise approach/values section or statistics.
6. A recent journal/blog section.
7. Contact CTA.

All headings, body copy, images, featured relations, and CTA labels must be CMS-driven.

### About

- Editorial introduction.
- Studio philosophy/approach.
- Values or process sections.
- Optional team presentation using a small reusable content shape.
- Contact CTA.

### Services

- Attractive index with clear service summaries.
- Individual service pages with content blocks, imagery, and related projects.
- No hardcoded service list.

### Projects

- Strong image-led listing.
- Detail pages with project facts, long-form story, galleries, and related services.
- Filters should remain simple and useful; do not add a complex faceted-search system for a small demo.

### Blog

- Editorial article index, category navigation, and pagination.
- Comfortable reading width and type scale on article details.
- Related articles and metadata.

### Contact

- CMS-driven address, phone, email, and map/external map link.
- Working form with validation, loading, success, and error states.
- Do not put a secret map API key in the browser.

## 10. Live Preview, draft, publish, and revalidation

The CMS demonstration is a key part of the sales demo. Implement a secure editorial workflow:

- Editors can save drafts without exposing them publicly.
- Editors can preview draft content on the actual frontend.
- Publishing updates the public website content.
- Use Payload Preview / Draft Mode according to the selected Next.js + adapter path.
- Validate the preview token/user on the server. Never allow an arbitrary public query parameter to enable draft mode.
- The preview must respect the current locale.
- Add a visible preview indicator/banner when viewing draft content.
- On publish/update, invalidate the relevant Next.js cache paths/tags or use the supported adapter mechanism so the public site reflects the change.
- Avoid aggressive caching that makes CMS edits appear broken. Document the cache strategy.
- If Cloudflare compatibility blocks true in-admin live preview, implement a dependable authenticated draft preview first and document the limitation rather than shipping a nonfunctional preview button.

## 11. SEO, metadata, and performance

Implement reusable SEO defaults and per-document overrides.

- Dynamic title and description for every index/detail page.
- Canonical URL.
- `hreflang` alternates for `tr` and `en`.
- Open Graph and social share image.
- XML sitemap including published localized content only.
- `robots.txt` appropriate for a public demo and protected admin routes.
- Structured data where suitable: Organization / architecture studio identity, WebSite, BreadcrumbList, Article, and relevant page data. Do not invent ratings, awards, reviews, or facts.
- Proper heading hierarchy and semantic HTML.
- Correct image alt text, width/height or aspect ratio, lazy loading below the fold, and responsive image sizes.
- Optimize large architecture photographs. Do not blindly load every gallery image on the homepage.
- Use the R2 custom media domain for production media and configure the frontend image strategy to work on Cloudflare Workers.
- Avoid depending on the default Next.js image optimizer unless it is verified to work with the selected adapter/runtime. Use a supported Cloudflare image delivery/optimization strategy or pre-optimized responsive media, and document the decision.
- Keep client-side JavaScript minimal. Prefer Server Components for content rendering; make only interactive components client-side.
- Ensure the website remains usable without animation and respects `prefers-reduced-motion`.

## 12. Demo seed content

Populate the CMS with enough coherent content for the website to look complete immediately after setup.

Minimum suggested demo records:

- HomePage global in Turkish and English.
- About page in both languages.
- Services landing global and 3–4 service records.
- 4–6 projects with varied project types and complete localized detail content.
- 3–4 blog posts in both languages, with 2–3 categories.
- SiteSettings with demo brand details, contact info, navigation, and social links.
- Several page-builder blocks used across pages to demonstrate different layouts.

Suggested service topics:

- Architecture & Spatial Design
- Interior Architecture
- Restoration & Adaptive Reuse
- Feasibility & Design Consultancy

Suggested fictional project themes:

- A contemporary residence shaped around a courtyard.
- A coastal house with a restrained material palette.
- A small cultural/community building.
- An adaptive-reuse project transforming an existing structure.
- A boutique workplace or hospitality interior.

Suggested article themes:

- Designing with natural light.
- The relationship between material and place.
- Adaptive reuse and the value of existing buildings.
- Designing homes around daily rituals.

All project locations, years, areas, client references, and testimonials must be clearly understood as fictional demo data. Keep copy polished and credible, but do not attribute real awards or partnerships to Monarch Architects.

### Image assets

Use high-quality architecture/interior images that are licensed for the intended demo use. Prefer downloading and storing selected image files in the project's demo asset directory or seeding them into R2 through a documented process. Do not rely on fragile hotlinks, deprecated image-source services, or random image URLs that may disappear. Do not use copyrighted images from another architecture studio's portfolio.

If the environment cannot download assets, use a small set of clearly intentional local placeholders with appropriate composition and document how to replace them. Do not build the layout around broken image URLs.

## 13. Admin panel experience

Make the Payload admin useful as a demo for a nontechnical company owner.

- Use collection labels and groups that make sense to a business user: Content, Portfolio, Website Settings, Users.
- Use clear singular/plural names: Pages, Services, Projects, Blog Posts, Categories, Media.
- Add field descriptions for non-obvious fields.
- Use tabs or collapsible groups for SEO, relationships, and advanced fields.
- Use meaningful list columns: title, status, updated/published date, category, featured.
- Configure default sort order where useful.
- Ensure draft/published states are clear.
- Provide sensible default values for new records.
- Make the Media collection easy to browse and upload to.
- Do not expose internal technical field names as the primary labels.
- Do not hardcode or seed a publicly accessible admin user/password.

The public site is the primary demo URL. `/admin` must require authentication. If a live CMS walkthrough is needed, the developer should sign in with a controlled demo account or share the admin screen directly. Do not create a public “demo login” or public write access by default.

## 14. Reusability for future client projects

The starter must not become “the Monarch website codebase”. It must be a flexible foundation.

### Central brand configuration

Create one clear brand/config file for source-level theme identity, for example:

```ts
export const brandConfig = {
  theme: 'editorial-architecture',
  defaultLocale: 'tr',
  supportedLocales: ['tr', 'en'],
  // Theme tokens / font choices / layout preset identifiers
}
```

The exact type should be accurate and strongly typed. Do not make this config a duplicate of all editable CMS content.

### Keep three concerns separate

1. **Starter structure:** routes, collections, blocks, renderer, queries, SEO, localization infrastructure.
2. **Brand/design preset:** CSS variables, fonts, component variants, visual identity.
3. **Client content:** page copy, project records, blog posts, images, business details stored in Payload.

A new project should be adaptable primarily by replacing seed content, brand config, theme tokens, and—where necessary—choosing which predefined blocks to use.

Do not introduce a runtime theme editor or a multi-tenant theme engine. Reusability is a developer workflow, not a promise that clients can redesign the entire website in the CMS.

### One client per deployment

Keep each client's deployment isolated:

- Separate Worker.
- Separate D1 database.
- Separate R2 bucket (or at minimum an isolated bucket/prefix and credentials if there is a deliberate reason to share infrastructure).
- Separate environment secrets.
- Separate admin users.

Use one source starter/repository template to create the next client project. Do not put unrelated client records in one shared database.

## 15. Bilingual and single-language Git branches

The primary implementation is the **bilingual TR/EN edition**.

The second deliverable is a separate **single-language branch** derived from the finished bilingual implementation.

Requirements:

- Keep locale definitions, default locale, route behavior, and localized field decisions in a small number of central files.
- Do not duplicate the page templates or CMS collections just to remove a language.
- Use a single-language configuration that supports either Turkish or English through one setting.
- In the single-language branch, remove the public language switcher, avoid locale-prefixed URLs (the homepage should be `/`), and use a single Payload content locale.
- Keep the same CMS collections, design system, blocks, and page templates.
- Provide a short README note explaining how to switch the single-language branch from Turkish to English.

Git safety:

- Inspect `git status` and the current branch before creating branches.
- Never stage, discard, reset, or commit pre-existing user changes that are unrelated to this task.
- If the working tree is clean and it is safe to do so, create/use a clearly named bilingual branch and create a `single-language` branch from the completed bilingual state. Commit only changes created for this task if a commit is needed to establish the branch point.
- If the working tree is already dirty or branch operations risk disturbing existing work, finish the bilingual implementation without destructive Git operations and provide the exact safe commands/steps for creating the second branch after the developer commits their work.

## 16. Environment variables and Cloudflare resources

Create `.env.example` with descriptions and placeholder values only. Never commit `.env`, `.dev.vars`, API tokens, R2 secrets, or real credentials.

Document the expected values, adapting names to the actual integration:

```dotenv
# Payload
PAYLOAD_SECRET=

# Public site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PREVIEW_SECRET=

# Cloudflare / Worker configuration is generally supplied through bindings,
# not exposed as public NEXT_PUBLIC variables.
# D1 and R2 are configured through Wrangler bindings.

# Optional contact email provider (only if implemented)
CONTACT_EMAIL_FROM=
CONTACT_EMAIL_TO=
EMAIL_API_KEY=
```

Cloudflare resources:

- Worker: one per client deployment.
- D1 binding name: `D1` (or the exact binding required by the selected official adapter).
- R2 binding name: `R2` (or the exact binding required by the selected official adapter).
- D1 migrations must be part of the documented deployment process.
- R2 bucket should use a custom media domain for production public delivery where possible.
- Generate and keep Cloudflare types in sync with Wrangler configuration.
- Have clearly separated local, preview/staging, and production resource names/configuration.

Add scripts for the actual supported workflow, such as local development, Next build, OpenNext preview, deploy, type generation, Payload type generation, Payload import-map generation, and database migrations. Do not add scripts that call tools that are not installed.

## 17. Testing and acceptance criteria

The work is not complete just because the homepage renders.

### Build and type safety

- `tsc` / project type check passes.
- ESLint or the project's configured lint command passes.
- Payload generated types are current.
- Payload import map is generated and resolves the admin components.
- Production build passes for the chosen adapter.
- Cloudflare bundle dry run completes and bundle size is recorded.

### CMS behavior

- Admin login works.
- Public registration is disabled.
- Admin can create/edit/publish a page.
- Editor can edit content but cannot manage users.
- Turkish and English values can be edited independently.
- Page layout blocks can be added, deleted, and reordered.
- A media upload is saved to R2 in the deployed environment.
- Media URL renders on the public site.
- A service, project, and blog post can each be created and displayed from Payload.
- Draft content is not visible to public visitors.
- Authenticated preview can display draft content.
- Publishing invalidates or refreshes the appropriate public content.
- Public contact submissions can be created but cannot be read by anonymous users.

### Frontend behavior

- All required routes render in both Turkish and English.
- Root redirect behavior is deterministic.
- Navigation and language switcher work on desktop and mobile.
- Missing localized content is handled intentionally and does not create broken UI.
- All primary page content comes from Payload rather than hardcoded arrays or JSX literals.
- Empty/missing optional fields do not crash pages.
- Forms show loading, success, and failure states.
- 404 and error states are designed, not default browser output.
- Keyboard navigation, visible focus, alt text, semantic headings, and reduced-motion support are present.
- Metadata, canonical URLs, `hreflang`, sitemap, robots, and Open Graph output are correct.

### Demo readiness

A prospective client should be able to visit the public demo and understand the quality of the website. The developer should also be able to log into `/admin`, open the homepage, change its title or paragraph in Turkish or English, reorder a block, upload an image, preview the result, and publish it.

Provide a short `README.md` with:

- Local setup.
- Required environment variables.
- First admin creation.
- D1 database creation and migration steps.
- R2 bucket and public media-domain configuration.
- Local D1/R2 development.
- Preview and production deployment commands.
- How to seed/reset fictional demo content.
- How to create a new client project from this starter.
- Current limitations and any Cloudflare paid-plan requirement discovered during validation.

## 18. Implementation order

Follow this sequence and report progress/results at meaningful milestones.

### Phase 1 — Repository and compatibility audit

1. Inspect the repository and Git status.
2. Identify Next.js, React, Payload, and package-manager versions.
3. Inspect the current Payload Cloudflare D1 template and verify adapter compatibility.
4. Choose and document the deployment adapter. Default to the official Payload/OpenNext Cloudflare integration unless vinext compatibility is demonstrated end-to-end.
5. Configure the project for Workers Free first; confirm current bundle limits rather than relying on the stale 3 MB statement in the Payload template README.
6. Produce the minimal D1/R2 Worker configuration and prove a local build/preview.

### Phase 2 — Payload integration

1. Configure Payload within the existing Next.js project.
2. Add Users and Media collections.
3. Configure D1 and R2 using the official supported adapters.
4. Confirm admin route, authentication, generated types, and upload flow.
5. Deploy the minimal application to a staging Worker on the Free plan early if credentials are available. Do not upgrade billing without approval.

### Phase 3 — CMS schema and editorial experience

1. Configure localization.
2. Add Pages, HomePage, Services, Projects, Posts, Categories, ContactSubmissions, and SiteSettings.
3. Add the controlled blocks and their frontend renderer contracts.
4. Configure roles, draft/publish, preview, and cache invalidation.
5. Add seed scripts and fully bilingual demo content.

### Phase 4 — Public Monarch website

1. Build design tokens, typography, layout, header, mobile navigation, and footer.
2. Build home, services, service details, about, projects, project details, blog, article, and contact routes.
3. Connect all pages to Payload.
4. Add image handling, SEO, sitemap, and accessibility details.
5. Polish desktop/tablet/mobile layouts and interaction states.

### Phase 5 — QA and deployment

1. Run type checks, lint, tests, build, and bundle-size check.
2. Test CMS editing and public rendering.
3. Test deployed D1 migrations, R2 upload, Worker CPU and Free-plan compatibility. If Free fails, document the exact issue and request approval before considering Paid.
4. Fix issues and document verified outcomes.

### Phase 6 — Single-language branch

1. Derive the single-language version from the completed bilingual implementation.
2. Configure one locale and remove the language switcher and locale URL prefix.
3. Confirm `/`, `/services`, `/about`, `/contact`, `/projects`, and `/blog` work.
4. Verify the CMS uses only the configured single locale while keeping the same collections and blocks.
5. Keep the branch's differences small and documented.

## 19. Definition of done

Deliver a working, polished, bilingual architecture-company demo named **Monarch Architects**, backed by Payload and Cloudflare D1/R2, with a controlled page builder and a realistic CMS editing workflow.

The result must be reusable for a future company with a different brand and design. It must not be a hardcoded Monarch landing page with an admin panel bolted on afterward.

At completion, report:

1. What was implemented.
2. Which Payload/Next/React/adapter versions were used.
3. Which Cloudflare deployment path was selected and why.
4. What checks passed and failed.
5. Whether Workers Free was sufficient in the actual test, or whether Paid was required.
6. Any credentials/resources the developer still needs to configure.
7. The branch names and the exact differences between bilingual and single-language editions.
8. Any remaining limitations—especially around preview, media optimization, localization, and deployment.

**Do not claim a feature is complete unless it has been implemented and tested.**
