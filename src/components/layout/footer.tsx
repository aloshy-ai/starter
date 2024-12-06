import Link from 'next/link'

export function Footer() {
  return (
    <footer>
      <hr />
      <nav>
        <Link href="/">Home</Link>
        <Link href="/user">Dashboard</Link>
      </nav>
    </footer>
  )
}
