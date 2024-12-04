import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - auth (authentication routes)
     * - error (error routes)
     * - 404 (404 routes)
     * - 500 (500 routes)
     * - root path ('/')
     * - sign-in
     * - sign-up
     * - signin
     * - signup
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    '/((?!_next/static|_next/image|favicon.ico|public|auth|token|verify|authorize|recover|factors|otp|error|404|500|sign-?(in|up)?|^$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
