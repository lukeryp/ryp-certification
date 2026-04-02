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
  { condition: 'Less than 1 yard error', score: 'Eagle (−2)', color: '#00af51', bg: 'rgba(0,175,81,0.08)' },
  { condition: '1–4 yards error', score: 'Birdie (−1)', color: '#4ade80', bg: 'rgba(0,175,81,0.04)' },
  { condition: '4–7 yards error', score: 'Par (0)', color: 'rgba(255,255,255,0.75)', bg: 'transparent' },
  { condition: '7–10 yards error', score: 'Bogey (+1)', color: '#f97316', bg: 'rgba(249,115,22,0.05)' },
  { condition: '10+ yards error', score: 'Double (+2)', color: '#ef4444', bg: 'rgba(239,68,68,0.06)' },
];

const levelTargets = [
  { level: 'Level 1', target: '+10', hcp: '18–20 HCP' },
  { level: 'Level 2', target: '+5', hcp: '13–16 HCP' },
  { level: 'Level 3', target: '0', hcp: '7–10 HCP' },
  { level: 'Level 4', target: '−5', hcp: 'Scratch' },
];

const zones = [
  {
    number: '1',
    name: 'Wedge',
    range: '50–100 yards',
    description: 'No shape prescriptions. Pure carry calibration. The most diagnostic zone for short game yardage gaps.',
    color: '#00af51',
  },
  {
    number: '2',
    name: 'Mid Iron',
    range: '80–160 yards',
    description: '14 stock shots + 2 draw + 2 fade + 2 wind in sequence. Shape penalty +1 for wrong shape.',
    color: '#f4ee19',
  },
  {
    number: '3',
    name: 'Full Bag',
    range: '80–220 yards',
    description: 'Same as Zone 2 prescription — 14 stock + 2 draw + 2 fade + 2 wind. Full distance range coverage.',
    color: '#f97316',
  },
];

export default function CarryPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff' }}>
      <Nav />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 40, alignItems: 'center', fontFamily: 'var(--font-work-sans)', fontSize: 14 }}>
          <Link href="/forge" style={{ color: '#00af51', textDecoration: 'none' }}>← FORGE Overview</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Carry Index</span>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: 'rgba(0,175,81,0.12)', border: '1px solid rgba(0,175,81,0.3)', borderRadius: 8, padding: '6px 14px', marginBottom: 16 }}>
            <span style={{ color: '#00af51', fontFamily: 'var(--font-work-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>FORGE Drill 5 of 5</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-raleway)', fontWeight: 900, fontSize: 'clamp(32px, 6vw, 60px)', lineHeight: 1.05, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Ryp Carry Index™
          </h1>
          <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 16, color: '#00af51', fontWeight: 600, marginBottom: 16 }}>Launch Monitor — Carry Challenge™</div>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 640, margin: 0 }}>
            Carry precision — the ability to execute an intended carry distance with any club. Launch monitor is sole arbiter. Highest-fidelity drill in the RYP system.
          </p>
        </div>

        {/* Three Zones */}
        <Card>
          <SectionLabel>Three Zones</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {zones.map(zone => (
              <div key={zone.number} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
                <div style={{ minWidth: 48, height: 48, borderRadius: 10, background: `${zone.color}18`, border: `1px solid ${zone.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-raleway)', fontWeight: 900, fontSize: 22, color: zone.color }}>Z{zone.number}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 15, color: '#fff', marginBottom: 2 }}>Zone {zone.number} — {zone.name}</div>
                  <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 12, fontWeight: 600, color: zone.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{zone.range}</div>
                  <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{zone.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Scoring */}
        <Card>
          <SectionLabel>Scoring</SectionLabel>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Error from Target Carry</div>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Score</div>
            </div>
            {scoringRows.map((row, i, arr) => (
              <div key={row.condition} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', background: row.bg }}>
                <div style={{ padding: '14px 16px', fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{row.condition}</div>
                <div style={{ padding: '14px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 15, color: row.color }}>{row.score}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '14px 18px', background: 'rgba(244,238,25,0.05)', border: '1px solid rgba(244,238,25,0.15)', borderRadius: 10 }}>
            <span style={{ fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 13, color: '#f4ee19' }}>Memory anchor: </span>
            <span style={{ fontFamily: 'var(--font-work-sans)', fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>Thresholds are 1, 4, 7, 10 yards — easy to recall mid-session without an app.</span>
          </div>
        </Card>

        {/* Level Targets */}
        <Card>
          <SectionLabel>Level Targets — All Zones</SectionLabel>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
            Same target structure applies across all three zones.
          </p>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 100px 1fr', background: 'rgba(255,255,255,0.04)' }}>
              {['Level', 'Target', 'HCP Equivalent'].map(h => (
                <div key={h} style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {levelTargets.map((row, i, arr) => (
              <div key={row.level} style={{ display: 'grid', gridTemplateColumns: '120px 100px 1fr', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ padding: '14px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 15, color: '#f4ee19' }}>{row.level}</div>
                <div style={{ padding: '14px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 17, color: row.target.startsWith('−') ? '#00af51' : row.target === '0' ? '#f4ee19' : '#f97316' }}>{row.target}</div>
                <div style={{ padding: '14px 16px', fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{row.hcp}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Protocol */}
        <Card style={{ background: 'rgba(244,238,25,0.04)', borderColor: 'rgba(244,238,25,0.15)' }}>
          <SectionLabel>Protocol</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { step: '01', text: 'Declare the target carry distance before each shot.' },
              { step: '02', text: 'Look up the sequence — use a d20 die or QR randomizer.' },
              { step: '03', text: 'Hit. Launch monitor reports actual carry.' },
              { step: '04', text: 'Score the error. No do-overs.' },
            ].map((item, i, arr) => (
              <div key={item.step} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '16px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 900, fontSize: 24, color: 'rgba(244,238,25,0.25)', lineHeight: 1.1, minWidth: 36 }}>{item.step}</div>
                <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, paddingTop: 2 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Diagnostic Value */}
        <Card style={{ background: 'rgba(0,175,81,0.04)', borderColor: 'rgba(0,175,81,0.2)' }}>
          <SectionLabel>Diagnostic Value</SectionLabel>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, margin: 0 }}>
            If your Carry Index is significantly better than your Approach Index, outdoor proximity estimation is biased — you are underestimating how far off-line your shots are landing. That gap between the two indices is itself diagnostic information and a direct coaching cue.
          </p>
        </Card>

        {/* Challenge and Progression */}
        <Card style={{ background: 'rgba(0,175,81,0.05)', borderColor: 'rgba(0,175,81,0.2)' }}>
          <SectionLabel>Challenge Version and Level Progression</SectionLabel>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: '0 0 20px' }}>
            Play until <span style={{ color: '#00af51', fontWeight: 700 }}>−5 (win)</span> or <span style={{ color: '#ef4444', fontWeight: 700 }}>+5 (lose)</span>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { rule: 'Win 2 of 3 sessions', outcome: 'Advance to next level', color: '#00af51' },
              { rule: 'Win 0 of 3 sessions', outcome: 'Move down one level', color: '#ef4444' },
            ].map(row => (
              <div key={row.rule} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: row.color, marginTop: 6, flexShrink: 0 }} />
                <div>
                  <span style={{ fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 14, color: '#fff' }}>{row.rule}</span>
                  <span style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.5)', marginLeft: 8 }}>→ {row.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <Link href="/forge/putting" style={{ color: '#00af51', textDecoration: 'none', fontFamily: 'var(--font-work-sans)', fontSize: 14, fontWeight: 600 }}>
            ← Putting Index
          </Link>
          <Link href="/forge" style={{ color: '#00af51', textDecoration: 'none', fontFamily: 'var(--font-work-sans)', fontSize: 14, fontWeight: 600 }}>
            ← Back to FORGE Overview
          </Link>
        </div>

      </div>
    </div>
  );
}
