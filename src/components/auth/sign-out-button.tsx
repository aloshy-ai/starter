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

export function SignOutButton({ className }: { className?: string }) {
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
