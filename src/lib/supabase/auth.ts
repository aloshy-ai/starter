import { createBrowserClient } from '@/lib/supabase/client'

export async function signInWithGitHub() {
  const supabase = createBrowserClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  })

  if (error) {
    console.error('Error:', error.message)
    return { error }
  }

  return { data }
}

export async function signOut() {
  const supabase = createBrowserClient()

  const { error } = await supabase.auth.signOut({
    scope: 'global',
  })

  if (error) {
    console.error('Error:', error.message)
    return { error }
  }

  return { data: null }
}
