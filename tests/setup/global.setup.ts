import { test as setup } from '@playwright/test'

setup('global setup', async ({ page }) => {
  process.env.PLAYWRIGHT_TEST_BASE_URL = 'http://localhost:3000'
})
