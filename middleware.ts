import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createClient(request, response)

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect profile and dashboard routes
  if (request.nextUrl.pathname.startsWith('/profile') ||
      request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      // Redirect to home page if not authenticated
      return NextResponse.redirect(new URL('/?auth=signin', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/dashboard/:path*',
    '/transactions/:path*',
    '/documents/:path*',
    '/meetings/:path*',
    '/journal/:path*',
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
