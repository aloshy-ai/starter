import { expect, test } from '@playwright/test'
import { getImageDimensions, verifyOGImage } from '@/tests/utils/image'
import { SITE_SHORT_NAME } from '@/lib/constants'

test.describe('OpenGraph Images', () => {
  test('should generate main OG image', async ({ page }) => {
    const { contentType, ok } = await verifyOGImage(page, '/opengraph-image')

    // Verify response
    expect(ok).toBeTruthy()
    expect(contentType).toBe('image/png')

    // Verify image dimensions
    const size = await getImageDimensions(page, 'body > img')
    expect(size.width).toBe(1200)
    expect(size.height).toBe(630)
  })

  test('should have correct metadata', async ({ page }) => {
    await page.goto('/')

    // Check if OG meta tags are present
    const ogImage = await page.getAttribute('meta[property="og:image"]', 'content')
    expect(ogImage).toBeTruthy()

    // Verify alt text
    const ogAlt = await page.getAttribute('meta[property="og:image:alt"]', 'content')
    expect(ogAlt).toBe(SITE_SHORT_NAME)
  })
})
