'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentUser, logout } from '../lib/storage';
import { useRouter } from 'next/navigation';

export default function Nav({ level }: { level?: 'l1' | 'l2' | 'l3' }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = getCurrentUser();

  const levelConfig = {
    l1: { label: 'Junior Golf Helper', color: '#00af51', abbr: 'L1' },
    l2: { label: 'ICC Instructor', color: '#00af51', abbr: 'L2' },
    l3: { label: 'Textbook Cert', color: '#f4ee19', abbr: 'L3' },
  };

  const config = level ? levelConfig[level] : null;

  return (
    <nav className="sticky top-0 z-50"
      style={{
        background: 'rgba(13,13,13,0.85)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}>
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-black text-[#00af51] tracking-widest" style={{ fontFamily: 'var(--font-raleway)' }}>ICC</span>
            <span className="text-[#4b5563] text-xs font-medium hidden sm:block">Interlachen</span>
          </Link>
          {config && (
            <>
              <span className="text-[#3a3a3a]">/</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: `rgba(${config.color === '#00af51' ? '0,175,81' : '244,238,25'},0.1)`,
                  color: config.color,
                  border: `1px solid rgba(${config.color === '#00af51' ? '0,175,81' : '244,238,25'},0.25)`,
                }}>
                {config.abbr}
              </span>
              <span className="text-sm text-[#6b7280] hidden sm:block">{config.label}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          {level === 'l2' && (
            <Link href="/forge" className="text-xs px-3 py-1.5 rounded-lg transition-colors text-[#6b7280] hover:text-white">
              FORGE
            </Link>
          )}
          {level === 'l3' && user && (
            <>
              <Link href="/l3/chapters" className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${pathname.includes('/chapters') ? 'text-[#f4ee19]' : 'text-[#6b7280] hover:text-white'}`}>
                Chapters
              </Link>
              <Link href="/leaderboard" className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${pathname.includes('/leaderboard') ? 'text-[#f4ee19]' : 'text-[#6b7280] hover:text-white'}`}>
                Cohort
              </Link>
              <button
                onClick={() => { logout(); router.push('/login'); }}
                className="text-xs px-3 py-1.5 rounded-lg text-[#6b7280] hover:text-white transition-colors ml-1"
              >
                Sign Out
              </button>
            </>
          )}
          {!level && (
            <Link href="/l3" className="text-xs px-3 py-1.5 rounded-lg text-[#6b7280] hover:text-white transition-colors">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
