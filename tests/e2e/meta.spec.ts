import { test, expect } from '@playwright/test'
import { getImageDimensions, verifyOGImage } from '../utils/test-utils'
import { SITE_DOMAIN, SITE_SHORT_NAME } from '@/lib/constants'

test.describe('Meta Information', () => {
  test.describe('OpenGraph', () => {
    // ... existing opengraph tests ...
  })

  test.describe('Robots.txt', () => {
    // ... existing robots tests ...
  })

  test.describe('Sitemap', () => {
    // ... existing sitemap tests ...
  })
})
