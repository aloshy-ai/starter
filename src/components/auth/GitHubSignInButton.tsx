'use client'

import { Button } from '@/components/ui/button'
import { signInWithGitHub } from '@/lib/supabase/auth'

export default function GitHubSignInButton() {
  return (
    <Button onClick={() => signInWithGitHub()} className="w-full">
      Continue with GitHub
    </Button>
  )
}
