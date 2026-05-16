import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { generateVerificationToken, generateFileName, generateFileContent } from '@/lib/domain-verification'

function validateDomain(domain: string): { valid: boolean; error?: string } {
  if (!domain || !domain.trim()) {
    return { valid: false, error: 'Domain is required' }
  }
  
  const trimmed = domain.trim()
  
  // Remove http:// or https:// prefix
  const withoutProtocol = trimmed.replace(/^https?:\/\//, '')
  
  // Basic domain validation
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(\.[a-zA-Z]{2,})+$/
  if (!domainRegex.test(withoutProtocol)) {
    return { valid: false, error: 'Invalid domain format (e.g., example.com)' }
  }
  
  return { valid: true }
}

export async function POST(req: NextRequest) {
  try {
    const { domain } = await req.json()
    
    // Server-side validation
    const validation = validateDomain(domain)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Get user from JWT
    const cookie = req.cookies.get('auth_token')
    if (!cookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Simple JWT validation (in production, use proper JWT library)
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

    // Normalize domain (remove protocol)
    const normalizedDomain = domain.trim().replace(/^https?:\/\//, '')
    
    // Generate verification token
    const verificationToken = generateVerificationToken()
    const fileName = generateFileName(verificationToken)
    const fileContent = generateFileContent(verificationToken)

    // Insert into database
    const result = await pool.query(
      `INSERT INTO user_verified_domains (user_id, domain_name, verification_token)
       VALUES ($1, $2, $3)
       RETURNING id, created_at`,
      [userId, normalizedDomain, verificationToken]
    )

    const createdAt = result.rows[0].created_at
    const expiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000)

    return NextResponse.json({
      verification_id: result.rows[0].id,
      verification_token: verificationToken,
      domain: normalizedDomain,
      file_name: fileName,
      file_content: fileContent,
      upload_url: `https://${normalizedDomain}/${fileName}`,
      well_known_url: `https://${normalizedDomain}/.well-known/${fileName}`,
      expires_at: expiresAt
    })
  } catch (error) {
    console.error('[DOMAIN VERIFICATION] Error initiating verification:', error)
    return NextResponse.json({ error: 'Failed to initiate verification' }, { status: 500 })
  }
}
