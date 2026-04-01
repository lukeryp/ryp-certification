import { EssayQuestion } from './types';

export const ESSAY_QUESTIONS: EssayQuestion[] = [
  // Chapter 0: The Prior Problem
  {
    id: "ch0_essay_1",
    chapter: 0,
    title: "The Prediction Machine",
    prompt: `The chapter argues that the human brain is fundamentally a prediction machine — that before you consciously experience anything, your brain has already generated a model of what that thing is, based on everything you've experienced before.

In your own words, explain what a prior is and how one forms. Where did the prior you brought to golf come from? What experiences, sports, and learning environments built it — and why did those experiences make the prior feel not just reasonable, but obviously correct?

Then answer this: the chapter says priors are "in almost every domain of human experience, the most valuable cognitive asset you possess." Name two domains where your priors serve you extremely well. Then explain what specific properties of golf make the same cognitive mechanism — the one that helps you in those other domains — actively work against you here.`,
    wordLimit: 300,
    gradingCriteria: [
      "Correctly defines a prior as a brain-generated predictive model based on accumulated experience",
      "Identifies personal sources of their golf prior (other sports, school, general learning experiences)",
      "Explains why the prior felt correct — because it IS correct in most domains",
      "Names two specific domains where priors work well with concrete reasoning",
      "Identifies golf-specific properties that break the prior: unreliable feedback, luck/skill confusion, inverse relationship between monitoring and execution",
    ],
  },
  {
    id: "ch0_essay_2",
    chapter: 0,
    title: "The Prior Itself",
    prompt: `The chapter names the golf prior explicitly:

"Practice feels like improvement. Improvement feels like good shots. Good shots come from repeating what works. Find what works and repeat it."

This prior is described as "not stupid" — constructed on legitimate evidence from your own life. Explain why it works in most learning environments. What properties does driving a car, learning to type, or learning to cook share that make this prior approximately correct in those contexts?

Then identify the three specific properties of golf that make this prior systematically counterproductive. Be precise — the chapter names each one. Don't summarize. Explain the mechanism behind each.`,
    wordLimit: 300,
    gradingCriteria: [
      "Explains why the prior works in most domains: reliable feedback, clear cause-effect, practice correlates with improvement",
      "Identifies shared properties of car/typing/cooking: immediate feedback, consistent outcomes, skill distinguishable from luck",
      "Names the three golf-specific properties that break the prior",
      "Explains the mechanism behind each property, not just naming them",
      "Demonstrates understanding that the prior is rational but misapplied, not simply wrong",
    ],
  },
  {
    id: "ch0_essay_3",
    chapter: 0,
    title: "The 0.0005-Second Window",
    prompt: `The chapter makes a very specific claim about golf's feedback problem: the ball reports only what happened at impact, in a window lasting 0.0005 seconds, at the end of a downswing the conscious mind cannot control.

Explain why this makes golf's feedback uniquely unreliable as a learning signal during construction. What does a flush 7-iron actually tell you during a practice session where you're attempting to change your swing? What does a shank tell you? Why are both signals the opposite of what the prior interprets them to be?

Application question: A student has been working on a new impact position for two weeks. Last Tuesday they hit the ball beautifully for forty minutes. They came to the lesson feeling confident the change had taken hold. You watch them on video and the new position isn't there. Using the 0.0005-second feedback argument, explain exactly what happened during that forty-minute session — and why the student's confidence is the most reliable indicator that the change didn't take.`,
    wordLimit: 300,
    gradingCriteria: [
      "Explains that the feedback window is too short for conscious control — ball flight reflects impact, not process",
      "Correctly interprets the flush 7-iron during construction: likely means the OLD pattern fired, not the new one",
      "Correctly interprets the shank during construction: likely means the new pattern IS firing but hasn't consolidated",
      "Applies this to the scenario: the student's great session was the old pattern winning, not the new one taking hold",
      "Explains why confidence is a contra-indicator: comfort means the familiar pattern, not the new one",
    ],
  },
  {
    id: "ch0_essay_4",
    chapter: 0,
    title: "Luck, Skill, and the Neurological Lie",
    prompt: `The chapter identifies something specific about golf that no other major sport shares: a complete beginner with a technically catastrophic swing can, on a single shot, produce the same result as the best player in the world.

Explain why this property of golf is particularly destructive for the brain's learning system. What does the brain do when it can't distinguish luck from skill? Why does a single lucky outcome carry disproportionate neurological weight compared to a hundred technically correct but poorly struck shots?

The harder question: The chapter says "the outcome was real. The lesson it taught was a lie." This is one of the most important sentences in the chapter. Unpack it fully. What is the difference between an outcome being real and the lesson it teaches being true? Can you construct a parallel example from outside golf where the same dynamic operates — where a real result teaches a false lesson?`,
    wordLimit: 300,
    gradingCriteria: [
      "Explains that when luck and skill produce identical outcomes, the brain cannot learn which is which",
      "Identifies disproportionate weight of lucky outcomes: the brain encodes the emotional/sensory experience of success",
      "Unpacks 'outcome was real, lesson was a lie': the ball went straight (real) but the swing that produced it was not repeatable (lie)",
      "Constructs a valid parallel example from outside golf showing real outcome / false lesson",
      "Demonstrates understanding of why this is uniquely destructive compared to sports with more reliable feedback",
    ],
  },
  {
    id: "ch0_essay_5",
    chapter: 0,
    title: "The Inverse Relationship",
    prompt: `The chapter makes its most counterintuitive claim here:

"There is likely an inverse relationship between your most technically correct swing and your best ball striking."

This claim has a specific mechanism behind it. Explain it. Why does deliberate monitoring — the attentional state required to build a swing — disrupt fluid motor execution? What does this mean for the golfer who leaves a range session feeling like they were "in control" the whole time?

Then answer the practical question this raises: if your best ball-striking sessions are probably the ones where the old pattern is winning, and your worst ball-striking sessions are probably the ones where the new pattern is actually firing — how should a golfer interpret a difficult, inconsistent practice session? What does that session actually mean?`,
    wordLimit: 300,
    gradingCriteria: [
      "Explains the mechanism: deliberate monitoring competes for attentional resources needed for fluid motor execution",
      "Identifies that 'in control' feeling means conscious override, which disrupts automaticity",
      "Correctly reframes good ball-striking sessions as potentially the old pattern winning",
      "Correctly reframes bad/inconsistent sessions as potentially the new pattern attempting to fire",
      "Demonstrates practical understanding: a difficult session during construction is likely a sign of progress, not regression",
    ],
  },
  {
    id: "ch0_essay_6",
    chapter: 0,
    title: "The Lesson Tee Architecture",
    prompt: `The chapter is careful not to blame teaching professionals — it explicitly says most are "deeply knowledgeable, invested in their students, working as hard as they know how." But it makes a structural argument about why the lesson tee evolved the way it did.

Explain the structural argument. What forces shaped the lesson tee toward optimizing for the lesson hour rather than for long-term transfer? What does "the shot that worked before you left" actually measure — and why is that measurement seductive for both the instructor and the student?

The philosophical extension: The chapter argues that the instruction culture "inherited an architecture they didn't design and mostly didn't question." As a teaching professional, what does it mean to inherit an architecture? What are the specific ways that institutional inheritance shapes what you count as a successful lesson — and how would you know if your definition of success was producing exactly what the chapter describes?`,
    wordLimit: 300,
    gradingCriteria: [
      "Identifies structural forces: economic model (hourly billing), student satisfaction, visible progress within the session",
      "Explains what 'the shot that worked before you left' measures: short-term compliance, not durable transfer",
      "Explains why it's seductive: both instructor and student get immediate positive feedback",
      "Demonstrates understanding of 'inherited architecture': systemic patterns passed down without examination",
      "Reflects on how institutional inheritance shapes success metrics in their own teaching",
    ],
  },
  {
    id: "ch0_essay_7",
    chapter: 0,
    title: "The Scroll",
    prompt: `The chapter makes a precise and damaging claim about social media instruction:

"The scroll is not teaching you golf. It is teaching you to need the scroll."

This is a mechanism claim, not a volume claim. It's not saying there's too much information — it's saying the consumption pattern itself produces a specific neurological outcome. Explain that outcome. What happens to the brain's pattern consolidation system when new competing swing cues arrive faster than any single one can be encoded? What is the brain actually learning to do when it processes Tuesday's secret move and Thursday's feel-that-changes-everything?

Then answer this: A student tells you they've spent two years watching golf instruction on YouTube every day. They're a 16-handicap who has been a 16-handicap for those two years. Before you've seen them hit a single ball, what would you predict about their practice behavior? What specific patterns would you expect to find?`,
    wordLimit: 300,
    gradingCriteria: [
      "Distinguishes mechanism claim from volume claim: the issue is the consumption pattern, not the amount",
      "Explains pattern consolidation disruption: new cues arrive before prior cues can encode",
      "Identifies what the brain actually learns: to consume and seek novelty, not to encode and consolidate",
      "Predicts specific practice patterns for the YouTube student: constant tip-chasing, no sustained protocol, frequent resets",
      "Demonstrates understanding that the scroll creates dependency on consumption, not skill development",
    ],
  },
  {
    id: "ch0_essay_8",
    chapter: 0,
    title: "The Ego's Defense",
    prompt: `The chapter's argument about the ego is precise enough to be testable:

"The ego doesn't resist change by announcing itself. It doesn't say 'I'm afraid' or 'I don't want to start over.' It post-rationalizes. It constructs, in real time, a story about why what just happened was fine."

Describe a specific moment on the range — in granular detail — where this post-rationalization process would be completely indistinguishable from honest assessment. What does the shank look like when the ego interprets it versus when the prior is genuinely updating? What does the flush shot look like under each interpretation? What internal signal — if any — could help a golfer tell the difference from the inside?

The deeper question: The chapter argues that every expert golfer who built something real developed the ability to watch their own thinking — to notice the post-rationalization as it formed. What does "noticing" actually require? Is it a different kind of attention? A different relationship to discomfort? Something else?`,
    wordLimit: 300,
    gradingCriteria: [
      "Describes a specific, granular range scenario — not a generic example",
      "Shows how ego interpretation and honest assessment produce identical-seeming internal narratives",
      "Contrasts ego vs. genuine interpretation of both a shank and a flush shot",
      "Addresses whether an internal signal exists to distinguish the two (the chapter suggests this is extremely difficult)",
      "Explains what 'noticing' requires: metacognitive awareness, comfort with discomfort, observing thought without acting on it",
    ],
  },
  {
    id: "ch0_essay_9",
    chapter: 0,
    title: "Metacognition as a Skill",
    prompt: `The chapter makes a claim that's easy to read past:

"That capacity — metacognition, the ability to think about your own thinking — is not a personality trait. It is a skill. And like every skill in this book, it can be trained."

This claim has significant implications for instruction. If metacognition is trainable, then the golfer who seems constitutionally unable to observe their own thinking without ego interference isn't a lost cause — they're undertrained in a specific skill. What would training metacognition actually look like in a practice context? What's the rep? What does failure look like, and what does improvement look like?

Then answer this: The chapter says the hardest part of the process is "what your ego does when the protocol stops feeling good." Why is that specific moment — when the protocol stops feeling good — the highest-risk point for prior reversion? What is the ego responding to? And what would a golfer need to have developed, in advance, to navigate that moment without abandoning the protocol?`,
    wordLimit: 300,
    gradingCriteria: [
      "Treats metacognition as a trainable skill, not an innate trait",
      "Proposes concrete 'reps' for training metacognition in practice (observation exercises, thought logging, etc.)",
      "Describes what failure and improvement in metacognition actually look like",
      "Explains why 'protocol stops feeling good' is the highest-risk moment: discomfort triggers ego defense",
      "Identifies what needs to be developed in advance: pre-commitment, awareness of the pattern, tolerance for discomfort",
    ],
  },
  {
    id: "ch0_essay_10",
    chapter: 0,
    title: "The Honest Admission",
    prompt: `The chapter ends with something rare in instruction writing:

"This book is incomplete. Not because of what was left out — though plenty was. Incomplete in the way that every honest contribution to a living field is incomplete."

This is both a philosophical and a professional statement. The chapter names Jones, Penick, and Hogan — giants who worked with what existed — and positions this book as the current best answer to a question that will keep being asked.

What does it mean to hold a framework with that kind of epistemic posture — confident enough to present it, honest enough to acknowledge its edges? How is that different from either dogma ("this is the right way") or relativism ("every method is equally valid")?

The final question, and the one this chapter is ultimately asking: The prior said you've been doing it right. The chapter's last line is: "You haven't. Almost nobody has." If that's true — if the prior has been wrong, quietly and completely, for your entire golfing life — what does that mean for how you read everything that follows? And more uncomfortably: where else in your professional or personal life might a prior be running unchecked, rewarded by exactly the wrong feedback signal, hardening invisibly into something that feels like reality?`,
    wordLimit: 300,
    gradingCriteria: [
      "Distinguishes epistemic humility from both dogma and relativism",
      "Explains what it means to hold a framework as 'current best answer' rather than final truth",
      "Engages with the personal challenge: if the prior was wrong about golf, where else might it be wrong?",
      "Demonstrates willingness to apply the chapter's argument reflexively to their own professional practice",
      "Shows understanding that the chapter is setting up a posture for reading the rest of the book, not just making an argument",
    ],
  },
];

export function getChapterEssayQuestions(chapter: number): EssayQuestion[] {
  return ESSAY_QUESTIONS.filter(q => q.chapter === chapter);
}

export const ESSAY_PASS_THRESHOLD = 7; // Average score of 7/10 required
