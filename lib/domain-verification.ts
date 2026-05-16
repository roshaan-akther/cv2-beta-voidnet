import { randomBytes } from 'crypto'

export function generateVerificationToken(): string {
  return randomBytes(32).toString('hex') // 64 chars, cryptographically secure
}

export function generateFileName(token: string): string {
  return `voidnet-site-verification-${token}.html`
}

export function generateFileContent(token: string): string {
  return `voidnet-site-verification-${token}`
}
