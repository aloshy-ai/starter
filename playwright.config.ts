// playwright.config.ts

import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'
import { AUTH_FILE } from './tests/paths'

dotenv.config({ path: '.env.local' })

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  fullyParallel: false,

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    navigationTimeout: 30000,
  },

  projects: [
    // Global setup
    {
      name: 'setup',
      testMatch: /.*setup\/global\.setup\.ts/,
    },

    // Auth setup - depends on global setup
    {
      name: 'auth-setup',
      testMatch: /.*setup\/auth\.setup\.ts/,
      dependencies: ['setup'],
      testIgnore: /.*\.spec\.ts/, // Ignore spec files
    },

    // Authenticated tests - depends on auth setup
    {
      name: 'authenticated',
      testMatch: /.*\.auth\.spec\.ts/,
      dependencies: ['auth-setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: AUTH_FILE,
      },
    },

    // Public tests - depends only on global setup
    {
      name: 'public',
      testMatch: /.*\.spec\.ts/,
      testIgnore: /.*\.auth\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
