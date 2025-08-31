import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ✅ Handle CORS for API routes
  if (pathname.startsWith('/api/')) {
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    const response = NextResponse.next()
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response
  }

  // ✅ Password protection for all non-API routes
  const passwordCookie = request.cookies.get('app_auth')?.value

  // Allow login page without auth
  if (pathname.startsWith('/login')) {
    return NextResponse.next()
  }

  // If cookie matches, allow access
  if (passwordCookie === process.env.APP_PASSWORD) {
    return NextResponse.next()
  }

  // Otherwise, redirect to /login
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)', '/api/:path*'],
  // Protect all pages + apply CORS on API
}
