import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  try {
    const response = await updateSession(request)

    const finalResponse = NextResponse.next({
      request: {
        headers: response.headers,
      },
    })

    // Add security headers
    finalResponse.headers.set('X-Frame-Options', 'DENY')
    finalResponse.headers.set('X-Content-Type-Options', 'nosniff')
    finalResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    return finalResponse
  } catch (error) {
    // Log error securely
    console.error('Middleware error:', error)

    // Redirect to error page or return unauthorized
    return NextResponse.redirect(new URL('/auth', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)/protected/:path*'],
}
