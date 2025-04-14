import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = ['/upload']; // add your own

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname); // Optional: redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to all routes or limit scope using matcher
export const config = {
  matcher: ['/upload/:path*'],
};
