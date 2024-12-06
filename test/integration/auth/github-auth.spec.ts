// test/integration/auth/github-auth.spec.ts

import { test } from '@playwright/test'

test.describe('GitHub Authentication Flow', () => {
  test.describe('Login with OAuth', () => {
    test('login, save cookies and localStorage', async ({ page, context }) => {
      // Navigate to application login page
      await page.goto('/')

      // Log in by clicking the OAuth button
      await page.getByText('Sign In with Github').click()

      // Now we are moving to a 3rd party login page....

      // We are at a new page for login, type email address
      await page.getByLabel('Username or email address').fill('noreply@aloshy.ai')
      await page.getByLabel('Password').fill('1zmu.Freq')
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
