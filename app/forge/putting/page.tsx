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
  { result: 'Make', score: 'Birdie (−1)', color: '#00af51', bg: 'rgba(0,175,81,0.07)' },
  { result: 'Past hole, within 1 putter length', score: 'Par (0)', color: 'rgba(255,255,255,0.75)', bg: 'transparent' },
  { result: 'Short, or more than 1 putter length past', score: 'Bogey (+1)', color: '#f97316', bg: 'rgba(249,115,22,0.06)' },
];

const sessionTargets = [
  { level: 'Tour', target: '−7' },
  { level: 'Scratch', target: '−5' },
  { level: '5 HCP', target: '−3' },
  { level: '10 HCP', target: '0' },
  { level: '15 HCP', target: '+3' },
  { level: '20 HCP', target: '+5' },
  { level: '25 HCP', target: '+8' },
  { level: '30 HCP', target: '+11' },
];

const challengeDistances = [
  { level: 'Level 1', target: '+10', hcp: '22–25 HCP', distances: '1, 2, 3, 4 putter lengths' },
  { level: 'Level 2', target: '+5', hcp: '18–20 HCP', distances: '2, 3, 4, 5 putter lengths' },
  { level: 'Level 3', target: '0', hcp: '12–15 HCP', distances: '3, 4, 5, 6 putter lengths' },
  { level: 'Level 4', target: '−5', hcp: '5–8 HCP', distances: '4, 5, 6, 7 putter lengths' },
];

export default function PuttingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff' }}>
      <Nav />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 40, alignItems: 'center', fontFamily: 'var(--font-work-sans)', fontSize: 14 }}>
          <Link href="/forge" style={{ color: '#00af51', textDecoration: 'none' }}>← FORGE Overview</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Putting Index</span>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: 'rgba(0,175,81,0.12)', border: '1px solid rgba(0,175,81,0.3)', borderRadius: 8, padding: '6px 14px', marginBottom: 16 }}>
            <span style={{ color: '#00af51', fontFamily: 'var(--font-work-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>FORGE Drill 4 of 5</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-raleway)', fontWeight: 900, fontSize: 'clamp(32px, 6vw, 60px)', lineHeight: 1.05, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Ryp Putting Index™
          </h1>
          <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 16, color: '#00af51', fontWeight: 600, marginBottom: 16 }}>Variable Clock — Putting Challenge™</div>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 640, margin: 0 }}>
            Putting across distance, direction, slope, and speed control. 100-degree rotation ensures true randomization from a single rule.
          </p>
        </div>

        {/* Equipment */}
        <Card>
          <SectionLabel>Equipment</SectionLabel>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 4 }}>Putter and golf balls only</div>
              <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>No additional tools required</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { slope: '3-degree', label: 'Tier 1' },
              { slope: '2-degree', label: 'Tier 2' },
              { slope: '1-degree', label: 'Tier 3' },
            ].map(tier => (
              <div key={tier.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 16, color: '#f4ee19' }}>{tier.slope}</div>
                <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{tier.label} slope section</div>
              </div>
            ))}
          </div>
        </Card>

        {/* 100-Degree Rotation */}
        <Card style={{ background: 'rgba(244,238,25,0.04)', borderColor: 'rgba(244,238,25,0.15)' }}>
          <SectionLabel>The 100-Degree Rotation</SectionLabel>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, margin: '0 0 16px' }}>
            After every putt, move <span style={{ color: '#f4ee19', fontWeight: 600 }}>100° counter-clockwise</span>. Distance cycle: 2→3→4→5 putter lengths, then repeat.
          </p>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, margin: 0 }}>
            Every putt = different break, slope, and approach angle. True randomization from a simple rule. After 20 putts you have covered the full green.
          </p>
        </Card>

        {/* Scoring */}
        <Card>
          <SectionLabel>Scoring — All Levels</SectionLabel>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Result</div>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Score</div>
            </div>
            {scoringRows.map((row, i, arr) => (
              <div key={row.result} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', background: row.bg }}>
                <div style={{ padding: '14px 16px', fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{row.result}</div>
                <div style={{ padding: '14px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 15, color: row.color }}>{row.score}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '14px 18px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 10 }}>
            <div style={{ fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 13, color: '#ef4444', marginBottom: 4 }}>Speed Philosophy</div>
            <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              Short putts never go in. Scoring explicitly penalizes short misses. Good speed (past the hole, within 1 putter length) is rewarded with Par — the same as holing the putt would be if you were on tour.
            </div>
          </div>
        </Card>

        {/* Levels */}
        <Card>
          <SectionLabel>Challenge Levels — Score Targets</SectionLabel>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
            Same distances apply at all levels. Only the target score changes.
          </p>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 100px 1fr 1fr', background: 'rgba(255,255,255,0.04)' }}>
              {['Level', 'Target', 'HCP Range', 'Distances'].map(h => (
                <div key={h} style={{ padding: '10px 14px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {challengeDistances.map((row, i, arr) => (
              <div key={row.level} style={{ display: 'grid', gridTemplateColumns: '100px 100px 1fr 1fr', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ padding: '13px 14px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 14, color: '#f4ee19' }}>{row.level}</div>
                <div style={{ padding: '13px 14px', fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 16, color: row.target.startsWith('−') ? '#00af51' : row.target === '0' ? '#f4ee19' : '#f97316' }}>{row.target}</div>
                <div style={{ padding: '13px 14px', fontFamily: 'var(--font-work-sans)', fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{row.hcp}</div>
                <div style={{ padding: '13px 14px', fontFamily: 'var(--font-work-sans)', fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{row.distances}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Full Index Session */}
        <Card>
          <SectionLabel>Full Index Session — 60 Putts</SectionLabel>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px', background: 'rgba(255,255,255,0.04)' }}>
              {['Tier', 'Slope', 'Putts'].map(h => (
                <div key={h} style={{ padding: '10px 14px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {[
              { tier: 'Tier 1', slope: '3-degree slope', putts: '20' },
              { tier: 'Tier 2', slope: '2-degree slope', putts: '20' },
              { tier: 'Tier 3', slope: '1-degree slope', putts: '20' },
            ].map((row, i, arr) => (
              <div key={row.tier} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ padding: '13px 14px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 14, color: '#f4ee19' }}>{row.tier}</div>
                <div style={{ padding: '13px 14px', fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{row.slope}</div>
                <div style={{ padding: '13px 14px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 14, color: '#00af51' }}>{row.putts}</div>
              </div>
            ))}
          </div>

          <SectionLabel>Session Targets by Handicap (60 putts)</SectionLabel>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Level</div>
              <div style={{ padding: '10px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Target Score</div>
            </div>
            {sessionTargets.map((row, i, arr) => (
              <div key={row.level} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ padding: '12px 16px', fontFamily: 'var(--font-work-sans)', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{row.level}</div>
                <div style={{ padding: '12px 16px', fontFamily: 'var(--font-raleway)', fontWeight: 800, fontSize: 16, color: row.target.startsWith('−') ? '#00af51' : row.target === '0' ? '#f4ee19' : '#f97316' }}>{row.target}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Challenge and Progression */}
        <Card style={{ background: 'rgba(0,175,81,0.05)', borderColor: 'rgba(0,175,81,0.2)' }}>
          <SectionLabel>Challenge Version and Level Progression</SectionLabel>
          <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: '0 0 20px' }}>
            Play until <span style={{ color: '#00af51', fontWeight: 700 }}>−5 (win)</span> or <span style={{ color: '#ef4444', fontWeight: 700 }}>+5 (lose)</span>. Single slope section. Distances expand by level.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { rule: 'Win 2 or 3 of 3 sessions', outcome: 'Advance to next level', color: '#00af51' },
              { rule: 'Win 1 of 3 sessions', outcome: 'Stay at current level', color: '#f4ee19' },
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
          <Link href="/forge/chipping" style={{ color: '#00af51', textDecoration: 'none', fontFamily: 'var(--font-work-sans)', fontSize: 14, fontWeight: 600 }}>
            ← Chipping Index
          </Link>
          <Link href="/forge/carry" style={{ color: '#00af51', textDecoration: 'none', fontFamily: 'var(--font-work-sans)', fontSize: 14, fontWeight: 600 }}>
            Carry Index →
          </Link>
        </div>

      </div>
    </div>
  );
}
