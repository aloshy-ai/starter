import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin
  const redirectTo = requestUrl.searchParams.get('redirect_to')?.toString()

  if (code) {
    const supabase = await createServerClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  if (redirectTo) {
    console.log('redirectTo', redirectTo)
    return NextResponse.redirect(`${origin}${redirectTo}`)
  }

  console.log('protected')
  return NextResponse.redirect(`${origin}/user`)
}
