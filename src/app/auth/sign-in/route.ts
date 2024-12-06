// src/app/auth/sign-in/route.ts

import { NextRequest, NextResponse } from 'next/server'

/**
 * Handles a GET request and redirects the user to the GitHub authentication page.
 *
 * @param {NextRequest} req - The incoming request object which contains details such as headers, query parameters, etc.
 * @return {Promise<NextResponse>} A promise that resolves to a response object which will redirect the client to the specified GitHub authentication URL.
 */
export async function GET(req: NextRequest) {
  return NextResponse.redirect(new URL('/auth/github', req.url))
}
