import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        disallow: ['/private/', '/admin/'],
      },
      {
        userAgent: 'AnotherBot',
        allow: '/path',
        disallow: '/another-path',
      },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
