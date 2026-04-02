'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: '#00af51', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
      {children}
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '28px', marginBottom: 24, ...style }}>
      {children}
    </div>
  );
}

const scoringRows = [
  { condition: 'Within 5% of distance', score: 'Eagle (−2)', color: '#00af51', bg: 'rgba(0,175,81,0.07)' },
  { condition: 'Within 10% of distance', score: 'Birdie (−1)', color: '#4ade80', bg: 'rgba(0,175,81,0.04)' },
  { condition: 'Beyond 10% of distance', score: 'Par (0)', color: 'rgba(255,255,255,0.75)', bg: 'transparent' },
  { condition: 'Mishit', score: 'Double (+2)', color: '#ef4444', bg: 'rgba(239,68,68,0.06)' },
];

const sessionTargets = [
  { level: 'Tour', target: '−25' },
  { level: 'Scratch', target: '−14' },
  { level: '5 HCP', target: '−6' },
  { level: '10 HCP', target: '−2' },
  { level: '15 HCP', target: '+2' },
  { level: '20 HCP', target: '+4' },
  { level: '25 HCP', target: '+5' },
  { level: '30 HCP', target: '+7' },
];

export default function ApproachPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff' }}>
      <Nav />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 40, alignItems: 'center', fontFamily: 'var(--font-work-sans)', fontSize: 14 }}>
          <Link href="/forge" style={{ color: '#00af51', textDecoration: 'none' }}>← FORGE Overview</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Approach Index</span>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: 'rgba(0,175,81,0.12)', border: '1px solid rgba(0,175,81,0.3)', borderRadius: 8, padding: '6px 14px', marginBottom: 16 }}>
            <span style={{ color: '#00af51', fontFamily: 'var(--font-work-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>FORGE Drill 2 of 5</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-raleway)', fontWeight: 900, fontSize: 'clamp(32px, 6vw, 60px)', lineHeight: 1.05, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Ryp Approach Index™
          </h1>
          <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 16, color: '#00af51', fontWeight: 600, marginBottom: 16 }}>Approach Challenge™</div>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 640, margin: 0 }}>
            Iron and wedge performance from 80–220 yards. Proximity + strike quality + shot-shaping adaptability.
          </p>
        </div>

        {/* Two Versions */}
        <Card>
          <SectionLabel>Two Versions</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 14, color: '#f4ee19', marginBottom: 8 }}>Version 1 — Stock</div>
              <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>
                Hit stock shots to range pins, rotating left to right. Natural distance variation. 20 shots total.
              </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 14, color: '#f4ee19', marginBottom: 8 }}>Version 2 — Variable</div>
              <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>
                14 stock shots + 2 draw + 2 fade + 2 wind in random sequence. Shape penalty: <span style={{ color: '#f97316', fontWeight: 600 }}>+1</span> for wrong shape.
              </p>
            </div>
          </div>
        </Card>

        {/* Scoring */}
        <Card>
          <SectionLabel>Scoring — Same Every Session</SectionLabel>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Result</div>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Score</div>
            </div>
            {scoringRows.map((row, i, arr) => (
              <div key={row.condition} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', background: row.bg }}>
                <div style={{ padding: '14px 16px', fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{row.condition}</div>
                <div style={{ padding: '14px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 15, color: row.color }}>{row.score}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: '16px 20px', background: 'rgba(244,238,25,0.05)', border: '1px solid rgba(244,238,25,0.15)', borderRadius: 10 }}>
            <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 13, color: '#f4ee19', marginBottom: 6 }}>At 150 yards:</div>
            <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
              <div>Eagle = within <strong style={{ color: '#00af51' }}>7.5 yards</strong> (5% of 150)</div>
              <div>Birdie = within <strong style={{ color: '#4ade80' }}>15 yards</strong> (10% of 150)</div>
            </div>
          </div>
        </Card>

        {/* Session Targets */}
        <Card>
          <SectionLabel>Session Targets by Handicap</SectionLabel>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Level</div>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Target Score (20 shots)</div>
            </div>
            {sessionTargets.map((row, i, arr) => (
              <div key={row.level} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ padding: '13px 16px', fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{row.level}</div>
                <div style={{ padding: '13px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 16, color: row.target.startsWith('−') ? '#00af51' : row.target === '0' ? '#f4ee19' : '#f97316' }}>{row.target}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Proximity Estimation */}
        <Card style={{ background: 'rgba(244,238,25,0.04)', borderColor: 'rgba(244,238,25,0.15)' }}>
          <SectionLabel>Proximity Estimation</SectionLabel>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, margin: 0 }}>
            Self-reported after walking to ball. This is not a limitation — it is the point. Proximity estimation trains course management calibration. Golfers who routinely overestimate how close they hit it will see their Approach Index diverge from their Carry Index, producing a diagnostic gap.
          </p>
        </Card>

        {/* Challenge */}
        <Card style={{ background: 'rgba(0,175,81,0.05)', borderColor: 'rgba(0,175,81,0.2)' }}>
          <SectionLabel>Challenge Version</SectionLabel>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
            No fixed shot count. Play until <span style={{ color: '#00af51', fontWeight: 700 }}>−5 (win)</span> or <span style={{ color: '#ef4444', fontWeight: 700 }}>+5 (lose)</span>. Rotate through available targets. Shape prescriptions apply in Version 2.
          </p>
        </Card>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <Link href="/forge/driving" style={{ color: '#00af51', textDecoration: 'none', fontFamily: 'var(--font-work-sans)', fontSize: 14, fontWeight: 600 }}>
            ← Driving Index
          </Link>
          <Link href="/forge/chipping" style={{ color: '#00af51', textDecoration: 'none', fontFamily: 'var(--font-work-sans)', fontSize: 14, fontWeight: 600 }}>
            Chipping Index →
          </Link>
        </div>

      </div>
    </div>
  );
}
