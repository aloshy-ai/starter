import { expect } from '@playwright/test'
import { test } from '../fixtures/auth.fixtures'

test.describe('Authentication', () => {
  test('should handle sign out flow', async ({ authenticatedPage }) => {
    // Find and click sign out
    const signOutButton = authenticatedPage.getByRole('link', { name: /Sign Out/i })
    await expect(signOutButton).toBeVisible()
    await signOutButton.click()

    // Verify redirect and signed out state
    await expect(authenticatedPage).toHaveURL('/')
    await expect(authenticatedPage.getByText('Sign In with Github')).toBeVisible()
  })
})
