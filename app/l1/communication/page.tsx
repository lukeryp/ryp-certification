'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const sections = [
  {
    id: 'working-with-juniors',
    label: '01',
    title: 'Working with Junior Golfers',
    callout: 'Never raise your voice except for safety calls.',
    items: [
      'Get down to their eye level when speaking to young kids (under 10)',
      'Use simple, positive language: "Try it this way" not "Don\'t do that"',
      'One instruction at a time — kids can\'t process multiple cues',
      'Celebrate effort, not just results: "Great swing! You really committed to that"',
      'Learn their names by end of session 1',
    ],
  },
  {
    id: 'age-appropriate',
    label: '02',
    title: 'Age-Appropriate Communication',
    callout: null,
    ageRows: [
      { age: 'Ages 4–6', style: 'Short sentences, physical demonstrations, lots of "copy me"' },
      { age: 'Ages 7–10', style: 'Simple explanations + show + do together' },
      { age: 'Ages 11–14', style: 'Can handle more verbal explanation, respond to challenge' },
      { age: 'Ages 15+', style: 'Treat like young adults, explain the why' },
    ],
    items: null,
  },
  {
    id: 'head-coach',
    label: '03',
    title: 'Working with the Head Coach',
    callout: 'Never contradict the coach in front of students.',
    items: [
      'Check in at the start of each session: "What\'s the plan today?"',
      'If a student is struggling, quietly let the coach know',
      'Follow the session plan — suggest changes after, not during',
      'End-of-session debrief: share one observation',
    ],
  },
  {
    id: 'parents',
    label: '04',
    title: 'Parent Communication',
    callout: 'Never discuss other students with parents.',
    items: [
      'Keep conversations brief and positive at pickup',
      'Don\'t give technical instruction to parents — that\'s the coach\'s role',
      'If a parent has a concern: "That\'s a great question — let me connect you with [Coach Name]"',
      'Smile, use their child\'s name: "Emma had a great session today"',
    ],
  },
  {
    id: 'conflict',
    label: '05',
    title: 'Conflict & Behavior',
    callout: 'Never isolate a student alone. Keep group visible at all times.',
    items: [
      'For minor behavior: quiet redirect ("Hey, let\'s try focusing here")',
      'For persistent issues: involve the head coach immediately',
      'Document serious behavior issues with the head coach',
    ],
  },
];

export default function CommunicationPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,175,81,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.025) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Module 02</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Communication{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Basics</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Working with kids and staff — the language, approach, and habits that make sessions run smoothly.
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

                {/* Age rows */}
                {'ageRows' in section && section.ageRows && (
                  <div className="space-y-2">
                    {section.ageRows.map((row) => (
                      <div key={row.age} className="flex items-start gap-4 rounded-xl px-4 py-3"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}>
                        <span className="text-[13px] font-bold text-[#00af51] flex-shrink-0 pt-px w-20"
                          style={{ fontFamily: 'var(--font-work-sans)' }}>
                          {row.age}
                        </span>
                        <span className="text-[14px] text-[#d1d5db] leading-relaxed"
                          style={{ fontFamily: 'var(--font-work-sans)' }}>
                          {row.style}
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
          <Link href="/l1/safety" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Safety First
          </Link>
          <Link href="/l1/setup" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            Setup & Teardown
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
