import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import { defaultLocale } from './src/config/locales'

/**
 * Security headers for every response (site, admin, API). No full Content-Security-Policy: the Payload
 * admin and Next need inline scripts/styles, and a wrong CSP silently breaks pages. `frame-ancestors 'self'`
 * still allows the admin's Live Preview iframe (same origin) and blocks framing by other sites.
 */
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
]

const nextConfig: NextConfig = {
  // Deterministic root redirect to the default locale (no client-side language sniffing).
  async redirects() {
    return [{ source: '/', destination: `/${defaultLocale}`, permanent: false }]
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  // next/image is not used: responsive sizes are generated at upload (src/collections/Media.ts).
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
