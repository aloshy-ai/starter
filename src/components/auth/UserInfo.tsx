'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/auth-js'
import { createBrowserClient } from '@/lib/supabase/client'

export function UserInfo() {
  const supabase = createBrowserClient()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data, error }) => {
        if (error) console.error(error.message)
        if (data.user) setUser(data.user)
        else console.error('No user found')
      })
      .catch(console.error)
  }, [supabase.auth])

  return (
    <div>
      <h1>User Info</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
