'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const levels = [
  {
    id: 'future-stars',
    number: '01',
    title: 'Future Stars',
    ages: 'Ages 4–7',
    color: '#00af51',
    colorRgb: '0,175,81',
    goal: 'Introduction to golf as movement play.',
    details: [
      { label: 'Format', value: '45-minute sessions, maximum 8 students per instructor' },
      { label: 'Content', value: 'Foam ball play, balance games, basic grip introduction' },
      { label: 'Staff Ratio', value: '1 instructor + 1 helper per 4-6 kids' },
      { label: 'Key Outcome', value: 'They want to come back' },
    ],
    philosophy: 'The child IS the curriculum. Follow their lead.',
  },
  {
    id: 'junior-league',
    number: '02',
    title: 'ICC Junior League',
    ages: 'Ages 8–12',
    color: '#00af51',
    colorRgb: '0,175,81',
    goal: 'Foundational skills with competitive framework.',
    details: [
      { label: 'Format', value: '60-minute sessions, max 10 students' },
      { label: 'Content', value: 'All clubs, short game emphasis, beginning course play' },
      { label: 'Staff Ratio', value: '1 instructor per 8 students' },
      { label: 'Key Outcome', value: '9-hole score, basic rules knowledge' },
    ],
    philosophy: 'Learn by playing. Competition is the teacher.',
  },
  {
    id: 'academy',
    number: '03',
    title: 'Academy',
    ages: 'Ages 12–17',
    color: '#f4ee19',
    colorRgb: '244,238,25',
    goal: 'Skill development with performance tracking.',
    details: [
      { label: 'Format', value: '90-minute sessions, individual lesson track available' },
      { label: 'Content', value: 'Launch monitor work, FORGE drills, competitive preparation' },
      { label: 'Staff Ratio', value: '1 instructor per 6 students' },
      { label: 'Key Outcome', value: 'FORGE baseline established, handicap trending' },
    ],
    philosophy: 'Measurement over movement. Track what matters.',
  },
  {
    id: 'certified-academy',
    number: '04',
    title: 'Certified Academy',
    ages: 'Ages 14+',
    color: '#f4ee19',
    colorRgb: '244,238,25',
    goal: 'Competitive excellence and career-level development.',
    details: [
      { label: 'Format', value: 'Custom programming + group session hybrid' },
      { label: 'Content', value: 'Full FORGE protocol, competition prep, mental performance' },
      { label: 'Staff Ratio', value: 'Lead instructor + assistant' },
      { label: 'Key Outcome', value: 'Tour-ready practice habits, handicap target achieved' },
    ],
    philosophy: 'Prepare for tournament conditions, not just range conditions.',
  },
];

export default function ProgramArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,175,81,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.025) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-[-100px] right-[-100px] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,175,81,0.06) 0%, transparent 70%)' }} />

      <Nav level="l2" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10 sm:py-14">
        {/* Back link */}
        <Link href="/l2" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#00af51] transition-colors mb-8">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to L2 Overview
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(0,175,81,0.1)', border: '1px solid rgba(0,175,81,0.25)' }}>
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Module 01</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Program{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Architecture</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            The ICC junior program is structured in 4 distinct levels that build upon each other — from first-time players to competitive development.
          <a href="/athletic_development_plan.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#00af51] hover:underline mt-3">
              📄 ICC Athletic Development Plan (PDF)
            </a>
          </p>
        </div>

        {/* Overview callout */}
        <div className="rounded-2xl p-5 mb-8"
          style={{ background: 'rgba(0,175,81,0.06)', border: '1px solid rgba(0,175,81,0.2)' }}>
          <p className="text-[#4ade80] text-[14px] font-semibold mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Interlachen Country Club — 4-Level Structure
          </p>
          <p className="text-[#9ca3af] text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Each level has distinct goals, formats, staff ratios, and philosophies. Know which level you're teaching — and deliver accordingly.
          </p>
        </div>

        {/* Level cards */}
        <div className="space-y-6">
          {levels.map((level) => (
            <div key={level.id} className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Card header */}
              <div className="flex items-center gap-4 px-6 py-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-2xl font-black leading-none flex-shrink-0"
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    background: `linear-gradient(135deg, #${level.color === '#00af51' ? '00af51, #00d466' : 'f4ee19, #ffe500'})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                  {level.number}
                </span>
                <div className="w-px h-6 flex-shrink-0"
                  style={{ background: `rgba(${level.colorRgb},0.3)` }} />
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-raleway)' }}>
                    {level.title}
                  </h2>
                  <span className="text-xs font-medium" style={{ color: level.color }}>
                    {level.ages}
                  </span>
                </div>
              </div>

              <div className="px-6 py-5 space-y-4">
                {/* Goal */}
                <div>
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#6b7280]">Goal</span>
                  <p className="text-white font-semibold text-[15px] mt-0.5" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {level.goal}
                  </p>
                </div>

                {/* Detail grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {level.details.map((d) => (
                    <div key={d.label} className="rounded-lg px-3 py-2.5"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-[#6b7280]">{d.label}</span>
                      <p className="text-[14px] text-[#d1d5db] mt-0.5 leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                        {d.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Philosophy */}
                <div className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: `rgba(${level.colorRgb},0.07)`,
                    border: `1px solid rgba(${level.colorRgb},0.2)`,
                  }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
                    className="flex-shrink-0 mt-0.5" style={{ color: level.color }}>
                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.75 10.5h-1.5v-5h1.5v5zm0-6.5h-1.5V3.5h1.5V5z"/>
                  </svg>
                  <p className="text-[14px] font-semibold leading-relaxed"
                    style={{ fontFamily: 'var(--font-work-sans)', color: level.color === '#00af51' ? '#4ade80' : '#fef08a' }}>
                    Philosophy: {level.philosophy}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/l2" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Modules
          </Link>
          <Link href="/l2/age-development" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            Age-Appropriate Development
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
