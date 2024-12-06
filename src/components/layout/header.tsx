import { createServerClient } from '@/lib/supabase/server'
import { SignInWithGithubButton } from '@/components/auth/sign-in-with-github-button'
import { SignOutButton } from '@/components/auth/sign-out-button'

export async function Header() {
  const supabase = await createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <header>
      {session ? (
        <div className="flex gap-2">
          <span>Hi {session.user.user_metadata['full_name']}</span>
          <SignOutButton />
        </div>
      ) : (
        <SignInWithGithubButton />
      )}
      <hr />
    </header>
  )
}
