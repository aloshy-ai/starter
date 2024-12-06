import { Button } from '@/components/ui/button'
import { signInWithGitHubAction } from '@/lib/supabase/auth'

export function SignInWithGithubButton() {
  return (
    <Button size="lg" onClick={signInWithGitHubAction} className="w-full font-bold uppercase">
      Sign In with Github
    </Button>
  )
}
