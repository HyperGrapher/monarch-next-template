import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import { defaultLocale } from './src/config/locales'

const nextConfig: NextConfig = {
  // Deterministic root redirect to the default locale (no client-side language sniffing).
  async redirects() {
    return [{ source: '/', destination: `/${defaultLocale}`, permanent: false }]
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  // Your Next.js config here
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
