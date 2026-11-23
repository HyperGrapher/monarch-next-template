// Run through `payload run` (see helpers/db.ts). Drops every table in the TEST database.
import '../helpers/testEnv'
import { getPayload } from 'payload'
import config from '../../src/payload.config'

const payload = await getPayload({ config: await config })
await payload.db.dropDatabase({ adapter: payload.db } as any)
console.log('[test] database dropped')
process.exit(0)
