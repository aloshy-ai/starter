import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // For App Router, redirects are preferred over rewrites for auth flows
  async redirects() {
    return [
      {
        // For all sign-in and sign-up routes
        source: '/sign-(in|up)',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
