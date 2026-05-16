import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, BrowserSessionPayload } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { pool } from '@/lib/db';

async function checkSessionStatus(sessionId: string): Promise<boolean> {
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

  // Check session status in database
  const sessionValid = await checkSessionStatus(payload.sid);
  if (!sessionValid) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json({
    authenticated: true,
    userId: payload.uid,
    sessionId: payload.sid,
  }, { status: 200 });
}
