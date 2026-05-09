import { cookies } from 'next/headers';
import { verifyToken, BrowserSessionPayload } from '@/lib/jwt';
import { HomeContent } from '@/components/home-content';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  let isAuthenticated = false;

  if (token) {
    const payload = verifyToken<BrowserSessionPayload>(token);
    if (payload && payload.typ === 'browser') {
      isAuthenticated = true;
    }
  }

  return <HomeContent isAuthenticated={isAuthenticated} />;
}
