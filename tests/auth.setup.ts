import { test as setup, expect } from '@playwright/test'
import path from 'path'

const authFile = path.join(__dirname, '.auth/user.json')

setup('global setup', async ({ page, context }) => {
  process.env.PLAYWRIGHT_TEST_BASE_URL = 'http://localhost:3000'
})

setup('authenticate', async ({ page, context }) => {
  if (!process.env.TEST_OAUTH_GITHUB_USERNAME)
    throw new Error('TEST_OAUTH_GITHUB_USERNAME is not set')
  if (!process.env.TEST_OAUTH_GITHUB_PASSWORD)
    throw new Error('TEST_OAUTH_GITHUB_PASSWORD is not set')

  try {
    await page.goto('/')
    await expect(page).toHaveURL('/')

    await page.getByText('Sign In with Github').click()

    await page.getByLabel('Username or email address').fill(process.env.TEST_OAUTH_GITHUB_USERNAME)
    await page.getByLabel('Password').fill(process.env.TEST_OAUTH_GITHUB_PASSWORD)
    await page.getByRole('button', { name: 'Sign in', exact: true }).click()

    await page.waitForURL('**/user', { timeout: 10000 })
    await page.waitForLoadState('networkidle')

    await context.storageState({ path: authFile })
  } catch (error) {
    console.error('Auth setup failed:', error)
    throw error
  }
})
