import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, BrowserSessionPayload } from './lib/jwt';
import { pool } from './lib/db';

const protectedPaths = ['/console'];
const developerRequiredPaths = ['/console/publish-apps', '/console/keys', '/console/domains'];

const staticPaths = ['/_next/static', '/favicon.ico', '/favicons', '/marketplace'];

async function checkDeveloperEnrollment(userId: string): Promise<boolean> {
  try {
    const result = await pool.query(
      'SELECT username FROM users WHERE id = $1',
      [userId]
    );
    return !!result.rows[0]?.username;
  } catch (error) {
    console.error('Developer enrollment check failed:', error);
    return false;
  }
}

async function checkSessionStatusInDatabase(sessionId: string): Promise<boolean> {
  try {
    const result = await pool.query(
      'SELECT expires_at, revoked FROM browser_sessions WHERE id = $1',
      [sessionId]
    );

    if (result.rows.length === 0) {
      return false;
    }

    const session = result.rows[0];
    
    if (session.revoked) {
      return false;
    }

    if (new Date(session.expires_at) < new Date()) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Session status check failed:', error);
    return false;
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /dashboard to /console
  if (pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/console', request.url));
  }

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

  // Check session status in database
  const sessionValid = await checkSessionStatusInDatabase(payload.sid);
  if (!sessionValid) {
    const authUrl = new URL(process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3020');
    authUrl.pathname = '/login';
    authUrl.searchParams.set('returnTo', `${process.env.NEXT_PUBLIC_NET_URL || 'http://localhost:3000'}${pathname}`);
    return NextResponse.redirect(authUrl);
  }

  // Check if user is enrolled as developer for publisher/buyer pages
  const isDeveloperRequired = developerRequiredPaths.some(path => pathname.startsWith(path));
  if (isDeveloperRequired) {
    const isDeveloper = await checkDeveloperEnrollment(payload.uid);
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
