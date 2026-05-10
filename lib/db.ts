import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const SALT_ROUNDS = 12;

export interface BuyerApiKey {
  id: string;
  buyer_id: string;
  key_hash: string;
  key_name: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export async function hashApiKey(key: string): Promise<string> {
  return bcrypt.hash(key, SALT_ROUNDS);
}

export function generateApiKey(): string {
  return `vnb-sk-${crypto.randomBytes(32).toString('hex')}`;
}

export async function getBuyerApiKeys(buyerId: string): Promise<BuyerApiKey[]> {
  const result = await pool.query(
    'SELECT id, buyer_id, key_hash, key_name, is_active, created_at, updated_at FROM buyer_api_keys WHERE buyer_id = $1 ORDER BY created_at DESC',
    [buyerId]
  );
  return result.rows;
}

export async function createBuyerApiKey(buyerId: string, keyHash: string, keyName: string): Promise<BuyerApiKey> {
  const result = await pool.query(
    'INSERT INTO buyer_api_keys (buyer_id, key_hash, key_name) VALUES ($1, $2, $3) RETURNING id, buyer_id, key_hash, key_name, is_active, created_at, updated_at',
    [buyerId, keyHash, keyName]
  );
  return result.rows[0];
}

export async function revokeBuyerApiKey(keyId: string, buyerId: string): Promise<BuyerApiKey> {
  const result = await pool.query(
    'UPDATE buyer_api_keys SET is_active = false WHERE id = $1 AND buyer_id = $2 RETURNING id, buyer_id, key_hash, key_name, is_active, created_at, updated_at',
    [keyId, buyerId]
  );
  return result.rows[0];
}

export async function getBuyerIdByUserId(userId: string): Promise<string | null> {
  const result = await pool.query(
    'SELECT id FROM buyers WHERE user_id = $1',
    [userId]
  );
  return result.rows[0]?.id || null;
}
