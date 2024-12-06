import { Button } from '@/components/ui/button'
import { signOutAction } from '@/lib/supabase/auth'

export function SignOutButton() {
  return (
    <Button size="lg" onClick={signOutAction} className="w-full font-bold uppercase">
      Sign Out
    </Button>
  )
}
