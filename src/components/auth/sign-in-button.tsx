import Link from 'next/link'
import { SiGithub } from '@icons-pack/react-simple-icons'
import React from 'react'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { FadeInOut } from '@/components/layout/fade-in-out'
import { cn } from '@/lib/utils'

export function SignInButton({ className }: { className?: string }) {
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
