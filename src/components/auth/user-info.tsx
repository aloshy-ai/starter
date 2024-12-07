import { createServerClient } from '@/lib/supabase/server'

export async function UserInfo() {
  const supabase = await createServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    return <div data-testid="user-info-error">Error: {error.message}</div>
  }

  if (!user) {
    return <div data-testid="user-info-empty">No user found</div>
  }

  return <div data-testid="user-info">{<h1>Hi {user.user_metadata['full_name']}</h1>}</div>
}
