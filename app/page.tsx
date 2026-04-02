'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 py-14 sm:py-20">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="text-center mb-14">

          {/* ICC Logo */}
          <div className="flex justify-center mb-7">
            <div className="relative">
              <Image
                src="/icc-logo.png"
                alt="Interlachen Country Club"
                width={88}
                height={88}
                priority
                className="opacity-90"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Rule */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[rgba(255,255,255,0.15)]" />
            <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-[#666]">Est. 1909</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[rgba(255,255,255,0.15)]" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-[#f0ede8] mb-2 tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Interlachen
          </h1>
          <p className="text-base sm:text-lg font-light tracking-widest text-[#666] uppercase mb-1"
            style={{ fontFamily: 'var(--font-raleway)', letterSpacing: '0.25em' }}>
            Country Club
          </p>
          <p className="text-sm text-[#555] mt-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Junior Golf Staff Certification
          </p>
        </div>

        {/* ── LEVEL CARDS ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">

          {/* L1 */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#555]">Level 1</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#777', border: '1px solid rgba(255,255,255,0.1)' }}>
                  Open
                </span>
              </div>

              <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'var(--font-raleway)', letterSpacing: '-0.02em' }}>
                JGH
              </div>
              <h3 className="text-base font-bold text-[#e8e5e0] mb-2" style={{ fontFamily: 'var(--font-raleway)' }}>
                Junior Golf Helper
              </h3>
              <p className="text-[13px] text-[#555] leading-relaxed mb-5" style={{ fontFamily: 'var(--font-work-sans)' }}>
                For Meadowbrook Tuesday helpers and volunteers. Safety, communication, setup, and game facilitation.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {['Safety', 'Communication', 'Setup', 'Games'].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full text-[#555]"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 pb-5 flex flex-col gap-2">
              <Link href="/l1/exam">
                <button className="w-full py-2.5 rounded-xl text-sm font-bold bg-white text-[#0a0a0a] hover:bg-[#f0ede8] transition-colors">
                  Take Exam →
                </button>
              </Link>
              <Link href="/l1" className="text-center text-xs text-[#444] hover:text-[#888] transition-colors py-1">
                Study materials
              </Link>
            </div>
          </div>

          {/* L2 — Featured */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-[rgba(255,255,255,0.12)]"
            style={{ background: '#141414' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#555]">Level 2</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: 'rgba(0,175,81,0.12)', color: '#00af51', border: '1px solid rgba(0,175,81,0.25)' }}>
                  Featured
                </span>
              </div>

              <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'var(--font-raleway)', letterSpacing: '-0.02em' }}>
                ICC
              </div>
              <h3 className="text-base font-bold text-[#e8e5e0] mb-2" style={{ fontFamily: 'var(--font-raleway)' }}>
                Instructor Certification
              </h3>
              <p className="text-[13px] text-[#555] leading-relaxed mb-5" style={{ fontFamily: 'var(--font-work-sans)' }}>
                Complete junior instruction methodology for Interlachen instructors. 14 modules including FORGE drills and games library.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {['Methodology', 'Age Dev', 'FORGE', 'Games', 'Staff Protocol'].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,175,81,0.06)', border: '1px solid rgba(0,175,81,0.15)', color: '#4ade80' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 pb-5 flex flex-col gap-2">
              <Link href="/l2/exam">
                <button className="w-full py-2.5 rounded-xl text-sm font-bold bg-white text-[#0a0a0a] hover:bg-[#f0ede8] transition-colors">
                  Take Exam →
                </button>
              </Link>
              <Link href="/l2" className="text-center text-xs text-[#444] hover:text-[#888] transition-colors py-1">
                Study materials
              </Link>
            </div>
          </div>

          {/* L3 */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#555]">Level 3</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: 'rgba(244,238,25,0.08)', color: '#bfb830', border: '1px solid rgba(244,238,25,0.2)' }}>
                  Beta
                </span>
              </div>

              <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'var(--font-raleway)', letterSpacing: '-0.02em' }}>
                TGT
              </div>
              <h3 className="text-base font-bold text-[#e8e5e0] mb-2" style={{ fontFamily: 'var(--font-raleway)' }}>
                Textbook Certification
              </h3>
              <p className="text-[13px] text-[#555] leading-relaxed mb-5" style={{ fontFamily: 'var(--font-work-sans)' }}>
                17-chapter Golf Textbook quiz engine. 90% pass standard per chapter. For career teachers and PGA professionals.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {['17 Chapters', '90% Pass', 'PGA Pros', 'Cohort'].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(244,238,25,0.05)', border: '1px solid rgba(244,238,25,0.15)', color: '#9a9530' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 pb-5 flex flex-col gap-2">
              <Link href="/l3">
                <button className="w-full py-2.5 rounded-xl text-sm font-bold bg-white text-[#0a0a0a] hover:bg-[#f0ede8] transition-colors">
                  Enter →
                </button>
              </Link>
              <Link href="/l3/chapters" className="text-center text-xs text-[#444] hover:text-[#888] transition-colors py-1">
                Chapter list
              </Link>
            </div>
          </div>
        </div>

        {/* ── FORGE BANNER ──────────────────────────────────────── */}
        <Link href="/forge">
          <div className="rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:bg-[#161616] cursor-pointer"
            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#555]">Cross-Level Module</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,175,81,0.08)', color: '#00af51', border: '1px solid rgba(0,175,81,0.18)' }}>
                    L2 + L3
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#e8e5e0] mb-1" style={{ fontFamily: 'var(--font-raleway)' }}>
                  FORGE Drill System
                </h3>
                <p className="text-[13px] text-[#555]" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  Fidelity · Overload · Randomization · Graded · Exit criteria — All 4 drills with full scoring tables
                </p>
              </div>
              <div className="flex gap-5 sm:gap-6 flex-shrink-0">
                {['Driving', 'Approach', 'Chipping', 'Putting'].map((d, i) => (
                  <div key={d} className="text-center">
                    <div className="text-xl font-black text-white" style={{ fontFamily: 'var(--font-raleway)' }}>{i + 1}</div>
                    <div className="text-[10px] text-[#444] mt-0.5">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <div className="text-center mt-14 space-y-1">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[80px] bg-[rgba(255,255,255,0.06)]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#333]">Interlachen Country Club</span>
            <div className="h-px flex-1 max-w-[80px] bg-[rgba(255,255,255,0.06)]" />
          </div>
          <p className="text-[#333] text-[11px]" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Dr. Luke Benoit, PhD, PGA · Director of Instruction
          </p>
          <p className="text-[#2a2a2a] text-[11px]">cert.rypgolf.com</p>
        </div>

      </div>
    </div>
  );
}
