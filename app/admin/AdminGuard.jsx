'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [isLoading, user, router, pathname]);

  if (isLoading || !user) {
    return <div className="section bg-white min-h-screen" />;
  }

  if (!user.isAdmin) {
    return (
      <div className="section bg-white min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Not Authorized</h1>
          <p className="text-gray-600">You don&apos;t have access to the admin portal.</p>
        </div>
      </div>
    );
  }

  return children;
}
