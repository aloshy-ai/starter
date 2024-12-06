import { expect, test } from '@playwright/test'
import { SITE_DOMAIN } from '@/lib/constants'

test.describe('Sitemap', () => {
  test('should serve sitemap.xml with correct content', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    expect(response?.status()).toBe(200)

    const text = await response?.text()
    expect(text).toBeDefined()

    if (text) {
      const cleanXml = text.trim().replace(/\s+/g, ' ')

      // Basic structure checks
      expect(cleanXml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
      expect(cleanXml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

      // URL entry checks
      expect(cleanXml).toContain(`<loc>https://${SITE_DOMAIN}</loc>`)
      expect(cleanXml).toContain('<changefreq>daily</changefreq>')
      expect(cleanXml).toContain('<priority>1</priority>')

      // Verify lastmod format (ISO date)
      const lastmodMatch = cleanXml.match(/<lastmod>(.+?)<\/lastmod>/)
      expect(lastmodMatch).toBeTruthy()
      if (lastmodMatch) {
        const lastmodDate = new Date(lastmodMatch[1])
        expect(lastmodDate.toISOString()).toBe(lastmodMatch[1])
      }
    }
  })
})
