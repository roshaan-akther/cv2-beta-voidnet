import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, BrowserSessionPayload } from '@/lib/jwt';
import { getBuyerApiKeys, getBuyerIdByUserId } from '@/lib/db';

export async function GET(request: NextRequest) {
  console.log('[SERVER] GET /api/console/keys - Request received');
  console.log('[SERVER] Request URL:', request.url);
  console.log('[SERVER] Request method:', request.method);
  console.log('[SERVER] Request headers:', Object.fromEntries(request.headers.entries()));
  
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

    console.log('[SERVER] Fetching API keys for buyer:', buyerId);
    const apiKeys = await getBuyerApiKeys(buyerId);
    console.log('[SERVER] API keys fetched, count:', apiKeys.length);
    console.log('[SERVER] API keys:', apiKeys);

    const response = NextResponse.json({ 
      keys: apiKeys.map(key => ({
        id: key.id,
        name: key.key_name,
        isActive: key.is_active,
        createdAt: key.created_at,
        updatedAt: key.updated_at,
      }))
    });
    console.log('[SERVER] Response prepared successfully');
    return response;
  } catch (error) {
    console.error('[SERVER] Error in GET /api/console/keys:', error);
    console.error('[SERVER] Error stack:', error instanceof Error ? error.stack : String(error));
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  console.log('[SERVER] POST /api/console/keys - Request received');
  console.log('[SERVER] Request URL:', request.url);
  console.log('[SERVER] Request method:', request.method);
  console.log('[SERVER] Request headers:', Object.fromEntries(request.headers.entries()));
  
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

    console.log('[SERVER] Parsing request body');
    const body = await request.json();
    console.log('[SERVER] Request body:', body);
    const { keyName } = body;

    if (!keyName || typeof keyName !== 'string' || keyName.trim().length === 0) {
      console.error('[SERVER] Invalid key name:', keyName);
      return NextResponse.json({ error: 'Key name is required' }, { status: 400 });
    }

    console.log('[SERVER] Importing DB functions');
    const { generateApiKey, hashApiKey, createBuyerApiKey } = await import('@/lib/db');
    console.log('[SERVER] Generating API key');
    const apiKey = generateApiKey();
    console.log('[SERVER] API key generated, length:', apiKey.length);
    console.log('[SERVER] Hashing API key');
    const keyHash = await hashApiKey(apiKey);
    console.log('[SERVER] Key hash generated');

    console.log('[SERVER] Creating API key in database for buyer:', buyerId, 'with name:', keyName.trim());
    const createdKey = await createBuyerApiKey(buyerId, keyHash, keyName.trim());
    console.log('[SERVER] API key created in database:', createdKey);

    const response = NextResponse.json({
      key: apiKey,
      apiKey: {
        id: createdKey.id,
        name: createdKey.key_name,
        isActive: createdKey.is_active,
        createdAt: createdKey.created_at,
        updatedAt: createdKey.updated_at,
      }
    }, { status: 201 });
    console.log('[SERVER] Response prepared successfully');
    return response;
  } catch (error) {
    console.error('[SERVER] Error in POST /api/console/keys:', error);
    console.error('[SERVER] Error stack:', error instanceof Error ? error.stack : String(error));
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
