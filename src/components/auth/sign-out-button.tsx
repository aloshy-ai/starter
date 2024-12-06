import { Button } from '@/components/ui/button'
import { signOutAction } from '@/lib/supabase/auth'

export function SignOutButton() {
  return <Button onClick={signOutAction}>Sign Out</Button>
}
