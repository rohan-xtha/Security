import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/courses', '/quiz', '/certificate'];
const adminRoutes = ['/admin'];
const authRoutes = ['/login', '/register'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('auth-storage')?.value;

  let isAuthenticated = false;
  let isAdmin = false;

  if (token) {
    try {
      const stored = JSON.parse(token);
      isAuthenticated = !!stored.state?.token;
      isAdmin = stored.state?.user?.role === 'admin';
    } catch {
      isAuthenticated = false;
    }
  }

  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (adminRoutes.some((route) => pathname.startsWith(route)) && !isAdmin) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
