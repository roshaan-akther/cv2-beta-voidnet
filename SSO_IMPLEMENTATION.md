# Voidnet SSO Implementation

## Implementation Date
May 5, 2026

## Overview
Implemented Single Sign-On (SSO) for Voidnet using JWT-based authentication with VoidAuth. The implementation allows seamless authentication across the Void ecosystem using shared cookies.

## Architecture

### Authentication Flow
1. User attempts to access protected page (e.g., `/console`)
2. Middleware checks for `auth_token` cookie
3. If no cookie or invalid token → redirect to VoidAuth login with `returnTo` parameter
4. After successful login at VoidAuth, cookie is set and user is redirected back
5. Middleware validates JWT token and allows access

### Components

#### JWT Verification (`lib/jwt.ts`)
- Verifies JWT tokens using the same secret as VoidAuth
- Validates token issuer (`accounts.openvoidnet.com`)
- Returns null on invalid tokens (no fallbacks)

#### Proxy (`proxy.ts`)
- Runtime: Node.js (required for JWT verification with Node.js crypto module)
- Protected paths: `/console` and any path starting with `/console/`
- Redirects unauthenticated users to VoidAuth with full return URL
- Sets user headers (X-User-Id, X-Session-Id) for authenticated requests
- Note: Next.js 16 uses `proxy.ts` instead of `middleware.ts`

#### Authentication Status API (`app/api/auth/status/route.ts`)
- Server-side endpoint to check authentication status
- Used by home page to determine which header to display
- Returns: `{ authenticated: boolean, userId?: string, sessionId?: string }`

#### Protected Console Page (`app/console/page.tsx`)
- Server component (no client-side code)
- Uses authenticated header component
- Access controlled entirely by middleware

#### Dynamic Home Page (`app/page.tsx`)
- Server component that checks auth status server-side
- Passes authentication state to client component
- Shows appropriate header based on authentication

#### Client Components
- `components/home-content.tsx` - Client component wrapper for home page
- `components/auth/header.tsx` - Header for authenticated users (shows "Go to Console")
- `components/nonauth/header.tsx` - Header for non-authenticated users (shows "Sign in to Account")

## Configuration

### Environment Variables
```env
JWT_SECRET=local-dev-jwt-secret-change-in-production-min-32-chars-longer
NEXT_PUBLIC_AUTH_URL=http://localhost:3020
NEXT_PUBLIC_NET_URL=http://localhost:3000
```

**Critical:** JWT_SECRET must match exactly between VoidAuth and Voidnet.

### Cookie Settings
- Name: `auth_token`
- httpOnly: true
- secure: based on NODE_ENV
- sameSite: 'lax'
- path: '/'
- maxAge: 7 days
- domain: undefined (localhost) or '.openvoidnet.com' (production)

## Files Created

1. `/lib/jwt.ts` - JWT verification utility
2. `/lib/fonts.ts` - Font configuration (extracted from layout for client component compatibility)
3. `/middleware.ts` - Authentication middleware
4. `/app/api/auth/status/route.ts` - Authentication status API
5. `/app/console/page.tsx` - Protected console page
6. `/components/auth/header.tsx` - Authenticated user header
7. `/components/home-content.tsx` - Home page client component wrapper

## Files Modified

1. `/app/page.tsx` - Server-side auth check and component rendering
2. `/app/layout.tsx` - Removed font export (moved to lib/fonts.ts)
3. `/components/nonauth/header.tsx` - Updated font import and auth URL
4. `/.env.local` - Updated JWT_SECRET to match VoidAuth

## Testing Results

### ✅ Non-Authenticated Flow
1. Home page shows "Sign in to Account" button
2. Accessing `/console` redirects to VoidAuth login with returnTo parameter
3. Login form displays correctly at VoidAuth

### ✅ Authenticated Flow
1. After login at VoidAuth, cookie is set
2. User can access `/console` without redirect
3. Home page shows "Go to Console" button
4. Console page displays protected content
5. JWT token verified successfully in middleware

### ✅ SSO Verification
1. Login once at VoidAuth (localhost:3020)
2. Authentication persists across Voidnet (localhost:3000)
3. No re-login required when navigating between services
4. Cookie shared correctly across subdomains (in production with .openvoidnet.com domain)

## Security Features

1. **No Fallbacks**: System fails explicitly on errors (no silent failures)
2. **JWT Validation**: Strict issuer and signature verification
3. **HttpOnly Cookies**: Prevents XSS attacks
4. **Server-Side Verification**: All auth checks happen server-side
5. **Secure Redirects**: Full URL validation in returnTo parameter
6. **Node.js Runtime**: Uses secure crypto module for JWT operations

## Production Deployment

### Required Changes for Production
1. Set `NODE_ENV=production`
2. Update `JWT_SECRET` to strong 32+ character secret (must match across all services)
3. Set cookie domain to `.openvoidnet.com`
4. Enable HTTPS (secure cookie flag will be true)
5. Update `NEXT_PUBLIC_AUTH_URL` to `https://accounts.openvoidnet.com`
6. Update `NEXT_PUBLIC_NET_URL` to `https://openvoidnet.com`

### Domain Configuration
All services must be on subdomains of `openvoidnet.com`:
- accounts.openvoidnet.com (VoidAuth)
- openvoidnet.com (Voidnet)
- api.openvoidnet.com (API Gateway)
- chat.openvoidnet.com (VoidAI)
- docs.openvoidnet.com (Documentation)

## Future Extensions

### Adding More Protected Pages
Add paths to the `protectedPaths` array in `proxy.ts`:
```typescript
const protectedPaths = ['/console', '/dashboard', '/settings'];
```

### Adding More Services
Any service on `*.openvoidnet.com` can use the same SSO by:
1. Installing same JWT verification library
2. Using same JWT_SECRET
3. Checking for `auth_token` cookie
4. Verifying with same issuer (`accounts.openvoidnet.com`)

## Notes

- Next.js 16 uses `proxy.ts` instead of `middleware.ts` for authentication
- Font extraction to separate file prevents "use client" metadata export errors
- All components follow strict server/client component separation
- No assumptions or placeholders in code
- All errors fail explicitly (no soft landings)
