'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const countries = [
  {
    country: 'CANADA',
    program: "Golf Canada's \"Golf in Schools\" Model",
    insight: 'Golf as physical literacy, not golf as golf. Canada successfully integrated golf into school PE programs by removing the "golf as sport" framing and replacing it with "golf as movement skill."',
    takeaways: [
      'Physical literacy first — balance, coordination, and spatial awareness before swing mechanics',
      'The foam ball protocol: indoor skill development creates a parallel pathway that doesn\'t require a course',
      'Formalized helper/volunteer system — structured training for non-professional helpers',
      'Stage-gate progression: formal checkpoints before advancing to next level (our certification mirrors this)',
    ],
    flag: '🇨🇦',
    accent: '#ff0000',
    accentBg: 'rgba(255,0,0,0.06)',
    accentBorder: 'rgba(255,0,0,0.2)',
  },
  {
    country: 'AUSTRALIA',
    program: 'Golf Australia\'s "MyGolf" Program',
    insight: 'Remove every barrier to the first experience. MyGolf created a simplified entry point with modified equipment, non-grass environments, and team-based formats. Participation grew 340% in its first 5 years.',
    takeaways: [
      'Team formats before individual play — reduces anxiety, increases engagement',
      'Modified rules for beginners: fewer rules, more playing, better experience',
      'Non-traditional venues: gyms, parking lots, school fields — golf happens anywhere',
      'The "no wrong answer" swing philosophy for under-10s: don\'t correct, just play',
    ],
    flag: '🇦🇺',
    accent: '#00843D',
    accentBg: 'rgba(0,132,61,0.06)',
    accentBorder: 'rgba(0,132,61,0.2)',
    stat: '340% participation growth in first 5 years',
  },
  {
    country: 'ENGLAND',
    program: 'England Golf\'s "GolfSixes" and Coaching Framework',
    insight: 'Fun and competition are not opposites. England Golf developed the GolfSixes format (6-hole, team event) which has driven massive participation growth in young golfers and brought the game to urban audiences.',
    takeaways: [
      'Shorter formats first: 3-hole, 6-hole, and 9-hole formats before 18. Attention span reality.',
      'Mixed-ability teams: pairing beginners with advanced players creates natural mentorship',
      'Explicit fun design: sessions rated on enjoyment, not just performance',
      'Instructor certification rigor: England Golf requires 40+ hours before independent instruction — we aspire to this',
    ],
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    accent: '#012169',
    accentBg: 'rgba(1,33,105,0.08)',
    accentBorder: 'rgba(1,33,105,0.25)',
  },
];

const stageTransitions = [
  {
    from: 'Future Stars',
    to: 'Junior League',
    age: 'Age 7–8',
    checks: [
      'Can grip the club without help',
      'Can set up to a ball independently',
      'Understands the concept of a target',
      'Can complete 9 holes with parent/helper (pickup rule)',
      'Knows basic rules: out of bounds, picking up, scoring',
    ],
  },
  {
    from: 'Junior League',
    to: 'Academy',
    age: 'Age 12–13',
    checks: [
      'Nick Dittrick Standard: 55 or better on 9 holes',
      'Can identify and play 3 different shot shapes (low, medium, high)',
      'USGA handicap index established',
      'Basic club selection: knows which club for which distance/situation',
      'Rules: 25 question test, 80% pass',
    ],
  },
  {
    from: 'Academy',
    to: 'Certified Academy',
    age: 'Age 14+',
    checks: [
      'FORGE baseline established across all 4 drills',
      'Handicap at or below 18',
      'Can conduct own warm-up independently',
      'Caddied or marked a card for another player in competition',
      'Demonstrated ability to self-diagnose using Impact Opposites',
    ],
  },
];

export default function InternationalPage() {
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Global Best Practices</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            International{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Best Practices</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Three countries lead the world in junior golf development. Here&apos;s what we take from each.
          <a href="/athletic_development_plan.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#00af51] hover:underline mt-3">
              📄 ICC Athletic Development Plan (PDF)
            </a>
          </p>
        </div>

        {/* Country Cards */}
        <div className="space-y-6 mb-10">
          {countries.map((c) => (
            <div key={c.country} className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Country header */}
              <div className="px-6 py-5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: c.accentBg }}>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{c.flag}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: c.accent === '#012169' ? '#6b9fff' : c.accent, fontFamily: 'var(--font-work-sans)' }}>
                      {c.country}
                    </p>
                    <h3 className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>{c.program}</h3>
                  </div>
                </div>
                {c.stat && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(0,175,81,0.12)', border: '1px solid rgba(0,175,81,0.3)' }}>
                    <span className="text-[#00af51] text-xs font-bold">{c.stat}</span>
                  </div>
                )}
              </div>

              {/* Insight */}
              <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[13px] text-[#9ca3af] italic leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  &quot;{c.insight}&quot;
                </p>
              </div>

              {/* Takeaways */}
              <div className="px-6 py-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#00af51] mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  What We Take From {c.country === 'ENGLAND' ? 'England' : c.country === 'AUSTRALIA' ? 'Australia' : 'Canada'}
                </p>
                <div className="space-y-2">
                  {c.takeaways.map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 text-[#00af51] text-sm font-bold w-4 mt-0.5">{i + 1}.</span>
                      <p className="text-[13px] text-[#d1d5db] leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stage Transition Checklists */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Stage Transition Checklists
          </h2>
          <div className="space-y-4">
            {stageTransitions.map((stage) => (
              <div key={stage.from} className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="px-5 py-3.5 flex items-center gap-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,175,81,0.04)' }}>
                  <span className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>{stage.from}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="#00af51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-bold text-[#00af51]" style={{ fontFamily: 'var(--font-raleway)' }}>{stage.to}</span>
                  <span className="ml-auto text-[12px] text-[#6b7280]" style={{ fontFamily: 'var(--font-work-sans)' }}>{stage.age}</span>
                </div>
                <div className="px-5 py-4 space-y-2.5">
                  {stage.checks.map((check, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center mt-0.5"
                        style={{ borderColor: 'rgba(0,175,81,0.4)', background: 'rgba(0,175,81,0.06)' }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(0,175,81,0.5)' }} />
                      </div>
                      <p className="text-[13px] text-[#d1d5db]" style={{ fontFamily: 'var(--font-work-sans)' }}>{check}</p>
                    </div>
                  ))}
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
          <Link href="/l2/safety-etiquette" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            Safety & Etiquette
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
