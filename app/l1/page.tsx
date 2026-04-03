'use client';

import Link from 'next/link';
import Nav from '../components/Nav';

const modules = [
  {
    href: '/l1/safety',
    number: '01',
    title: 'Safety First',
    description: 'Basic golf safety rules, equipment handling, and student supervision protocols.',
    tags: ['Equipment', 'Range Safety', 'Supervision', 'Weather', 'First Aid'],
  },
  {
    href: '/l1/communication',
    number: '02',
    title: 'Communication Basics',
    description: 'Working with kids at every age level, supporting the head coach, and handling parent interaction.',
    tags: ['Junior Golfers', 'Age Dev', 'Coach Comms', 'Parents'],
  },
  {
    href: '/l1/setup',
    number: '03',
    title: 'Setup & Teardown',
    description: 'Range setup, equipment care, station organization, and post-session teardown standards.',
    tags: ['Pre-Session', 'Stations', 'Club Fitting', 'Teardown'],
  },
  {
    href: '/l1/games',
    number: '04',
    title: 'Game Facilitation',
    description: 'Running drills and games, keeping kids engaged, and the full RYP games library.',
    tags: ['Putting Games', 'Chipping Games', 'Full Swing', 'Scoring'],
  },
];

export default function L1Page() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(20,31,15,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(20,31,15,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow */}
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(20,31,15,0.04) 0%, transparent 70%)' }} />

      <Nav level="l1" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 sm:py-16">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-[#141f0f] transition-colors mb-8">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to certifications
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(20,31,15,0.05)', border: '1px solid rgba(20,31,15,0.12)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#141f0f]" />
            <span className="text-[#141f0f] text-[10px] font-semibold tracking-widest uppercase">Level 1 Certification</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-[#141f0f] mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Junior Golf Helper
          </h1>

          <p className="text-base text-[#666] leading-relaxed max-w-2xl mb-6"
            style={{ fontFamily: 'var(--font-work-sans)' }}>
            For Meadowbrook Tuesday helpers, parent volunteers, and program assistants
          </p>

          {/* Prominent exam CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/l1/exam">
              <button className="px-7 py-3 rounded-xl text-xs font-semibold bg-[#141f0f] text-white hover:bg-[#1e2f18] transition-colors"
                style={{ letterSpacing: '2.4px', textTransform: 'uppercase' }}>
                Take the Exam
              </button>
            </Link>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-[#888]"
              style={{ background: 'rgba(20,31,15,0.04)', border: '1px solid rgba(20,31,15,0.1)' }}>
              <span>24 questions · 2 essays · 45 min · 80% to pass</span>
            </div>
          </div>
        </div>

        {/* Description card */}
        <div className="rounded-2xl p-6 mb-10"
          style={{
            background: 'rgba(20,31,15,0.04)',
            border: '1px solid rgba(20,31,15,0.15)',
          }}>
          <h2 className="text-lg font-bold text-[#141f0f] mb-3" style={{ fontFamily: 'var(--font-raleway)' }}>
            What this certification covers
          </h2>
          <p className="text-[#555] leading-relaxed text-[15px]" style={{ fontFamily: 'var(--font-work-sans)' }}>
            The Level 1 Junior Golf Helper certification is designed for anyone supporting RYP Golf programming who is not the primary instructor.
            You'll learn how to keep kids safe on the range, communicate effectively with junior golfers at every age, set up and break down sessions professionally,
            and facilitate games that keep energy and engagement high. This is the foundation of everything we do at Meadowbrook Tuesday sessions.
          </p>
          <div className="flex flex-wrap gap-4 mt-5">
            {['4 Modules', 'Self-paced', 'No prerequisites', 'Volunteer & Staff'].map(badge => (
              <span key={badge} className="text-xs text-[#9e812f] font-medium"
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="w-1 h-1 rounded-full bg-[#9e812f] inline-block" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Module cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modules.map((mod) => (
            <Link key={mod.href} href={mod.href}>
              <div className="h-full rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:border-[rgba(20,31,15,0.25)] cursor-pointer"
                style={{
                  background: '#fafaf9',
                  border: '1px solid rgba(20,31,15,0.1)',
                }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl font-black leading-none"
                    style={{
                      fontFamily: 'var(--font-raleway)',
                      color: '#141f0f',
                    }}>
                    {mod.number}
                  </span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[#ccc] mt-1">
                    <path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-[#141f0f] mb-2" style={{ fontFamily: 'var(--font-raleway)' }}>
                  {mod.title}
                </h3>
                <p className="text-[14px] text-[#666] leading-relaxed mb-4" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  {mod.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {mod.tags.map(tag => (
                    <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(158,129,47,0.07)',
                        border: '1px solid rgba(158,129,47,0.18)',
                        color: '#9e812f',
                      }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Take Assessment CTA */}
        <div className="mt-10 rounded-2xl p-6" style={{ background: 'rgba(20,31,15,0.04)', border: '1px solid rgba(20,31,15,0.15)' }}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#141f0f] mb-1" style={{ fontFamily: 'var(--font-raleway)' }}>
                Ready to get certified?
              </h3>
              <p className="text-sm text-[#888]">
                24 multiple choice questions + 2 essays · 45 minutes · Pass score: 80 / 100
              </p>
            </div>
            <Link href="/l1/exam">
              <button className="flex-shrink-0 px-6 py-3 rounded-xl text-xs font-semibold bg-[#141f0f] text-white hover:bg-[#1e2f18] transition-all active:scale-[0.98]"
                style={{ letterSpacing: '2.4px', textTransform: 'uppercase' }}>
                Take Assessment
              </button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-[#aaa] text-xs" style={{ fontFamily: 'var(--font-work-sans)' }}>
          <p>Interlachen Country Club · L1 Junior Golf Helper Certification</p>
        </div>
      </div>
    </div>
  );
}
