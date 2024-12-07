import { Page, test as setup } from '@playwright/test'
import path from 'path'
import fs from 'fs'
import { AUTH_FILE } from '../paths'

const MAX_RETRIES = 3
const RETRY_DELAY = 1000

// Ensure auth directory exists
const authDir = path.dirname(AUTH_FILE)
if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir, { recursive: true })
}

// Helper to wait for element with retry
async function waitForElementWithRetry(page: Page, selector: string, options = {}) {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      await page.waitForSelector(selector, { timeout: 5000, ...options })
      return true
    } catch (e) {
      console.log(`Attempt ${i + 1}/${MAX_RETRIES} failed to find ${selector}`)
      if (i === MAX_RETRIES - 1) throw e
      await page.waitForTimeout(RETRY_DELAY)
    }
  }
  return false
}

// Helper to wait for URL with logging
async function waitForURLWithLogging(page: Page, urlPattern: string, options = {}) {
  try {
    await page.waitForURL(urlPattern, { timeout: 30000, ...options })
    console.log(`Successfully navigated to URL matching ${urlPattern}`)
    return true
  } catch (e) {
    console.error(`Failed to navigate to ${urlPattern}`)
    console.error('Current URL:', page.url())
    throw e
  }
}

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
    await page.getByText('Sign In with Github').click()
    await waitForURLWithLogging(page, '**/login**')

    await page.getByLabel('Username or email address').fill(process.env.TEST_OAUTH_GITHUB_USERNAME)
    await page.getByLabel('Password').fill(process.env.TEST_OAUTH_GITHUB_PASSWORD)
    await page.getByRole('button', { name: 'Sign in', exact: true }).click()

    try {
      const authorizeSelectors = [
        'button[type="submit"][name="authorize"]',
        'button[data-octo-click="oauth_application_authorization"]',
        'button:has-text("Authorize")',
      ]

      for (const selector of authorizeSelectors) {
        const found = await waitForElementWithRetry(page, selector)
        if (found) {
          await page.click(selector)
          break
        }
      }
    } catch (e) {
      // Button might not appear if already authorized
    }

    await waitForURLWithLogging(page, '**/user')
    await page.waitForLoadState('networkidle')
    await context.storageState({ path: AUTH_FILE })
  } catch (error) {
    throw error
  }
})
