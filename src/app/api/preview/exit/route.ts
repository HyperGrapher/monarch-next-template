import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { defaultLocale, localePath } from '../../../../config/locales'

export async function GET() {
  ;(await draftMode()).disable()
  redirect(localePath(defaultLocale, '/'))
}
