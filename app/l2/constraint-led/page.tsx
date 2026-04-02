'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const constraintTypes = [
  {
    type: '1. TASK CONSTRAINTS',
    desc: 'Change what they\'re asked to do',
    examples: [
      'Hit to a narrow target (forces accuracy focus)',
      'Hit over a barrier (forces trajectory change)',
      'Use a shorter club (forces compact swing)',
      'Hit from a difficult lie (forces improvisation)',
    ],
    color: 'rgba(0,175,81,0.07)',
    border: 'rgba(0,175,81,0.2)',
    accent: '#00af51',
  },
  {
    type: '2. ENVIRONMENTAL CONSTRAINTS',
    desc: 'Change the setting',
    examples: [
      'Alignment stick on ground (forces swing path)',
      'Foam obstacle between ball and target (forces height)',
      'Hitting from an uphill lie (forces balance adaptation)',
      'Wind conditions (forces flight adjustments)',
    ],
    color: 'rgba(244,238,25,0.05)',
    border: 'rgba(244,238,25,0.2)',
    accent: '#f4ee19',
  },
  {
    type: '3. ORGANISM CONSTRAINTS',
    desc: 'Temporarily modify the student\'s body',
    examples: [
      'One-handed swing (isolates arm function)',
      'Feet together (forces balance and weight shift awareness)',
      'Eyes closed (forces feel over visual feedback)',
      'Kneeling (removes lower body, forces arms/torso)',
    ],
    color: 'rgba(139,92,246,0.06)',
    border: 'rgba(139,92,246,0.2)',
    accent: '#a78bfa',
  },
];

const faultConstraints = [
  {
    fault: 'OVER-THE-TOP PATH',
    constraint: 'Place alignment stick in ground at 45° angle outside ball. Swing without hitting it.',
    outcome: 'Forces inside-out path naturally.',
  },
  {
    fault: 'EARLY RELEASE (CASTING)',
    constraint: 'Hold the hinge — put a rubber band around the wrists as tactile reminder.',
    outcome: 'Alternative: Orange whip trainer, or hit from knees.',
  },
  {
    fault: 'REVERSE PIVOT',
    constraint: 'Place left foot on slight mound/book. Must feel stable through impact.',
    outcome: 'Alternative: Feet together drill, or hit with left foot lifted.',
  },
  {
    fault: 'CHICKEN WING',
    constraint: 'Towel under lead arm. Must hold through impact.',
    outcome: 'Alternative: Headcover held between lead arm and torso.',
  },
  {
    fault: 'POOR CONTACT — TOPPING',
    constraint: 'Place tee 2 inches in front of ball. Must hit tee after contact.',
    outcome: 'Forces forward shaft lean and a downward strike.',
  },
  {
    fault: 'POOR CONTACT — CHUNKING',
    constraint: 'Hit off tight lie or hardpan (no fluffy grass).',
    outcome: 'Nowhere to hide behind fat contact.',
  },
];

const designSteps = [
  { step: '1', action: 'Identify the pattern you want to change', note: 'Name the specific fault clearly.' },
  { step: '2', action: 'Ask: "What constraint would make the opposite pattern impossible?"', note: 'Think backwards from the desired movement.' },
  { step: '3', action: 'Apply the constraint. Say nothing about the technique.', note: 'Let the environment do the teaching.' },
  { step: '4', action: 'Observe the adaptation. Allow 5–10 reps.', note: 'Be patient. The nervous system needs time.' },
  { step: '5', action: 'Remove the constraint. Observe if transfer occurs.', note: 'This is the critical test.' },
  { step: '6', action: 'If transfer: reinforce. If not: more reps or different constraint.', note: 'Adapt the approach, not the player.' },
];

export default function ConstraintLedPage() {
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Ecological Dynamics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Constraint-Led{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Approach</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Designing practice that teaches — where the environment does the coaching.
          </p>
        </div>

        {/* What is CLA */}
        <div className="rounded-2xl p-5 mb-8"
          style={{ background: 'rgba(0,175,81,0.06)', border: '1px solid rgba(0,175,81,0.2)' }}>
          <p className="text-[#4ade80] text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-raleway)' }}>
            WHAT IS CONSTRAINT-LED INSTRUCTION?
          </p>
          <p className="text-[#d1d5db] text-[14px] leading-relaxed mb-2" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Instead of telling a student what to do, you design an environment where the correct movement is the only logical solution. The student&apos;s nervous system figures it out.
          </p>
          <p className="text-[#6b7280] text-[13px] italic" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Based on Ecological Dynamics (Gibson, Newell) and Constraints-Led Approach (Davids, Button).
          </p>
        </div>

        {/* Three Types */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Three Types of Constraints
          </h2>
          <div className="space-y-4">
            {constraintTypes.map((ct) => (
              <div key={ct.type} className="rounded-2xl overflow-hidden"
                style={{ background: ct.color, border: `1px solid ${ct.border}` }}>
                <div className="px-5 py-3.5"
                  style={{ borderBottom: `1px solid ${ct.border}` }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: ct.accent, fontFamily: 'var(--font-work-sans)' }}>
                    {ct.type}
                  </p>
                  <p className="text-sm text-[#d1d5db]" style={{ fontFamily: 'var(--font-work-sans)' }}>{ct.desc}</p>
                </div>
                <div className="px-5 py-4 space-y-2">
                  {ct.examples.map((ex, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                        style={{ background: ct.accent }} />
                      <p className="text-[13px] text-[#9ca3af]" style={{ fontFamily: 'var(--font-work-sans)' }}>{ex}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design Process */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            The Design Process
          </h2>
          <div className="space-y-3">
            {designSteps.map((item) => (
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

        {/* Fault Catalog with Constraints */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Fault Catalog with Constraints
          </h2>
          <div className="space-y-3">
            {faultConstraints.map((item) => (
              <div key={item.fault} className="rounded-xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="px-4 py-2.5"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,175,81,0.04)' }}>
                  <span className="text-sm font-bold text-[#00af51]" style={{ fontFamily: 'var(--font-raleway)' }}>{item.fault}</span>
                </div>
                <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Constraint</span>
                    <p className="text-[13px] text-[#d1d5db] mt-0.5" style={{ fontFamily: 'var(--font-work-sans)' }}>{item.constraint}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#00af51]">Outcome</span>
                    <p className="text-[13px] text-[#4ade80] mt-0.5" style={{ fontFamily: 'var(--font-work-sans)' }}>{item.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Check Protocol */}
        <div className="rounded-2xl p-5 mb-10"
          style={{ background: 'rgba(244,238,25,0.05)', border: '1px solid rgba(244,238,25,0.2)' }}>
          <p className="text-[#f4ee19] text-sm font-bold mb-3" style={{ fontFamily: 'var(--font-raleway)' }}>
            THE 3-CHECK PROTOCOL
          </p>
          <p className="text-[#9ca3af] text-[13px] mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
            After any constraint session:
          </p>
          <div className="space-y-2.5">
            {[
              { num: '1', check: 'Did the pattern change during the constraint?', label: 'Immediate adaptation' },
              { num: '2', check: 'Does it hold for 5 reps without the constraint?', label: 'Short-term transfer' },
              { num: '3', check: 'Does it show up in the game format at end of session?', label: 'Applied transfer' },
            ].map((item) => (
              <div key={item.num} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                  style={{ background: 'rgba(244,238,25,0.15)', border: '1px solid rgba(244,238,25,0.3)', color: '#f4ee19', fontFamily: 'var(--font-raleway)' }}>
                  {item.num}
                </div>
                <p className="text-[13px] text-[#d1d5db] flex-1" style={{ fontFamily: 'var(--font-work-sans)' }}>{item.check}</p>
                <span className="text-[11px] text-[#f4ee19] font-semibold flex-shrink-0" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(244,238,25,0.15)' }}>
            <p className="text-[13px] text-[#d1d5db]" style={{ fontFamily: 'var(--font-work-sans)' }}>
              <span className="text-[#f4ee19] font-semibold">Yes to all three:</span> learning occurred.{' '}
              <span className="text-[#9ca3af]">Yes to one or two: more work needed.</span>
            </p>
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/l2/range-work" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Range Work
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
