import type { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    images: [
      {
        url: '/og-image',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
}
