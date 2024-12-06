// src/components/auth/sign-out-button.tsx

'use client'

import React, { useEffect, useState } from 'react'
import { User } from '@supabase/auth-js'
import Link from 'next/link'
import { createBrowserClient } from '@/lib/supabase/client'
import { Loading } from '@/components/acertinity/loading'
import { FadeInOut } from '@/components/layout/fade-in-out'
import { cn } from '@/lib/utils'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

/**
 * A button component for signing out a user.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.className] - An optional class name to apply custom styles to the button.
 * @return {React.JSX.Element} Returns a React JSX element that renders a sign-out button if a user is authenticated.
 */
export function SignOutButton({ className }: { className?: string }): React.JSX.Element {
  const supabase = createBrowserClient()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error) {
        console.error(error)
        setError(error)
        return
      }
      if (!user) {
        const noUserError = new Error('No user')
        console.error(noUserError)
        setError(noUserError)
        return
      }
      setUser(user)
    })
  }, [supabase])

  if (error || !user)
    return <Loading className="fixed inset-0 z-10 flex items-start justify-center" />

  return (
    <FadeInOut className={cn('', className)}>
      {user && (
        <Link href={'/auth/sign-out'}>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="flex items-center space-x-2 bg-white text-lg font-medium text-black dark:bg-black dark:text-white"
          >
            <Avatar>
              <AvatarImage
                src={user.user_metadata['avatar_url']}
                alt={user.user_metadata['full_name']}
              />
            </Avatar>
            <span>Sign Out {user.user_metadata['full_name']}</span>
          </HoverBorderGradient>
        </Link>
      )}
    </FadeInOut>
  )
}
