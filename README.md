# Voidnet Console

Developer console for the Void ecosystem. Part of the Void SSO system with VoidAuth.

## Getting Started

```bash
pnpm dev
```

Visit http://localhost:3000

## Architecture

- **SSO**: JWT-based authentication with VoidAuth (accounts.openvoidnet.com)
- **Protected Routes**: Console routes require authentication
- **Developer Enrollment**: Publisher/Buyer pages require developer enrollment (username)

## Adding New Pages

### 1. Create Page
```bash
app/console/[page-name]/page.tsx
```

### 2. Add to Sidebar
Edit `components/app-sidebar.tsx`:
```typescript
publisher: [
  {
    name: "Page Name",
    url: "/console/page-name",
    icon: <Icon />,
  },
],
```

### 3. Add Protection (if needed)
Edit `middleware.ts`:
```typescript
const developerRequiredPaths = ['/console/analytics', '/console/keys', '/console/page-name'];
```

## Navigation Sections

- **Overview**: Console, Accounts, Documentation (no dev enrollment required)
- **Publisher**: Analytics (requires dev enrollment)
- **Buyer**: API Keys (requires dev enrollment)
- **Footer**: Settings, Help

## Key Files

- `middleware.ts` - Authentication and developer enrollment checks
- `components/app-sidebar.tsx` - Sidebar navigation
- `lib/jwt.ts` - JWT verification (matches VoidAuth)
- `app/console/layout.tsx` - Console layout with sidebar

## Environment Variables

```env
JWT_SECRET=shared-with-voidauth
NEXT_PUBLIC_AUTH_URL=http://localhost:3020
NEXT_PUBLIC_NET_URL=http://localhost:3000
```
