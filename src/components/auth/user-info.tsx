import { createServerClient } from '@/lib/supabase/server'

export async function UserInfo() {
  const supabase = await createServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) throw error

  return (
    <div>
      <h1>User Info</h1>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  )
}
