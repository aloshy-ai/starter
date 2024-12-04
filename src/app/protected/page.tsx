import SignOutButton from '@/components/auth/SignOutButton'
import { UserInfo } from '@/components/auth/UserInfo'

export default function ProtectedPage() {
  return (
    <div>
      <UserInfo />
      <SignOutButton />
    </div>
  )
}
