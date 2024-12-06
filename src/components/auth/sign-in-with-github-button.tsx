import { Button } from '@/components/ui/button'
import { signInWithGitHubAction } from '@/lib/supabase/auth'

export function SignInWithGithubButton() {
  return <Button onClick={signInWithGitHubAction}>Sign In with Github</Button>
}
