import { test, expect } from '@playwright/test'

test.describe('Robots.txt', () => {
  test('should serve robots.txt with correct content', async ({ page }) => {
    const response = await page.goto('/robots.txt')

    // Verify response
    expect(response?.ok()).toBeTruthy()
    expect(response?.headers()['content-type']).toContain('text/plain')

    // Get the text content
    const text = await response?.text()
    expect(text).toBeDefined()

    if (text) {
      // Verify user agent rules
      expect(text).toContain('User-Agent: *')
      expect(text).toContain('Allow: /')

      // Verify Googlebot specific rules
      expect(text).toContain('User-Agent: Googlebot')
      expect(text).toContain('Disallow: /private/')
      expect(text).toContain('Disallow: /admin/')

      // Verify AnotherBot rules
      expect(text).toContain('User-Agent: AnotherBot')
      expect(text).toContain('Allow: /path')
      expect(text).toContain('Disallow: /another-path')

      // Verify sitemap
      expect(text).toContain('Sitemap: https://yourdomain.com/sitemap.xml')
    }
  })

  test('should block disallowed paths for Googlebot', async ({ page }) => {
    // Set Googlebot user agent
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
    })

    // Try accessing disallowed paths
    const privateResponse = await page.goto('/private/')
    const adminResponse = await page.goto('/admin/')

    // These paths should return 404 or some form of blocking
    expect(privateResponse?.status()).not.toBe(200)
    expect(adminResponse?.status()).not.toBe(200)
  })
})
