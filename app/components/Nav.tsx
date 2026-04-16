'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getCurrentUser, logout } from '../lib/storage';
import { useRouter } from 'next/navigation';

export default function Nav({ level }: { level?: 'l1' | 'l2' | 'l3' }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = getCurrentUser();

  const levelConfig = {
    l1: { label: 'ICC Junior League', abbr: 'L1' },
    l2: { label: 'ICC Instructor', abbr: 'L2' },
    l3: { label: 'Textbook Cert', abbr: 'L3' },
  };

  const config = level ? levelConfig[level] : null;

  return (
    <nav className="sticky top-0 z-50"
      style={{
        background: 'rgba(255,255,255,0.95)',
        borderBottom: '1px solid rgba(20,31,15,0.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}>
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/icc-logo.png"
              alt="ICC"
              width={26}
              height={26}
              style={{ objectFit: 'contain', opacity: 0.9 }}
            />
            <span className="text-xs font-semibold text-[#141f0f] tracking-widest hidden sm:block"
              style={{ fontFamily: 'var(--font-raleway)' }}>
              INTERLACHEN
            </span>
          </Link>
          {config && (
            <>
              <span className="text-[#ccc]">/</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest"
                style={{
                  background: 'rgba(20,31,15,0.06)',
                  color: '#141f0f',
                  border: '1px solid rgba(20,31,15,0.15)',
                }}>
                {config.abbr}
              </span>
              <span className="text-xs text-[#888] hidden sm:block" style={{ fontFamily: 'var(--font-work-sans)' }}>
                {config.label}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          {level === 'l2' && (
            <Link href="/forge" className="text-[11px] px-3 py-1.5 rounded-lg transition-colors text-[#888] hover:text-[#141f0f]"
              style={{ fontFamily: 'var(--font-work-sans)', letterSpacing: '0.05em' }}>
              FORGE
            </Link>
          )}
          {level === 'l3' && user && (
            <>
              <Link href="/l3/chapters"
                className={`text-[11px] px-3 py-1.5 rounded-lg transition-colors ${pathname.includes('/chapters') ? 'text-[#141f0f]' : 'text-[#888] hover:text-[#141f0f]'}`}>
                Chapters
              </Link>
              <Link href="/leaderboard"
                className={`text-[11px] px-3 py-1.5 rounded-lg transition-colors ${pathname.includes('/leaderboard') ? 'text-[#141f0f]' : 'text-[#888] hover:text-[#141f0f]'}`}>
                Cohort
              </Link>
              <button
                onClick={() => { logout(); router.push('/login'); }}
                className="text-[11px] px-3 py-1.5 rounded-lg text-[#888] hover:text-[#141f0f] transition-colors ml-1">
                Sign Out
              </button>
            </>
          )}
          {!level && (
            <Link href="/l3"
              className="text-[11px] px-3 py-1.5 rounded-lg text-[#888] hover:text-[#141f0f] transition-colors">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
