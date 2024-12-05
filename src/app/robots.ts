import type { MetadataRoute } from 'next'
import { PROTECTED_ROUTE, SITE_DOMAIN } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: `${PROTECTED_ROUTE}/`,
    },
    sitemap: `https://${SITE_DOMAIN}/sitemap.xml`,
  }
}
