// src/app/user/page.tsx

import React from 'react'
import { SignOutButton } from '@/components/auth/sign-out-button'

/**
 * UserPage component renders a SignOutButton that is styled and positioned
 * to be fixed and fully covering the viewport. It is primarily used to denote
 * pages where user authentication is required, and allows the user to sign out.
 *
 * @return {React.JSX.Element} Returns a React JSX element representing a sign-out button
 *                        that is styled with specific classes for positioning
 *                        and appearance within the page.
 */
export default function UserPage(): React.JSX.Element {
  return (
    <SignOutButton className="fixed inset-0 z-10 flex items-start justify-center p-8 md:justify-end" />
  )
}
