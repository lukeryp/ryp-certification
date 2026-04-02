'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { setCurrentUser, getAllUsers } from '../lib/storage';
import { Suspense } from 'react';

function LoginForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/l3';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.');
      return;
    }

    const emailLower = email.toLowerCase().trim();
    const users = getAllUsers();
    const existing = users.find(u => u.email.toLowerCase() === emailLower);

    const user = existing || {
      id: crypto.randomUUID(),
      email: emailLower,
      name: name.trim(),
      role: emailLower === 'luke.benoit@gmail.com' ? 'admin' as const : 'student' as const,
    };

    if (existing) {
      (user as typeof user & { name: string }).name = name.trim();
    }

    setCurrentUser(user);
    router.push(redirect);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,175,81,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,175,81,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <div className="text-4xl font-black mb-1" style={{
              fontFamily: 'var(--font-raleway)',
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>RYP GOLF</div>
          </Link>
          <h1 className="text-lg text-white font-semibold mt-1" style={{ fontFamily: 'var(--font-raleway)' }}>
            Level 3 — Textbook Certification
          </h1>
          <p className="text-[#6b7280] text-sm mt-1">The Golf Textbook · Instructor Education</p>
        </div>

        {/* Form */}
        <div className="rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#9ca3af] mb-1.5 uppercase tracking-wide">Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-[#4b5563] text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onFocus={e => (e.currentTarget.style.border = '1px solid rgba(0,175,81,0.5)')}
                onBlur={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)')}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#9ca3af] mb-1.5 uppercase tracking-wide">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-[#4b5563] text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onFocus={e => (e.currentTarget.style.border = '1px solid rgba(0,175,81,0.5)')}
                onBlur={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)')}
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-[#0d0d0d] transition-all text-sm hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #00af51, #00d466)', fontFamily: 'var(--font-raleway)' }}
            >
              Enter Dashboard
            </button>
          </form>
        </div>

        {/* Cohort */}
        <div className="mt-4 rounded-xl p-4"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs font-bold text-[#6b7280] uppercase tracking-widest mb-2">Interlachen Beta Cohort</p>
          <div className="text-xs text-[#6b7280] space-y-1">
            <p>Nathan Ollhoff · Blaize Hauge · Nick Dittrich</p>
            <p>Sam Nodler · Jack O&apos;Brien · Adam Wood · Kyle Berg</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-[#6b7280] hover:text-white transition-colors">
            ← All certification levels
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
