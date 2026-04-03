'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const faults = [
  {
    number: '1',
    name: 'EARLY EXTENSION',
    subtitle: 'coming out of posture through impact',
    visual: 'Hips push toward ball, upper body rises',
    cause: 'Fear of the ground. Usually a compensation for steep attack.',
    fix: 'Alignment stick in ground at knee height behind player',
    cue: '"Bump the stick with your right hip going through"',
  },
  {
    number: '2',
    name: 'OVER-THE-TOP',
    subtitle: 'outside-in swing path causing pull/slice',
    visual: 'Club exits to the left of target line',
    cause: 'Arms lead the downswing before lower body',
    fix: 'Throw-to-right-field drill (feel inside path)',
    cue: '"Swing to right field, not center field"',
  },
  {
    number: '3',
    name: 'CHICKEN WING',
    subtitle: 'lead arm collapses through impact',
    visual: 'Lead elbow bends and pulls away from body through impact',
    cause: 'Deceleration or fear of the shot',
    fix: 'Towel under lead arm drill',
    cue: '"Keep the lead arm running past your left pocket"',
  },
  {
    number: '4',
    name: 'CASTING',
    subtitle: 'releasing the club too early',
    visual: 'Wrist hinge lost at top of backswing immediately on downswing',
    cause: 'Instinct to hit the ball hard with hands',
    fix: 'L-to-L drill (maintain lag into impact)',
    cue: '"Let the grip lead, not the head"',
  },
  {
    number: '5',
    name: 'REVERSE PIVOT',
    subtitle: 'weight goes wrong direction',
    visual: 'Weight transfers backward instead of forward through impact',
    cause: 'Trying to "lift" the ball',
    fix: 'Left foot trail drill (must stay on left foot through impact)',
    cue: '"Post up on your left side like a kickboxer"',
  },
];

const constraints = [
  { drill: 'Foot together drill', outcome: 'Forces weight shift' },
  { drill: 'Alignment stick in ground at 45°', outcome: 'Prevents over-the-top path' },
  { drill: 'Tee in front of ball', outcome: 'Forces forward shaft lean at impact' },
  { drill: 'Towel under trail arm', outcome: 'Prevents early extension' },
  { drill: 'Impact bag', outcome: 'Builds compression and contact awareness' },
  { drill: 'Headcover behind ball', outcome: 'Shallow attack angle' },
];

export default function RangeWorkPage() {
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Range Instruction</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Range Work{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Station Design</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            How to design effective range stations and deliver precise, productive swing instruction.
          <a href="/athletic_development_plan.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#00af51] hover:underline mt-3">
              📄 ICC Athletic Development Plan (PDF)
            </a>
          </p>
        </div>

        {/* Station Design */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Station Design Principles
          </h2>
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {[
                'Stations aligned parallel — all hitting same direction',
                '8–10 feet minimum spacing between stations',
                'One ball basket per station or per 2 students max',
                'Target system: cones at 50/75/100 yards minimum',
                'Mirror or reference board at instructor position',
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
        </div>

        {/* Instruction Sequence */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            The Range Instruction Sequence
          </h2>
          <div className="space-y-3">
            {[
              { step: '1', action: 'Observe 3–5 shots without speaking', note: 'Watch before you speak. Always.' },
              { step: '2', action: 'Identify the PRIMARY issue', note: 'Path, face, or contact — not all three.' },
              { step: '3', action: 'One cue only. Never more than one.', note: 'The brain cannot process multiple new patterns.' },
              { step: '4', action: 'Give 3–5 shots with the cue active', note: 'Let them attempt the change.' },
              { step: '5', action: 'Observe change. If no change: new cue or constraint.', note: 'Adapt if needed.' },
              { step: '6', action: 'If change present: let them feel it 5 more times before moving on.', note: 'Repetition embeds the pattern.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 rounded-xl px-4 py-3.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #00af51, #00d466)',
                    fontFamily: 'var(--font-raleway)',
                    color: '#fff',
                  }}>
                  {item.step}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-white leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>{item.action}</p>
                  <p className="text-[12px] text-[#6b7280] mt-0.5" style={{ fontFamily: 'var(--font-work-sans)' }}>{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* One Cue Rule */}
        <div className="rounded-2xl p-5 mb-8"
          style={{ background: 'rgba(244,238,25,0.05)', border: '1px solid rgba(244,238,25,0.2)' }}>
          <p className="text-[#f4ee19] text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-raleway)' }}>
            THE ONE CUE RULE
          </p>
          <p className="text-[#d1d5db] text-[14px] leading-relaxed mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
            The most common mistake: giving 3 corrections at once. The brain cannot process multiple new patterns simultaneously. Choose the one that, if fixed, would fix the others as a byproduct.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#9ca3af]" style={{ fontFamily: 'var(--font-work-sans)' }}>Priority order for beginners:</span>
            <span className="text-[12px] font-bold text-[#f4ee19]">Contact</span>
            <span className="text-[#6b7280]">›</span>
            <span className="text-[12px] font-bold text-[#00af51]">Path</span>
            <span className="text-[#6b7280]">›</span>
            <span className="text-[12px] font-bold text-[#9ca3af]">Face</span>
          </div>
        </div>

        {/* Constraint-Led */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Constraint-Led Instruction
          </h2>
          <p className="text-[#9ca3af] text-[14px] mb-4 ml-4" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Instead of "swing this way," use constraints that make the correct movement the only possible movement.
          </p>
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-3 flex gap-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280] w-64">Constraint / Drill</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">Outcome</span>
            </div>
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {constraints.map((c, i) => (
                <div key={i} className="flex gap-4 px-5 py-3.5">
                  <div className="w-64 flex-shrink-0">
                    <p className="text-[13px] font-semibold text-white" style={{ fontFamily: 'var(--font-work-sans)' }}>{c.drill}</p>
                  </div>
                  <p className="text-[13px] text-[#9ca3af]" style={{ fontFamily: 'var(--font-work-sans)' }}>{c.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fault Catalog */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Fault Catalog — Top 5 Beginner Faults
          </h2>
          <div className="space-y-4">
            {faults.map((f) => (
              <div key={f.number} className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-3 px-5 py-3.5"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-2xl font-black leading-none w-7"
                    style={{
                      fontFamily: 'var(--font-raleway)',
                      background: 'linear-gradient(135deg, #00af51, #00d466)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                    {f.number}
                  </span>
                  <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <div>
                    <span className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>{f.name}</span>
                    <span className="text-[12px] text-[#6b7280] ml-2" style={{ fontFamily: 'var(--font-work-sans)' }}>({f.subtitle})</span>
                  </div>
                </div>
                <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-lg px-3 py-2.5"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-[#6b7280]">Visual</span>
                    <p className="text-[13px] text-[#d1d5db] mt-0.5 leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>{f.visual}</p>
                  </div>
                  <div className="rounded-lg px-3 py-2.5"
                    style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-[#ef4444]">Cause</span>
                    <p className="text-[13px] text-[#fca5a5] mt-0.5 leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>{f.cause}</p>
                  </div>
                  <div className="rounded-lg px-3 py-2.5"
                    style={{ background: 'rgba(0,175,81,0.07)', border: '1px solid rgba(0,175,81,0.18)' }}>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-[#00af51]">Fix</span>
                    <p className="text-[13px] text-[#4ade80] mt-0.5 leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>{f.fix}</p>
                  </div>
                  <div className="rounded-lg px-3 py-2.5"
                    style={{ background: 'rgba(244,238,25,0.05)', border: '1px solid rgba(244,238,25,0.15)' }}>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-[#ca8a04]">Cue</span>
                    <p className="text-[13px] text-[#fef08a] mt-0.5 italic leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>{f.cue}</p>
                  </div>
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
          <Link href="/l2/constraint-led" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            Constraint-Led Approach
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
