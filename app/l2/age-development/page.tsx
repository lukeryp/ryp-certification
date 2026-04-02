'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const athleticRatios = [
  { ages: 'Ages 4–6', golf: 50, athletic: 50 },
  { ages: 'Ages 7–10', golf: 65, athletic: 35 },
  { ages: 'Ages 11–14', golf: 75, athletic: 25 },
  { ages: 'Ages 15+', golf: 90, athletic: 10 },
];

const tiers = [
  {
    number: '01',
    title: 'Tier 1: Ages 4–6',
    subtitle: 'Future Stars',
    stage: 'Pre-operational. Learn by doing, not listening.',
    attention: '3–5 minutes per activity',
    learningMode: 'Imitation + play. They copy what they see.',
    language: 'Very short sentences. "Hold it like this." Physical demonstration > verbal.',
    motivation: 'Stickers, praise, novelty. Competition can demotivate.',
    cues: ['"Make the ball go far!"', '"Hit it like you\'re squishing a bug"', '"Swing like a windmill"'],
    avoid: 'Technical language, multiple instructions, extended listening time.',
    structure: '5-6 activities, 5-8 minutes each. Keep moving.',
  },
  {
    number: '02',
    title: 'Tier 2: Ages 7–10',
    subtitle: 'Junior League',
    stage: 'Concrete operational. Can follow sequences.',
    attention: '8–12 minutes per activity',
    learningMode: 'Show + try + adjust. Games with clear rules.',
    language: 'Simple explanations with demonstration. "Watch first, then you try."',
    motivation: 'Score-keeping, peer competition, small prizes/recognition.',
    cues: ['External focus beats internal: "hit toward the flag" > "turn your hips"'],
    avoid: 'Overloading with technique, extended lectures, adult expectations.',
    structure: '3-4 drills, rotate every 10-15 minutes.',
  },
  {
    number: '03',
    title: 'Tier 3: Ages 11–14',
    subtitle: 'Academy',
    stage: 'Beginning formal operations. Can understand cause-effect.',
    attention: '15–20 minutes per activity',
    learningMode: 'Understand the why. Peer learning effective.',
    language: 'Explain the purpose. "This drill trains your contact because..."',
    motivation: 'Measurable improvement, peer respect, performance data.',
    cues: ['Can handle both internal and external cues', '"Feel your wrists hinge" AND "swing toward the flag" — both work'],
    avoid: 'Baby talk, condescension, ignoring social dynamics.',
    structure: 'Longer blocks with clear objectives. Debrief after.',
  },
  {
    number: '04',
    title: 'Tier 4: Ages 15+',
    subtitle: 'Certified Academy',
    stage: 'Full formal operations. Abstract reasoning available.',
    attention: '20–45 minutes on motivated tasks',
    learningMode: 'Self-directed with coach guidance. Data-driven.',
    language: 'Adult-level. Explain trade-offs. "Here\'s what the data shows..."',
    motivation: 'Personal bests, competitive results, long-term goals.',
    cues: ['Self-regulated cueing — they should be building their own cue system'],
    avoid: 'Micromanagement, ignoring their input, one-size-fits-all.',
    structure: 'Self-directed with check-ins. Long blocks possible.',
  },
];

export default function AgeDevelopmentPage() {
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Module 02</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Age-Appropriate{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Development</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            The 4-tier developmental framework. Teach the child in front of you — not the one you wish was there.
          </p>
        </div>

        {/* Athletic Development Map */}
        <div className="rounded-2xl overflow-hidden mb-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
              Athletic Development Map
            </h2>
            <p className="text-[13px] text-[#6b7280] mt-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
              Golf-specific vs. general athletic training by age. This is developmental science, not preference.
            </p>
          </div>
          <div className="px-6 py-5 space-y-4">
            {athleticRatios.map((row) => (
              <div key={row.ages}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-semibold text-white" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {row.ages}
                  </span>
                  <div className="flex items-center gap-3 text-[12px]">
                    <span style={{ color: '#00af51' }}>{row.golf}% golf</span>
                    <span className="text-[#4b5563]">/</span>
                    <span className="text-[#6b7280]">{row.athletic}% athletic</span>
                  </div>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${row.golf}%`,
                      background: 'linear-gradient(90deg, #00af51, #00d466)',
                    }}
                  />
                </div>
              </div>
            ))}
            <p className="text-[13px] text-[#6b7280] pt-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
              The youngest kids need movement literacy, balance, and coordination before golf-specific mechanics.
            </p>
          </div>
        </div>

        {/* Tier cards */}
        <div className="space-y-6">
          {tiers.map((tier) => (
            <div key={tier.number} className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Tier header */}
              <div className="flex items-center gap-4 px-6 py-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-2xl font-black leading-none flex-shrink-0"
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    background: 'linear-gradient(135deg, #00af51, #00d466)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                  {tier.number}
                </span>
                <div className="w-px h-6 flex-shrink-0" style={{ background: 'rgba(0,175,81,0.3)' }} />
                <div>
                  <h2 className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                    {tier.title}
                  </h2>
                  <span className="text-xs text-[#00af51] font-medium">{tier.subtitle}</span>
                </div>
              </div>

              <div className="px-6 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {[
                    { label: 'Developmental Stage', value: tier.stage },
                    { label: 'Attention Span', value: tier.attention },
                    { label: 'Best Learning Mode', value: tier.learningMode },
                    { label: 'Motivation', value: tier.motivation },
                    { label: 'Language', value: tier.language },
                    { label: 'Session Structure', value: tier.structure },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg px-3 py-2.5"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-[#6b7280]">{item.label}</span>
                      <p className="text-[13px] text-[#d1d5db] mt-0.5 leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Instruction cues */}
                <div className="rounded-xl px-4 py-3 mb-3"
                  style={{ background: 'rgba(0,175,81,0.07)', border: '1px solid rgba(0,175,81,0.18)' }}>
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-[#00af51] mb-2">Instruction Cues</p>
                  <ul className="space-y-1">
                    {tier.cues.map((cue, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[#00af51] mt-2" />
                        <span className="text-[13px] text-[#4ade80] italic" style={{ fontFamily: 'var(--font-work-sans)' }}>
                          {cue}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Avoid */}
                <div className="rounded-xl px-4 py-3"
                  style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#ef4444]">Avoid</span>
                  <p className="text-[13px] text-[#fca5a5] mt-0.5" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {tier.avoid}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/l2/program-architecture" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Program Architecture
          </Link>
          <Link href="/l2/warmup-protocol" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            Warm-Up Protocol
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
