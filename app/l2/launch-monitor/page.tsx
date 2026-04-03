'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const parameters = [
  { name: 'Ball Speed', unit: 'mph', desc: 'Energy transfer from club to ball' },
  { name: 'Club Head Speed', unit: 'mph', desc: 'Raw speed' },
  { name: 'Smash Factor', unit: 'ratio', desc: 'Ball Speed / Club Head Speed (efficiency)' },
  { name: 'Launch Angle', unit: '°', desc: 'Angle ball leaves clubface' },
  { name: 'Spin Rate', unit: 'rpm', desc: 'Backspin on ball' },
  { name: 'Carry Distance', unit: 'yards', desc: '' },
  { name: 'Club Path', unit: '°', desc: 'In-to-out is positive, out-to-in is negative' },
  { name: 'Face Angle', unit: '°', desc: 'Open is positive, closed is negative' },
  { name: 'Face-to-Path', unit: '°', desc: 'Relationship between face and path (determines curve)' },
];

const ageUse = [
  {
    range: 'Ages 4–10',
    use: 'Do NOT use launch monitor for instruction.',
    detail: 'Data creates anxiety and over-focus on numbers rather than feeling. Exception: measuring and celebrating distance milestones in a fun context only.',
    color: 'rgba(239,68,68,0.08)',
    borderColor: 'rgba(239,68,68,0.2)',
    textColor: '#ef4444',
  },
  {
    range: 'Ages 11–13',
    use: 'Introduce sparingly.',
    detail: 'Focus only on: Ball Speed and Carry Distance. Celebrate progress. Avoid path/face data at this age — creates over-analysis.',
    color: 'rgba(244,238,25,0.06)',
    borderColor: 'rgba(244,238,25,0.2)',
    textColor: '#f4ee19',
  },
  {
    range: 'Ages 14+',
    use: 'Full monitor use appropriate.',
    detail: 'All parameters. Pair data with video.',
    color: 'rgba(0,175,81,0.07)',
    borderColor: 'rgba(0,175,81,0.2)',
    textColor: '#00af51',
  },
  {
    range: 'Ages 15+ / Competitive',
    use: 'Full FORGE protocol using launch monitor.',
    detail: 'See the FORGE module for complete protocol.',
    color: 'rgba(0,175,81,0.1)',
    borderColor: 'rgba(0,175,81,0.3)',
    textColor: '#4ade80',
  },
];

const paramGoals = [
  {
    param: 'Ball Speed (ages 11–13, driver)',
    targets: ['90–100 mph (age 12)', '100–115 mph (age 14)'],
    ifBelow: 'Ground force work, pivot efficiency',
    constraint: 'Hit 5 balls trying to increase smash factor above 1.40',
  },
  {
    param: 'Smash Factor (all ages with LM)',
    targets: ['1.40+ = good contact', '1.45+ = excellent'],
    ifBelow: 'Contact calibration needed before speed training',
    constraint: 'Impact tape or powder on face to show contact point',
  },
  {
    param: 'Spin Rate (wedges, ages 13+)',
    targets: ['Tour wedge: 8,000–12,000 rpm from 100 yards', 'High school 13+: Target 6,000–9,000 rpm from 100 yards'],
    ifBelow: 'Open face, steep attack — shaft lean needed',
    constraint: '"Feel like you\'re squeezing a towel through the ball"',
    isCue: true,
  },
  {
    param: 'Launch Angle (driver, ages 14+)',
    targets: ['Optimal launch for distance: 12–15° with 2,500–2,800 rpm'],
    ifBelow: 'Descending angle of attack on driver',
    constraint: 'Tee higher, move ball forward, feel the hit going up',
  },
];

export default function LaunchMonitorPage() {
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Data-Driven Teaching</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Launch Monitor{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Constraints</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Parameter-based teaching using launch monitor data. Know when to use it — and when not to.
          <a href="/athletic_development_plan.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#00af51] hover:underline mt-3">
              📄 ICC Athletic Development Plan (PDF)
            </a>
          </p>
        </div>

        {/* Parameters Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            What Launch Monitors Measure
          </h2>
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-3 flex gap-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280] w-36">Parameter</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280] w-16">Unit</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">Description</span>
            </div>
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {parameters.map((p) => (
                <div key={p.name} className="flex gap-4 px-5 py-3">
                  <div className="w-36 flex-shrink-0">
                    <p className="text-[13px] font-semibold text-white" style={{ fontFamily: 'var(--font-work-sans)' }}>{p.name}</p>
                  </div>
                  <div className="w-16 flex-shrink-0">
                    <span className="text-[12px] text-[#00af51] font-mono">{p.unit}</span>
                  </div>
                  <p className="text-[13px] text-[#9ca3af]" style={{ fontFamily: 'var(--font-work-sans)' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Use by Age */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Launch Monitor Use by Age
          </h2>
          <div className="space-y-3">
            {ageUse.map((item) => (
              <div key={item.range} className="rounded-xl px-5 py-4"
                style={{ background: item.color, border: `1px solid ${item.borderColor}` }}>
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold" style={{ color: item.textColor, fontFamily: 'var(--font-raleway)' }}>{item.range}</span>
                      <span className="text-[13px] font-semibold text-white" style={{ fontFamily: 'var(--font-work-sans)' }}>— {item.use}</span>
                    </div>
                    <p className="text-[13px] text-[#9ca3af]" style={{ fontFamily: 'var(--font-work-sans)' }}>{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parameter Goals */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Constraint-Based Parameter Goals
          </h2>
          <div className="space-y-4">
            {paramGoals.map((item) => (
              <div key={item.param} className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="px-5 py-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,175,81,0.04)' }}>
                  <span className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>{item.param}</span>
                </div>
                <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#00af51]">Target</span>
                    <div className="mt-0.5 space-y-0.5">
                      {item.targets.map((t, i) => (
                        <p key={i} className="text-[13px] text-[#4ade80]" style={{ fontFamily: 'var(--font-work-sans)' }}>{t}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#ef4444]">If Below / Issue</span>
                    <p className="text-[13px] text-[#fca5a5] mt-0.5" style={{ fontFamily: 'var(--font-work-sans)' }}>{item.ifBelow}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#ca8a04]">{item.isCue ? 'Cue' : 'Drill / Fix'}</span>
                    <p className={`text-[13px] mt-0.5 ${item.isCue ? 'italic text-[#fef08a]' : 'text-[#d1d5db]'}`} style={{ fontFamily: 'var(--font-work-sans)' }}>{item.constraint}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Face to Path */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Face-to-Path Relationship <span className="text-[#6b7280] font-normal text-base">(Ages 14+)</span>
          </h2>
          <div className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-[14px] text-[#d1d5db] mb-4" style={{ fontFamily: 'var(--font-work-sans)' }}>
              <span className="text-white font-semibold">Rule of thumb:</span> Ball starts where the face points, curves away from path.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Zero face-to-path', result: 'Straight ball', color: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)', textColor: '#d1d5db' },
                { label: 'Positive (path right of face)', result: 'Draw', color: 'rgba(0,175,81,0.07)', border: 'rgba(0,175,81,0.2)', textColor: '#4ade80' },
                { label: 'Negative (face right of path)', result: 'Fade / Slice', color: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.2)', textColor: '#fca5a5' },
              ].map((item) => (
                <div key={item.label} className="rounded-lg px-3 py-3 text-center"
                  style={{ background: item.color, border: `1px solid ${item.border}` }}>
                  <p className="text-[11px] text-[#6b7280] mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>{item.label}</p>
                  <p className="text-base font-bold" style={{ color: item.textColor, fontFamily: 'var(--font-raleway)' }}>{item.result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FORGE Integration */}
        <div className="rounded-2xl p-5 mb-10"
          style={{ background: 'rgba(0,175,81,0.06)', border: '1px solid rgba(0,175,81,0.2)' }}>
          <p className="text-[#4ade80] text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-raleway)' }}>FORGE INTEGRATION</p>
          <p className="text-[#d1d5db] text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            The launch monitor is the foundation of the Carry Index drill (FORGE Drill 5). See the FORGE module for full protocol.
          </p>
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
          <Link href="/l2/player-certification" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            Player Certification
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
