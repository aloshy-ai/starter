import { Page } from '@playwright/test'

export async function getImageDimensions(page: Page, selector: string) {
  await page.waitForSelector(selector)

  return page.locator(selector).evaluate((el: Element) => {
    const img = el as HTMLImageElement
    return {
      width: img.naturalWidth,
      height: img.naturalHeight,
    }
  })
}

export async function verifyOGImage(page: Page, path: string) {
  const response = await page.goto(path)
  return {
    contentType: response?.headers()['content-type'],
    ok: response?.ok(),
  }
}

export async function waitForAuthRedirect(page: Page) {
  await page.waitForURL('**/user', { timeout: 10000 })
  await page.waitForLoadState('networkidle')
}
