'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const patterns = [
  {
    number: '1',
    title: 'Path',
    pairing: 'Out-to-In ↔ In-to-Out',
    miss: 'Pull/slice — ball starts left of target, curves right (RH golfer)',
    drill: 'Hit balls intentionally starting RIGHT of target (in-to-out path)',
    cue: '"Feel like you\'re hitting to right field"',
    ageFloor: '10+ for understanding the concept',
  },
  {
    number: '2',
    title: 'Face',
    pairing: 'Open ↔ Closed',
    miss: 'Ball curves right excessively (open face at impact)',
    drill: 'Roll the face closed through impact — hit 10 shots curved left',
    cue: '"Feel the logo of your glove face the sky at impact"',
    ageFloor: '12+ for reliable execution',
  },
  {
    number: '3',
    title: 'Contact: Toe ↔ Heel',
    pairing: 'Toe ↔ Heel',
    miss: 'Shots off the toe — thin, weak, curves right',
    drill: 'Intentionally strike the heel side of the face',
    cue: 'Stand closer, feel the ball on the hosel side',
    ageFloor: '10+ (requires tape or powder to verify)',
  },
  {
    number: '4',
    title: 'Contact: Fat ↔ Thin',
    pairing: 'Fat ↔ Thin',
    miss: 'Fat shots — club contacts ground before ball',
    drill: 'Intentionally skull/thin the ball — hit the equator',
    cue: '"Feel like you\'re sweeping a carpet"',
    ageFloor: '8+ (natural and intuitive)',
  },
  {
    number: '5',
    title: 'Low Point',
    pairing: 'Behind Ball ↔ Forward',
    miss: 'Late low point — always taking huge divots behind the ball',
    drill: 'Practice hitting with low point forward (target 2 inches in front of ball)',
    cue: '"Hit the spot 2 inches in front of the ball"',
    ageFloor: '11+ for the spatial awareness needed',
  },
  {
    number: '6',
    title: 'Angle of Attack',
    pairing: 'Steep ↔ Shallow',
    miss: 'Steep, choppy, excessive backspin',
    drill: 'Shallow the attack — swing more horizontally',
    cue: '"Feel like you\'re swinging a baseball bat, not an axe"',
    ageFloor: '12+',
  },
  {
    number: '7',
    title: 'Clubhead Speed',
    pairing: 'Decel ↔ Accelerate',
    miss: 'Deceleration through impact — the "chickening out" swing',
    drill: 'Intentionally accelerate through — feel the whoosh AFTER the ball',
    cue: '"Let the club run past your left knee"',
    ageFloor: 'All ages — intuitive and game-applicable',
    highlight: true,
  },
  {
    number: '8',
    title: 'Axis Tilt',
    pairing: 'Reverse Pivot ↔ Stay Behind',
    miss: 'Reverse pivot — weight goes forward on backswing, backward on downswing',
    drill: 'Exaggerate staying behind the ball — right shoulder below left through impact',
    cue: '"Feel like you\'re hitting up on it, like a driver"',
    ageFloor: '12+ for the spatial concept',
  },
];

const ageDelivery = [
  {
    range: 'Ages 4–8',
    patterns: '#7 (acceleration) + #4 (thin/fat)',
    detail: 'Simple cause-effect only. Two patterns maximum.',
  },
  {
    range: 'Ages 9–12',
    patterns: '#1, #3, #4, #7',
    detail: 'Add path and contact. Total of 4 patterns.',
  },
  {
    range: 'Ages 13+',
    patterns: 'All 8 patterns',
    detail: 'Introduce with diagnostic first. Verify the miss before prescribing the opposite.',
  },
  {
    range: 'Adults',
    patterns: 'Full system',
    detail: 'Pair with video (Parallax) for maximum impact.',
  },
];

export default function ImpactOppositesPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,175,81,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.025) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,175,81,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244,238,25,0.04) 0%, transparent 70%)' }} />

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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Module 08</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Impact Opposites{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Great 8</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            The core diagnostic and correction tool in the RYP system. For every miss pattern, there is a prescribed opposite that recalibrates the movement.
          </p>
        </div>

        {/* System callout */}
        <div className="rounded-2xl p-5 mb-8"
          style={{ background: 'rgba(0,175,81,0.06)', border: '1px solid rgba(0,175,81,0.2)' }}>
          <p className="text-[#4ade80] text-[14px] font-semibold mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
            How to use Impact Opposites
          </p>
          <p className="text-[#9ca3af] text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Identify the miss pattern first. Then prescribe the opposite movement as a drill. The student doesn't fix the fault — they overcorrect past it, which resets the system to neutral. Always diagnose before prescribing.
          </p>
        </div>

        {/* The 8 patterns */}
        <div className="space-y-4 mb-10">
          {patterns.map((p) => (
            <div key={p.number}
              className="rounded-2xl overflow-hidden"
              style={{
                background: p.highlight ? 'rgba(244,238,25,0.04)' : 'rgba(255,255,255,0.03)',
                border: p.highlight ? '1px solid rgba(244,238,25,0.2)' : '1px solid rgba(255,255,255,0.08)',
              }}>
              {/* Pattern header */}
              <div className="flex items-center gap-3 px-5 py-3.5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-2xl font-black leading-none flex-shrink-0 w-8"
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    background: p.highlight
                      ? 'linear-gradient(135deg, #f4ee19, #ffe500)'
                      : 'linear-gradient(135deg, #00af51, #00d466)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                  {p.number}
                </span>
                <div className="w-px h-5 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="flex-1 min-w-0">
                  <span className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                    {p.title}
                  </span>
                  <span className="text-[12px] text-[#6b7280] ml-2" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {p.pairing}
                  </span>
                </div>
                {p.highlight && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(244,238,25,0.15)', color: '#f4ee19', border: '1px solid rgba(244,238,25,0.3)' }}>
                    ALL AGES
                  </span>
                )}
              </div>

              <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg px-3 py-2.5"
                  style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#ef4444]">Miss Pattern</span>
                  <p className="text-[13px] text-[#fca5a5] mt-0.5 leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {p.miss}
                  </p>
                </div>

                <div className="rounded-lg px-3 py-2.5"
                  style={{ background: 'rgba(0,175,81,0.07)', border: '1px solid rgba(0,175,81,0.18)' }}>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#00af51]">Opposite Drill</span>
                  <p className="text-[13px] text-[#4ade80] mt-0.5 leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {p.drill}
                  </p>
                </div>

                <div className="rounded-lg px-3 py-2.5"
                  style={{ background: 'rgba(244,238,25,0.05)', border: '1px solid rgba(244,238,25,0.15)' }}>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#ca8a04]">Cue</span>
                  <p className="text-[13px] text-[#fef08a] mt-0.5 italic leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {p.cue}
                  </p>
                </div>

                <div className="rounded-lg px-3 py-2.5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#6b7280]">Age Floor</span>
                  <p className="text-[13px] text-[#d1d5db] mt-0.5 leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {p.ageFloor}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Framework */}
        <div className="rounded-2xl overflow-hidden mb-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
              Delivery Framework by Age
            </h2>
          </div>
          <div className="px-6 py-5 space-y-3">
            {ageDelivery.map((item) => (
              <div key={item.range} className="flex gap-4 rounded-xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex-shrink-0 w-20">
                  <span className="text-[13px] font-bold text-[#00af51]" style={{ fontFamily: 'var(--font-raleway)' }}>
                    {item.range}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white mb-0.5" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {item.patterns}
                  </p>
                  <p className="text-[12px] text-[#6b7280]" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/l2/warmup-protocol" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Warm-Up Protocol
          </Link>
          <Link href="/l2/motivation" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            Motivation Framework
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
