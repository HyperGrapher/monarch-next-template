import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getClient = cache(async () => getPayload({ config: await config }))

/** Draft mode is only ever enabled by /api/preview after verifying an admin session. */
export const isDraft = async () => {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}
