import '@/app/globals.css'
import { ThemeProvider } from 'next-themes'
import { metadata } from '@/app/metadata'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { lato } from '@/app/fonts'
import { cn } from '@/lib/utils'

export { metadata }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth antialiased" suppressHydrationWarning>
      <body
        className={cn(
          lato.variable,
          'relative min-h-screen w-screen touch-pan-y overflow-x-hidden'
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
