import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

const port = process.env.E2E_PORT || '3100'

/**
 * End-to-end tests run against a production build on a FRESH, seeded TEST database:
 *   TEST_DATABASE_URL=postgres://… pnpm test:e2e
 * tests/e2e/server.mjs resets the database, migrates, seeds, builds and starts the app.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  timeout: 60_000,
  use: { baseURL: `http://localhost:${port}`, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node tests/e2e/server.mjs',
    url: `http://localhost:${port}/tr`,
    reuseExistingServer: false,
    timeout: 15 * 60_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
