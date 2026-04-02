'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const appearanceStandards = [
  'ICC polo or approved RYP/ICC branded shirt — clean and pressed',
  'Khaki, navy, or dark shorts/pants — no athletic shorts or sweats',
  'Golf shoes or clean court shoes — no flip flops',
  'Hat or visor when outdoors — ICC branded preferred',
  'Name tag or lanyard for clinics and events',
];

const preSessionSteps = [
  { step: '1', action: 'Arrive 15 minutes before session start' },
  { step: '2', action: 'Check and confirm roster with front desk' },
  { step: '3', action: 'Set up stations before students arrive' },
  { step: '4', action: 'Review session plan — know your objectives' },
  { step: '5', action: 'Greet every student by name at arrival' },
];

const duringSession = [
  'Phone on silent, face down. Not in your hand.',
  'No personal conversations with other staff during instruction.',
  'Announce the plan at session start: "Today we\'re working on..."',
  'Debrief mid-session: "Here\'s what I\'m seeing..."',
  'End on time. Always.',
];

const parentComms = [
  {
    label: 'End-of-Session Report',
    value: 'One specific, positive observation per student.',
    example: '"Emma really focused on her tempo today and it\'s clicking."',
  },
  {
    label: 'Escalation Rule',
    value: 'Concerns go through head coach, not directly to parents.',
    example: null,
  },
  {
    label: 'Confidentiality',
    value: 'Never discuss other students with a parent.',
    example: null,
  },
  {
    label: 'Expectations',
    value: 'No promises about tournament readiness or competitive expectations.',
    example: null,
  },
];

const incidents = [
  { trigger: 'Any Injury', action: 'Immediate documentation, notify head coach, complete incident form' },
  { trigger: 'Behavior Incident', action: 'Document and notify head coach same day' },
  { trigger: 'Equipment Damage', action: 'Report to pro shop before end of day' },
  { trigger: 'Parent Complaint', action: 'Listen, thank them, escalate to head coach' },
];

const profDev = [
  'Attend monthly staff meeting (mandatory)',
  'Log session notes in the team app',
  'Complete annual re-certification by September 1',
  'Observe at least one other instructor\'s session per month',
];

export default function StaffProtocolPage() {
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Module 13</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Staff{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Protocol</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Standards for the ICC Instruction Team — appearance, communication, incidents, and professional development.
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-4 px-6 py-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-2xl font-black"
                style={{
                  fontFamily: 'var(--font-raleway)',
                  background: 'linear-gradient(135deg, #00af51, #00d466)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>01</span>
              <div className="w-px h-6" style={{ background: 'rgba(0,175,81,0.3)' }} />
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                Appearance Standards
              </h2>
            </div>
            <div className="px-6 py-5">
              <ul className="space-y-2.5">
                {appearanceStandards.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00af51] mt-2" />
                    <span className="text-[15px] text-[#d1d5db] leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pre-Session */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-4 px-6 py-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-2xl font-black"
                style={{
                  fontFamily: 'var(--font-raleway)',
                  background: 'linear-gradient(135deg, #00af51, #00d466)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>02</span>
              <div className="w-px h-6" style={{ background: 'rgba(0,175,81,0.3)' }} />
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                Pre-Session Protocol
              </h2>
            </div>
            <div className="px-6 py-5 space-y-2">
              {preSessionSteps.map((item) => (
                <div key={item.step} className="flex items-center gap-4 rounded-xl px-4 py-3"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="text-lg font-black flex-shrink-0 w-6 text-center"
                    style={{
                      fontFamily: 'var(--font-raleway)',
                      background: 'linear-gradient(135deg, #00af51, #00d466)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                    {item.step}
                  </span>
                  <span className="text-[14px] text-[#d1d5db]" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {item.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* During Session */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-4 px-6 py-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-2xl font-black"
                style={{
                  fontFamily: 'var(--font-raleway)',
                  background: 'linear-gradient(135deg, #00af51, #00d466)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>03</span>
              <div className="w-px h-6" style={{ background: 'rgba(0,175,81,0.3)' }} />
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                During Session Protocol
              </h2>
            </div>
            <div className="px-6 py-5">
              <ul className="space-y-2.5">
                {duringSession.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00af51] mt-2" />
                    <span className="text-[15px] text-[#d1d5db] leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Parent Communication */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-4 px-6 py-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-2xl font-black"
                style={{
                  fontFamily: 'var(--font-raleway)',
                  background: 'linear-gradient(135deg, #00af51, #00d466)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>04</span>
              <div className="w-px h-6" style={{ background: 'rgba(0,175,81,0.3)' }} />
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                Parent Communication Standards
              </h2>
            </div>
            <div className="px-6 py-5 space-y-3">
              {parentComms.map((item) => (
                <div key={item.label} className="rounded-xl px-4 py-3"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#6b7280]">{item.label}</span>
                  <p className="text-[14px] text-[#d1d5db] mt-0.5 leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {item.value}
                  </p>
                  {item.example && (
                    <p className="text-[13px] text-[#4ade80] mt-1.5 italic" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      Example: {item.example}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Incident Protocol */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-4 px-6 py-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-2xl font-black"
                style={{
                  fontFamily: 'var(--font-raleway)',
                  background: 'linear-gradient(135deg, #00af51, #00d466)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>05</span>
              <div className="w-px h-6" style={{ background: 'rgba(0,175,81,0.3)' }} />
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                Incident Protocol
              </h2>
            </div>
            <div className="px-6 py-5 space-y-2">
              {incidents.map((item) => (
                <div key={item.trigger} className="flex gap-4 items-start rounded-xl px-4 py-3"
                  style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)' }}>
                  <span className="text-[12px] font-bold text-[#ef4444] flex-shrink-0 w-28 pt-0.5"
                    style={{ fontFamily: 'var(--font-raleway)' }}>
                    {item.trigger}
                  </span>
                  <span className="text-[13px] text-[#d1d5db] leading-snug" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {item.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Development */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(244,238,25,0.03)', border: '1px solid rgba(244,238,25,0.15)' }}>
            <div className="flex items-center gap-4 px-6 py-4"
              style={{ borderBottom: '1px solid rgba(244,238,25,0.12)' }}>
              <span className="text-2xl font-black"
                style={{
                  fontFamily: 'var(--font-raleway)',
                  background: 'linear-gradient(135deg, #f4ee19, #ffe500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>06</span>
              <div className="w-px h-6" style={{ background: 'rgba(244,238,25,0.3)' }} />
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
                Professional Development
              </h2>
            </div>
            <div className="px-6 py-5">
              <ul className="space-y-2.5">
                {profDev.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#f4ee19] mt-2" />
                    <span className="text-[15px] text-[#d1d5db] leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/l2/motivation" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Motivation Framework
          </Link>
          <Link href="/l2" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            All L2 Modules
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
