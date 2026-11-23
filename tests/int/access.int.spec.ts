import { beforeAll, describe, expect, it } from 'vitest'
import { getPayload, type Payload } from 'payload'
import config from '../../src/payload.config'

let payload: Payload
let admin: any
let editor: any

const asAdmin = () => ({ user: admin, overrideAccess: false as const })
const asEditor = () => ({ user: editor, overrideAccess: false as const })
const anonymous = { overrideAccess: false as const }

beforeAll(async () => {
  payload = await getPayload({ config: await config })
})

describe('users and registration', () => {
  it('lets the very first registration through and makes it an admin', async () => {
    admin = await payload.create({ collection: 'users', data: { email: 'admin@test.dev', password: 'Password123!', roles: ['editor'] }, ...anonymous })
    expect(admin.roles).toEqual(['admin'])
  })
  it('closes public registration once a user exists', async () => {
    await expect(payload.create({ collection: 'users', data: { email: 'intruder@test.dev', password: 'Password123!', roles: ['editor'] }, ...anonymous })).rejects.toThrow()
  })
  it('lets an admin create an editor', async () => {
    editor = await payload.create({ collection: 'users', data: { email: 'editor@test.dev', password: 'Password123!', roles: ['editor'] }, ...asAdmin() })
    expect(editor.roles).toEqual(['editor'])
  })
  it('hides the user list from anonymous visitors', async () => {
    await expect(payload.find({ collection: 'users', ...anonymous })).rejects.toThrow()
  })
  it('lets an editor see only themselves', async () => {
    const { docs } = await payload.find({ collection: 'users', ...asEditor() })
    expect(docs.map((u) => u.email)).toEqual(['editor@test.dev'])
  })
  it('stops an editor creating or deleting users', async () => {
    await expect(payload.create({ collection: 'users', data: { email: 'x@test.dev', password: 'Password123!', roles: ['editor'] }, ...asEditor() })).rejects.toThrow()
    await expect(payload.delete({ collection: 'users', id: admin.id, ...asEditor() })).rejects.toThrow()
  })
  it('stops an editor promoting themselves', async () => {
    const updated = await payload.update({ collection: 'users', id: editor.id, data: { roles: ['admin'] }, ...asEditor() })
    expect(updated.roles).toEqual(['editor'])
    const fresh = await payload.findByID({ collection: 'users', id: editor.id, overrideAccess: true })
    expect(fresh.roles).toEqual(['editor'])
  })
})

describe('content permissions', () => {
  it('lets an editor create and edit content', async () => {
    const doc = await payload.create({ collection: 'categories', data: { slug: 'ed-test', name: 'Editor made' }, ...asEditor() })
    const upd = await payload.update({ collection: 'categories', id: doc.id, data: { name: 'Edited' }, ...asEditor() })
    expect(upd.name).toBe('Edited')
  })
  it('stops anonymous visitors writing content', async () => {
    await expect(payload.create({ collection: 'categories', data: { slug: 'anon', name: 'Nope' }, ...anonymous })).rejects.toThrow()
  })
})

describe('contact submissions', () => {
  it('cannot be created through the public API', async () => {
    await expect(payload.create({ collection: 'contact-submissions', data: { name: 'Bot', email: 'b@b.co', message: 'hello there friend' }, ...anonymous })).rejects.toThrow()
  })
  it('cannot be read by anonymous visitors', async () => {
    await expect(payload.find({ collection: 'contact-submissions', ...anonymous })).rejects.toThrow()
  })
  it('can be read by staff once the server stored one', async () => {
    await payload.create({ collection: 'contact-submissions', data: { name: 'Real Person', email: 'p@p.co', message: 'A real enquiry message', locale: 'en' }, overrideAccess: true })
    const { docs } = await payload.find({ collection: 'contact-submissions', ...asEditor() })
    expect(docs).toHaveLength(1)
  })
})
