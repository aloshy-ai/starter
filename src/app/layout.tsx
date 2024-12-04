import '@/app/globals.css'
import { metadata } from '@/app/metadata'
import { TextHoverEffect } from '@/components/ui/text-hover-effect'

export { metadata }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
      <div className="fixed inset-0 -z-10 h-screen w-screen bg-black p-16">
        <TextHoverEffect text="aloshy.ai" />
      </div>
    </html>
  )
}
