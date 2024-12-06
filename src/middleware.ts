// src/middleware.ts

import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Middleware function that handles incoming requests and updates the session accordingly.
 *
 * @param {NextRequest} request - The incoming request object from Next.js.
 * @return {Promise<NextResponse>} A promise that resolves when the session update is complete.
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  return await updateSession(request)
}

/**
 * Configuration object for routing settings.
 *
 * @property {Object} config - The configuration object.
 * @property {string[]} config.matcher - An array of URL patterns to match against.
 *   Each pattern can include dynamic segments with a colon prefix.
 *   The asterisk (*) symbol can be used as a wildcard to match any subpath.
 */
export const config = {
  matcher: ['/user/:path*'],
}
