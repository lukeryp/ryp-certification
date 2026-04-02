'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

const runningGameTips = [
  'State the rules clearly before starting (under 60 seconds)',
  'Demonstrate once with a student',
  'Start immediately — don\'t over-explain',
  'Keep score visibly (scoreboard, tally marks, whiteboard)',
  'Keep energy high: celebrate big moments',
  'End the game at its peak, not when it fizzles',
];

type Game = {
  name: string;
  type: string;
  description: string;
  cues?: string[];
  isNew?: boolean;
};

const games: Game[] = [
  {
    name: 'Lightning',
    type: 'Putting',
    description: 'All players putt from same distance. Make it → advance to next hole. Miss → must putt again before advancing. Last player eliminated. Fast, ruthless, perfect for end of session.',
  },
  {
    name: 'Chase',
    type: 'Putting',
    description: 'Player A putts. Player B must putt from where A landed. Creates natural distance and pressure variation.',
  },
  {
    name: 'PIG',
    type: 'Putting',
    description: 'Spell P-I-G. Miss a putt that the group chooses = letter. First to spell PIG loses. Variant of HORSE.',
  },
  {
    name: '21',
    type: 'Putting',
    description: 'Get as close to 21 points as possible without going over. Each putt = distance in feet as points. Go over 21 = back to 0.',
  },
  {
    name: '3/2 or Better',
    type: 'Putting',
    description: 'Must make par or better at each hole. Doesn\'t advance until standard is met.',
  },
  {
    name: 'Boot \'Em',
    type: 'Chipping',
    description: 'Players chip to a target. Closest chip "boots" all other balls off the green. Last ball standing wins.',
  },
  {
    name: 'Bucket Chipping',
    type: 'Chipping',
    description: 'Players chip into a large range bucket from 5–15 yards. Points per hit. Coach controls distance and challenge.',
  },
  {
    name: 'Chipping Stations',
    type: 'Chipping / Short Game',
    description: 'Rotate through 4–6 stations (different lies, distances, slopes). Points for each. Timed rounds.',
  },
  {
    name: 'Capture the Flag',
    type: 'Short Game',
    description: 'Two teams, each defending their "flag" (target). Chip to capture opponent\'s flag. Alternating shots.',
  },
  {
    name: 'Candy Challenge',
    type: 'Any',
    description: 'Each student has candy/tokens. Wager before each shot. Win the shot = collect wagers. Lose = pay. Creates consequence and fun.',
  },
  {
    name: 'Targets',
    type: 'Approach / Full Swing',
    description: 'Hit to designated targets on range. Points for proximity. Can be team or individual.',
  },
  {
    name: 'Long Drive',
    type: 'Full Swing',
    description: 'Designated swing area. Best drive wins. Fairway required (orange cones define fairway).',
  },
  {
    name: 'Survivor',
    type: 'Any',
    description: 'Team game. Each player has 3 lives. Miss a shot = lose a life. Last player with lives wins.',
  },
  {
    name: 'Stroke Play',
    type: 'Full Game',
    description: 'Traditional scoring. Best for older groups (11+) who understand the game.',
  },
  {
    name: 'Matchplay',
    type: 'Full Game',
    description: 'Head-to-head. Wins, losses, halves. Great for competitive groups.',
  },
  {
    name: 'Bucket King of the Hill',
    type: 'Chipping',
    isNew: true,
    description: '2 per match, bracket format, 3 min per match. One large range bucket between players (~5 steps away). Continuous chipping from pile of balls. Hit bucket (bounce/roll) = 1pt. Hit bucket on the fly = 2pts. Ball goes IN bucket = 3pts. Winner moves up ladder, loser moves down. Self-sorting by skill. All pairs chip simultaneously.',
    cues: [
      '"Hit the bucket, not the sky"',
      '"Ball first, ground second"',
      '"Low entry wins on the lower hill"',
      'Variation — Bucket Only: only IN scores',
      'Variation — Bucket Down: bucket on side, requires low penetrating ball flight, teaches shaft lean',
    ],
  },
  {
    name: 'Golf Croquet',
    type: 'Putting',
    isNew: true,
    description: 'Full group (4–20 players). Setup: wickets/target gates in any layout. All start same point. Phase 1 — Open Play: coach calls "Together... step... step... putt" — all putt simultaneously through wickets. Becoming Poison: complete the course + sink in finishing hole = Poison status. Phase 2 — Poison in Play: Poison players putt first, non-poison second. Phase 3 — All Poison: sequential putting. Endgame Rule: Poison player must leave ball within 5 steps of another ball — failure = DQ. Forces control over power.',
    cues: [
      'Max reps through simultaneous putting',
      'Natural pressure through Poison mechanic',
      'Scalable: works with 4 or 20 players',
    ],
  },
  {
    name: 'Putting Course — ICC Signature',
    type: 'Putting',
    isNew: true,
    description: 'Race around putting green with tee markers, 9 holes. Round 1: Must get 3 or better per hole. Round 2: Must get 2 or better per hole. Round 3: Double the distance (2×) on all holes.',
    cues: [],
  },
];

const typeColors: Record<string, { bg: string; border: string; text: string }> = {
  'Putting': { bg: 'rgba(0,175,81,0.08)', border: 'rgba(0,175,81,0.25)', text: '#4ade80' },
  'Chipping': { bg: 'rgba(244,238,25,0.06)', border: 'rgba(244,238,25,0.25)', text: '#f4ee19' },
  'Chipping / Short Game': { bg: 'rgba(244,238,25,0.06)', border: 'rgba(244,238,25,0.25)', text: '#f4ee19' },
  'Short Game': { bg: 'rgba(244,238,25,0.06)', border: 'rgba(244,238,25,0.25)', text: '#f4ee19' },
  'Approach / Full Swing': { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#9ca3af' },
  'Full Swing': { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#9ca3af' },
  'Full Game': { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#9ca3af' },
  'Any': { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#9ca3af' },
};

export default function GamesPage() {
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
        style={{ background: 'radial-gradient(circle, rgba(0,175,81,0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244,238,25,0.04) 0%, transparent 70%)' }} />

      <Nav level="l1" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 sm:py-14">
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Module 04</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Game{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Facilitation</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            How to run a great game and the full RYP games library — {games.length} games across putting, chipping, and full swing.
          </p>
        </div>

        {/* How to Run a Good Game */}
        <div className="rounded-2xl overflow-hidden mb-8"
          style={{
            background: 'rgba(0,175,81,0.04)',
            border: '1px solid rgba(0,175,81,0.2)',
          }}>
          <div className="flex items-center gap-4 px-6 py-4"
            style={{ borderBottom: '1px solid rgba(0,175,81,0.12)' }}>
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
              How to Run a Good Game
            </h2>
          </div>
          <div className="px-6 py-5">
            <ul className="space-y-2">
              {runningGameTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-[#00af51] font-bold text-sm w-5 pt-px"
                    style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {i + 1}.
                  </span>
                  <span className="text-[15px] text-[#d1d5db] leading-relaxed"
                    style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Games library header */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
            The Games Library
          </h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <span className="text-xs text-[#6b7280]">{games.length} games</span>
        </div>

        {/* Games grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {games.map((game) => {
            const colors = typeColors[game.type] ?? typeColors['Any'];
            return (
              <div key={game.name}
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: game.isNew ? '1px solid rgba(0,175,81,0.3)' : '1px solid rgba(255,255,255,0.08)',
                }}>
                {/* Game header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-white leading-tight"
                      style={{ fontFamily: 'var(--font-raleway)' }}>
                      {game.name}
                    </h3>
                    {game.isNew && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold tracking-wide"
                        style={{
                          background: 'rgba(0,175,81,0.15)',
                          border: '1px solid rgba(0,175,81,0.35)',
                          color: '#00af51',
                        }}>
                        NEW
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}>
                    {game.type}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[14px] text-[#9ca3af] leading-relaxed"
                  style={{ fontFamily: 'var(--font-work-sans)' }}>
                  {game.description}
                </p>

                {/* Cues */}
                {game.cues && game.cues.length > 0 && (
                  <div className="pt-2 space-y-1.5"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {game.cues.map((cue, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="flex-shrink-0 text-[#00af51] mt-0.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          </svg>
                        </span>
                        <span className="text-[13px] text-[#6b7280] leading-relaxed italic"
                          style={{ fontFamily: 'var(--font-work-sans)' }}>
                          {cue}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/l1/setup" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Setup & Teardown
          </Link>
          <Link href="/l1" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            All Modules
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
