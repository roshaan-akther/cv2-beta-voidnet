import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, BrowserSessionPayload } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const payload = verifyToken<BrowserSessionPayload>(token);

  if (!payload || payload.typ !== 'browser') {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json({
    authenticated: true,
    userId: payload.uid,
    sessionId: payload.sid,
  }, { status: 200 });
}
