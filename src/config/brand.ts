// Source-level brand/design preset. Editable CONTENT lives in Payload (SiteSettings etc.);
// this file only holds what a developer swaps when starting a new client project.
// Colour/typography tokens themselves live in src/app/(frontend)/styles.css (@theme).
export const brandConfig = {
  preset: 'monarch-architecture' as const,
  /** Used before SiteSettings exists (first boot) and for the wordmark fallback. */
  fallbackName: 'Monarch Architects',
  /** Page ground colour, shared by the DOM and the WebGL hero. Keep in sync with --color-paper. */
  paperColor: '#F3EFF7',
  /** Features a client may not need. Disable a module here and remove its nav entry. */
  modules: { projects: true, journal: true },
} as const

export type BrandConfig = typeof brandConfig
