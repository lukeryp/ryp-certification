'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const safetyCoreRules = [
  'Never swing when someone is within range. 360° check. Always.',
  'Shout "FORE!" immediately if ball heads toward anyone. Loud. No hesitation.',
  'Clubs never swing near another person\'s head, even slowly.',
  'Range balls stay at the range. Never take them onto the course.',
  'Carts: no one under 18 drives unless supervised. No riding on sides.',
];

const rangeEtiquette = [
  'Stand behind the hitting line when others are hitting',
  'Never walk past the hitting line while balls are being hit',
  'Don\'t talk to or distract someone who is about to swing',
  'Pick up your equipment before the next group arrives',
  'Repair divots on target greens / brush mats after use',
];

const courseEtiquette = [
  'Ready golf: fastest group hits first, not strictly by honor',
  'Repair ball marks on greens (always, every time)',
  'Replace or fill divots on fairways with divot mix',
  'Rake bunkers: enter and exit from the low side, rake tracks behind you',
  'Cart paths: stay on unless fairway is accessible',
  'Never walk in another player\'s putting line',
  'Silence when others are hitting',
  'Pace of play: keep up with the group in front. No exceptions.',
];

const rules = [
  {
    number: '1',
    name: 'Stroke and Distance',
    desc: 'Ball out of bounds = one penalty stroke + replay from original spot',
  },
  {
    number: '2',
    name: 'Lateral Relief',
    desc: 'Ball in red-staked hazard = one penalty stroke, drop within 2 club lengths',
  },
  {
    number: '3',
    name: 'Unplayable Lie',
    desc: 'One penalty stroke, three options for relief',
  },
  {
    number: '4',
    name: 'Lost Ball',
    desc: 'Proceed as if out of bounds (stroke and distance) or use local rule for lost ball',
  },
  {
    number: '5',
    name: 'Embedded Ball in General Area',
    desc: 'Free relief',
  },
  {
    number: '6',
    name: 'Loose Impediments',
    desc: 'Can always move them (rocks, leaves, sticks)',
  },
  {
    number: '7',
    name: 'Fixed Obstructions',
    desc: 'Can take free relief from immovable obstructions',
  },
];

const dressCode = [
  'Collared shirt or ICC-approved athletic shirt',
  'Proper golf shorts or pants (no gym shorts, jeans, or cutoffs)',
  'Soft spike or no-spike golf shoes (no metal spikes)',
  'Junior players: same standards apply. Consistency builds professionalism.',
];

export default function SafetyEtiquettePage() {
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Standards</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Safety &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Etiquette</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Course and range standards — non-negotiable rules, etiquette, dress code, and rules awareness.
          <a href="/athletic_development_plan.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#00af51] hover:underline mt-3">
              📄 ICC Athletic Development Plan (PDF)
            </a>
          </p>
        </div>

        {/* Core Safety Rules */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #ef4444' }}>
            Core Safety Rules
            <span className="ml-2 text-[12px] font-semibold text-[#ef4444] uppercase tracking-wider">(Non-Negotiable)</span>
          </h2>
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.18)' }}>
            <div className="divide-y" style={{ borderColor: 'rgba(239,68,68,0.1)' }}>
              {safetyCoreRules.map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                  <span className="flex-shrink-0 font-black text-[#ef4444] text-sm w-5 mt-0.5"
                    style={{ fontFamily: 'var(--font-raleway)' }}>
                    {i + 1}.
                  </span>
                  <p className="text-[14px] text-[#d1d5db] leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two column: range + course */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
              Range Etiquette
            </h2>
            <div className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {rangeEtiquette.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 px-4 py-3">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: 'rgba(0,175,81,0.15)', border: '1px solid rgba(0,175,81,0.3)' }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4l1.5 1.5 3.5-3.5" stroke="#00af51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <p className="text-[13px] text-[#d1d5db] leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
              Course Etiquette
            </h2>
            <div className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {courseEtiquette.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 px-4 py-3">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: 'rgba(0,175,81,0.15)', border: '1px solid rgba(0,175,81,0.3)' }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4l1.5 1.5 3.5-3.5" stroke="#00af51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <p className="text-[13px] text-[#d1d5db] leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dress Code */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Dress Code <span className="text-[#6b7280] font-normal text-base">(ICC)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dressCode.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl px-4 py-3.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(0,175,81,0.15)', border: '1px solid rgba(0,175,81,0.3)' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#00af51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <p className="text-[13px] text-[#d1d5db]" style={{ fontFamily: 'var(--font-work-sans)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rules Awareness */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Rules Awareness <span className="text-[#6b7280] font-normal text-base">(Key Rules for Juniors)</span>
          </h2>
          <div className="space-y-3">
            {rules.map((r) => (
              <div key={r.number} className="flex gap-4 rounded-xl px-5 py-3.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-black text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #00af51, #00d466)',
                    fontFamily: 'var(--font-raleway)',
                    color: '#fff',
                  }}>
                  {r.number}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-white mb-0.5" style={{ fontFamily: 'var(--font-work-sans)' }}>{r.name}</p>
                  <p className="text-[13px] text-[#9ca3af]" style={{ fontFamily: 'var(--font-work-sans)' }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/l2" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            L2 Overview
          </Link>
          <Link href="/l2/games-library" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            Games Library
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
