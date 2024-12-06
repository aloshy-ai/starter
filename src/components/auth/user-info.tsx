import { createServerClient } from '@/lib/supabase/server'

export async function UserInfo() {
  const supabase = await createServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) throw error

  return <div>{user && <h1>Hi {user.user_metadata['full_name']}</h1>}</div>
}
