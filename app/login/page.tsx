'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { setCurrentUser, getAllUsers } from '../lib/storage';
import { getUserByEmail } from '../lib/db';
import { signInWithGoogle, syncAuthSessionToProfile } from '../lib/auth';

function LoginForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawRedirect = searchParams.get('redirect') || '/dashboard';
  const redirect =
    rawRedirect.startsWith('/') && !rawRedirect.startsWith('//') ? rawRedirect : '/dashboard';

  // If the page was opened post-OAuth (Supabase put ?code=... in the URL),
  // supabase-js auto-exchanges on the browser client; we then sync to
  // UserProfile and redirect into the app.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const profile = await syncAuthSessionToProfile();
        if (!cancelled && profile) router.replace(redirect);
      } catch {
        /* no-op */
      }
    })();
    return () => { cancelled = true; };
  }, [router, redirect]);

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.');
      return;
    }
    setBusy(true);
    const emailLower = email.toLowerCase().trim();
    const localUsers = getAllUsers();
    const localExisting = localUsers.find((u) => u.email.toLowerCase() === emailLower);
    let user = localExisting ?? (await getUserByEmail(emailLower));

    if (user) {
      user = { ...user, name: name.trim() };
    } else {
      const adminList = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? '')
        .split(',')
        .map((s) => s.toLowerCase().trim())
        .filter(Boolean);
      user = {
        id: crypto.randomUUID(),
        email: emailLower,
        name: name.trim(),
        role: adminList.includes(emailLower) ? 'admin' : 'student',
      };
    }
    setCurrentUser(user);
    router.push(redirect);
  };

  const handleGoogle = async () => {
    setBusy(true);
    await signInWithGoogle(redirect);
    // signInWithGoogle redirects the browser to Google; no further code runs here.
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,175,81,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,175,81,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <div
              className="text-4xl font-black mb-1"
              style={{
                fontFamily: 'var(--font-raleway)',
                background: 'linear-gradient(135deg, #00af51, #00d466)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              RYP GOLF
            </div>
          </Link>
          <h1 className="text-lg text-white font-semibold mt-1" style={{ fontFamily: 'var(--font-raleway)' }}>
            Staff Sign-In
          </h1>
          <p className="text-[#6b7280] text-sm mt-1">
            Track your hours and certification scores.
          </p>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-60 hover:opacity-95 active:scale-[0.98]"
            style={{
              background: '#ffffff',
              color: '#0d0d0d',
              fontFamily: 'var(--font-raleway)',
            }}
          >
            <GoogleG />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#6b7280]">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
            or use email
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
          </div>

          {/* Manual fallback */}
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#9ca3af] mb-1.5 uppercase tracking-wide">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-[#4b5563] text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onFocus={(e) => (e.currentTarget.style.border = '1px solid rgba(0,175,81,0.5)')}
                onBlur={(e) => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)')}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#9ca3af] mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-[#4b5563] text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onFocus={(e) => (e.currentTarget.style.border = '1px solid rgba(0,175,81,0.5)')}
                onBlur={(e) => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)')}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={busy}
              className="w-full py-3 rounded-xl font-bold text-[#0d0d0d] transition-all text-sm hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #00af51, #00d466)',
                fontFamily: 'var(--font-raleway)',
              }}
            >
              Enter Dashboard
            </button>
          </form>
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

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.2 4 9.5 8.4 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.1c-2 1.4-4.5 2.3-7.2 2.3-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.4 39.5 16.1 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5h.1l6.2 5.1C37.1 37.6 44 32.5 44 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
