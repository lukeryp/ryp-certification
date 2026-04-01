'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCurrentUser, getAllUsers } from '../lib/storage';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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
      user.name = name.trim();
    }

    setCurrentUser(user);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-[#c9b99a] font-bold text-3xl mb-2 font-serif">RYP GOLF</div>
          <h1 className="text-xl text-[#e8e4de]">Level 1 Certification</h1>
          <p className="text-[#6b6b6b] text-sm mt-2">The Golf Textbook — Instructor Education</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#6b6b6b] mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-lg text-[#e8e4de] placeholder-[#6b6b6b] focus:outline-none focus:border-[#c9b99a] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-[#6b6b6b] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-lg text-[#e8e4de] placeholder-[#6b6b6b] focus:outline-none focus:border-[#c9b99a] transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#c9b99a] hover:bg-[#b5a48a] text-[#0a0a0a] font-medium rounded-lg transition-colors"
          >
            Enter Dashboard
          </button>
        </form>

        <div className="mt-8 p-4 bg-[#141414] rounded-lg border border-[#2a2a2a]">
          <p className="text-xs text-[#6b6b6b] mb-2">Interlachen Beta Cohort</p>
          <div className="text-xs text-[#6b6b6b] space-y-1">
            <p>Nathan Ollhoff · Blaize Hauge · Nick Dittrich</p>
            <p>Sam Nodler · Jack O&apos;Brien · Adam Wood · Kyle Berg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
