import { NextRequest, NextResponse } from 'next/server'
import { Provider } from '@supabase/supabase-js'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params

  if (provider) {
    try {
      const supabase = await createServerClient()
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          redirectTo: `${new URL(req.url).origin}/auth/callback`,
          scopes: `${provider === 'github' && 'read:user repo'}`,
        },
      })

      if (error) throw error

      return NextResponse.redirect(data.url)
    } catch (error) {
      console.error('OAuth error:', error)
      return NextResponse.redirect(new URL('/auth/error', req.url))
    }
  }

  return NextResponse.redirect(new URL('/auth/sign-in', req.url))
}
