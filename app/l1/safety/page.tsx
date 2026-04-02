'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const sections = [
  {
    id: 'golden-rule',
    label: '01',
    title: 'The Golden Rule',
    callout: 'Never swing a club when someone is within range. Always check 360° before swinging.',
    items: null,
  },
  {
    id: 'equipment',
    label: '02',
    title: 'Equipment Safety',
    callout: null,
    items: [
      'Clubs stay in bags until on the tee or designated practice area',
      'Never carry a club over your shoulder in a crowd',
      'Always hold clubs by the grip, not the head',
      'Foam balls for indoor sessions — range balls only at the range',
      'Report damaged equipment immediately',
    ],
  },
  {
    id: 'range',
    label: '03',
    title: 'Range Safety',
    callout: null,
    items: [
      'Wait for "all clear" from the coach before retrieving balls',
      'Students hit in the same direction only',
      'Nobody walks in front of hitting stations',
      'Orange cones = boundary markers. Don\'t cross them.',
      'If a ball goes out of bounds, leave it — don\'t chase it',
    ],
  },
  {
    id: 'supervision',
    label: '04',
    title: 'Student Supervision',
    callout: 'The coach\'s whistle = stop everything, look at coach.',
    items: [
      'Count your students at the start of every drill',
      'Keep the group together during transitions',
      'One-in, one-out for bathroom breaks (buddy system for younger kids)',
      'Know the emergency contact list and first aid kit location',
    ],
  },
  {
    id: 'weather',
    label: '05',
    title: 'Weather Protocol',
    callout: 'At first sound of thunder: move inside immediately. No exceptions.',
    items: [
      'Lightning = 30 minute indoor hold',
      'Heat protocol: water break every 20 minutes in summer',
      'Sunscreen reminder for outdoor sessions over 30 min',
    ],
  },
  {
    id: 'firstaid',
    label: '06',
    title: 'First Aid Basics',
    callout: 'For any injury: tell the head coach immediately.',
    items: [
      'Location of first aid kit: check with head coach',
      'Do not move an injured player unless there is immediate danger',
      'Document any incident on the incident form (in the office)',
    ],
  },
];

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,175,81,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.025) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,175,81,0.06) 0%, transparent 70%)' }} />

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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Module 01</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Safety{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>First</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Golf safety rules, equipment handling, and student supervision protocols every helper must know.
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
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                  {section.title}
                </h2>
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
          <Link href="/l1" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Modules
          </Link>
          <Link href="/l1/communication" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            Communication Basics
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
