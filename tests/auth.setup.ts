import { test as setup } from '@playwright/test'
import path from 'path'

const authFile = path.join(__dirname, '@tests/.auth/user.json')

setup('authenticate', async ({ page, context }) => {
  if (!process.env.TEST_OAUTH_GITHUB_USERNAME)
    throw new Error('TEST_OAUTH_GITHUB_USERNAME is not set')
  if (!process.env.TEST_OAUTH_GITHUB_PASSWORD)
    throw new Error('TEST_OAUTH_GITHUB_PASSWORD is not set')

  await page.goto('**/') // Navigate to App Home page
  await page.getByText('Sign In with Github').click() // Click on Sign In with Github button
  await page.getByLabel('Username or email address').fill(process.env.TEST_OAUTH_GITHUB_USERNAME) // Fill in the email address on Github login page
  await page.getByLabel('Password').fill(process.env.TEST_OAUTH_GITHUB_PASSWORD) // Fill in the password on Github login page
  await page.getByRole('button', { name: 'Sign in', exact: true }).click() // Click on Sign in button on Github login page
  await page.waitForURL('**/user', { timeout: 10000 }) // Wait for the protected page to load
  await page.waitForLoadState('networkidle') // Wait for network to be idle, if we save storage too early, needed storage values might not yet be available
  await page.context().storageState({ path: authFile })
})
