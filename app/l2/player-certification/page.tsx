'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const prereqs = [
  'Minimum 8 hours of supervised instruction',
  'Demonstrated grip, setup, and basic swing fundamentals',
  'Rules test: 20 questions, 80% pass standard',
  'Must complete with a certified ICC instructor as observer',
];

const onCourse = [
  '9 holes, junior tees, from Interlachen CC',
  'Scorer: certified ICC instructor or certified Academy student',
  'Max score per hole: 8 (pickup rule applies)',
  'Time limit: 2 hours for 9 holes',
  'Proper dress code required',
];

const scoring = [
  { score: '55 or better', outcome: 'Certified', color: 'rgba(0,175,81,0.08)', border: 'rgba(0,175,81,0.25)', textColor: '#4ade80', badge: '#00af51' },
  { score: '56–60', outcome: 'Re-attempt after 2 additional supervised sessions', color: 'rgba(244,238,25,0.05)', border: 'rgba(244,238,25,0.2)', textColor: '#fef08a', badge: '#f4ee19' },
  { score: '61+', outcome: '4 additional supervised sessions before re-attempt', color: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.18)', textColor: '#fca5a5', badge: '#ef4444' },
];

const postCert = [
  'Certificate signed by Director of Instruction',
  'Promoted to Academy track',
  'FORGE baseline established at first Academy session',
  'Handicap index tracking begins',
];

const instructorRole = [
  { can: false, action: 'Offer swing advice or club selection guidance' },
  { can: false, action: 'Coach during the round' },
  { can: true, action: 'Observer — record score and note pace issues' },
  { can: true, action: 'Answer rules questions' },
];

export default function PlayerCertificationPage() {
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">ICC Standard</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Player{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Certification</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            The Nick Dittrick Standard — junior players must prove their game on the course, not just on the range.
          <a href="/athletic_development_plan.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#00af51] hover:underline mt-3">
              📄 ICC Athletic Development Plan (PDF)
            </a>
          </p>
        </div>

        {/* The Standard */}
        <div className="rounded-2xl p-6 mb-8 text-center"
          style={{ background: 'rgba(0,175,81,0.07)', border: '1px solid rgba(0,175,81,0.25)' }}>
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#6b7280] mb-2" style={{ fontFamily: 'var(--font-work-sans)' }}>The Standard</p>
          <p className="text-3xl font-black text-white mb-2"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            55 or Better on 9 Holes
          </p>
          <p className="text-[#9ca3af] text-[14px]" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Interlachen CC · Junior Tees
          </p>
          <div className="mt-4 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              'Course management',
              'Rule awareness',
              'Pace of play',
              'Composure under pressure',
            ].map((item) => (
              <div key={item} className="rounded-lg px-2 py-2"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="text-[12px] text-[#d1d5db] text-center" style={{ fontFamily: 'var(--font-work-sans)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Pre-Requisites
          </h2>
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {prereqs.map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(0,175,81,0.15)', border: '1px solid rgba(0,175,81,0.3)' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#00af51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <p className="text-[14px] text-[#d1d5db] leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* On-course requirements */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            On-Course Requirements
          </h2>
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {onCourse.map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(0,175,81,0.15)', border: '1px solid rgba(0,175,81,0.3)' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#00af51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <p className="text-[14px] text-[#d1d5db] leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scoring */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Scoring Outcomes
          </h2>
          <div className="space-y-3">
            {scoring.map((item) => (
              <div key={item.score} className="flex items-center gap-4 rounded-xl px-5 py-4"
                style={{ background: item.color, border: `1px solid ${item.border}` }}>
                <div className="flex-shrink-0 px-3 py-1 rounded-full text-center"
                  style={{ background: `${item.badge}20`, border: `1px solid ${item.badge}40` }}>
                  <span className="text-sm font-black" style={{ color: item.badge, fontFamily: 'var(--font-raleway)' }}>{item.score}</span>
                </div>
                <p className="text-[14px] font-semibold" style={{ color: item.textColor, fontFamily: 'var(--font-work-sans)' }}>
                  {item.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Post-Certification */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Post-Certification
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {postCert.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl px-4 py-3.5"
                style={{ background: 'rgba(0,175,81,0.07)', border: '1px solid rgba(0,175,81,0.18)' }}>
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(0,175,81,0.2)', border: '1px solid rgba(0,175,81,0.4)' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#00af51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <p className="text-[13px] text-[#d1d5db]" style={{ fontFamily: 'var(--font-work-sans)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Instructor Role */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-raleway)', paddingLeft: 12, borderLeft: '3px solid #00af51' }}>
            Instructor Role During Certification
          </h2>
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {instructorRole.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                  <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center`}
                    style={{
                      background: item.can ? 'rgba(0,175,81,0.15)' : 'rgba(239,68,68,0.1)',
                      border: item.can ? '1px solid rgba(0,175,81,0.3)' : '1px solid rgba(239,68,68,0.25)',
                    }}>
                    {item.can ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#00af51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M3 3l4 4M7 3l-4 4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </span>
                  <p className="text-[14px]"
                    style={{ color: item.can ? '#d1d5db' : '#9ca3af', fontFamily: 'var(--font-work-sans)' }}>
                    {item.can ? '' : <span className="line-through text-[#6b7280]">{item.action}</span>}
                    {item.can && item.action}
                  </p>
                </div>
              ))}
            </div>
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
          <Link href="/l2/international" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            International Best Practices
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
