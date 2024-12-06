// src/lib/supabase/middleware.ts

import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Handles updating a user session for incoming requests, ensuring authentication is managed correctly.
 * This function uses Supabase to verify the current session based on cookies present in the request.
 * If the session is missing or expired, it redirects the user to the sign-in page or an error page
 * depending on the nature of the error encountered.
 *
 * @param {NextRequest} request - The incoming request object, which includes headers and cookies.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object, which might be
 *         a normal server response, a redirect to a sign-in page, or a redirect to an error page.
 */
export const updateSession = async (request: NextRequest): Promise<NextResponse> => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create a Supabase client with the current request cookies
  const { auth } = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // To refresh session if expired
  const { error } = await auth.getUser()

  if (error) {
    if (
      error.code === 'session_not_found' ||
      error.name === 'AuthSessionMissingError' ||
      error.code === 'user_not_found'
    ) {
      response = NextResponse.redirect(new URL('/auth/sign-in', request.url))
    } else {
      console.error(`[ERROR] ${error.code} | ${error.status} | ${error.name} | ${error.message}`)
      response = NextResponse.redirect(new URL(`/error?message=${error.message}`, request.url))
    }
  }

  return response
}
