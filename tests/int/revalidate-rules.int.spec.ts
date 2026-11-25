/**
 * Which real saves purge the public cache. The cache is the whole site, so purging on every draft save
 * or upload would make visitors hit cold pages for nothing; never purging on publish/unpublish would
 * leave stale (or withdrawn) content online.
 */
import path from 'node:path'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

const revalidatePath = vi.hoisted(() => vi.fn())
vi.mock('next/cache', () => ({ revalidatePath }))

import { getPayload, type Payload } from 'payload'
import config from '../../src/payload.config'
import { defaultLocale } from '../../src/config/locales'

let payload: Payload
const write = { locale: defaultLocale, overrideAccess: true } as const

beforeAll(async () => {
  payload = await getPayload({ config: await config })
})
beforeEach(() => revalidatePath.mockClear())

describe('cache purging rules', () => {
  it('publishing purges, drafts of a published page do not, unpublishing does', async () => {
    const doc = await payload.create({ collection: 'pages', ...write, draft: false, data: { slug: `purge-${Date.now()}`, title: 'Yayında', _status: 'published' } as any })
    expect(revalidatePath).toHaveBeenCalledTimes(1)

    revalidatePath.mockClear()
    await payload.update({ collection: 'pages', id: doc.id, ...write, draft: true, data: { title: 'Taslak değişiklik' } as any })
    expect(revalidatePath, 'save draft').not.toHaveBeenCalled()

    await payload.update({ collection: 'pages', id: doc.id, ...write, draft: false, data: { title: 'Yeni başlık', _status: 'published' } as any })
    expect(revalidatePath, 'publish').toHaveBeenCalledTimes(1)

    revalidatePath.mockClear()
    await payload.update({ collection: 'pages', id: doc.id, ...write, draft: false, data: { _status: 'draft' } as any })
    expect(revalidatePath, 'unpublish').toHaveBeenCalledTimes(1)
    const visible = await payload.find({ collection: 'pages', where: { id: { equals: doc.id } }, overrideAccess: false })
    expect(visible.docs).toHaveLength(0) // really unpublished
  })

  it('a draft of a page that was never published does not purge', async () => {
    await payload.create({ collection: 'pages', ...write, draft: true, data: { slug: `never-${Date.now()}`, title: 'Hiç yayınlanmadı', _status: 'draft' } as any })
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it('a new upload does not purge; editing a used image (alt text) does', async () => {
    const media = await payload.create({ collection: 'media', ...write, data: { alt: 'x' }, filePath: path.resolve('seed/photos/arch-01.webp') })
    expect(revalidatePath, 'upload').not.toHaveBeenCalled()
    await payload.update({ collection: 'media', id: media.id, ...write, data: { alt: 'yeni' } })
    expect(revalidatePath, 'edit').toHaveBeenCalledTimes(1)
  })

  it('globals: site settings always purge; a home page draft does not, publishing does', async () => {
    const s = await payload.findGlobal({ slug: 'site-settings', locale: defaultLocale })
    await payload.updateGlobal({ slug: 'site-settings', ...write, data: { companyName: s.companyName || 'Monarch', wordmark: s.wordmark || 'MONARCH', email: s.email || 'a@b.co' } as any })
    expect(revalidatePath, 'settings').toHaveBeenCalledTimes(1)

    revalidatePath.mockClear()
    await payload.updateGlobal({ slug: 'home-page', ...write, draft: true, data: { hero: { statement: 'taslak' } } as any })
    expect(revalidatePath, 'home draft').not.toHaveBeenCalled()
  })
})
