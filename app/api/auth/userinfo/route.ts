import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, BrowserSessionPayload } from '@/lib/jwt';
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
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify JWT token locally
    const payload = verifyToken<BrowserSessionPayload>(token);

    if (!payload || payload.typ !== 'browser') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check session status in database
    const sessionValid = await checkSessionStatus(payload.sid);
    if (!sessionValid) {
      return NextResponse.json({ error: 'Session expired or revoked' }, { status: 401 });
    }

    // Query database directly to get user info
    const result = await pool.query(
      'SELECT id, email, username, display_name, roles, email_verified FROM users WHERE id = $1',
      [payload.uid]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = result.rows[0];
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user info:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
