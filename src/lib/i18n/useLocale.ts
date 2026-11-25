'use client'

import { useParams } from 'next/navigation'
import { defaultLocale, isLocale, type Locale } from '../../config/locales'

/** Locale of the current URL in client components (default locale for unknown values, e.g. a 404 on /xx). */
export function useLocale(): Locale {
  const params = useParams<{ locale?: string }>()
  return isLocale(params?.locale) ? params.locale : defaultLocale
}
