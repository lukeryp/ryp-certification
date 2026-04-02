'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,175,81,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,175,81,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244,238,25,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(0,175,81,0.1)', border: '1px solid rgba(0,175,81,0.25)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00af51]" style={{ animation: 'pulse 2s infinite' }} />
            <span className="text-[#00af51] text-xs font-medium tracking-widest uppercase">Junior Golf · Staff Certification Platform</span>
          </div>

          {/* ICC Diamond Monogram */}
          <div className="flex justify-center mb-6">
            <svg width="72" height="80" viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="36,2 70,36 36,70 2,36" fill="none" stroke="#00af51" strokeWidth="2" opacity="0.4"/>
              <text x="36" y="46" textAnchor="middle" fontSize="28" fontWeight="900" fill="#00af51" fontFamily="Georgia, serif" opacity="0.9">ICC</text>
              <text x="36" y="76" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280" fontFamily="Georgia, serif" letterSpacing="3">1909</text>
            </svg>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black mb-3 tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Interlachen</span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-light text-[#9ca3af] tracking-wide"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Junior Golf Staff Certification
          </h2>
        </div>

        {/* Level cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">

          {/* L1 */}
          <Link href="/l1">
            <div className="h-full rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-widest text-[#6b7280] uppercase">Level 1</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(0,175,81,0.1)', color: '#00af51', border: '1px solid rgba(0,175,81,0.2)' }}>
                  Open
                </span>
              </div>
              <div className="text-4xl font-black mb-2" style={{
                fontFamily: 'var(--font-raleway)',
                background: 'linear-gradient(135deg, #00af51, #00d466)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                JGH
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-raleway)' }}>
                Junior Golf Helper
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
                For Meadowbrook Tuesday helpers and volunteers. Safety, communication, setup, and game facilitation.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Safety', 'Communication', 'Setup', 'Games'].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full text-[#9ca3af]"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {/* L2 */}
          <Link href="/l2">
            <div className="h-full rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(0,175,81,0.04)',
                border: '1px solid rgba(0,175,81,0.2)',
              }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-widest text-[#6b7280] uppercase">Level 2</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: 'rgba(0,175,81,0.15)', color: '#00af51', border: '1px solid rgba(0,175,81,0.35)' }}>
                  Featured
                </span>
              </div>
              <div className="text-4xl font-black mb-2" style={{
                fontFamily: 'var(--font-raleway)',
                background: 'linear-gradient(135deg, #00af51, #00d466)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                ICC
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-raleway)' }}>
                Instructor Certification
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
                Complete junior golf instruction methodology for Interlachen instructors. 13+ modules including FORGE drills and games library.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Methodology', 'Age Dev', 'FORGE', 'Games', 'Staff Protocol'].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,175,81,0.08)', border: '1px solid rgba(0,175,81,0.2)', color: '#4ade80' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {/* L3 */}
          <Link href="/l3">
            <div className="h-full rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(244,238,25,0.03)',
                border: '1px solid rgba(244,238,25,0.15)',
              }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-widest text-[#6b7280] uppercase">Level 3</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: 'rgba(244,238,25,0.1)', color: '#f4ee19', border: '1px solid rgba(244,238,25,0.25)' }}>
                  Beta
                </span>
              </div>
              <div className="text-4xl font-black mb-2" style={{
                fontFamily: 'var(--font-raleway)',
                background: 'linear-gradient(135deg, #f4ee19, #ffe066)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                TGT
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-raleway)' }}>
                Textbook Certification
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
                17-chapter Golf Textbook quiz engine. 90% pass standard per chapter. For career teachers and PGA professionals.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['17 Chapters', '90% Pass', 'PGA Pros', 'Cohort'].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(244,238,25,0.06)', border: '1px solid rgba(244,238,25,0.2)', color: '#f4ee19' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </div>

        {/* FORGE banner */}
        <Link href="/forge">
          <div className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:scale-[1.01]"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold tracking-widest text-[#6b7280] uppercase">Cross-Level Module</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,175,81,0.1)', color: '#00af51', border: '1px solid rgba(0,175,81,0.2)' }}>
                    L2 + L3
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'var(--font-raleway)' }}>
                  FORGE Drill System
                </h3>
                <p className="text-sm text-[#6b7280]">
                  Fidelity · Overload · Randomization · Graded · Exit criteria — All 4 drills with full scoring tables and RYP Performance Index
                </p>
              </div>
              <div className="flex gap-6 sm:gap-8 flex-shrink-0">
                {['Driving', 'Approach', 'Chipping', 'Putting'].map((d, i) => (
                  <div key={d} className="text-center">
                    <div className="text-2xl font-black" style={{
                      fontFamily: 'var(--font-raleway)',
                      background: 'linear-gradient(135deg, #00af51, #00d466)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>{i + 1}</div>
                    <div className="text-[10px] text-[#6b7280]">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>

        {/* Footer */}
        <div className="text-center mt-16 text-[#4b5563] text-xs">
          <p>Interlachen Country Club · Est. 1909</p>
          <p className="mt-1">Dr. Luke Benoit, PhD, PGA · Director of Instruction</p>
          <p className="mt-0.5">cert.rypgolf.com</p>
        </div>
      </div>
    </div>
  );
}
