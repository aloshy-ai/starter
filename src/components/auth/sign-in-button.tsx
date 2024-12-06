// src/components/auth/sign-in-button.tsx

'use client'

import Link from 'next/link'
import { SiGithub } from '@icons-pack/react-simple-icons'
import React from 'react'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { FadeInOut } from '@/components/layout/fade-in-out'
import { cn } from '@/lib/utils'

/**
 * Renders a SignIn button with a hover effect, linking to the GitHub authentication page.
 *
 * @param {object} params - The parameters for the SignInButton component.
 * @param {string} [params.className] - Optional additional class names for styling the button component.
 * @return {React.JSX.Element} A React JSX element representing the sign-in button.
 */
export function SignInButton({ className }: { className?: string }): React.JSX.Element {
  return (
    <FadeInOut className={cn('', className)}>
      <Link href={'/auth/sign-in'}>
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="flex items-center space-x-2 bg-white text-lg font-medium text-black dark:bg-black dark:text-white"
        >
          <SiGithub size="40" />
          <span>Sign In with Github</span>
        </HoverBorderGradient>
      </Link>
    </FadeInOut>
  )
}
