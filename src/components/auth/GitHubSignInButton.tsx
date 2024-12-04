'use client'

import { Button } from '@/components/ui/button'
import { signInWithGitHub } from '@/lib/supabase/auth'

export default function GitHubSignInButton() {
  const handleSignIn = async () => {
    await signInWithGitHub()
  }

  return (
    <Button size="lg" onClick={handleSignIn} className="w-full font-bold uppercase">
      Continue with GitHub
    </Button>
  )
}
