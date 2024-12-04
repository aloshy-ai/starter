'use client'

import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/supabase/auth'

export default function SignOutButton() {
  return (
    <Button onClick={() => signOut()} className="w-full">
      Continue with GitHub
    </Button>
  )
}
