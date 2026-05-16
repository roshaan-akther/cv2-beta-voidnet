import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { verification_id } = await req.json()
    
    if (!verification_id) {
      return NextResponse.json({ error: 'Verification ID is required' }, { status: 400 })
    }

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

    // Get verification record
    const result = await pool.query(
      `SELECT domain_name, verification_token 
       FROM user_verified_domains 
       WHERE id = $1 AND user_id = $2`,
      [verification_id, userId]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Verification not found' }, { status: 404 })
    }

    const { domain_name, verification_token } = result.rows[0]
    const fileName = `voidnet-site-verification-${verification_token}.html`
    
    // Try to fetch the verification file from both possible locations
    const paths = [
      `https://${domain_name}/.well-known/${fileName}`,
      `https://${domain_name}/${fileName}`
    ]

    let fileContent = null
    let fetchedFrom = null

    for (const url of paths) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          redirect: 'follow',
          signal: AbortSignal.timeout(15000) // 15 second timeout
        })

        if (response.ok) {
          const text = await response.text()
          fileContent = text.trim()
          fetchedFrom = url
          break
        }
      } catch (err) {
        console.log(`[DOMAIN VERIFICATION] Failed to fetch from ${url}:`, err)
        continue
      }
    }

    if (!fileContent) {
      console.error('[DOMAIN VERIFICATION] Verification file not found at any location')
      return NextResponse.json({ 
        verified: false, 
        error: 'Verification file not found. Make sure it is uploaded to the root directory or .well-known directory.' 
      }, { status: 400 })
    }

    const expectedContent = `voidnet-site-verification-${verification_token}`

    console.log('[DOMAIN VERIFICATION] File fetched from:', fetchedFrom)
    console.log('[DOMAIN VERIFICATION] File content:', fileContent)
    console.log('[DOMAIN VERIFICATION] Expected content:', expectedContent)

    if (fileContent === expectedContent) {
      await pool.query(
        `UPDATE user_verified_domains 
         SET is_verified = true, verified_at = NOW() 
         WHERE id = $1`,
        [verification_id]
      )
      return NextResponse.json({ 
        verified: true, 
        verified_at: new Date() 
      })
    } else {
      return NextResponse.json({ 
        verified: false, 
        error: 'Verification failed. File token does not match expected token.' 
      }, { status: 400 })
    }
  } catch (error) {
    console.error('[DOMAIN VERIFICATION] Error verifying domain:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
