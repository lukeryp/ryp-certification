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
          <div className="text-green-500 font-bold text-3xl mb-2">RYP GOLF</div>
          <h1 className="text-xl text-gray-300">Level 1 Certification</h1>
          <p className="text-gray-500 text-sm mt-2">The Golf Textbook — Instructor Education</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-3 bg-[#111827] border border-gray-700 rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-[#111827] border border-gray-700 rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Enter Dashboard
          </button>
        </form>

        <div className="mt-8 p-4 bg-[#111827] rounded-lg border border-gray-800">
          <p className="text-xs text-gray-500 mb-2">Interlachen Beta Cohort</p>
          <div className="text-xs text-gray-600 space-y-1">
            <p>Nathan Ollhoff · Blaize Hauge · Nick Dittrich</p>
            <p>Sam Nodler · Jack O&apos;Brien · Adam Wood · Kyle Berg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
