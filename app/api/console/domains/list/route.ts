import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    // Get user from JWT
    const cookie = req.cookies.get('auth_token')
    if (!cookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = cookie.value
    const parts = token.split('.')
    if (parts.length !== 3) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
    const userId = payload.uid

    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const result = await pool.query(
      `SELECT id, domain_name, verification_token, is_verified, verified_at, created_at
       FROM user_verified_domains
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    )

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('[DOMAIN VERIFICATION] Error fetching domains:', error)
    return NextResponse.json({ error: 'Failed to fetch domains' }, { status: 500 })
  }
}
