import { beforeEach, describe, expect, it, vi } from 'vitest'

const revalidatePath = vi.hoisted(() => vi.fn())
vi.mock('next/cache', () => ({ revalidatePath }))

import { revalidateAfterChange, revalidateAfterDelete } from '../../src/lib/revalidate'

const call = (hook: any, args: Record<string, unknown>) => hook({ doc: { id: 1 }, ...args })

describe('cache purging', () => {
  beforeEach(() => revalidatePath.mockClear())

  it('purges the site on a normal save and on delete', async () => {
    await call(revalidateAfterChange, { req: { query: {} } })
    call(revalidateAfterDelete, { req: { query: {} } })
    expect(revalidatePath).toHaveBeenCalledTimes(2)
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('does NOT purge on Live Preview autosaves (they only write a draft while the editor types)', async () => {
    await call(revalidateAfterChange, { req: { query: { autosave: 'true' } } })
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it('honours context.disableRevalidate (seed script)', async () => {
    await call(revalidateAfterChange, { req: { query: {} }, context: { disableRevalidate: true } })
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it('returns the document unchanged', async () => {
    expect(await call(revalidateAfterChange, { req: { query: {} } })).toEqual({ id: 1 })
  })
})
