import React from 'react'
import { SignOutButton } from '@/components/auth/sign-out-button'

export default function ProtectedPage() {
  return (
    <SignOutButton className="fixed inset-0 z-10 flex items-start justify-center p-8 md:justify-end" />
  )
}
