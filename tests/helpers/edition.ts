/** Lets one test suite cover both editions (multilingual on `main`, one language on `single-language`). */
import { defaultLocale, isMultilingual, localePath, locales, type Locale } from '../../src/config/locales'

export { defaultLocale, isMultilingual, locales }
/** Public URL path for the edition: `/tr/projects` when multilingual, `/projects` when single-language. */
export const url = (path = '/', locale: Locale = defaultLocale) => localePath(locale, path)

/** A second locale for multilingual-only tests (cast: it does not exist in the single-language edition). */
export const secondLocale = 'en' as Locale
