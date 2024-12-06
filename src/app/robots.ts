import type { MetadataRoute } from 'next'
import { SITE_DOMAIN } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: `/user/`,
    },
    sitemap: `https://${SITE_DOMAIN}/sitemap.xml`,
  }
}
