'use client';

import Link from 'next/link';
import Nav from '../components/Nav';

const modules = [
  {
    href: '/l2/program-architecture',
    number: '01',
    title: 'Program Architecture',
    description: 'Future Stars, ICC Junior League, Academy, and Certified Academy — the 4-level ICC program structure.',
    tags: ['Future Stars', 'Junior League', 'Academy', 'Certified'],
  },
  {
    href: '/l2/age-development',
    number: '02',
    title: 'Age-Appropriate Development',
    description: 'The 4-tier developmental framework for teaching juniors ages 4 through 15+.',
    tags: ['Ages 4-6', 'Ages 7-10', 'Ages 11-14', 'Ages 15+'],
  },
  {
    href: '/l2/warmup-protocol',
    number: '03',
    title: 'Warm-Up Protocol',
    description: 'The 6-step warm-up system with age-specific delivery for every session.',
    tags: ['Dynamic Movement', 'Foam Ball', 'Intention Setting', 'All Ages'],
  },
  {
    href: '/l2/range-work',
    number: '04',
    title: 'Range Work',
    description: 'Range station design, swing instruction methodology, and full-swing session structure.',
    tags: ['Station Design', 'Swing Cues', 'Methodology'],
  },
  {
    href: '/l2/short-game',
    number: '05',
    title: 'Short Game Stations',
    description: 'Chipping, pitching, and putting station design with progressions by age group.',
    tags: ['Chipping', 'Pitching', 'Putting', 'Stations'],
  },
  {
    href: '/l2/constraint-led',
    number: '06',
    title: 'Constraint-Led Approach',
    description: 'Fault catalog and constraint design — use the environment to create better movement.',
    tags: ['Fault Catalog', 'Constraints', 'Drills'],
  },
  {
    href: '/l2/launch-monitor',
    number: '07',
    title: 'Launch Monitor Constraints',
    description: 'Ball-flight parameters by age group and age floor guidelines for launch monitor use.',
    tags: ['Parameters', 'Age Floors', 'Data'],
  },
  {
    href: '/l2/impact-opposites',
    number: '08',
    title: 'Impact Opposites Great 8',
    description: 'All 8 impact patterns with prescribed opposites, drill cues, and age delivery guidelines.',
    tags: ['Path', 'Face', 'Contact', 'Attack Angle'],
  },
  {
    href: '/l2/player-certification',
    number: '09',
    title: 'Player Certification Protocol',
    description: 'The Nick Dittrick standard — 55 or better, certification criteria and assessment process.',
    tags: ['Certification', '55 Standard', 'Assessment'],
  },
  {
    href: '/l2/international',
    number: '10',
    title: 'International Best Practices',
    description: 'How Canada, Australia, and England structure junior golf instruction — lessons for ICC.',
    tags: ['Canada', 'Australia', 'England', 'Global'],
  },
  {
    href: '/l2/games-library',
    number: '11',
    title: 'Games Library',
    description: 'The complete RYP games library organized by age group and skill focus.',
    tags: ['Putting Games', 'Chipping Games', 'Full Swing', 'All Ages'],
  },
  {
    href: '/l2/motivation',
    number: '12',
    title: 'Motivation Framework',
    description: 'Mastery climate vs ego climate — Achievement Goal Theory applied to junior coaching.',
    tags: ['Mastery Climate', 'Growth Mindset', 'Retention'],
  },
  {
    href: '/l2/staff-protocol',
    number: '13',
    title: 'Staff Protocol',
    description: 'Appearance standards, pre-session checklist, and parent communication guidelines.',
    tags: ['Appearance', 'Communication', 'Standards'],
  },
  {
    href: '/l2/safety-etiquette',
    number: '14',
    title: 'Safety & Etiquette',
    description: 'Golf safety standards, student supervision protocols, and on-course etiquette.',
    tags: ['Safety', 'Supervision', 'Etiquette'],
  },
];

export default function L2Page() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(20,31,15,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(20,31,15,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glows */}
      <div className="absolute top-[-150px] left-[-150px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(20,31,15,0.04) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(158,129,47,0.04) 0%, transparent 70%)' }} />

      <Nav level="l2" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10 sm:py-16">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-[#141f0f] transition-colors mb-8">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to certifications
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(158,129,47,0.08)', border: '1px solid rgba(158,129,47,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#9e812f]" />
            <span className="text-[#9e812f] text-[10px] font-semibold tracking-widest uppercase">Level 2 Certification</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-[#141f0f] mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            ICC Instructor Certification
          </h1>

          <p className="text-base text-[#666] leading-relaxed max-w-2xl mb-6"
            style={{ fontFamily: 'var(--font-work-sans)' }}>
            Complete junior golf instruction methodology for Interlachen Country Club instructors
          </p>

          {/* Prominent exam CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/l2/exam">
              <button className="px-7 py-3 rounded-xl text-xs font-semibold bg-[#141f0f] text-white hover:bg-[#1e2f18] transition-colors"
                style={{ letterSpacing: '2.4px', textTransform: 'uppercase' }}>
                Take the Exam
              </button>
            </Link>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-[#888]"
              style={{ background: 'rgba(20,31,15,0.04)', border: '1px solid rgba(20,31,15,0.1)' }}>
              <span>70 questions · 3 essays · 90 min · 80% to pass</span>
            </div>
          </div>
        </div>

        {/* Description card */}
        <div className="rounded-2xl p-6 mb-10"
          style={{
            background: 'rgba(20,31,15,0.04)',
            border: '1px solid rgba(20,31,15,0.15)',
          }}>
          <h2 className="text-lg font-bold text-[#141f0f] mb-3" style={{ fontFamily: 'var(--font-raleway)' }}>
            What this certification covers
          </h2>
          <p className="text-[#555] leading-relaxed text-[15px]" style={{ fontFamily: 'var(--font-work-sans)' }}>
            The Level 2 ICC Instructor Certification builds on foundational knowledge to deliver a complete junior instruction methodology.
            You'll master the 4-tier program architecture, age-appropriate pedagogy, the Impact Opposites system, constraint-led coaching,
            launch monitor protocols, and the motivational frameworks that keep kids engaged long-term. This is the standard for every ICC instructor.
          </p>
          <div className="flex flex-wrap gap-4 mt-5">
            {['14 Modules', 'ICC Instructors', 'Prerequisite: L1', 'Annual Recertification'].map(badge => (
              <span key={badge} className="text-xs text-[#9e812f] font-medium"
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="w-1 h-1 rounded-full bg-[#9e812f] inline-block" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <Link key={mod.href} href={mod.href}>
              <div className="h-full rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:border-[rgba(20,31,15,0.25)] cursor-pointer"
                style={{
                  background: '#fafaf9',
                  border: '1px solid rgba(20,31,15,0.1)',
                }}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl font-black leading-none"
                    style={{
                      fontFamily: 'var(--font-raleway)',
                      color: '#141f0f',
                    }}>
                    {mod.number}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#ccc] mt-1">
                    <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <h3 className="text-base font-bold text-[#141f0f] mb-1.5" style={{ fontFamily: 'var(--font-raleway)' }}>
                  {mod.title}
                </h3>
                <p className="text-[13px] text-[#666] leading-relaxed mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  {mod.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {mod.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(158,129,47,0.07)',
                        border: '1px solid rgba(158,129,47,0.18)',
                        color: '#9e812f',
                      }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Take Assessment CTA */}
        <div className="mt-10 rounded-2xl p-6" style={{ background: 'rgba(20,31,15,0.04)', border: '1px solid rgba(20,31,15,0.15)' }}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#141f0f] mb-1" style={{ fontFamily: 'var(--font-raleway)' }}>
                Ready to get certified?
              </h3>
              <p className="text-sm text-[#888]">
                70 multiple choice questions + 3 essays · 90 minutes · Pass score: 80 / 100
              </p>
            </div>
            <Link href="/l2/exam">
              <button className="flex-shrink-0 px-6 py-3 rounded-xl text-xs font-semibold bg-[#141f0f] text-white hover:bg-[#1e2f18] transition-all active:scale-[0.98]"
                style={{ letterSpacing: '2.4px', textTransform: 'uppercase' }}>
                Take Assessment
              </button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-[#aaa] text-xs" style={{ fontFamily: 'var(--font-work-sans)' }}>
          <p>Interlachen Country Club · L2 Instructor Certification</p>
        </div>
      </div>
    </div>
  );
}
