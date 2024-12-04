'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/supabase/auth'

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <Button onClick={handleSignOut} className="w-full bg-red-700 font-bold uppercase">
      Sign Out
    </Button>
  )
}
