'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const chippingByAge = [
  {
    range: 'Ages 4–8',
    goal: 'Just get the ball on the green. Any technique. External focus only.',
    cue: '"Make the ball hop onto the grass"',
    avoid: 'Technique discussion. Let them find it.',
  },
  {
    range: 'Ages 9–12',
    goal: 'Introduction to setup fundamentals. Narrow stance, weight forward, ball back, handle leading.',
    cue: '"Lean the shaft toward the target, then swing"',
    avoid: 'One technique cue max per session.',
  },
  {
    range: 'Ages 13+',
    goal: 'Introduce club selection for trajectory. High chip (60°) vs. low chip (7-iron) vs. bump-and-run.',
    cue: '"The ball should land before the fringe and roll to the hole"',
    avoid: 'Use the least lofted club that will clear the obstacle.',
  },
];

const puttingFundamentals = [
  'Eyes over the ball',
  'Putter face square to target at address',
  'Pendulum stroke — shoulders rock, not wrists',
  'Accelerate through — never decelerate',
];

export default function ShortGamePage() {
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Scoring Zone</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Short Game{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Stations</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Station design and methodology for chipping, pitching, putting, and bunker play.
          </p>
        </div>

        {/* Scoring Zone Philosophy */}
        <div className="rounded-2xl p-5 mb-8"
          style={{ background: 'rgba(0,175,81,0.06)', border: '1px solid rgba(0,175,81,0.2)' }}>
          <p className="text-[#4ade80] text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-raleway)' }}>
            THE SCORING ZONE PHILOSOPHY
          </p>
          <p className="text-[#d1d5db] text-[14px] leading-relaxed mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Strokes gained research consistently shows: the largest skill gap between handicap levels is NOT in the full swing — it&apos;s in the short game. A junior who can get up-and-down from anywhere will score better than one with a perfect driver swing who can&apos;t chip.
          </p>
          <div className="flex items-center gap-2 p-3 rounded-lg"
            style={{ background: 'rgba(244,238,25,0.08)', border: '1px solid rgba(244,238,25,0.2)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
              <path d="M7 1l1.5 3.5L12 5l-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1z" fill="#f4ee19"/>
            </svg>
            <p className="text-[13px] font-semibold text-[#f4ee19]" style={{ fontFamily: 'var(--font-work-sans)' }}>
              Always include at least 50% short game time in junior sessions under age 14.
            </p>
          </div>
        </div>

        {/* Chipping Station */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Chipping Station Design
          </h2>
          <div className="rounded-2xl overflow-hidden mb-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {[
                '3–5 distinct chip shots from different lies (fairway, rough, tight lie, uphill)',
                'Multiple targets: flags at different distances and angles',
                'Physical measurement tools: driver as measuring stick (proximity benchmark)',
                'Rotate targets every 5–8 minutes to prevent block practice',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(0,175,81,0.15)', border: '1px solid rgba(0,175,81,0.3)' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#00af51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <p className="text-[14px] text-[#d1d5db] leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-base font-bold text-white mb-3" style={{ fontFamily: 'var(--font-raleway)' }}>Key Chipping Concepts by Age</h3>
          <div className="space-y-3">
            {chippingByAge.map((item) => (
              <div key={item.range} className="rounded-xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="px-4 py-2.5 flex items-center gap-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,175,81,0.06)' }}>
                  <span className="text-sm font-bold text-[#00af51]" style={{ fontFamily: 'var(--font-raleway)' }}>{item.range}</span>
                </div>
                <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Goal</span>
                    <p className="text-[13px] text-[#d1d5db] mt-0.5" style={{ fontFamily: 'var(--font-work-sans)' }}>{item.goal}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#ca8a04]">Cue</span>
                    <p className="text-[13px] text-[#fef08a] mt-0.5 italic" style={{ fontFamily: 'var(--font-work-sans)' }}>{item.cue}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Note</span>
                    <p className="text-[13px] text-[#9ca3af] mt-0.5" style={{ fontFamily: 'var(--font-work-sans)' }}>{item.avoid}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pitching Station */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Pitching Station
          </h2>
          <div className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-[14px] text-[#d1d5db] leading-relaxed mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
              <span className="text-white font-semibold">Distinguish from chipping:</span> pitching = more carry, more loft, less roll. For ages 11+.
            </p>
            <p className="text-[14px] text-[#9ca3af] leading-relaxed mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
              Key: Full wrist hinge, shoulder-width stance, equal weight, accelerate through.
            </p>
            <div className="flex items-center gap-3 p-3 rounded-lg"
              style={{ background: 'rgba(0,175,81,0.07)', border: '1px solid rgba(0,175,81,0.18)' }}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00af51]">Constraint Drill</span>
              <p className="text-[13px] text-[#4ade80]" style={{ fontFamily: 'var(--font-work-sans)' }}>
                Hit over a bucket placed between ball and target
              </p>
            </div>
          </div>
        </div>

        {/* Putting Station */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Putting Station Design
          </h2>
          <div className="rounded-2xl overflow-hidden mb-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {[
                'Multiple distance stations (3ft, 6ft, 10ft, 15ft, 20ft minimum)',
                'Actual hole if available, or designated target cups',
                'Gate drill: two tees 1/2" wider than putter head — thread the gate',
                'Distance control station: putting to a line (no hole) for speed training',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(0,175,81,0.15)', border: '1px solid rgba(0,175,81,0.3)' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#00af51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <p className="text-[14px] text-[#d1d5db] leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-base font-bold text-white mb-3" style={{ fontFamily: 'var(--font-raleway)' }}>Key Putting Concepts — All Ages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {puttingFundamentals.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg px-4 py-3"
                style={{ background: 'rgba(0,175,81,0.07)', border: '1px solid rgba(0,175,81,0.18)' }}>
                <span className="flex-shrink-0 text-lg font-black text-[#00af51]" style={{ fontFamily: 'var(--font-raleway)' }}>{i + 1}</span>
                <p className="text-[13px] text-[#d1d5db]" style={{ fontFamily: 'var(--font-work-sans)' }}>{item}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-4"
            style={{ background: 'rgba(244,238,25,0.05)', border: '1px solid rgba(244,238,25,0.2)' }}>
            <p className="text-[#f4ee19] text-sm font-bold" style={{ fontFamily: 'var(--font-raleway)' }}>
              Speed first, direction second.
            </p>
            <p className="text-[#d1d5db] text-[13px] mt-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
              Most missed putts are missed because of incorrect speed, not incorrect line.
            </p>
          </div>
        </div>

        {/* Bunker Station */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Bunker Station <span className="text-[#6b7280] font-normal text-base">(Ages 13+)</span>
          </h2>
          <div className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-[13px] text-[#6b7280] mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>Body of sand required.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Setup', value: 'Open stance, open face' },
                { label: 'Strike', value: 'Hit 2 inches behind the ball (splash the sand)' },
                { label: 'Finish', value: 'Finish high' },
              ].map((item) => (
                <div key={item.label} className="rounded-lg px-3 py-2.5"
                  style={{ background: 'rgba(0,175,81,0.07)', border: '1px solid rgba(0,175,81,0.18)' }}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00af51]">{item.label}</span>
                  <p className="text-[13px] text-[#d1d5db] mt-0.5" style={{ fontFamily: 'var(--font-work-sans)' }}>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg px-4 py-3"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <p className="text-[12px] font-bold text-[#ef4444] mb-1">COMMON ERROR</p>
              <p className="text-[13px] text-[#fca5a5]" style={{ fontFamily: 'var(--font-work-sans)' }}>
                Trying to hit the ball instead of the sand.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{ background: 'rgba(244,238,25,0.05)', border: '1px solid rgba(244,238,25,0.18)' }}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ca8a04]">Cue</span>
              <p className="text-[13px] italic text-[#fef08a]" style={{ fontFamily: 'var(--font-work-sans)' }}>
                &quot;Draw a line 2 inches behind the ball. Hit the line.&quot;
              </p>
            </div>
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
