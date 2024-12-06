import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Updates the session based on the incoming request.
 * If session is expired, it will refresh it by trying to fetch the user.
 * If session is invalid, it will redirect to the sign-in page.
 *
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
