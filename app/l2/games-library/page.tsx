'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';

type Game = {
  name: string;
  isNew?: boolean;
  setup: string;
  scoring: string;
  cues: string[];
  players?: string;
  highlight?: string;
};

type Category = {
  id: string;
  label: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  games: Game[];
};

const categories: Category[] = [
  {
    id: 'putting',
    label: 'Putting Games',
    accent: '#00af51',
    accentBg: 'rgba(0,175,81,0.06)',
    accentBorder: 'rgba(0,175,81,0.2)',
    games: [
      {
        name: 'Lightning',
        setup: 'All players putt from same distance. Targets: any series of holes.',
        scoring: 'Make it → advance to next hole. Miss → putt again before advancing. Last player remaining is eliminated. Fast, competitive, great for end of session.',
        cues: ['"Thread the needle"', '"One look, commit"'],
      },
      {
        name: 'Chase',
        setup: 'Two or more players at any putting surface.',
        scoring: 'Player A putts. Player B must putt from where A\'s ball stopped. Creates natural distance variation — rewards good lag putting.',
        cues: ['"Control your speed"', '"Die at the hole"'],
      },
      {
        name: 'PIG',
        setup: 'Group selects a putt location. All players attempt.',
        scoring: 'Spell P-I-G. Miss a putt the group chooses = earn a letter. First player to spell PIG loses.',
        cues: ['"Read the break, commit to the line"'],
      },
      {
        name: '21',
        setup: 'Any putting surface. Multiple distance stations.',
        scoring: 'Accumulate as close to 21 points as possible. Each holed putt = distance in feet as points. Exceed 21 = back to 0.',
        cues: ['"Dial in your speed before your line"'],
      },
      {
        name: 'Golf Croquet',
        isNew: true,
        players: '4–20 players',
        setup: 'Wickets arranged in layout across putting green. All players start from the same point.',
        scoring: 'Phase 1: Coach calls "Together… step… step… putt" — all putt simultaneously through wickets.\n\nBecoming Poison: Complete the course and sink the final hole = Poison status.\n\nPoison players putt first each round. All Poison = sequential play.\n\nEndgame: Poison player must leave ball within 5 steps of another player\'s ball. Fail = disqualified.',
        cues: ['"Control over power"', '"Finish close, not long"'],
        highlight: 'Forces control over power. Works for large groups.',
      },
      {
        name: 'Putting Course — ICC Signature',
        isNew: true,
        players: 'Any group size',
        setup: 'Race around green with tee markers defining 9 stations.',
        scoring: 'Round 1: Must get 3 strokes or better at each hole.\nRound 2: Must get 2 strokes or better.\nRound 3: Double all distances.',
        cues: ['"Build your baseline"', '"Speed creates confidence"'],
        highlight: 'Escalating difficulty — great for progression tracking.',
      },
    ],
  },
  {
    id: 'chipping',
    label: 'Chipping Games',
    accent: '#f4ee19',
    accentBg: 'rgba(244,238,25,0.05)',
    accentBorder: 'rgba(244,238,25,0.2)',
    games: [
      {
        name: 'Boot Em',
        setup: 'Players chip to a common target (flag or marker).',
        scoring: 'Closest chip "boots" all others off the leaderboard. Last ball standing wins the round.',
        cues: ['"Land it on the green and let it run"', '"Soft landing, hard roll"'],
      },
      {
        name: 'Bucket Chipping',
        setup: 'Large range bucket placed at varying distances.',
        scoring: 'Points for hitting the bucket. Coach controls difficulty by adjusting distance and bucket orientation.',
        cues: ['"Pick a landing spot"', '"Ball first, ground second"'],
      },
      {
        name: 'Chipping Stations',
        setup: 'Rotate through 4–6 different lie/distance stations around the green.',
        scoring: 'Points per station. Timed rotation every 5 minutes.',
        cues: ['"Read the lie before selecting your club"'],
      },
      {
        name: 'Bucket King of the Hill',
        isNew: true,
        players: '2 per match, multiple simultaneous matches',
        setup: '2 players per bucket, one large bucket placed 5 steps away. All pairs chip simultaneously from a ball pile.',
        scoring: 'Hit bucket (bounce or roll) = 1 pt\nHit bucket on fly = 2 pts\nBall IN bucket = 3 pts\n\nWinner moves up the ladder, loser moves down.\n\nVariation — Bucket Down: Lay bucket on its side, requires low penetrating flight. Scooped chips miss the opening — shaft lean required.',
        cues: ['"Hit the bucket, not the sky"', '"Ball first, ground second"', '"Low entry wins"'],
        highlight: 'Teaches shaft lean organically — scooped chips miss the opening.',
      },
      {
        name: 'Capture the Flag',
        setup: 'Two teams each defend a target flag. Players chip from a designated line.',
        scoring: 'Chip closest to the opponent\'s flag to "capture" it. Alternating shots. Most captures in allotted time wins.',
        cues: ['"Pick a spot, not the flag"', '"Land short, release forward"'],
      },
    ],
  },
  {
    id: 'fullswing',
    label: 'Full Swing Games',
    accent: '#a78bfa',
    accentBg: 'rgba(139,92,246,0.06)',
    accentBorder: 'rgba(139,92,246,0.2)',
    games: [
      {
        name: 'Long Drive',
        setup: 'Cones define a fairway corridor. One shot per player.',
        scoring: 'Best drive that stays within the defined fairway corridor wins the round.',
        cues: ['"Stay in the fairway first, then go long"', '"Swing through the ball, not at it"'],
      },
      {
        name: 'Survivor',
        setup: 'Each player starts with 3 lives. Define a target zone.',
        scoring: 'Miss the target or defined fairway = lose a life. Last player with any lives remaining wins.',
        cues: ['"Pick a small target and commit"', '"Process over outcome"'],
      },
      {
        name: 'Candy Challenge',
        setup: 'Tokens or small prizes. Any target-based range setup.',
        scoring: 'Wager tokens before each shot. Win = collect opponent\'s wagers. Lose = pay out. Creates low-stakes pressure environment.',
        cues: ['"Commit fully before you swing"', '"Breathe and see the target"'],
        highlight: 'Excellent for simulating competition pressure in a fun context.',
      },
      {
        name: 'Targets',
        setup: 'Range targets at multiple distances. Team or individual format.',
        scoring: 'Points for proximity. Closer = more points. Can be team or individual. Points reset each round.',
        cues: ['"Pick a specific landing zone, not just a direction"'],
      },
    ],
  },
  {
    id: 'formats',
    label: 'Competition Formats',
    accent: '#f97316',
    accentBg: 'rgba(249,115,22,0.05)',
    accentBorder: 'rgba(249,115,22,0.2)',
    games: [
      {
        name: 'Stroke Play',
        setup: 'Traditional format. Best for groups with basic scoring knowledge.',
        scoring: 'Total strokes for all holes. Lowest total wins. Recommended ages 11+.',
        cues: ['"Manage your round, not just individual shots"', '"Bogey is a good score"'],
      },
      {
        name: 'Matchplay',
        setup: 'Head-to-head pairs. Best suited for competitive players.',
        scoring: 'Win a hole = +1. Halve a hole = 0. Lose a hole = -1. Most holes won at end wins the match.',
        cues: ['"Play the hole, not the scorecard"', '"Momentum shifts — stay present"'],
      },
      {
        name: '3/2 Or Better',
        setup: 'Sequential hole format. Individual or pairs.',
        scoring: 'Must make par or better (3 or 2 on a par 3) at each hole before advancing to the next. Great for building composure.',
        cues: ['"Smart target selection"', '"Short game first"'],
        highlight: 'Forces players to manage their game strategically before advancing.',
      },
    ],
  },
];

function GameCard({ game, accent, accentBg, accentBorder }: {
  game: Game;
  accent: string;
  accentBg: string;
  accentBorder: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Card header */}
      <div className="px-5 py-4 flex items-start gap-2"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-raleway)' }}>
              {game.name}
            </h3>
            {game.isNew && (
              <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(244,238,25,0.15)', color: '#f4ee19', border: '1px solid rgba(244,238,25,0.35)' }}>
                NEW
              </span>
            )}
          </div>
          {game.players && (
            <p className="text-[11px] text-[#6b7280] mt-0.5" style={{ fontFamily: 'var(--font-work-sans)' }}>
              {game.players}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex-1 space-y-3">
        {/* Setup */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: accent }}>Setup</span>
          <p className="text-[13px] text-[#9ca3af] mt-0.5 leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            {game.setup}
          <a href="/athletic_development_plan.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#00af51] hover:underline mt-3">
              📄 ICC Athletic Development Plan (PDF)
            </a>
          </p>
        </div>

        {/* Scoring */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">Scoring</span>
          <p className="text-[13px] text-[#d1d5db] mt-0.5 leading-relaxed whitespace-pre-line" style={{ fontFamily: 'var(--font-work-sans)' }}>
            {game.scoring}
          </p>
        </div>

        {/* Highlight */}
        {game.highlight && (
          <div className="rounded-lg px-3 py-2"
            style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
            <p className="text-[12px] leading-relaxed" style={{ color: accent, fontFamily: 'var(--font-work-sans)' }}>
              {game.highlight}
            </p>
          </div>
        )}

        {/* Cues */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#ca8a04]">Coaching Cues</span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {game.cues.map((cue, i) => (
              <span key={i} className="text-[12px] italic px-2 py-0.5 rounded"
                style={{
                  background: 'rgba(244,238,25,0.06)',
                  border: '1px solid rgba(244,238,25,0.15)',
                  color: '#fef08a',
                  fontFamily: 'var(--font-work-sans)',
                }}>
                {cue}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GamesLibraryPage() {
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 sm:py-14">
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
            <span className="text-[#00af51] text-xs font-semibold tracking-widest uppercase">Practice Engagement</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-raleway)' }}>
            Games{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Library</span>
          </h1>
          <p className="text-[#9ca3af] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Complete collection of games for putting, chipping, full swing, and competition formats. With setup, scoring, and coaching cues for every game.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-[12px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(244,238,25,0.12)', color: '#f4ee19', border: '1px solid rgba(244,238,25,0.3)' }}>
              NEW = recently added
            </span>
            <span className="text-[12px] text-[#6b7280]" style={{ fontFamily: 'var(--font-work-sans)' }}>
              {categories.reduce((acc, c) => acc + c.games.length, 0)} games total
            </span>
          </div>
        </div>

        {/* Categories */}
        {categories.map((cat) => (
          <div key={cat.id} className="mb-12">
            {/* Category header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full flex-shrink-0"
                style={{ background: cat.accent }} />
              <h2 className="text-xl font-black text-white"
                style={{ fontFamily: 'var(--font-raleway)' }}>
                {cat.label}
              </h2>
              <div className="flex-1 h-px"
                style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span className="text-[12px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                style={{
                  background: cat.accentBg,
                  color: cat.accent,
                  border: `1px solid ${cat.accentBorder}`,
                  fontFamily: 'var(--font-work-sans)',
                }}>
                {cat.games.length} games
              </span>
            </div>

            {/* Game cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.games.map((game) => (
                <GameCard
                  key={game.name}
                  game={game}
                  accent={cat.accent}
                  accentBg={cat.accentBg}
                  accentBorder={cat.accentBorder}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Quick Reference */}
        <div className="rounded-2xl p-5 mb-10"
          style={{ background: 'rgba(0,175,81,0.06)', border: '1px solid rgba(0,175,81,0.2)' }}>
          <p className="text-[#4ade80] text-sm font-bold mb-3" style={{ fontFamily: 'var(--font-raleway)' }}>
            QUICK SELECTION GUIDE
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { situation: 'End of session energy dump', game: 'Lightning, Survivor' },
              { situation: 'Large group (8+)', game: 'Golf Croquet, Targets' },
              { situation: 'Distance control focus', game: '21, Chase' },
              { situation: 'Contact / shaft lean focus', game: 'Bucket King of the Hill (Bucket Down)' },
              { situation: 'Competition simulation', game: 'Candy Challenge, Matchplay' },
              { situation: 'Skill progression check', game: 'ICC Putting Course (track scores)' },
            ].map((item) => (
              <div key={item.situation} className="rounded-lg px-3 py-2.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[11px] text-[#6b7280] mb-0.5 uppercase tracking-wider" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  {item.situation}
                </p>
                <p className="text-[13px] font-semibold text-[#00af51]" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  {item.game}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/l2/short-game" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Short Game Stations
          </Link>
          <Link href="/l2" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00af51] hover:text-[#4ade80] transition-colors">
            L2 Overview
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
