import '@/app/globals.css'
import { metadata } from '@/app/metadata'

export { metadata }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="m-0 flex h-screen w-screen items-center justify-center p-16 antialiased">
        {children}
      </body>
    </html>
  )
}
