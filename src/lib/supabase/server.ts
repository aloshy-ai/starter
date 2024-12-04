import { cookies } from 'next/headers'
import { createServerClient as createClient } from '@supabase/ssr'
import type { CookieOptions } from '@supabase/ssr'
import type { Database } from '@/lib/types/database'

export async function createServerClient() {
  const cookieStore = await cookies()

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            console.error('Failed to set cookies:', error)
          }
        },
      },
    }
  )
}
