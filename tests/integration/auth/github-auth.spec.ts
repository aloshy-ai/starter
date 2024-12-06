// tests/integration/auth/github-auth.spec.ts

import { test } from '@playwright/test'

test.describe('GitHub Authentication Flow', () => {
  test.describe('Login with OAuth', () => {
    test('login, save cookies and localStorage', async ({ page, context }) => {
      if (!process.env.TEST_OAUTH_GITHUB_USERNAME)
        throw new Error('TEST_OAUTH_GITHUB_USERNAME is not set')
      if (!process.env.TEST_OAUTH_GITHUB_PASSWORD)
        throw new Error('TEST_OAUTH_GITHUB_PASSWORD is not set')

      // Navigate to application login page
      await page.goto('/')

      // Log in by clicking the OAuth button
      await page.getByText('Sign In with Github').click()

      await page
        .getByLabel('Username or email address')
        .fill(process.env.TEST_OAUTH_GITHUB_USERNAME)
      await page.getByLabel('Password').fill(process.env.TEST_OAUTH_GITHUB_PASSWORD)
      await page.getByRole('button', { name: 'Sign in', exact: true }).click()

      // Now we're back to our own app
      // Wait that the main page has loaded
      await page.waitForURL('**/user', { timeout: 10000 })

      // Wait for network to be idle, if we save storage too early, needed storage values might not yet be available
      await page.waitForLoadState('networkidle')

      // Save cookies and localstorage to a file, which we can use later in the tests to be logged in automatically
      await context.storageState({ path: 'test-results/state.json' })
    })
    // Test suite ends
  })
})
