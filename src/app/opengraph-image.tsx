import { ImageResponse } from 'next/og'
import { SITE_SHORT_NAME } from '@/lib/constants'

export const runtime = 'edge'

export const alt = SITE_SHORT_NAME
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Blog Posts
      </div>
    ),
    {
      ...size,
    }
  )
}
