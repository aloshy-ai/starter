import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    // Just ignore TS errors during build
    ignoreBuildErrors: true,
  },
}

export default nextConfig
