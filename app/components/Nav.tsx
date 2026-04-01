'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentUser, logout } from '../lib/storage';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const user = getCurrentUser();

  if (!user) return null;

  const links = [
    { href: '/', label: 'Dashboard', icon: '◉' },
    { href: '/chapters', label: 'Chapters', icon: '◈' },
    { href: '/leaderboard', label: 'Cohort', icon: '◎' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#141414] border-t border-[#2a2a2a] z-50 md:relative md:border-t-0 md:border-b">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 py-4">
            <span className="text-[#c9b99a] font-bold text-lg font-serif">RYP</span>
            <span className="text-[#6b6b6b] text-sm">Level 1 Certification</span>
          </div>
          <div className="flex items-center gap-1 w-full md:w-auto justify-around md:justify-end">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center py-3 px-4 text-xs transition-colors ${
                  pathname === link.href
                    ? 'text-[#c9b99a]'
                    : 'text-[#6b6b6b] hover:text-[#e8e4de]'
                }`}
              >
                <span className="text-lg mb-0.5">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { logout(); router.push('/login'); }}
              className="flex flex-col items-center py-3 px-4 text-xs text-[#6b6b6b] hover:text-[#e8e4de] transition-colors"
            >
              <span className="text-lg mb-0.5">◇</span>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
