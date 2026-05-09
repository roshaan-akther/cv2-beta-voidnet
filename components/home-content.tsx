'use client';

import { Header as NonAuthHeader } from "@/components/nonauth/header";
import { Header as AuthHeader } from "@/components/auth/header";

export function HomeContent({ isAuthenticated }: { isAuthenticated: boolean }) {
  const Header = isAuthenticated ? AuthHeader : NonAuthHeader;

  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1">
        {/* Page content */}
      </main>
    </div>
  );
}
