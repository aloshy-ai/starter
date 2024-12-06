// src/lib/supabase/client.ts

import { createBrowserClient as createClient } from '@supabase/ssr'
import type { Database } from '@/lib/types/database'

/**
 * Creates a new instance of the Supabase client configured to connect
 * to the database using credentials specified in environment variables.
 *
 * @return {SupabaseClient} A client that can interact with the specified Supabase database.
 */
export function createBrowserClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
