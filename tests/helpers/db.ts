import './testEnv'
import { execSync } from 'node:child_process'

const run = (cmd: string) => execSync(cmd, { stdio: 'inherit', env: { ...process.env, NODE_OPTIONS: '--no-deprecation' } })

/** Empties the test database and applies the real migrations (via the Payload CLI, same as production). */
export function resetDatabase() {
  run('pnpm exec payload run tests/helpers/dropDatabase.ts')
  run('pnpm exec payload migrate')
}
