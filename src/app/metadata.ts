import type { Metadata } from 'next'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
}
