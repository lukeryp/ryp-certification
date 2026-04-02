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

type ScoreRow = {
  result: string;
  proximity: string;
  score: string;
  scoreColor: string;
  bg?: string;
};

function LevelCard({ level, label, rows }: { level: string; label: string; rows: ScoreRow[] }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ padding: '14px 20px', background: 'rgba(0,175,81,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 15, color: '#f4ee19' }}>{level}</div>
        <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{label}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 100px', background: 'rgba(255,255,255,0.03)' }}>
        {['Result', 'Proximity', 'Score'].map(h => (
          <div key={h} style={{ padding: '8px 14px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</div>
        ))}
      </div>
      {rows.map((row, i, arr) => (
        <div key={row.result} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 100px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', background: row.bg || 'transparent' }}>
          <div style={{ padding: '12px 14px', fontFamily: 'var(--font-work-sans)', fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{row.result}</div>
          <div style={{ padding: '12px 14px', fontFamily: 'var(--font-work-sans)', fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{row.proximity}</div>
          <div style={{ padding: '12px 14px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 14, color: row.scoreColor }}>{row.score}</div>
        </div>
      ))}
    </div>
  );
}

export default function ChippingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff' }}>
      <Nav />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 40, alignItems: 'center', fontFamily: 'var(--font-work-sans)', fontSize: 14 }}>
          <Link href="/forge" style={{ color: '#00af51', textDecoration: 'none' }}>← FORGE Overview</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Chipping Index</span>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: 'rgba(0,175,81,0.12)', border: '1px solid rgba(0,175,81,0.3)', borderRadius: 8, padding: '6px 14px', marginBottom: 16 }}>
            <span style={{ color: '#00af51', fontFamily: 'var(--font-work-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>FORGE Drill 3 of 5</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-raleway)', fontWeight: 900, fontSize: 'clamp(32px, 6vw, 60px)', lineHeight: 1.05, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Ryp Chipping Index™
          </h1>
          <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 16, color: '#00af51', fontWeight: 600, marginBottom: 16 }}>5×5 — Chipping Challenge™</div>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 640, margin: 0 }}>
            Short game 5–25 yards. Proximity relative to physical equipment standards. Tracked separately by lie type.
          </p>
        </div>

        {/* Equipment */}
        <Card>
          <SectionLabel>Equipment</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '18px' }}>
              <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 14, color: '#f4ee19', marginBottom: 6 }}>Driver</div>
              <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>45 inches — ~3.75 ft per length</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '18px' }}>
              <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 14, color: '#f4ee19', marginBottom: 6 }}>Wedge</div>
              <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>35 inches — ~2.9 ft per length</div>
            </div>
          </div>
          <div style={{ marginTop: 14, padding: '12px 16px', background: 'rgba(244,238,25,0.05)', border: '1px solid rgba(244,238,25,0.12)', borderRadius: 8 }}>
            <span style={{ fontFamily: 'var(--font-work-sans)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>No tape measure needed. Equipment is the measuring stick.</span>
          </div>
        </Card>

        {/* Lie Types */}
        <Card>
          <SectionLabel>Lie Types — Tracked Independently</SectionLabel>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Fairway', 'Rough', 'Bunker'].map(lie => (
              <div key={lie} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 14, color: '#fff' }}>{lie}</div>
                <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>separate tracking</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Levels and Scoring */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 22, margin: '0 0 8px', color: '#fff' }}>Levels and Scoring</h2>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: '0 0 24px' }}>Same 20-shot format at all levels. Scoring thresholds tighten as level increases.</p>

          <LevelCard
            level="Level 1"
            label="Developmental"
            rows={[
              { result: 'Birdie', proximity: 'Within 2 driver lengths (~7.5 ft)', score: '−1', scoreColor: '#00af51', bg: 'rgba(0,175,81,0.05)' },
              { result: 'Par', proximity: 'Beyond 2 driver lengths', score: '0', scoreColor: 'rgba(255,255,255,0.7)' },
              { result: 'Double', proximity: 'Miss green or mishit', score: '+2', scoreColor: '#ef4444', bg: 'rgba(239,68,68,0.05)' },
            ]}
          />

          <LevelCard
            level="Level 2"
            label="Competitive"
            rows={[
              { result: 'Birdie', proximity: 'Within 1 driver length (~3.75 ft)', score: '−1', scoreColor: '#00af51', bg: 'rgba(0,175,81,0.05)' },
              { result: 'Par', proximity: 'Within 2 driver lengths (~7.5 ft)', score: '0', scoreColor: 'rgba(255,255,255,0.7)' },
              { result: 'Bogey', proximity: 'More than 2 driver lengths', score: '+1', scoreColor: '#f97316' },
              { result: 'Double', proximity: 'Miss green or mishit', score: '+2', scoreColor: '#ef4444', bg: 'rgba(239,68,68,0.05)' },
            ]}
          />

          <LevelCard
            level="Level 3"
            label="Advanced"
            rows={[
              { result: 'Birdie', proximity: 'Within 1 wedge length (~2.9 ft)', score: '−1', scoreColor: '#00af51', bg: 'rgba(0,175,81,0.05)' },
              { result: 'Par', proximity: 'Within 2 wedge lengths (~5.8 ft)', score: '0', scoreColor: 'rgba(255,255,255,0.7)' },
              { result: 'Bogey', proximity: 'More than 2 wedge lengths', score: '+1', scoreColor: '#f97316' },
              { result: 'Double', proximity: 'Miss green or mishit', score: '+2', scoreColor: '#ef4444', bg: 'rgba(239,68,68,0.05)' },
            ]}
          />

          <LevelCard
            level="Level 4"
            label="Elite"
            rows={[
              { result: 'Birdie', proximity: 'Within 2 feet', score: '−1', scoreColor: '#00af51', bg: 'rgba(0,175,81,0.05)' },
              { result: 'Par', proximity: 'Within 4 feet', score: '0', scoreColor: 'rgba(255,255,255,0.7)' },
              { result: 'Double', proximity: 'More than 4 feet', score: '+2', scoreColor: '#ef4444', bg: 'rgba(239,68,68,0.05)' },
              { result: 'Triple', proximity: 'Miss green or mishit', score: '+3', scoreColor: '#dc2626', bg: 'rgba(220,38,38,0.07)' },
            ]}
          />
        </div>

        {/* Protocol */}
        <Card style={{ background: 'rgba(244,238,25,0.04)', borderColor: 'rgba(244,238,25,0.15)' }}>
          <SectionLabel>Protocol</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              '20 shots total per session',
              'One starting location throughout the session',
              'Rotate through all available flags',
              'Final score = Ryp Chipping Index™',
              'Levels tracked independently by lie type — Fairway, Rough, Bunker each have their own level',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f4ee19', marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Challenge */}
        <Card style={{ background: 'rgba(0,175,81,0.05)', borderColor: 'rgba(0,175,81,0.2)' }}>
          <SectionLabel>Challenge Version</SectionLabel>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
            Play until <span style={{ color: '#00af51', fontWeight: 700 }}>−5 (win)</span> or <span style={{ color: '#ef4444', fontWeight: 700 }}>+5 (lose)</span>. Levels tracked independently by lie type. Rotate flags every shot.
          </p>
        </Card>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <Link href="/forge/approach" style={{ color: '#00af51', textDecoration: 'none', fontFamily: 'var(--font-work-sans)', fontSize: 14, fontWeight: 600 }}>
            ← Approach Index
          </Link>
          <Link href="/forge/putting" style={{ color: '#00af51', textDecoration: 'none', fontFamily: 'var(--font-work-sans)', fontSize: 14, fontWeight: 600 }}>
            Putting Index →
          </Link>
        </div>

      </div>
    </div>
  );
}
