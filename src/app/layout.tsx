import '@/app/globals.css'
import { ThemeProvider } from 'next-themes'
import { metadata } from '@/app/metadata'
import { lato } from '@/app/fonts'
import { cn } from '@/lib/utils'
import { HeroHighlight } from '@/components/ui/hero-highlight'

export { metadata }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth antialiased" suppressHydrationWarning>
      <body className={cn(lato.variable, 'relative h-screen w-screen touch-pan-y overflow-hidden')}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <HeroHighlight>{children}</HeroHighlight>
        </ThemeProvider>
      </body>
    </html>
  )
}
