import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const url = req.nextUrl.clone() // Clone the request URL
  // Extracting the pathname from the request URL
  const { pathname } = url

  // Check if the request is for the login or signup page
  if (pathname.includes('/login') || pathname.includes('/signup')) {
    // Allow the request to proceed without checking for a session
    return NextResponse.next()
  }

  const { data: { session } = {} } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.rewrite(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
