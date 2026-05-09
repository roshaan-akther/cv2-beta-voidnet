import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, BrowserSessionPayload } from './lib/jwt';

export const runtime = 'nodejs';

const protectedPaths = ['/console'];
const developerRequiredPaths = ['/console/analytics', '/console/keys'];

const staticPaths = ['/_next/static', '/favicon.ico', '/favicons'];

async function checkDeveloperEnrollment(token: string): Promise<boolean> {
  try {
    const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3020';
    const response = await fetch(`${authUrl}/api/auth/userinfo`, {
      headers: {
        Cookie: `auth_token=${token}`,
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return !!data.username;
  } catch (error) {
    console.error('Developer enrollment check failed:', error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (staticPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    const authUrl = new URL(process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3020');
    authUrl.pathname = '/login';
    authUrl.searchParams.set('returnTo', `${process.env.NEXT_PUBLIC_NET_URL || 'http://localhost:3000'}${pathname}`);
    return NextResponse.redirect(authUrl);
  }

  const payload = verifyToken<BrowserSessionPayload>(token);

  if (!payload || payload.typ !== 'browser') {
    const authUrl = new URL(process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3020');
    authUrl.pathname = '/login';
    authUrl.searchParams.set('returnTo', `${process.env.NEXT_PUBLIC_NET_URL || 'http://localhost:3000'}${pathname}`);
    return NextResponse.redirect(authUrl);
  }

  // Check if user is enrolled as developer for publisher/buyer pages
  const isDeveloperRequired = developerRequiredPaths.some(path => pathname.startsWith(path));
  if (isDeveloperRequired) {
    const isDeveloper = await checkDeveloperEnrollment(token);
    if (!isDeveloper) {
      const authUrl = new URL(process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3020');
      authUrl.pathname = '/voidnet-developers';
      authUrl.searchParams.set('returnTo', `${process.env.NEXT_PUBLIC_NET_URL || 'http://localhost:3000'}${pathname}`);
      return NextResponse.redirect(authUrl);
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-User-Id', payload.uid);
  response.headers.set('X-Session-Id', payload.sid);

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|favicons|public).*)',
  ],
};
