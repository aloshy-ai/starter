// playwright.config.ts

import dotenv from 'dotenv'
import { PlaywrightTestConfig } from 'playwright/test'

dotenv.config({ path: '.env.local' })

const config: PlaywrightTestConfig = {
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    env: Object.entries(process.env).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value
        }
        return acc
      },
      {} as Record<string, string>
    ),
  },
  workers: 1,
}

export default config

// export default defineConfig({
//   projects: [
//     { name: 'setup', testMatch: /.*\.setup\.ts/ },
//
//     {
//       name: 'chromium',
//       use: {
//         ...devices['Desktop Chrome'],
//         // Use prepared auth state.
//         storageState: 'playwright/.auth/user.json',
//       },
//       dependencies: ['setup'],
//     },
//   ],
// })
