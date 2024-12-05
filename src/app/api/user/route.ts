import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ name: 'John Doe' })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: 'GET',
    },
  })
}
