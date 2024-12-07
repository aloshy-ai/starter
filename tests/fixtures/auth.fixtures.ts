import { test as base } from '@playwright/test'

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.waitForTimeout(1000)
    await page.goto('/user')
    await page.waitForLoadState('networkidle')

    try {
      const signOutButton = await page.waitForSelector('a[href="/auth/sign-out"]', {
        timeout: 30000,
        state: 'visible',
      })

      if (!signOutButton) {
        throw new Error('Not in authenticated state - Sign Out link not found')
      }

      await use(page)
    } catch (error) {
      throw error
    }
  },
})

export { expect } from '@playwright/test'
