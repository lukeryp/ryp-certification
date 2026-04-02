'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const sections = [
  {
    id: 'pre-session',
    label: '01',
    title: 'Pre-Session Setup',
    subtitle: 'Arrive 15 minutes early',
    callout: null,
    items: [
      'Check equipment list: clubs, balls, cones, targets, teaching aids',
      'Count clubs and match to student roster',
      'Set up hitting stations 8–10 feet apart minimum',
      'Place cones/targets per coach\'s instruction',
      'Test any technology (launch monitor, video system)',
      'Set out water cooler and cups',
    ],
  },
  {
    id: 'station-standards',
    label: '02',
    title: 'Station Setup Standards',
    subtitle: null,
    callout: null,
    items: [
      'Hitting stations: aligned to target, 8ft minimum spacing',
      'Chipping/putting area: clear of obstructions, targets set',
      'Equipment carts: placed safely behind hitting line',
      'Ball baskets: one per station or shared per coach preference',
      'Chairs/seating: arranged for group instruction area',
    ],
  },
  {
    id: 'club-fitting',
    label: '03',
    title: 'Club Fitting Basics',
    subtitle: null,
    callout: 'When in doubt, go shorter — easier to fix.',
    fitRows: [
      { label: 'Height guide', note: 'Club should reach golfer\'s wrist when standing upright' },
      { label: 'Too long', note: 'Causes inconsistent contact and is a safety risk' },
      { label: 'Beginners', note: '5–7 clubs for beginners under 15' },
      { label: 'Ages 15+', note: 'Full set appropriate' },
    ],
    items: null,
  },
  {
    id: 'during',
    label: '04',
    title: 'During Session',
    subtitle: null,
    callout: null,
    items: [
      'Keep non-use equipment organized and out of swing paths',
      'Refill ball baskets between drills',
      'Move targets when instructed',
      'Keep the session area clean and safe',
    ],
  },
  {
    id: 'teardown',
    label: '05',
    title: 'Post-Session Teardown',
    subtitle: 'Leave 15 minutes for this',
    callout: 'Leave the area cleaner than you found it.',
    items: [
      'Count all clubs back into bags/rack',
      'Collect all range balls (count approximate)',
      'Break down targets and cones',
      'Stack chairs if applicable',
      'Wipe down any shared equipment',
      'Report any equipment damage to coach',
    ],
  },
];

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,175,81,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.025) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-[-100px] left-[30%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,175,81,0.05) 0%, transparent 70%)' }} />

      <Nav level="l1" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10 sm:py-14">
        {/* Back link */}
        <Link href="/l1" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#00af51] transition-colors mb-8">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to L1 Overview
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(0,175,81,0.1)', border: '1px solid rgba(0,175,81,0.25)' }}>
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Module 03</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Setup &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Teardown</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Professional session setup, equipment care, station standards, and leaving it right.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id}
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
              {/* Section header */}
              <div className="flex items-center gap-4 px-6 py-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-2xl font-black leading-none flex-shrink-0"
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    background: 'linear-gradient(135deg, #00af51, #00d466)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                  {section.label}
                </span>
                <div className="w-px h-6 flex-shrink-0" style={{ background: 'rgba(0,175,81,0.3)' }} />
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-raleway)' }}>
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-xs text-[#00af51] mt-0.5 font-medium" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      {section.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-6 py-5 space-y-3">
                {/* Callout */}
                {section.callout && (
                  <div className="flex items-start gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: 'rgba(0,175,81,0.08)',
                      border: '1px solid rgba(0,175,81,0.2)',
                    }}>
                    <span className="text-[#00af51] flex-shrink-0 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.75 10.5h-1.5v-5h1.5v5zm0-6.5h-1.5V3.5h1.5V5z"/>
                      </svg>
                    </span>
                    <p className="text-[#4ade80] text-[14px] font-semibold leading-relaxed"
                      style={{ fontFamily: 'var(--font-work-sans)' }}>
                      {section.callout}
                    </p>
                  </div>
                )}

                {/* Fit rows */}
                {'fitRows' in section && section.fitRows && (
                  <div className="space-y-2">
                    {section.fitRows.map((row) => (
                      <div key={row.label} className="flex items-start gap-4 rounded-xl px-4 py-3"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}>
                        <span className="text-[13px] font-bold text-[#00af51] flex-shrink-0 w-24 pt-px"
                          style={{ fontFamily: 'var(--font-work-sans)' }}>
                          {row.label}
                        </span>
                        <span className="text-[14px] text-[#d1d5db] leading-relaxed"
                          style={{ fontFamily: 'var(--font-work-sans)' }}>
                          {row.note}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Items */}
                {section.items && (
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00af51] mt-2" />
                        <span className="text-[15px] text-[#d1d5db] leading-relaxed"
                          style={{ fontFamily: 'var(--font-work-sans)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/l1/communication" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Communication
          </Link>
          <Link href="/l1/games" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            Game Facilitation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
