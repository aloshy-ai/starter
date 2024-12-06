// src/app/auth/[provider]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { Provider } from '@supabase/supabase-js'
import { createServerClient } from '@/lib/supabase/server'

/**
 * Handles the GET request to initiate OAuth authentication with a specified provider.
 *
 * @param {NextRequest} req - The incoming request object containing details about the HTTP request.
 * @param {Object} param1 - An object containing route parameters.
 * @param {Promise<Object>} param1.params - A promise that resolves to an object containing the provider information.
 * @param {string} param1.params.provider - The name of the OAuth provider to authenticate with.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object, which redirects the user
 *                                 to the appropriate URL based on the outcome of the authentication process.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params

  if (provider) {
    try {
      const supabase = await createServerClient()
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          redirectTo: `${new URL(req.url).origin}/auth/callback`,
          scopes: `${provider === 'github' && 'read:user repo'}`,
        },
      })

      if (error) throw error

      return NextResponse.redirect(data.url)
    } catch (error) {
      console.error('OAuth error:', error)
      return NextResponse.redirect(new URL('/auth/error', req.url))
    }
  }

  return NextResponse.redirect(new URL('/auth/sign-in', req.url))
}
