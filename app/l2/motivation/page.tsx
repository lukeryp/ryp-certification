'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const masteryTraits = [
  'Error is information, not failure',
  'Effort is praised more than outcome',
  'Comparison is to self, not others',
  'Mistakes are discussed openly',
  "Every player's improvement is celebrated",
];

const egoTraits = [
  'Winning is everything',
  'Errors are punished or mocked',
  'Only top performers get attention',
  'Players hide mistakes',
  'Dropping out is common',
];

const buildingBlocks = [
  {
    number: '01',
    title: 'Praise Effort, Not Talent',
    say: '"You worked really hard on that swing"',
    notThis: '"You\'re so naturally gifted"',
    why: 'Talent praise creates fixed mindset. Effort praise creates growth mindset.',
  },
  {
    number: '02',
    title: 'Normalize Error',
    say: '"Missing that shot is good information — what did you learn?"',
    notThis: '"Don\'t worry, it\'s fine" (dismisses learning) or "That was terrible" (punishes)',
    why: 'Error is the mechanism of learning. Treat it as data.',
  },
  {
    number: '03',
    title: 'Track Personal Progress',
    say: '"Your approach index improved by 3 this month"',
    notThis: '"You\'re ranked #4 on the team"',
    why: 'FORGE scores as personal benchmarks — not leaderboards.',
  },
  {
    number: '04',
    title: 'Create Challenge Without Threat',
    say: 'Drills should be hard but achievable. Exit criteria games create pressure without humiliation.',
    notThis: 'Public rankings, shaming misses, or comparison to peers',
    why: 'High challenge + low threat = optimal learning state.',
  },
  {
    number: '05',
    title: "The Coach's Energy Is the Room's Energy",
    say: 'If you\'re curious, they\'re curious.',
    notThis: 'If you\'re frustrated, they\'re anxious.',
    why: 'Model the response to error you want to see from them. You set the climate.',
  },
];

const ageMotivation = [
  {
    range: 'Ages 4–7',
    note: 'Pure intrinsic motivation. Don\'t corrupt it with extrinsic rewards too early.',
    color: '#00af51',
    colorRgb: '0,175,81',
  },
  {
    range: 'Ages 8–12',
    note: 'Some extrinsic reward is fine. Praise, tokens, recognition work well.',
    color: '#00af51',
    colorRgb: '0,175,81',
  },
  {
    range: 'Ages 13+',
    note: 'Competence-based motivation dominates. Track real performance data.',
    color: '#f4ee19',
    colorRgb: '244,238,25',
  },
  {
    range: 'Ages 15+',
    note: 'Autonomy becomes critical. Let them lead their own development.',
    color: '#f4ee19',
    colorRgb: '244,238,25',
  },
];

export default function MotivationPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,175,81,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.025) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-[-100px] left-[-100px] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,175,81,0.06) 0%, transparent 70%)' }} />

      <Nav level="l2" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10 sm:py-14">
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Module 12</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Motivation{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Framework</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Based on Achievement Goal Theory (Nicholls, 1984) and Self-Determination Theory (Deci & Ryan). Build the climate that keeps kids in the game.
          <a href="/athletic_development_plan.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#00af51] hover:underline mt-3">
              📄 ICC Athletic Development Plan (PDF)
            </a>
          </p>
        </div>

        {/* Two climates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Mastery */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(0,175,81,0.05)', border: '1px solid rgba(0,175,81,0.2)' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(0,175,81,0.15)' }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#00af51]" />
                <h2 className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                  Mastery Climate
                </h2>
              </div>
              <p className="text-[13px] text-[#4ade80]" style={{ fontFamily: 'var(--font-work-sans)' }}>
                What we build
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[12px] text-[#9ca3af] mb-3 italic" style={{ fontFamily: 'var(--font-work-sans)' }}>
                "I got better than yesterday" = success
              </p>
              <ul className="space-y-2">
                {masteryTraits.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00af51] flex-shrink-0 mt-1.5" />
                    <span className="text-[13px] text-[#d1d5db] leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(0,175,81,0.15)' }}>
                <p className="text-[12px] text-[#4ade80] font-semibold" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  Higher intrinsic motivation · More persistence · More creativity · Longer engagement
                </p>
              </div>
            </div>
          </div>

          {/* Ego */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(239,68,68,0.12)' }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                <h2 className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                  Ego Climate
                </h2>
              </div>
              <p className="text-[13px] text-[#ef4444]" style={{ fontFamily: 'var(--font-work-sans)' }}>
                What we avoid
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[12px] text-[#9ca3af] mb-3 italic" style={{ fontFamily: 'var(--font-work-sans)' }}>
                "I beat everyone else" = success
              </p>
              <ul className="space-y-2">
                {egoTraits.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] flex-shrink-0 mt-1.5" />
                    <span className="text-[13px] text-[#d1d5db] leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(239,68,68,0.12)' }}>
                <p className="text-[12px] text-[#fca5a5] font-semibold" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  More anxiety · Less persistence · Less creativity · Higher dropout
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How to build mastery */}
        <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)' }}>
          How to Build Mastery Climate
        </h2>
        <div className="space-y-4 mb-8">
          {buildingBlocks.map((block) => (
            <div key={block.number} className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-4 px-5 py-3.5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-xl font-black flex-shrink-0"
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    background: 'linear-gradient(135deg, #00af51, #00d466)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                  {block.number}
                </span>
                <div className="w-px h-5 flex-shrink-0" style={{ background: 'rgba(0,175,81,0.3)' }} />
                <h3 className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                  {block.title}
                </h3>
              </div>
              <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg px-3 py-2.5"
                  style={{ background: 'rgba(0,175,81,0.07)', border: '1px solid rgba(0,175,81,0.18)' }}>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#00af51]">Say This</span>
                  <p className="text-[13px] text-[#4ade80] mt-0.5 italic leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {block.say}
                  </p>
                </div>
                <div className="rounded-lg px-3 py-2.5"
                  style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#ef4444]">Not This</span>
                  <p className="text-[13px] text-[#fca5a5] mt-0.5 italic leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {block.notThis}
                  </p>
                </div>
                <div className="sm:col-span-2 rounded-lg px-3 py-2.5"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#6b7280]">Why It Matters</span>
                  <p className="text-[13px] text-[#9ca3af] mt-0.5 leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {block.why}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Age and motivation */}
        <div className="rounded-2xl overflow-hidden mb-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
              Motivation and Age
            </h2>
          </div>
          <div className="px-6 py-5 space-y-3">
            {ageMotivation.map((item) => (
              <div key={item.range} className="flex gap-4 items-start rounded-xl px-4 py-3"
                style={{
                  background: `rgba(${item.colorRgb},0.05)`,
                  border: `1px solid rgba(${item.colorRgb},0.15)`,
                }}>
                <span className="text-[13px] font-bold flex-shrink-0 w-20"
                  style={{ color: item.color, fontFamily: 'var(--font-raleway)' }}>
                  {item.range}
                </span>
                <p className="text-[14px] text-[#d1d5db] leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/l2/impact-opposites" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Impact Opposites Great 8
          </Link>
          <Link href="/l2/staff-protocol" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            Staff Protocol
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
