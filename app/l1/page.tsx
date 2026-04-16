'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';
import { getCurrentUser } from '../lib/storage';
import { syncAuthSessionToProfile } from '../lib/auth';
import { saveCertAttempt } from '../lib/cert-attempts';

// ============================================================================
// ICC Junior League — Staff Curriculum & Certification
// Single-flow: intro → read → quiz → results
// ============================================================================

type Section = {
  id: string;
  title: string;
  intro?: string;
  bullets?: string[];
  subsections?: { title: string; intro?: string; bullets?: string[] }[];
};

const CURRICULUM: Section[] = [
  {
    id: 'welcome',
    title: 'Welcome to the ICC Junior League',
    intro:
      'This document is your complete guide to working as a coaching staff member for the ICC Junior League at Meadowbrook Country Club. Read it carefully, know it well — you will be tested on it at cert.rypgolf.com before your first day.',
    bullets: [
      'Your role is not just a coach. You are a caddy, a mentor, a role model, and a steward of Interlachen junior golf.',
      'Every interaction you have — with kids, parents, or other coaches — reflects on this program.',
    ],
  },
  {
    id: 'logistics',
    title: '1. Logistics & Scheduling',
    subsections: [
      {
        title: 'Hours Tracking & Sign-Up',
        bullets: [
          'All coaches log hours and manage availability through the ICC Junior League Hours Tracking App.',
          'Use the same email address from your original application to log in.',
          'You can enter hours worked and update your availability dates from this portal.',
        ],
      },
      {
        title: 'Availability & Schedule Changes',
        bullets: [
          'If you cannot make a date you have committed to, notify Coach Blaize at least 7 days in advance.',
          'Coach Blaize will send out prospective tee times one week in advance so all staff can see expected assignments.',
          'Schedules may shift 2–3 days in advance — plan accordingly, but expect one week\u2019s notice as the norm.',
        ],
      },
      {
        title: 'Dress Code',
        bullets: [
          'Golf attire is required. Look professional.',
          'Shorts are acceptable.',
          'Shirts must be tucked in.',
          'Belts are required.',
          'No sandals.',
        ],
      },
      {
        title: 'Compensation',
        bullets: [
          'Pay rate: $15/hour.',
          'Each day worked also earns a complimentary practice day at Interlachen — use it.',
        ],
      },
    ],
  },
  {
    id: 'arrival',
    title: '2. Arrival & Pre-Round Routine',
    subsections: [
      {
        title: 'Check-In',
        bullets: [
          'Upon arrival, check in with Coach Blaize immediately.',
          'Get your group assignment and introduce yourself to your kids right away.',
        ],
      },
      {
        title: 'Putting Green Warm-Up',
        intro:
          'Do not stand around waiting. Head straight to the putting green with your group. This time is valuable — use it.',
        bullets: [
          'Get kids rolling putts and hitting chips from the moment you arrive.',
          'Set up games and challenges to make the warm-up competitive and fun.',
          'Use this time to build rapport — learn their names, ask about their games, get them energized.',
          'Engage with your group or other junior golfers. Build rapport and be outgoing.',
          'Teach basic putting and chipping fundamentals appropriate to each kid\u2019s age and skill level.',
          'Show them what a proper warm-up looks like and why it matters.',
        ],
      },
      {
        title: 'Before You Head to the First Tee',
        bullets: [
          'Make sure you have a few tees and a ball mark repair tool in your pockets before you leave the putting area.',
        ],
      },
    ],
  },
  {
    id: 'course',
    title: '3. On the Course',
    subsections: [
      {
        title: 'Getting to the First Tee',
        bullets: [
          'A shuttle cart will typically take you down to the first tee.',
          'Once you arrive, space kids out and make sure they each get 10 good practice swings before play begins.',
          'Emphasize good balance and proper distance from each other during practice swings.',
        ],
      },
      {
        title: 'Safety: The Circle of Safety',
        bullets: [
          'No player or spectator should be within three club lengths of anyone who is swinging.',
          'Nobody stands behind a player who is about to swing — ever.',
          'Never walk ahead of your group — stray shots happen.',
          'Reinforce these rules verbally with kids at the start of every round, and correct any violations immediately.',
        ],
      },
      {
        title: 'Bag Placement',
        bullets: [
          'On the tee box: Place bags to the right and slightly ahead of the hitting area so all players are visible and nobody is behind a swing.',
          'On approach shots: Same principle — bags off to the side, out of the swing path.',
          'At the green: Place bags on the side of the green closest to the next tee so the group can move efficiently.',
        ],
      },
      {
        title: 'The Dynamic Tee System',
        intro:
          'The ICC Junior League uses a dynamic tee system to keep play appropriately challenging as groups improve hole-to-hole. On par 4s and 5s, the tee location for the next hole is set by the team\u2019s scramble score on the previous hole:',
        bullets: [
          'Par or better on the previous hole → move the next tee back 10 yards.',
          'Bogey on the previous hole → set the next tee slightly behind the normal tee location.',
          'Double-bogey or worse on the previous hole → move the next tee up 10 yards.',
          'On par 3s, do not move tees back beyond the normal tee box.',
          'The tee system resets each hole based on the previous hole\u2019s scramble score.',
        ],
      },
      {
        title: 'Pace of Play',
        bullets: [
          'Keep up with the group in front of you at all times.',
          'Walk quickly between shots.',
          'Play ready golf — whoever is ready hits next, regardless of traditional honor rules.',
          'If pace is an issue, encourage kids to take just 1 practice swing before each shot on the course.',
          'Use coach\u2019s discretion to move tees up or skip a hole when pace demands it.',
        ],
      },
      {
        title: 'Course Etiquette',
        intro:
          'Teach and enforce proper golf etiquette on every hole. Kids are learning habits that will last a lifetime.',
        bullets: [
          'Fix all ball marks on greens.',
          'Replace divots on fairways.',
          'Rake bunkers after every shot.',
          'Walk, don\u2019t drag feet. Treat the course with respect.',
        ],
      },
    ],
  },
  {
    id: 'scoring',
    title: '4. Scoring',
    intro:
      'The ICC Junior League plays scramble format. Coaches keep score on the team scramble scorecard.',
    bullets: [
      'Record the team\u2019s scramble score on each hole.',
      'After each shot, facilitate the group\u2019s decision on which lie to play from — don\u2019t make the call for them.',
      'Help kids weigh the pros and cons: lie quality, distance, angle to the pin, risk vs. reward.',
      'The goal is to teach decision-making, not just get the best score.',
    ],
  },
  {
    id: 'coaching',
    title: '5. Coaching on the Course',
    subsections: [
      {
        title: 'Developmental Approach by Age',
        intro:
          'Kids in the ICC Junior League range from age 7 to 18. Adjust your coaching to match their developmental stage.',
        bullets: [
          'Younger kids (7–10): Keep it simple, fun, and encouraging. Focus on basic grip and posture. Celebrate contact.',
          'Middle juniors (11–14): Introduce basic strategy concepts. Help them think about shot selection and course management.',
          'Older juniors (15–18): Can handle more nuanced feedback. Strategy, pre-shot routine, and mental game become more relevant.',
        ],
      },
      {
        title: 'Keep Technical Coaching Simple',
        intro:
          'Unless you have high confidence in your technical coaching abilities, stay away from complex cues about swing plane, wrist positions, or kinematic sequencing. Effective on-course cues are observation-based and easy to act on:',
        bullets: [
          'Toe hits: "I notice you\u2019re catching it on the toe a lot — try moving just a little closer to the ball."',
          'Topping: "Try to brush the ground right under the ball — just sweep it."',
          'Chunking: "Think about swinging around your body rather than up and down — more of a sweeping motion."',
          'These cues are simple, non-technical, and give the player something they can immediately try. That\u2019s the goal.',
        ],
      },
      {
        title: 'Sportsmanship',
        bullets: [
          'Make it clear that the goal is to make golf fun for everybody.',
          'Encourage every player on every shot — regardless of outcome.',
          'Model the behavior you want to see: positive, composed, and focused on effort over results.',
        ],
      },
    ],
  },
  {
    id: 'communication',
    title: '6. Communication & Professionalism',
    subsections: [
      {
        title: 'Your Role',
        intro:
          'You are a caddy, a mentor, and a representative of Interlachen Country Club junior golf. Act accordingly at all times.',
      },
      {
        title: 'With Kids',
        bullets: [
          'Be friendly, warm, and genuinely engaged.',
          'Learn every player\u2019s name.',
          'Be encouraging, patient, and developmentally appropriate in your language.',
          'Use good judgment in all conversations — kids talk to their parents about everything that happens on the course.',
        ],
      },
      {
        title: 'With Parents',
        bullets: [
          'Be professional and respectful.',
          'Keep parent conversation minimal, and only direct substantive concerns to Coach Blaize or Coach Luke.',
          'Do not make promises or commitments on behalf of the program.',
        ],
      },
      {
        title: 'With Other Coaches',
        bullets: [
          'Communicate clearly and support each other on the course.',
          'If something comes up mid-round, text Coach Blaize.',
          'Any safety incident is an immediate phone call to Coach Blaize or Coach Luke — not a text.',
        ],
      },
    ],
  },
  {
    id: 'weather',
    title: '7. Weather & Emergency Protocols',
    subsections: [
      {
        title: 'Weather',
        bullets: [
          'In the event of lightning or severe weather, you will receive a text from Coach Blaize or a shuttle cart will come to retrieve your group.',
          'If there is a short rain shower, continue play unless you hear otherwise from Coach Blaize or Coach Nick.',
          'Use good judgment — if weather looks threatening and you haven\u2019t heard from staff, text Coach Blaize immediately.',
        ],
      },
      {
        title: 'Medical & Safety Emergencies',
        bullets: [
          'Any safety or medical emergency: call Coach Blaize immediately — do not text.',
          'If the emergency is critical (unresponsive, severe bleeding, suspected spinal injury, etc.), call 911 first, then Coach Blaize.',
          'Coach Blaize carries first aid and is your first point of contact for any injury or incident.',
          'Keep your group calm and together until help arrives.',
        ],
      },
    ],
  },
  {
    id: 'post-round',
    title: '8. Post-Round Routine',
    bullets: [
      'As you walk off the last hole, make sure every player has their clubs in their bag.',
      'Return the completed scorecard to Coach Blaize.',
      'Ask Coach Blaize what\u2019s needed next — if both the 6-hole and 9-hole groups are running, you may be heading out again.',
    ],
  },
  {
    id: 'checklist',
    title: 'Quick Reference Checklist',
    intro: 'Use this before every round:',
    bullets: [
      'Arrive 15 minutes before your tee time',
      'Check in with Coach Blaize',
      'Lead the putting green warm-up — make it engaging',
      'Pocket: tees + ball mark repair tool',
      'Review Circle of Safety with group at tee 1',
      '10 practice swings, good balance, safe spacing',
      'Apply the dynamic tee system each hole',
      'Facilitate scramble decisions — let kids choose',
      'Keep pace — walk quickly, play ready golf (1 practice swing max if pace is an issue)',
      'Enforce etiquette: ball marks, divots, bunkers',
      'Return scorecard, check clubs, debrief with Coach Blaize',
      'When in doubt — ask Coach Blaize.',
      'Now go build some golfers.',
    ],
  },
];

// ============================================================================
// 20-Question Exam
// ============================================================================

type Question = {
  id: string;
  section: string;
  prompt: string;
  options: string[];
  correct: number; // index into options
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    section: 'Logistics & Scheduling',
    prompt: 'Where do all coaches log hours and manage availability?',
    options: [
      'By text message to Coach Blaize each Friday',
      'The ICC Junior League Hours Tracking App, using the same email from your original application',
      'The Interlachen front desk sign-in sheet',
      'A shared Google Sheet emailed weekly',
    ],
    correct: 1,
    explanation:
      'All coaches log hours and manage availability through the ICC Junior League Hours Tracking App, logging in with the same email used on their original application.',
  },
  {
    id: 'q2',
    section: 'Logistics & Scheduling',
    prompt: 'Which of the following is NOT allowed under the dress code?',
    options: ['Shorts', 'Belts', 'Tucked-in shirts', 'Sandals'],
    correct: 3,
    explanation: 'Shorts, belts, and tucked-in shirts are all allowed/required. Sandals are not permitted.',
  },
  {
    id: 'q3',
    section: 'Logistics & Scheduling',
    prompt: 'Beyond a tucked-in shirt, which of the following is required by the dress code?',
    options: ['A hat', 'A belt', 'Long pants', 'An Interlachen-branded polo'],
    correct: 1,
    explanation: 'Belts are required as part of the dress code.',
  },
  {
    id: 'q4',
    section: 'Logistics & Scheduling',
    prompt:
      'If you cannot make a date you\u2019ve committed to, how much advance notice must you give Coach Blaize?',
    options: ['24 hours', '48 hours', 'At least 7 days in advance', 'Any time before the morning of the session'],
    correct: 2,
    explanation:
      'Notify Coach Blaize at least 7 days in advance if you cannot make a committed date. Coach Blaize sends prospective tee times one week ahead.',
  },
  {
    id: 'q5',
    section: 'Arrival & Pre-Round',
    prompt: 'What is the first thing you should do upon arrival?',
    options: [
      'Head to the range to hit a bucket',
      'Check in with Coach Blaize immediately and get your group assignment',
      'Wait at the clubhouse for a coach to assign you',
      'Introduce yourself to the parents',
    ],
    correct: 1,
    explanation:
      'Check in with Coach Blaize right away, get your group assignment, and introduce yourself to your kids.',
  },
  {
    id: 'q6',
    section: 'Arrival & Pre-Round',
    prompt: 'What is the expectation on the putting green during warm-up?',
    options: [
      'Stand quietly off to the side so kids can focus on their own warm-up',
      'Engage with your group or other junior golfers. Build rapport and be outgoing.',
      'Use the time to run errands — grab water, restock tees, check the tee sheet',
      'Wait for the lead coach to assign drills before doing anything',
    ],
    correct: 1,
    explanation:
      'The putting-green warm-up is valuable time. Engage with your group or other juniors, build rapport, set up games, teach basic fundamentals, and be outgoing.',
  },
  {
    id: 'q7',
    section: 'Arrival & Pre-Round',
    prompt: 'What should you have in your pockets before you leave the putting area for the first tee?',
    options: [
      'A phone and a yardage book',
      'A few tees and a ball mark repair tool',
      'A scorecard and a pencil',
      'Sunscreen and bug spray',
    ],
    correct: 1,
    explanation: 'Pocket tees and a ball mark repair tool before heading to the first tee.',
  },
  {
    id: 'q8',
    section: 'On the Course',
    prompt: 'Once at the first tee, how many practice swings should each kid get before play begins?',
    options: [
      '3 — just enough to get loose',
      '5 with the driver specifically',
      '10 good practice swings, emphasizing balance and safe spacing',
      'As many as they want until they feel ready',
    ],
    correct: 2,
    explanation:
      'Each kid gets 10 good practice swings with emphasis on good balance and safe distance from each other before play begins.',
  },
  {
    id: 'q9',
    section: 'On the Course',
    prompt:
      'Under the dynamic tee system, your group makes a bogey on the previous par 4. Where do you set the next tee?',
    options: [
      'Move the tee back 10 yards',
      'Set the tee slightly behind the normal tee location',
      'Move the tee up 10 yards',
      'Keep the tee at the normal tee location exactly',
    ],
    correct: 1,
    explanation:
      'Par or better → back 10 yards. Bogey → slightly behind the normal tee location. Double-bogey or worse → up 10 yards. Par 3s stay at the normal tee box.',
  },
  {
    id: 'q10',
    section: 'On the Course',
    prompt: 'The Circle of Safety requires that no one be within what distance of anyone swinging?',
    options: ['One club length', 'Two club lengths', 'Three club lengths', 'Ten feet'],
    correct: 2,
    explanation: 'Three club lengths — no player or spectator should be within that distance of anyone swinging.',
  },
  {
    id: 'q11',
    section: 'On the Course',
    prompt: 'Where should bags be placed on the tee box?',
    options: [
      'Directly behind the hitting area so kids can grab their next club',
      'To the right and slightly ahead of the hitting area so all players are visible and nobody is behind a swing',
      'On the cart path, regardless of side',
      'At the front of the tee box so they are out of the way',
    ],
    correct: 1,
    explanation:
      'Bags go to the right and slightly ahead of the hitting area so all players are visible and no one ends up behind a swing.',
  },
  {
    id: 'q12',
    section: 'On the Course',
    prompt: 'Which best describes the pace-of-play standard on the course?',
    options: [
      'Traditional honors — the best score on the prior hole tees off first, and players take as many practice swings as they need',
      'Play ready golf and keep up with the group ahead. If pace is an issue, encourage kids to take just 1 practice swing before each shot.',
      'Pace only matters during tournament play — during regular Tuesday sessions, let kids take their time',
      'Skip every other hole whenever the group falls behind',
    ],
    correct: 1,
    explanation:
      'Ready golf, keep up with the group ahead, walk quickly, and if pace is an issue encourage kids to take just 1 practice swing before each shot.',
  },
  {
    id: 'q13',
    section: 'Scoring',
    prompt: 'After each shot in the scramble, what is your role as the coach?',
    options: [
      'Pick the best lie for the group and move on',
      'Facilitate the group\u2019s decision on which lie to play from — help them weigh pros and cons, but don\u2019t make the call for them',
      'Play your own shot from the best lie to demonstrate',
      'Always take the longest lie to challenge the kids',
    ],
    correct: 1,
    explanation:
      'Facilitate the decision. Help kids weigh lie quality, distance, angle, and risk vs. reward. The goal is to teach decision-making.',
  },
  {
    id: 'q14',
    section: 'Coaching on the Course',
    prompt: 'For younger kids (ages 7–10), what is the right coaching emphasis?',
    options: [
      'Kinematic sequencing and swing plane drills',
      'Pre-shot routine and mental game',
      'Keep it simple, fun, and encouraging — focus on basic grip and posture and celebrate contact',
      'Formal strategy lessons on shot selection',
    ],
    correct: 2,
    explanation:
      'Younger kids need simple, fun, and encouraging coaching focused on basic grip and posture — and celebrating contact.',
  },
  {
    id: 'q15',
    section: 'Coaching on the Course',
    prompt: 'A kid is catching it on the toe a lot. What is an appropriate simple on-course cue?',
    options: [
      '"Rotate your hips faster through impact to square the face."',
      '"Try moving just a little closer to the ball."',
      '"Drop your trail elbow into the slot on the downswing."',
      '"Work on shallowing the shaft from the top."',
    ],
    correct: 1,
    explanation:
      'Simple, non-technical, action-oriented: "Try moving just a little closer to the ball." Effective on-course cues are observation-based and easy to act on.',
  },
  {
    id: 'q16',
    section: 'Coaching on the Course',
    prompt: 'What is the rule on complex technical coaching on the course?',
    options: [
      'Always teach the most technical cue you know — kids need real instruction',
      'Unless you have high confidence in your technical abilities, stay away from complex cues about swing plane, wrist position, or kinematic sequencing. Use simple observation-based cues instead.',
      'Technical coaching is always the lead instructor\u2019s job — never say anything about technique',
      'Save all technical cues for the 19th hole debrief',
    ],
    correct: 1,
    explanation:
      'Unless you\u2019re highly confident in your technical coaching, avoid complex cues. Observation-based, easy-to-act-on cues are the standard.',
  },
  {
    id: 'q17',
    section: 'Communication & Professionalism',
    prompt: 'How should you handle conversations with parents?',
    options: [
      'Engage freely — parents appreciate open conversation about their child\u2019s progress',
      'Minimal, and only direct substantive concerns to Coach Blaize or Coach Luke',
      'Refer all parents to the Interlachen front desk',
      'Give parents your personal phone number so they can contact you directly',
    ],
    correct: 1,
    explanation:
      'Keep parent conversation minimal, be professional, and only direct substantive concerns to Coach Blaize or Coach Luke. Never make promises on behalf of the program.',
  },
  {
    id: 'q18',
    section: 'Communication & Professionalism',
    prompt: 'Something comes up mid-round with another coach or a logistical issue. What do you do?',
    options: [
      'Leave your group to find the coach in person',
      'Call the Interlachen front desk',
      'Text Coach Blaize',
      'Wait until the end of the round and bring it up then',
    ],
    correct: 2,
    explanation:
      'Text Coach Blaize for mid-round issues. For any safety incident, it\u2019s an immediate phone call — not a text.',
  },
  {
    id: 'q19',
    section: 'Weather & Emergency',
    prompt: 'A kid in your group has a medical or safety emergency on the course. What do you do?',
    options: [
      'Text Coach Blaize and keep the group moving',
      'Drive the kid back to the clubhouse yourself',
      'Call Coach Blaize immediately (do not text). If the emergency is critical, call 911 first, then Coach Blaize.',
      'Wait for a shuttle cart and see if it resolves on its own',
    ],
    correct: 2,
    explanation:
      'Any safety or medical emergency = phone call to Coach Blaize, not a text. If it\u2019s critical (unresponsive, severe bleeding, suspected spinal injury, etc.), call 911 first, then Coach Blaize.',
  },
  {
    id: 'q20',
    section: 'Post-Round',
    prompt: 'As you walk off the last hole, what are you responsible for?',
    options: [
      'Making sure every player has their clubs in their bag',
      'Returning the completed scorecard to Coach Blaize',
      'Checking in with Coach Blaize for what\u2019s needed next — you may be heading back out with another group',
      'All of the above',
    ],
    correct: 3,
    explanation:
      'All of the above — check clubs, return the scorecard, and check in with Coach Blaize for the next assignment (6-hole and 9-hole groups may still be running).',
  },
];

const PASS_THRESHOLD = 0.8; // 80%

// ============================================================================
// Fisher-Yates shuffle with seed-stable option mapping
// ============================================================================

function shuffleOptions(q: Question) {
  const idxs = q.options.map((_, i) => i);
  for (let i = idxs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
  }
  return {
    options: idxs.map((i) => q.options[i]),
    originalIndexMap: idxs, // shuffled[n] came from original[ idxs[n] ]
    correctShuffled: idxs.indexOf(q.correct),
  };
}

type ShuffledQ = Question & {
  shuffledOptions: string[];
  correctShuffled: number;
};

// ============================================================================
// Main component
// ============================================================================

type Phase = 'intro' | 'read' | 'quiz' | 'results';

export default function L1Page() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [scrollUnlocked, setScrollUnlocked] = useState(false);
  const [shuffled, setShuffled] = useState<ShuffledQ[]>([]);
  const readScrollRef = useRef<HTMLDivElement>(null);

  // Shuffle questions on quiz start
  const startQuiz = useCallback(() => {
    const q = QUESTIONS.map((base) => {
      const s = shuffleOptions(base);
      return {
        ...base,
        shuffledOptions: s.options,
        correctShuffled: s.correctShuffled,
      };
    });
    setShuffled(q);
    setAnswers({});
    setSubmitted(false);
    setPhase('quiz');
    window.scrollTo(0, 0);
  }, []);

  // Scroll gate: unlock quiz button after user scrolls 80% of the reading
  useEffect(() => {
    if (phase !== 'read') return;
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = window.scrollY + window.innerHeight;
      const total = doc.scrollHeight;
      if (total > 0 && scrolled / total >= 0.85) {
        setScrollUnlocked(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [phase]);

  const score = useMemo(() => {
    if (!submitted) return { correct: 0, total: shuffled.length, pct: 0 };
    let correct = 0;
    for (const q of shuffled) {
      if (answers[q.id] === q.correctShuffled) correct++;
    }
    return {
      correct,
      total: shuffled.length,
      pct: shuffled.length ? correct / shuffled.length : 0,
    };
  }, [submitted, answers, shuffled]);

  const passed = score.pct >= PASS_THRESHOLD;

  const allAnswered = shuffled.length > 0 && shuffled.every((q) => answers[q.id] !== undefined);

  // Save the attempt to Supabase once, when the user lands on the results screen.
  // Silent no-op if not logged in or Supabase isn't configured.
  const savedRef = useRef(false);
  useEffect(() => {
    if (phase !== 'results' || !submitted || savedRef.current) return;
    if (shuffled.length === 0) return;
    savedRef.current = true;
    (async () => {
      try {
        // Prefer Supabase Auth session; fall back to local user
        const authProfile = await syncAuthSessionToProfile();
        const user = authProfile ?? getCurrentUser();
        if (!user) return; // anonymous — don't record
        const answerPayload: Record<string, number> = {};
        for (const q of shuffled) {
          if (answers[q.id] !== undefined) answerPayload[q.id] = answers[q.id];
        }
        await saveCertAttempt({
          userId: user.id,
          certLevel: 'l1',
          correct: score.correct,
          total: score.total,
          passed,
          answers: answerPayload,
        });
      } catch (e) {
        console.warn('[L1] saveCertAttempt error', e);
      }
    })();
  }, [phase, submitted, shuffled, answers, score.correct, score.total, passed]);

  // -------------------- INTRO --------------------
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
        <BackgroundGrid />
        <Nav level="l1" />

        <div className="relative z-10 max-w-3xl mx-auto px-5 py-12 sm:py-20">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
            style={{
              background: 'rgba(0,175,81,0.1)',
              border: '1px solid rgba(0,175,81,0.25)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00af51]" />
            <span className="text-[#00af51] text-[10px] font-semibold tracking-widest uppercase">
              Level 1 Certification
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl font-black text-white mb-4 leading-[1.05]"
            style={{ fontFamily: 'var(--font-raleway)' }}
          >
            ICC Junior League{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00af51, #4ade80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Staff Certification
            </span>
          </h1>

          <p
            className="text-[#9ca3af] text-lg leading-relaxed mb-8 max-w-2xl"
            style={{ fontFamily: 'var(--font-work-sans)' }}
          >
            One document. One test. Everything you need to know before your first day at Meadowbrook.
          </p>

          <div
            className="rounded-2xl p-6 mb-6"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <h2
              className="text-lg font-bold text-white mb-3"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              How this works
            </h2>
            <ol className="space-y-3 text-[#d1d5db] text-[15px] leading-relaxed">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00af51]/15 border border-[#00af51]/40 text-[#00af51] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <span>
                  Read the full Staff Curriculum below. Take your time — you&rsquo;ll be tested on it.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00af51]/15 border border-[#00af51]/40 text-[#00af51] text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <span>Take the 20-question exam. You need 80% (16 out of 20) to pass.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00af51]/15 border border-[#00af51]/40 text-[#00af51] text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <span>
                  Pass → you&rsquo;re certified for the summer. Fail → review the curriculum and retake.
                </span>
              </li>
            </ol>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <StatPill label="Questions" value="20" />
            <StatPill label="Pass score" value="80%" />
            <StatPill label="Time" value="No limit" />
          </div>

          <button
            onClick={() => {
              setPhase('read');
              setScrollUnlocked(false);
              window.scrollTo(0, 0);
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              color: '#0d0d0d',
              letterSpacing: '2.4px',
              textTransform: 'uppercase',
              boxShadow: '0 10px 40px -10px rgba(0,175,81,0.5)',
              fontFamily: 'var(--font-raleway)',
            }}
          >
            Begin Curriculum
          </button>

          <p className="text-[#6b7280] text-xs mt-6" style={{ fontFamily: 'var(--font-work-sans)' }}>
            Coach Blaize &middot; Coach Luke &middot; Meadowbrook Tuesdays &middot; Summer
          </p>
        </div>
      </div>
    );
  }

  // -------------------- READ --------------------
  if (phase === 'read') {
    return (
      <div className="min-h-screen bg-[#0d0d0d] relative">
        <BackgroundGrid />
        <Nav level="l1" />

        <div ref={readScrollRef} className="relative z-10 max-w-3xl mx-auto px-5 py-10 sm:py-14">
          <button
            onClick={() => setPhase('intro')}
            className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#00af51] transition-colors mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>

          <div className="mb-10">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{
                background: 'rgba(0,175,81,0.1)',
                border: '1px solid rgba(0,175,81,0.25)',
              }}
            >
              <span className="text-[#00af51] text-[10px] font-semibold tracking-widest uppercase">
                Staff Curriculum
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              ICC Junior League
            </h1>
            <p
              className="text-[#9ca3af] text-base leading-relaxed"
              style={{ fontFamily: 'var(--font-work-sans)' }}
            >
              Interlachen Country Club &middot; Meadowbrook Country Club &middot; Tuesdays &middot; Summer
            </p>
            <p
              className="text-[#6b7280] text-sm mt-2"
              style={{ fontFamily: 'var(--font-work-sans)' }}
            >
              Coach Blaize &middot; Coach Luke
            </p>
          </div>

          <div className="space-y-10">
            {CURRICULUM.map((section) => (
              <SectionBlock key={section.id} section={section} />
            ))}
          </div>

          {/* Call to action */}
          <div
            className="mt-12 rounded-2xl p-6 sm:p-8"
            style={{
              background: scrollUnlocked
                ? 'linear-gradient(135deg, rgba(0,175,81,0.12), rgba(0,175,81,0.04))'
                : 'rgba(255,255,255,0.03)',
              border: scrollUnlocked
                ? '1px solid rgba(0,175,81,0.35)'
                : '1px solid rgba(255,255,255,0.08)',
              transition: 'all 300ms ease',
            }}
          >
            <h3
              className="text-xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Ready to get certified?
            </h3>
            <p className="text-[#9ca3af] text-sm mb-5" style={{ fontFamily: 'var(--font-work-sans)' }}>
              20 questions. 80% to pass. Take your time — there&rsquo;s no time limit.
            </p>
            <button
              onClick={startQuiz}
              disabled={!scrollUnlocked}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:scale-[1.02] enabled:active:scale-[0.98]"
              style={{
                background: scrollUnlocked
                  ? 'linear-gradient(135deg, #00af51, #00d466)'
                  : 'rgba(255,255,255,0.06)',
                color: scrollUnlocked ? '#0d0d0d' : '#6b7280',
                letterSpacing: '2.4px',
                textTransform: 'uppercase',
                boxShadow: scrollUnlocked ? '0 10px 40px -10px rgba(0,175,81,0.5)' : 'none',
                fontFamily: 'var(--font-raleway)',
              }}
            >
              {scrollUnlocked ? 'Take the Exam' : 'Scroll to unlock'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------- QUIZ --------------------
  if (phase === 'quiz') {
    return (
      <div className="min-h-screen bg-[#0d0d0d] relative">
        <BackgroundGrid />
        <Nav level="l1" />

        <div className="relative z-10 max-w-3xl mx-auto px-5 py-10 sm:py-14">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setPhase('read')}
              className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#00af51] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 12L6 8l4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to curriculum
            </button>
            <div
              className="text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: '#00af51', fontFamily: 'var(--font-raleway)' }}
            >
              Exam &middot; {Object.keys(answers).length}/{shuffled.length}
            </div>
          </div>

          <h1
            className="text-4xl font-black text-white mb-2"
            style={{ fontFamily: 'var(--font-raleway)' }}
          >
            L1 Exam
          </h1>
          <p
            className="text-[#9ca3af] text-sm mb-10"
            style={{ fontFamily: 'var(--font-work-sans)' }}
          >
            Pick the best answer for each question. 80% (16/20) to pass.
          </p>

          <div className="space-y-6">
            {shuffled.map((q, i) => (
              <QuestionCard
                key={q.id}
                index={i}
                question={q}
                selected={answers[q.id]}
                onSelect={(choice) => setAnswers((prev) => ({ ...prev, [q.id]: choice }))}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div
              className="text-sm text-[#9ca3af]"
              style={{ fontFamily: 'var(--font-work-sans)' }}
            >
              {allAnswered
                ? 'All questions answered. Ready to submit.'
                : `${shuffled.length - Object.keys(answers).length} question${
                    shuffled.length - Object.keys(answers).length === 1 ? '' : 's'
                  } remaining.`}
            </div>
            <button
              onClick={() => {
                setSubmitted(true);
                setPhase('results');
                window.scrollTo(0, 0);
              }}
              disabled={!allAnswered}
              className="px-8 py-4 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:scale-[1.02] enabled:active:scale-[0.98]"
              style={{
                background: allAnswered
                  ? 'linear-gradient(135deg, #00af51, #00d466)'
                  : 'rgba(255,255,255,0.06)',
                color: allAnswered ? '#0d0d0d' : '#6b7280',
                letterSpacing: '2.4px',
                textTransform: 'uppercase',
                boxShadow: allAnswered ? '0 10px 40px -10px rgba(0,175,81,0.5)' : 'none',
                fontFamily: 'var(--font-raleway)',
              }}
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------- RESULTS --------------------
  return (
    <div className="min-h-screen bg-[#0d0d0d] relative">
      <BackgroundGrid />
      <Nav level="l1" />

      <div className="relative z-10 max-w-3xl mx-auto px-5 py-10 sm:py-14">
        <div
          className="rounded-3xl p-8 sm:p-10 mb-10"
          style={{
            background: passed
              ? 'linear-gradient(135deg, rgba(0,175,81,0.18), rgba(0,175,81,0.04))'
              : 'linear-gradient(135deg, rgba(244,238,25,0.12), rgba(244,238,25,0.03))',
            border: passed
              ? '1px solid rgba(0,175,81,0.45)'
              : '1px solid rgba(244,238,25,0.35)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
            style={{
              background: passed ? 'rgba(0,175,81,0.15)' : 'rgba(244,238,25,0.12)',
              border: passed
                ? '1px solid rgba(0,175,81,0.4)'
                : '1px solid rgba(244,238,25,0.35)',
            }}
          >
            <span
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: passed ? '#4ade80' : '#f4ee19' }}
            >
              {passed ? 'Certified' : 'Needs Review'}
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl font-black text-white mb-3 leading-[1.05]"
            style={{ fontFamily: 'var(--font-raleway)' }}
          >
            {passed ? 'You Passed.' : 'Not Quite.'}
          </h1>

          <p
            className="text-[#d1d5db] text-lg leading-relaxed mb-6 max-w-xl"
            style={{ fontFamily: 'var(--font-work-sans)' }}
          >
            {passed
              ? 'You are certified for the ICC Junior League summer. Screenshot this page and send it to Coach Blaize before your first day.'
              : 'Review the curriculum, focus on the sections you missed, and retake the exam. No limit on retakes.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className="rounded-2xl px-5 py-3"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="text-[10px] uppercase tracking-widest text-[#6b7280] mb-1">Score</div>
              <div
                className="text-3xl font-black text-white"
                style={{ fontFamily: 'var(--font-raleway)' }}
              >
                {score.correct}
                <span className="text-[#6b7280]">/{score.total}</span>
              </div>
            </div>
            <div
              className="rounded-2xl px-5 py-3"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="text-[10px] uppercase tracking-widest text-[#6b7280] mb-1">Percentage</div>
              <div
                className="text-3xl font-black"
                style={{
                  color: passed ? '#4ade80' : '#f4ee19',
                  fontFamily: 'var(--font-raleway)',
                }}
              >
                {Math.round(score.pct * 100)}%
              </div>
            </div>
            <div
              className="rounded-2xl px-5 py-3"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="text-[10px] uppercase tracking-widest text-[#6b7280] mb-1">Pass Score</div>
              <div
                className="text-3xl font-black text-[#9ca3af]"
                style={{ fontFamily: 'var(--font-raleway)' }}
              >
                80%
              </div>
            </div>
          </div>
        </div>

        {/* Review */}
        <h2
          className="text-xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-raleway)' }}
        >
          Answer Review
        </h2>
        <div className="space-y-4 mb-10">
          {shuffled.map((q, i) => {
            const picked = answers[q.id];
            const right = picked === q.correctShuffled;
            return (
              <div
                key={q.id}
                className="rounded-2xl p-5"
                style={{
                  background: right ? 'rgba(0,175,81,0.05)' : 'rgba(244,238,25,0.05)',
                  border: right
                    ? '1px solid rgba(0,175,81,0.25)'
                    : '1px solid rgba(244,238,25,0.25)',
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: right ? 'rgba(0,175,81,0.2)' : 'rgba(244,238,25,0.2)',
                      color: right ? '#4ade80' : '#f4ee19',
                      fontFamily: 'var(--font-raleway)',
                    }}
                  >
                    {right ? 'CORRECT' : 'MISSED'}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-[#6b7280]">
                    Q{i + 1} &middot; {q.section}
                  </span>
                </div>
                <p
                  className="text-white text-[15px] font-semibold mb-3 leading-relaxed"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                >
                  {q.prompt}
                </p>
                <div className="space-y-1.5 mb-3">
                  {q.shuffledOptions.map((opt, oi) => {
                    const isCorrect = oi === q.correctShuffled;
                    const isPicked = oi === picked;
                    return (
                      <div
                        key={oi}
                        className="text-sm px-3 py-2 rounded-lg leading-relaxed"
                        style={{
                          background: isCorrect
                            ? 'rgba(0,175,81,0.12)'
                            : isPicked
                            ? 'rgba(244,238,25,0.08)'
                            : 'transparent',
                          border: isCorrect
                            ? '1px solid rgba(0,175,81,0.35)'
                            : isPicked
                            ? '1px solid rgba(244,238,25,0.3)'
                            : '1px solid transparent',
                          color: isCorrect ? '#d1fae5' : isPicked ? '#fef9c3' : '#9ca3af',
                          fontFamily: 'var(--font-work-sans)',
                        }}
                      >
                        {isCorrect && '✓ '}
                        {isPicked && !isCorrect && '✗ '}
                        {opt}
                      </div>
                    );
                  })}
                </div>
                <p
                  className="text-[13px] text-[#9ca3af] leading-relaxed"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  <span className="text-[#4ade80] font-semibold">Why: </span>
                  {q.explanation}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              setPhase('read');
              setAnswers({});
              setSubmitted(false);
              window.scrollTo(0, 0);
            }}
            className="px-6 py-3 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#d1d5db',
              letterSpacing: '2.4px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-raleway)',
            }}
          >
            Review Curriculum
          </button>
          <button
            onClick={() => {
              startQuiz();
            }}
            className="px-6 py-3 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #00af51, #00d466)',
              color: '#0d0d0d',
              letterSpacing: '2.4px',
              textTransform: 'uppercase',
              boxShadow: '0 10px 40px -10px rgba(0,175,81,0.5)',
              fontFamily: 'var(--font-raleway)',
            }}
          >
            Retake Exam
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl text-xs font-bold text-center transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#d1d5db',
              letterSpacing: '2.4px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-raleway)',
            }}
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

function BackgroundGrid() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,175,81,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,175,81,0.025) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0,175,81,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(244,238,25,0.03) 0%, transparent 70%)',
        }}
      />
    </>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-xl px-4 py-3 text-center"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="text-xl font-black text-white mb-0.5"
        style={{ fontFamily: 'var(--font-raleway)' }}
      >
        {value}
      </div>
      <div
        className="text-[10px] uppercase tracking-widest text-[#6b7280]"
        style={{ fontFamily: 'var(--font-work-sans)' }}
      >
        {label}
      </div>
    </div>
  );
}

function SectionBlock({ section }: { section: Section }) {
  return (
    <section
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="px-6 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <h2
          className="text-xl font-bold text-white"
          style={{ fontFamily: 'var(--font-raleway)' }}
        >
          {section.title}
        </h2>
      </div>
      <div className="px-6 py-5 space-y-4">
        {section.intro && (
          <p
            className="text-[15px] text-[#d1d5db] leading-relaxed"
            style={{ fontFamily: 'var(--font-work-sans)' }}
          >
            {section.intro}
          </p>
        )}
        {section.bullets && (
          <ul className="space-y-2">
            {section.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00af51] mt-2" />
                <span
                  className="text-[15px] text-[#d1d5db] leading-relaxed"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  {b}
                </span>
              </li>
            ))}
          </ul>
        )}
        {section.subsections && (
          <div className="space-y-5">
            {section.subsections.map((sub, i) => (
              <div key={i}>
                <h3
                  className="text-[13px] font-bold text-[#00af51] uppercase tracking-widest mb-2"
                  style={{ fontFamily: 'var(--font-raleway)' }}
                >
                  {sub.title}
                </h3>
                {sub.intro && (
                  <p
                    className="text-[15px] text-[#d1d5db] leading-relaxed mb-2"
                    style={{ fontFamily: 'var(--font-work-sans)' }}
                  >
                    {sub.intro}
                  </p>
                )}
                {sub.bullets && (
                  <ul className="space-y-2">
                    {sub.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00af51] mt-2" />
                        <span
                          className="text-[15px] text-[#d1d5db] leading-relaxed"
                          style={{ fontFamily: 'var(--font-work-sans)' }}
                        >
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function QuestionCard({
  index,
  question,
  selected,
  onSelect,
}: {
  index: number;
  question: ShuffledQ;
  selected: number | undefined;
  onSelect: (choice: number) => void;
}) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
          style={{
            background: 'rgba(0,175,81,0.15)',
            border: '1px solid rgba(0,175,81,0.3)',
            color: '#4ade80',
            fontFamily: 'var(--font-raleway)',
          }}
        >
          Q{index + 1}
        </span>
        <span className="text-[11px] uppercase tracking-widest text-[#6b7280]">
          {question.section}
        </span>
      </div>
      <p
        className="text-white text-[16px] font-semibold mb-4 leading-relaxed"
        style={{ fontFamily: 'var(--font-raleway)' }}
      >
        {question.prompt}
      </p>
      <div className="space-y-2">
        {question.shuffledOptions.map((opt, oi) => {
          const isSelected = selected === oi;
          return (
            <button
              key={oi}
              onClick={() => onSelect(oi)}
              className="w-full text-left text-[14px] px-4 py-3 rounded-xl transition-all leading-relaxed"
              style={{
                background: isSelected ? 'rgba(0,175,81,0.12)' : 'rgba(255,255,255,0.02)',
                border: isSelected
                  ? '1px solid rgba(0,175,81,0.45)'
                  : '1px solid rgba(255,255,255,0.08)',
                color: isSelected ? '#d1fae5' : '#d1d5db',
                fontFamily: 'var(--font-work-sans)',
              }}
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: isSelected ? '#00af51' : 'rgba(255,255,255,0.06)',
                    color: isSelected ? '#0d0d0d' : '#6b7280',
                    fontFamily: 'var(--font-raleway)',
                  }}
                >
                  {String.fromCharCode(65 + oi)}
                </span>
                <span>{opt}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
