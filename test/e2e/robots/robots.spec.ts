import { expect, test } from '@playwright/test'
import { SITE_DOMAIN } from '@/lib/constants'

test.describe('Robots.txt', () => {
  test('should serve robots.txt with correct content', async ({ page }) => {
    const response = await page.goto('/robots.txt')
    expect(response?.status()).toBe(200)

    const text = await response?.text()
    expect(text).toBeDefined()

    if (text) {
      // Each rule should be on its own line
      const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

      // Check main user agent rules
      expect(lines).toContain('User-Agent: *')
      expect(lines).toContain('Allow: /')

      // Check protected paths
      expect(lines).toContain('Disallow: /protected/')

      // Check sitemap
      expect(lines).toContain(`Sitemap: https://${SITE_DOMAIN}/sitemap.xml`)
    }
  })
})
