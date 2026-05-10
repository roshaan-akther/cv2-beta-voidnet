import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, BrowserSessionPayload } from '@/lib/jwt';
import { revokeBuyerApiKey, getBuyerIdByUserId } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log('[SERVER] DELETE /api/console/keys/[id] - Request received');
  console.log('[SERVER] Request URL:', request.url);
  console.log('[SERVER] Request method:', request.method);
  console.log('[SERVER] Request headers:', Object.fromEntries(request.headers.entries()));
  
  const { id } = await params;
  console.log('[SERVER] Params:', { id });
  
  try {
    console.log('[SERVER] Fetching cookies');
    const cookieStore = await cookies();
    console.log('[SERVER] Cookies available:', cookieStore.getAll());
    const token = cookieStore.get('auth_token')?.value;
    console.log('[SERVER] Token present:', !!token);
    console.log('[SERVER] Token length:', token?.length || 0);

    if (!token) {
      console.error('[SERVER] No token found in cookies');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[SERVER] Verifying token');
    const payload = verifyToken<BrowserSessionPayload>(token);
    console.log('[SERVER] Token payload:', payload);

    if (!payload || payload.typ !== 'browser') {
      console.error('[SERVER] Invalid token or wrong type:', payload?.typ);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    console.log('[SERVER] Token valid, user ID:', payload.uid);
    console.log('[SERVER] Fetching buyer ID for user:', payload.uid);
    const buyerId = await getBuyerIdByUserId(payload.uid);
    console.log('[SERVER] Buyer ID found:', buyerId);

    if (!buyerId) {
      console.error('[SERVER] Buyer not found for user:', payload.uid);
      return NextResponse.json({ error: 'Buyer not found' }, { status: 404 });
    }

    const keyId = id;
    console.log('[SERVER] Key ID to revoke:', keyId);

    if (!keyId) {
      console.error('[SERVER] Key ID is missing from params');
      return NextResponse.json({ error: 'Key ID is required' }, { status: 400 });
    }

    console.log('[SERVER] Revoking API key:', keyId, 'for buyer:', buyerId);
    const revokedKey = await revokeBuyerApiKey(keyId, buyerId);
    console.log('[SERVER] Revoked key result:', revokedKey);

    if (!revokedKey) {
      console.error('[SERVER] Key not found in database:', keyId);
      return NextResponse.json({ error: 'Key not found' }, { status: 404 });
    }

    const response = NextResponse.json({
      apiKey: {
        id: revokedKey.id,
        name: revokedKey.key_name,
        isActive: revokedKey.is_active,
        createdAt: revokedKey.created_at,
        updatedAt: revokedKey.updated_at,
      }
    });
    console.log('[SERVER] Response prepared successfully');
    return response;
  } catch (error) {
    console.error('[SERVER] Error in DELETE /api/console/keys/[id]:', error);
    console.error('[SERVER] Error stack:', error instanceof Error ? error.stack : String(error));
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
