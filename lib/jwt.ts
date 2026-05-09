import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ISSUER = 'accounts.openvoidnet.com';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export interface BrowserSessionPayload {
  sid: string;
  uid: string;
  typ: 'browser';
}

export function verifyToken<T = any>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string, {
      issuer: JWT_ISSUER,
    }) as T;
    return decoded;
  } catch (error) {
    return null;
  }
}
