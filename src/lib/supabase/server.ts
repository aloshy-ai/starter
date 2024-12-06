// src/lib/supabase/server.ts

import { cookies } from 'next/headers'
import type { CookieOptions } from '@supabase/ssr'
import { createServerClient as createClient } from '@supabase/ssr'
import type { Database } from '@/lib/types/database'

/**
 * Asynchronously creates and returns a server-side client instance for interacting with the database.
 * It utilizes environment variables for the Supabase URL and the service role key.
 * The client is configured with cookie management capabilities including retrieval and setting of cookies.
 *
 * @return {Promise<Client>} A promise that resolves to the client instance configured for server-side operations.
 */
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
