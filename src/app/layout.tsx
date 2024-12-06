import '@/app/globals.css'
import { metadata } from '@/app/metadata'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export { metadata }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="m-0 flex h-screen w-screen items-center justify-center p-16 antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
