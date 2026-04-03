'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const steps = [
  {
    number: '01',
    time: '2–3 min',
    title: 'Dynamic Movement',
    description: 'Not static stretching. Dynamic movement activates the neuromuscular system.',
    items: [
      'Arm circles (forward + backward)',
      'Hip circles',
      'Trunk rotations',
      'Walking lunges (for ages 10+)',
      'High knees (all ages)',
    ],
    ageDelivery: [
      { age: 'Ages 4–6', instruction: 'Make it a game. "Can you make your arms into helicopter blades?"' },
      { age: 'Ages 7–10', instruction: 'Follow the leader. Demonstrate and they copy.' },
      { age: 'Ages 11+', instruction: 'Set a timer. Self-directed with coach circulating.' },
    ],
  },
  {
    number: '02',
    time: '2 min',
    title: 'Foam Ball or Slow Swing',
    description: 'First swings of the day without ball flight pressure. Re-establish movement pattern without outcome stress.',
    items: [
      'Foam ball chips (all ages)',
      'Practice swings at 50% speed',
      'Mirror/shadow swing (for those with prior instruction)',
    ],
    ageDelivery: [
      { age: 'Ages 4–6', instruction: 'Just swing at foam balls. No correction. Free play.' },
      { age: 'Ages 7–10', instruction: 'One specific focus ("feel the club reach back"). One cue only.' },
      { age: 'Ages 11+', instruction: 'Self-directed warm-up. Each student knows their baseline.' },
    ],
  },
  {
    number: '03',
    time: '1–2 min',
    title: 'Target Activation',
    description: 'First shots toward a target. Short distance (wedge to 50 yards max). Establishes visual connection to target before mechanics kick in.',
    items: [
      'Chip to a hoop or cone',
      'Short pitch to a flag',
      'One-club putting warm-up',
    ],
    ageDelivery: [],
  },
  {
    number: '04',
    time: '1 min',
    title: 'Mobility Check',
    description: 'Quick check that physical limitations aren\'t present today. This is injury prevention — take it seriously.',
    items: [
      '"Does anything feel tight?"',
      'Side bend left and right',
      'Shoulder check (for any soreness)',
    ],
    ageDelivery: [],
  },
  {
    number: '05',
    time: '1 min',
    title: 'Game Preview',
    description: 'Tell them what the session\'s main game or challenge is. Creates motivation and forward focus — kids practice harder when they know the game is coming.',
    callout: '"Today we\'re running Lightning at the end — keep practicing your putting."',
    items: [],
    ageDelivery: [],
  },
  {
    number: '06',
    time: '30 sec (ages 10+)',
    title: 'Intention Setting',
    description: 'Each student states one focus for the session. Not enforced — but planting the idea activates attention.',
    callout: '"Today I\'m working on keeping my head still."',
    items: [],
    ageDelivery: [
      { age: 'Ages 4–6', instruction: 'Skip entirely.' },
      { age: 'Ages 7–10', instruction: 'Optional.' },
      { age: 'Ages 10+', instruction: 'Recommended. 30 seconds, one focus each.' },
    ],
  },
];

export default function WarmupProtocolPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,175,81,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.025) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-[-120px] right-[-120px] w-[450px] h-[450px] rounded-full pointer-events-none"
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Module 03</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Warm-Up{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Protocol</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            The 6-step warm-up system — physical preparation, attentional priming, and community building in 8–12 minutes.
          <a href="/athletic_development_plan.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#00af51] hover:underline mt-3">
              📄 ICC Athletic Development Plan (PDF)
            </a>
          </p>
        </div>

        {/* Overview strip */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['8–12 Minutes Total', 'All Age Groups', '6 Steps', 'Every Session'].map((badge) => (
            <span key={badge} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(0,175,81,0.08)', border: '1px solid rgba(0,175,81,0.2)', color: '#4ade80' }}>
              <span className="w-1 h-1 rounded-full bg-[#00af51]" />
              {badge}
            </span>
          ))}
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Step header */}
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
                  {step.number}
                </span>
                <div className="w-px h-6 flex-shrink-0" style={{ background: 'rgba(0,175,81,0.3)' }} />
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                    {step.title}
                  </h2>
                </div>
                <span className="text-[11px] font-semibold text-[#00af51] flex-shrink-0 px-2 py-1 rounded-lg"
                  style={{ background: 'rgba(0,175,81,0.1)' }}>
                  {step.time}
                </span>
              </div>

              <div className="px-6 py-5 space-y-4">
                <p className="text-[14px] text-[#9ca3af] leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  {step.description}
                </p>

                {step.callout && (
                  <div className="rounded-xl px-4 py-3"
                    style={{ background: 'rgba(244,238,25,0.06)', border: '1px solid rgba(244,238,25,0.2)' }}>
                    <p className="text-[14px] font-semibold text-[#fef08a] italic" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      {step.callout}
                    </p>
                  </div>
                )}

                {step.items.length > 0 && (
                  <ul className="space-y-2">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00af51] mt-2" />
                        <span className="text-[14px] text-[#d1d5db] leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {step.ageDelivery.length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold tracking-widest uppercase text-[#6b7280] mb-2">Age Delivery</p>
                    <div className="space-y-2">
                      {step.ageDelivery.map((ad) => (
                        <div key={ad.age} className="flex gap-3 rounded-lg px-3 py-2.5"
                          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <span className="text-[12px] font-bold text-[#00af51] flex-shrink-0 w-20 pt-0.5"
                            style={{ fontFamily: 'var(--font-raleway)' }}>
                            {ad.age}
                          </span>
                          <span className="text-[13px] text-[#d1d5db] leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                            {ad.instruction}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/l2/age-development" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Age-Appropriate Development
          </Link>
          <Link href="/l2/impact-opposites" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            Impact Opposites Great 8
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
