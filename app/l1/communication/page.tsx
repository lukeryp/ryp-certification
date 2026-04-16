'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToL1() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/l1');
  }, [router]);
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0d0d0d',
        color: '#9ca3af',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-work-sans)',
        fontSize: 14,
      }}
    >
      Redirecting to the Junior League curriculum…
    </div>
  );
}
