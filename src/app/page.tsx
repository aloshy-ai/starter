// src/app/page.tsx

import React from 'react'
import { SignInButton } from '@/components/auth/sign-in-button'

/**
 * HomePage component returns a SignInButton component with specific styling.
 *
 * @return {React.JSX.Element} A SignInButton component positioned absolutely in the center of the viewport with a high z-index.
 */
export default function HomePage(): React.JSX.Element {
  return <SignInButton className="fixed inset-0 z-10 flex items-center justify-center" />
}
