'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const scoreColor = (score: string) => {
  if (score.includes('Eagle') || score.includes('Birdie') || score.includes('−1') || score.includes('−2')) return '#00af51';
  if (score.includes('Double') || score.includes('+2')) return '#ef4444';
  if (score.includes('Bogey') || score.includes('+1')) return '#f97316';
  return 'rgba(255,255,255,0.8)';
};

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

function TableRow({ cells, isHeader, highlight }: { cells: string[]; isHeader?: boolean; highlight?: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cells.length}, 1fr)`, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      {cells.map((cell, i) => {
        const bg = highlight === cell ? 'rgba(0,175,81,0.08)' : 'transparent';
        const color = isHeader ? 'rgba(255,255,255,0.5)' : (i === 1 ? scoreColor(cell) : 'rgba(255,255,255,0.85)');
        return (
          <div key={i} style={{ padding: '12px 16px', fontFamily: isHeader ? 'var(--font-raleway)' : 'var(--font-work-sans)', fontWeight: isHeader ? 700 : 400, fontSize: isHeader ? 11 : 14, color, letterSpacing: isHeader ? '0.08em' : 0, textTransform: isHeader ? 'uppercase' : 'none', background: bg }}>
            {cell}
          </div>
        );
      })}
    </div>
  );
}

export default function DrivingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff' }}>
      <Nav />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 40, alignItems: 'center', fontFamily: 'var(--font-work-sans)', fontSize: 14 }}>
          <Link href="/forge" style={{ color: '#00af51', textDecoration: 'none' }}>← FORGE Overview</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Driving Index</span>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: 'rgba(0,175,81,0.12)', border: '1px solid rgba(0,175,81,0.3)', borderRadius: 8, padding: '6px 14px', marginBottom: 16 }}>
            <span style={{ color: '#00af51', fontFamily: 'var(--font-work-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>FORGE Drill 1 of 5</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-raleway)', fontWeight: 900, fontSize: 'clamp(32px, 6vw, 60px)', lineHeight: 1.05, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Ryp Driving Index™
          </h1>
          <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 16, color: '#00af51', fontWeight: 600, marginBottom: 16 }}>Driving Challenge™</div>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 640, margin: 0 }}>
            Tee performance — driving distance + directional accuracy, weighted by miss severity.
          </p>
        </div>

        {/* Equipment */}
        <Card>
          <SectionLabel>Equipment Required</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              '20 golf balls',
              'Physical ball abacus — 5 on-ground columns',
              'Two pairs of landmarks downrange defining fairway (30 yards wide) and bad miss boundary',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00af51', marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-work-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Abacus Grid */}
        <Card>
          <SectionLabel>The Abacus Grid</SectionLabel>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 20, lineHeight: 1.6 }}>
            5 columns on the ground. Sort each ball after impact. No pencil, no app, no math mid-session.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: 560 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5'].map(col => (
                  <div key={col} style={{ padding: '10px 12px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{col}</div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {[
                  { label: 'BAD MISS LEFT', color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
                  { label: 'Good Miss Left', color: 'rgba(255,255,255,0.75)', bg: 'transparent' },
                  { label: 'FAIRWAY HIT', color: '#00af51', bg: 'rgba(0,175,81,0.1)' },
                  { label: 'Good Miss Right', color: 'rgba(255,255,255,0.75)', bg: 'transparent' },
                  { label: 'BAD MISS RIGHT', color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
                ].map(col => (
                  <div key={col.label} style={{ padding: '14px 12px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 12, color: col.color, background: col.bg, textAlign: 'center' }}>{col.label}</div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                {[
                  { label: 'Double (+2)', color: '#ef4444', bg: 'rgba(239,68,68,0.05)' },
                  { label: 'Par (0)', color: 'rgba(255,255,255,0.6)', bg: 'transparent' },
                  { label: 'Birdie (−1)', color: '#00af51', bg: 'rgba(0,175,81,0.06)' },
                  { label: 'Par (0)', color: 'rgba(255,255,255,0.6)', bg: 'transparent' },
                  { label: 'Double (+2)', color: '#ef4444', bg: 'rgba(239,68,68,0.05)' },
                ].map((col, i) => (
                  <div key={i} style={{ padding: '14px 12px', fontFamily: 'var(--font-work-sans)', fontWeight: 600, fontSize: 14, color: col.color, background: col.bg, textAlign: 'center' }}>{col.label}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 20, padding: '14px 18px', background: 'rgba(244,238,25,0.05)', border: '1px solid rgba(244,238,25,0.15)', borderRadius: 10 }}>
            <span style={{ fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 13, color: '#f4ee19' }}>Protocol: </span>
            <span style={{ fontFamily: 'var(--font-work-sans)', fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>Hit. Look. Sort. No pencil. No app. No math mid-session.</span>
          </div>
        </Card>

        {/* Shape Prescription */}
        <Card>
          <SectionLabel>Shape Prescription</SectionLabel>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
            Four prescribed shots across the 20-ball session. All others are player's choice.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { shot: 'Shot 5', shape: 'Draw', club: '3-wood' },
              { shot: 'Shot 10', shape: 'Fade', club: 'Driver' },
              { shot: 'Shot 15', shape: 'Draw', club: 'Driver' },
              { shot: 'Shot 20', shape: 'Fade', club: 'Driver' },
            ].map((row, i, arr) => (
              <div key={row.shot} style={{ display: 'flex', gap: 0, borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', padding: '14px 0', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 15, color: '#f4ee19', width: 90 }}>{row.shot}</div>
                <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: '#00af51', fontWeight: 600, width: 80 }}>{row.shape}</div>
                <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{row.club}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Baseline Handicap Tables */}
        <Card>
          <SectionLabel>Baseline Handicap — Men's</SectionLabel>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Average Distance</div>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Baseline Handicap</div>
            </div>
            {[
              ['300+ yards', '−5'],
              ['270 yards', '0'],
              ['255 yards', '5'],
              ['240 yards', '10'],
              ['220 yards', '15'],
              ['205 yards', '20'],
              ['190 yards', '25'],
            ].map(([dist, hcp], i, arr) => (
              <div key={dist} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ padding: '12px 16px', fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{dist}</div>
                <div style={{ padding: '12px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 15, color: hcp.startsWith('−') ? '#00af51' : hcp === '0' ? '#f4ee19' : 'rgba(255,255,255,0.75)' }}>{hcp}</div>
              </div>
            ))}
          </div>

          <SectionLabel>Baseline Handicap — Women's</SectionLabel>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Average Distance</div>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Baseline Handicap</div>
            </div>
            {[
              ['250+ yards', '−5'],
              ['225 yards', '0'],
              ['210 yards', '5'],
              ['195 yards', '10'],
              ['180 yards', '15'],
              ['165 yards', '20'],
              ['150 yards', '25'],
            ].map(([dist, hcp], i, arr) => (
              <div key={dist} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ padding: '12px 16px', fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{dist}</div>
                <div style={{ padding: '12px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 15, color: hcp.startsWith('−') ? '#00af51' : hcp === '0' ? '#f4ee19' : 'rgba(255,255,255,0.75)' }}>{hcp}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Calculation */}
        <Card style={{ background: 'rgba(244,238,25,0.04)', borderColor: 'rgba(244,238,25,0.15)' }}>
          <SectionLabel>Calculation</SectionLabel>
          <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 2, marginBottom: 20 }}>
            <div><span style={{ color: '#f4ee19', fontWeight: 600 }}>Running Total</span> = (Fairway balls × −1) + (Bad Miss balls × +2)</div>
            <div><span style={{ color: '#f4ee19', fontWeight: 600 }}>Ryp Driving Index™</span> = Baseline Handicap + Running Total</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Worked Example</div>
            <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.9 }}>
              <div>Golfer averaging <span style={{ color: '#fff', fontWeight: 600 }}>240 yards</span> → Baseline: <span style={{ color: '#f4ee19', fontWeight: 600 }}>10</span></div>
              <div>12 fairways, 4 good misses, 4 bad misses</div>
              <div style={{ marginTop: 8 }}>Running Total: (12 × −1) + (4 × +2) = <span style={{ color: '#00af51', fontWeight: 600 }}>−4</span></div>
              <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 18, color: '#f4ee19', marginTop: 8 }}>Final Index: 10 + (−4) = 6</div>
            </div>
          </div>
        </Card>

        {/* Index Interpretation */}
        <Card>
          <SectionLabel>Index Interpretation</SectionLabel>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { range: '≤ −10', label: 'Elite Driver', color: '#00af51' },
              { range: '−9 to −3', label: 'Tour Caliber', color: '#4ade80' },
              { range: '−2 to 5', label: 'Strong Driver', color: '#86efac' },
              { range: '6 to 14', label: 'Average Driver', color: 'rgba(255,255,255,0.75)' },
              { range: '15 to 23', label: 'Developing Driver', color: '#f97316' },
              { range: '24+', label: 'Needs Work', color: '#ef4444' },
            ].map((row, i, arr) => (
              <div key={row.range} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ padding: '14px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 15, color: row.color }}>{row.range}</div>
                <div style={{ padding: '14px 16px', fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{row.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Challenge Version */}
        <Card style={{ background: 'rgba(0,175,81,0.05)', borderColor: 'rgba(0,175,81,0.2)' }}>
          <SectionLabel>Challenge Version</SectionLabel>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: '0 0 16px' }}>
            No fixed shot count. Play until <span style={{ color: '#00af51', fontWeight: 700 }}>−5 (win)</span> or <span style={{ color: '#ef4444', fontWeight: 700 }}>+5 (lose)</span>. The exit criteria are the structure.
          </p>
        </Card>

        {/* Level Progression */}
        <Card>
          <SectionLabel>Level Progression</SectionLabel>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
            Bad miss boundary tightens as level increases.
          </p>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr', background: 'rgba(255,255,255,0.04)' }}>
              {['Level', 'Bad Miss Boundary', 'Good Miss Score'].map(h => (
                <div key={h} style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {[
              { level: 'Level 1', boundary: '40 yards from fairway edge', goodMiss: 'Par (0)' },
              { level: 'Level 2', boundary: '30 yards from fairway edge', goodMiss: 'Par (0)' },
              { level: 'Level 3', boundary: '20 yards from fairway edge', goodMiss: 'Par (0)' },
              { level: 'Level 4', boundary: '10 yards from fairway edge', goodMiss: 'Bogey (+1)' },
            ].map((row, i, arr) => (
              <div key={row.level} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ padding: '13px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 14, color: '#f4ee19' }}>{row.level}</div>
                <div style={{ padding: '13px 16px', fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{row.boundary}</div>
                <div style={{ padding: '13px 16px', fontFamily: 'var(--font-work-sans)', fontSize: 14, color: row.goodMiss.includes('+1') ? '#f97316' : 'rgba(255,255,255,0.7)' }}>{row.goodMiss}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <Link href="/forge" style={{ color: '#00af51', textDecoration: 'none', fontFamily: 'var(--font-work-sans)', fontSize: 14, fontWeight: 600 }}>
            ← FORGE Overview
          </Link>
          <Link href="/forge/approach" style={{ color: '#00af51', textDecoration: 'none', fontFamily: 'var(--font-work-sans)', fontSize: 14, fontWeight: 600 }}>
            Approach Index →
          </Link>
        </div>

      </div>
    </div>
  );
}
