'use client';

import Link from 'next/link';
import Nav from '../components/Nav';

const drills = [
  {
    href: '/forge/driving',
    name: 'Ryp Driving Index™',
    subtitle: 'Tee Performance',
    description: 'Distance + accuracy + miss severity. 20 balls, 5-column abacus, shape prescriptions on shots 5, 10, 15, 20.',
    icon: '🏌️',
  },
  {
    href: '/forge/approach',
    name: 'Ryp Approach Index™',
    subtitle: 'Iron & Wedge 80–220 yards',
    description: 'Proximity + strike quality + shot-shaping adaptability. Scored as percentage of distance, not absolute yards.',
    icon: '🎯',
  },
  {
    href: '/forge/chipping',
    name: 'Ryp Chipping Index™',
    subtitle: 'Short Game 5–25 yards',
    description: 'Proximity measured by driver and wedge lengths — no tape measure needed. Tracked independently by lie type.',
    icon: '⛳',
  },
  {
    href: '/forge/putting',
    name: 'Ryp Putting Index™',
    subtitle: 'Variable Clock — 100° Rotation',
    description: '20 putts per slope tier, 3 tiers = 60 total. Every putt is a different break, slope, and approach angle.',
    icon: '🏁',
  },
  {
    href: '/forge/carry',
    name: 'Ryp Carry Index™',
    subtitle: 'Launch Monitor Only',
    description: 'Declare the carry distance before each shot. Launch monitor is sole arbiter. Highest-fidelity drill in the system.',
    icon: '📡',
  },
];

const acronym = [
  {
    letter: 'F',
    word: 'Fidelity',
    definition: 'Transfer conditions enforced. No do-overs. Cold reads. One ball.',
  },
  {
    letter: 'O',
    word: 'Overload',
    definition: 'Consequence layers built in. Score penalties, restart rules, exit criteria.',
  },
  {
    letter: 'R',
    word: 'Randomization',
    definition: 'Distance, direction, and condition variability on every trial.',
  },
  {
    letter: 'G',
    word: 'Graded',
    definition: 'Tiered scalability. Level progression tied to past performance.',
  },
  {
    letter: 'E',
    word: 'Exit criteria',
    definition: 'Threshold-based termination. Play until −5 (win) or +5 (lose).',
  },
];

const principles = [
  {
    number: '01',
    title: 'Commitment before information',
    body: 'The shot happens before the score is calculated. No adjustments mid-sequence.',
  },
  {
    number: '02',
    title: 'Scoring as diagnostic, not just evaluation',
    body: 'Every index produces information beyond pass/fail. The shape of the score matters.',
  },
  {
    number: '03',
    title: 'Volume is the learning variable',
    body: 'Minimum 20 reps, under 20 minutes. Frequency beats duration every time.',
  },
];

export default function ForgePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#2a2a2a' }}>
      <Nav />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Back link */}
        <Link href="/" style={{ color: '#9e812f', textDecoration: 'none', fontFamily: 'var(--font-work-sans)', fontSize: 14, letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 40 }}>
          ← Back to Home
        </Link>

        {/* Hero */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'rgba(158,129,47,0.1)', border: '1px solid rgba(158,129,47,0.3)', borderRadius: 8, padding: '6px 14px', marginBottom: 20 }}>
            <span style={{ color: '#9e812f', fontFamily: 'var(--font-work-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>RYP Golf Research Institute</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-raleway)', fontWeight: 900, fontSize: 'clamp(42px, 7vw, 80px)', lineHeight: 1.0, margin: '0 0 16px', letterSpacing: '-0.02em', color: '#141f0f' }}>
            FORGE<br />
            <span style={{ color: '#9e812f' }}>Drill System</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 20, color: '#888', margin: 0, fontWeight: 400, letterSpacing: '0.02em' }}>
            Measurement Over Movement
          </p>
        </div>

        {/* FORGE Acronym */}
        <div style={{ background: 'rgba(20,31,15,0.03)', border: '1px solid rgba(20,31,15,0.1)', borderRadius: 16, padding: '32px', marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 22, margin: '0 0 28px', color: '#141f0f' }}>
            The FORGE Framework
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {acronym.map((item, i) => (
              <div key={item.letter} style={{ display: 'flex', alignItems: 'flex-start', gap: 24, padding: '18px 0', borderBottom: i < acronym.length - 1 ? '1px solid rgba(20,31,15,0.08)' : 'none' }}>
                <div style={{ minWidth: 52, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-raleway)', fontWeight: 900, fontSize: 36, color: '#141f0f', lineHeight: 1 }}>{item.letter}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 16, color: '#141f0f', marginBottom: 4 }}>{item.word}</div>
                  <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: '#666', lineHeight: 1.5 }}>{item.definition}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div style={{ background: 'rgba(158,129,47,0.05)', border: '1px solid rgba(158,129,47,0.15)', borderRadius: 16, padding: '32px', marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 22, margin: '0 0 16px', color: '#9e812f' }}>
            Philosophy
          </h2>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 16, color: '#2a2a2a', lineHeight: 1.75, margin: '0 0 28px' }}>
            Every drill in the RYP system is built around one idea: measurement over movement. The goal is not to teach the swing. It is to teach the golfer what their game actually does — and to score it in ways that are defensible against strokes gained research.
          </p>
          <h3 style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 16, color: '#141f0f', margin: '0 0 20px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Three Non-Negotiable Principles
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {principles.map(p => (
              <div key={p.number} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 900, fontSize: 28, color: 'rgba(158,129,47,0.3)', lineHeight: 1, minWidth: 40 }}>{p.number}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 15, color: '#141f0f', marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: '#666', lineHeight: 1.6 }}>{p.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drill Cards */}
        <h2 style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 28, margin: '0 0 24px', color: '#141f0f' }}>
          The Five Drills
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginBottom: 48 }}>
          {drills.map(drill => (
            <Link key={drill.href} href={drill.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fafaf9', border: '1px solid rgba(20,31,15,0.1)', borderRadius: 16, padding: '24px', height: '100%', transition: 'border-color 0.2s, background 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(158,129,47,0.4)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(158,129,47,0.05)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(20,31,15,0.1)'; (e.currentTarget as HTMLDivElement).style.background = '#fafaf9'; }}
              >
                <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 17, color: '#141f0f', marginBottom: 4 }}>{drill.name}</div>
                <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 12, fontWeight: 600, color: '#9e812f', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>{drill.subtitle}</div>
                <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: '#666', lineHeight: 1.6, margin: '0 0 16px' }}>{drill.description}</p>
                <div style={{ color: '#9e812f', fontFamily: 'var(--font-work-sans)', fontSize: 13, fontWeight: 600 }}>View drill details →</div>
              </div>
            </Link>
          ))}
        </div>

        {/* RYP Performance Index Composite */}
        <div style={{ background: 'rgba(20,31,15,0.03)', border: '1px solid rgba(20,31,15,0.1)', borderRadius: 16, padding: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 22, margin: '0 0 8px', color: '#141f0f' }}>
            RYP Performance Index™
          </h2>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: '#aaa', margin: '0 0 28px' }}>
            Composite weighting across all five drills
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 13, color: '#9e812f', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Outdoor</div>
              {[
                { label: 'Approach Index', pct: 40 },
                { label: 'Driving Index', pct: 20 },
                { label: 'Chipping Index', pct: 20 },
                { label: 'Putting Index', pct: 20 },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(20,31,15,0.08)' }}>
                  <span style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: '#2a2a2a' }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 18, color: row.pct === 40 ? '#9e812f' : '#141f0f' }}>{row.pct}%</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 13, color: '#9e812f', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Indoor (Launch Monitor)</div>
              {[
                { label: 'Carry — Wedge', pct: 25 },
                { label: 'Carry — Mid Iron', pct: 25 },
                { label: 'Carry — Full Bag', pct: 25 },
                { label: 'Putting Index', pct: 25 },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(20,31,15,0.08)' }}>
                  <span style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: '#2a2a2a' }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 18, color: '#141f0f' }}>{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
