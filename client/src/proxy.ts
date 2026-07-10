import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/courses', '/quiz', '/certificate'];
const adminRoutes = ['/admin'];
const authRoutes = ['/login', '/register'];

function parseAuthCookie(raw: string): { isAuthenticated: boolean; isAdmin: boolean } {
  const attempts = [raw, decodeURIComponent(raw)];
  for (const attempt of attempts) {
    try {
      const stored = JSON.parse(attempt);
      const state = stored?.state;
      if (state) {
        return {
          isAuthenticated: !!(state.token && state.isAuthenticated),
          isAdmin: state.user?.role === 'admin',
        };
      }
    } catch {
      // try next
    }
  }
  return { isAuthenticated: false, isAdmin: false };
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const raw = request.cookies.get('auth-storage')?.value ?? '';
  const { isAuthenticated, isAdmin } = raw ? parseAuthCookie(raw) : { isAuthenticated: false, isAdmin: false };

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
