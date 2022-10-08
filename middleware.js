// middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware( NextRequest) {
    // console.log(NextRequest,NextResponse)
  return ;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!static|favicon.ico).*)',
  ],
}