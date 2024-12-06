// src/app/auth/sign-out/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

/**
 * Handles the HTTP GET request by signing out the user from Supabase authentication
 * and redirecting to the homepage.
 *
 * @param {NextRequest} req - The incoming request object containing the URL and other request details.
 * @return {Promise<NextResponse>} - A promise that resolves to a redirect response to the homepage.
 */
export async function GET(req: NextRequest) {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/', req.url))
}
