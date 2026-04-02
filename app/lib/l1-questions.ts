export interface CertQuestion {
  id: string;
  section: string;
  sectionName: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string; // label of correct option (will be reshuffled on load)
  explanation: string;
}

export const L1_QUESTIONS: CertQuestion[] = [
  // SECTION A: SAFETY
  {
    id: 'l1_a1',
    section: 'A',
    sectionName: 'Safety — Circle of Safety and Equipment',
    question: 'You are assisting at Meadowbrook on Tuesday. A junior is about to swing and another child is standing approximately two steps away. What is the correct action?',
    options: [
      { label: 'A', text: 'Stop the swing immediately — call "FREEZE" and ensure the area is clear before anyone swings' },
      { label: 'B', text: 'Watch to see if the child moves on their own before stepping in' },
      { label: 'C', text: 'Remind the child who is too close to step back after the swing is finished' },
      { label: 'D', text: 'Tell the junior about to swing to wait until their partner moves' },
    ],
    correctAnswer: 'A',
    explanation: 'Safety stops happen before the swing. Every other option delays or misses the intervention window.',
  },
  {
    id: 'l1_a2',
    section: 'A',
    sectionName: 'Safety — Circle of Safety and Equipment',
    question: 'What does the ICC Circle of Safety require?',
    options: [
      { label: 'A', text: 'Students must remain within a 10-foot radius of the instructor at all times' },
      { label: 'B', text: 'Students must stand behind a cone marking their hitting station' },
      { label: 'C', text: 'No one may be within 3 full steps in any direction of a student who is swinging' },
      { label: 'D', text: 'Students must call out before swinging so others can clear the area' },
    ],
    correctAnswer: 'C',
    explanation: '3 full steps in any direction — no exceptions, no partial compliance.',
  },
  {
    id: 'l1_a3',
    section: 'A',
    sectionName: 'Safety — Circle of Safety and Equipment',
    question: 'A junior picks up their club and begins walking to the next station holding it horizontally at chest height. What should you do?',
    options: [
      { label: 'A', text: 'Nothing — horizontal carrying is safe as long as the student is walking, not running' },
      { label: 'B', text: 'Ask them to set the club down and carry it by hand from a different point' },
      { label: 'C', text: 'Redirect them: clubs are carried with the head pointing down, or under the arm with the head behind the body' },
      { label: 'D', text: 'Tell them to carry it with two hands at the grip end only' },
    ],
    correctAnswer: 'C',
    explanation: 'Head down or tucked under the arm behind the body — horizontal carrying is a hazard to people at chest height.',
  },
  {
    id: 'l1_a4',
    section: 'A',
    sectionName: 'Safety — Circle of Safety and Equipment',
    question: 'During an outdoor session the weather horn sounds. What do you do?',
    options: [
      { label: 'A', text: 'Look for lightning before deciding whether to move — one horn may be a false alarm' },
      { label: 'B', text: 'Move all juniors to a safe shelter immediately and contact parents. Do not wait or assess.' },
      { label: 'C', text: 'Finish the current activity, then move everyone to the clubhouse' },
      { label: 'D', text: 'Ask the lead instructor what they want to do before acting' },
    ],
    correctAnswer: 'B',
    explanation: 'When the horn sounds, you move. No assessment, no waiting for the lead instructor.',
  },
  {
    id: 'l1_a5',
    section: 'A',
    sectionName: 'Safety — Circle of Safety and Equipment',
    question: 'A junior is frustrated after a missed shot and throws their club on the ground. What is the correct response?',
    options: [
      { label: 'A', text: 'Ignore it — frustration is developmentally normal and public correction may embarrass the child' },
      { label: 'B', text: 'Give the junior a 60-second cool-down before addressing the behavior' },
      { label: 'C', text: 'Stop play, have the junior pick up the club, and say calmly: "We don\'t throw clubs. Ever." Then resume.' },
      { label: 'D', text: 'Report the behavior to the lead instructor after the session is over' },
    ],
    correctAnswer: 'C',
    explanation: 'Immediate, calm, non-negotiable. The one-sentence rule is standard ICC protocol.',
  },
  {
    id: 'l1_a6',
    section: 'A',
    sectionName: 'Safety — Circle of Safety and Equipment',
    question: 'The heat index is 95°F. Which protocol is correct?',
    options: [
      { label: 'A', text: 'Cancel the session — any heat index above 90°F requires cancellation' },
      { label: 'B', text: 'Run a normal session with water available on request' },
      { label: 'C', text: 'Mandatory water break every 15 minutes, activities moved to shade between breaks, session shortened if possible' },
      { label: 'D', text: 'Move to an indoor facility only if the lead instructor makes that call' },
    ],
    correctAnswer: 'C',
    explanation: 'Water every 15 min, shade, shorten — three components, all required.',
  },

  // SECTION B: COURSE ETIQUETTE
  {
    id: 'l1_b1',
    section: 'B',
    sectionName: 'Course Etiquette',
    question: "A junior's shot leaves a ball mark (pitch mark) on the putting green. They pick up their ball and walk toward the next hole without fixing it. What do you do?",
    options: [
      { label: 'A', text: 'Fix it yourself to keep the session moving efficiently' },
      { label: 'B', text: "Let it go — ball mark repair is the maintenance crew's responsibility, not juniors'" },
      { label: 'C', text: 'Note it and mention it in the end-of-session debrief so as not to interrupt play' },
      { label: 'D', text: 'Remind the junior that ball marks should be repaired before moving on, and show them how if needed' },
    ],
    correctAnswer: 'D',
    explanation: 'Teach and show — this is a teaching moment, not something to skip or defer.',
  },
  {
    id: 'l1_b2',
    section: 'B',
    sectionName: 'Course Etiquette',
    question: 'A group of juniors finishes a bunker shot and moves to the green without raking. What is the correct response?',
    options: [
      { label: 'A', text: "Rake it yourself — pace of play matters more than etiquette at this age" },
      { label: 'B', text: 'Remind the juniors to rake the bunker and guide them through it if they don\'t know how' },
      { label: 'C', text: 'Only require raking if the lead instructor specifically asks you to focus on etiquette today' },
      { label: 'D', text: 'Wait and see if they remember next time — one reminder per session is sufficient' },
    ],
    correctAnswer: 'B',
    explanation: 'Remind and guide every time — etiquette standards do not have off days.',
  },
  {
    id: 'l1_b3',
    section: 'B',
    sectionName: 'Course Etiquette',
    question: 'Which of the following correctly describes "Honors" in golf?',
    options: [
      { label: 'A', text: 'The player with the lowest handicap always tees off first regardless of previous scores' },
      { label: 'B', text: 'Players alternate tee order each hole to keep it fair' },
      { label: 'C', text: 'The player who scored best on the previous hole tees off first on the next hole' },
      { label: 'D', text: 'The youngest player in the group tees off first' },
    ],
    correctAnswer: 'C',
    explanation: 'Honors = best score on the previous hole earns the tee.',
  },
  {
    id: 'l1_b4',
    section: 'B',
    sectionName: 'Course Etiquette',
    question: 'A junior is putting and another junior is standing directly behind the hole, in the line of the putt, talking to a friend. What is the etiquette issue and how do you handle it?',
    options: [
      { label: 'A', text: 'No issue — standing behind the hole is acceptable during casual play for this age group' },
      { label: 'B', text: 'Quietly redirect the standing junior to move out of the putting line and wait off the green until it is their turn' },
      { label: 'C', text: 'Ask both juniors to stop and run a full lesson on putting etiquette rules' },
      { label: 'D', text: 'Note it for the end-of-session debrief but don\'t interrupt play' },
    ],
    correctAnswer: 'B',
    explanation: 'Quiet redirection in the moment — no lecture, no delay, no ignoring.',
  },

  // SECTION C: PACE OF PLAY
  {
    id: 'l1_c1',
    section: 'C',
    sectionName: 'Pace of Play',
    question: 'Which best describes "ready golf" and when it is appropriate?',
    options: [
      { label: 'A', text: 'Players do extra warm-up practice swings so they are fully ready when it is their turn' },
      { label: 'B', text: 'The player who is physically ready to hit does so regardless of who is technically "away" — used to keep pace when play is slow' },
      { label: 'C', text: 'All players hit simultaneously from the tee box to reduce waiting' },
      { label: 'D', text: 'The group leader decides the order of play to maximize efficiency' },
    ],
    correctAnswer: 'B',
    explanation: 'Ready golf = whoever is ready goes — used specifically to manage slow play.',
  },
  {
    id: 'l1_c2',
    section: 'C',
    sectionName: 'Pace of Play',
    question: 'A group of juniors is consistently falling behind the group ahead of them. Between holes, they are chatting and slowly looking for a lost ball. What is the most appropriate helper action?',
    options: [
      { label: 'A', text: 'Let them take their time — enjoyment matters more than pace for this age group' },
      { label: 'B', text: 'Tell them to stop looking for the ball immediately and move to the next hole' },
      { label: 'C', text: 'Gently encourage the group to keep moving, suggest one more minute on the ball search, then move on — and remind them to be ready to hit when they reach the next hole' },
      { label: 'D', text: 'Inform the lead instructor and defer entirely to their judgment' },
    ],
    correctAnswer: 'C',
    explanation: 'Gentle encouragement + time limit + forward reminder — the three-part pace response.',
  },
  {
    id: 'l1_c3',
    section: 'C',
    sectionName: 'Pace of Play',
    question: 'A junior takes 4–5 practice swings before every shot and the group is falling behind. How do you address this?',
    options: [
      { label: 'A', text: 'Say nothing — practice swings are part of the game and should never be discouraged' },
      { label: 'B', text: 'Privately and kindly suggest one practice swing maximum, framing it as what players do on a real course' },
      { label: 'C', text: 'Tell them practice swings are prohibited during play' },
      { label: 'D', text: 'Ask the lead instructor to handle it — swing habits are an instruction issue outside helper scope' },
    ],
    correctAnswer: 'B',
    explanation: 'Private, kind, one swing max, framed as real-course standard — not prohibition, not deferral.',
  },
  {
    id: 'l1_c4',
    section: 'C',
    sectionName: 'Pace of Play',
    question: "Which of the following is within a helper's pace-of-play responsibilities on the course?",
    options: [
      { label: 'A', text: 'Enforcing stroke penalties for slow play' },
      { label: 'B', text: 'Keeping official stroke scores for each junior in the group' },
      { label: 'C', text: 'Encouraging players to be ready to hit when it is their turn and to keep up with the group ahead' },
      { label: 'D', text: 'Deciding when two groups should merge to improve pace' },
    ],
    correctAnswer: 'C',
    explanation: 'Encouragement and readiness reminders — helpers do not enforce penalties or make operational decisions.',
  },

  // SECTION D: PROFESSIONAL CONDUCT
  {
    id: 'l1_d1',
    section: 'D',
    sectionName: 'Professional Conduct',
    question: 'A parent asks you after a session what drills their child should be doing at home to improve. How do you respond?',
    options: [
      { label: 'A', text: 'Offer your best recommendation based on what you observed during the session' },
      { label: 'B', text: 'Explain that instruction is outside the helper role and direct them to the lead instructor or Luke Benoit' },
      { label: 'C', text: 'Tell them to purchase The Golf Textbook for a full home practice program' },
      { label: 'D', text: 'Say you are not sure and redirect the conversation to scheduling' },
    ],
    correctAnswer: 'B',
    explanation: 'Instruction — even at the parent level — goes through the lead instructor or Luke Benoit.',
  },
  {
    id: 'l1_d2',
    section: 'D',
    sectionName: 'Professional Conduct',
    question: 'During a session a junior uses inappropriate language. You are the only staff member nearby. What is the correct response?',
    options: [
      { label: 'A', text: 'Ignore it — correcting language is outside the helper role and could embarrass the child' },
      { label: 'B', text: 'Wait until the lead instructor is nearby and report it then' },
      { label: 'C', text: 'Calmly and privately address the junior: "We don\'t use that language here. Let\'s keep it respectful." Then move on without making it a big moment.' },
      { label: 'D', text: "Ask the child's parent to address it directly" },
    ],
    correctAnswer: 'C',
    explanation: 'Calm, private, one sentence, move on — no scene, no deferral.',
  },
  {
    id: 'l1_d3',
    section: 'D',
    sectionName: 'Professional Conduct',
    question: 'Which of the following is something a Level 1 Helper is authorized to do?',
    options: [
      { label: 'A', text: 'Demonstrate correct grip technique to a junior who is struggling' },
      { label: 'B', text: 'Change the drill or activity a junior is working on if they appear bored' },
      { label: 'C', text: 'Encourage a junior verbally after a missed shot: "Great try — keep going"' },
      { label: 'D', text: 'Give a junior feedback on their swing path after observing several shots' },
    ],
    correctAnswer: 'C',
    explanation: 'Verbal encouragement only — no instruction, no drill changes.',
  },
  {
    id: 'l1_d4',
    section: 'D',
    sectionName: 'Professional Conduct',
    question: 'A junior arrives visibly upset — they had an argument with a parent on the way to the session. How do you handle this?',
    options: [
      { label: 'A', text: 'Ask them what happened so you understand the full context of the situation' },
      { label: 'B', text: 'Tell them to put it aside and focus on golf — the session is a fresh start for everyone' },
      { label: 'C', text: 'Contact the parent immediately to resolve the conflict before the session begins' },
      { label: 'D', text: 'Give them space and a low-pressure role in the first activity. Check in quietly after a few minutes. Report to the lead instructor if the child remains distressed.' },
    ],
    correctAnswer: 'D',
    explanation: 'Space first, quiet check-in, report if needed — not interrogation, not dismissal.',
  },

  // SECTION E: PEER SUPPORT AND INCLUSION
  {
    id: 'l1_e1',
    section: 'E',
    sectionName: 'Peer Support and Inclusion',
    question: 'A junior is consistently left out by the other kids — participating in drills but clearly isolated socially. What is the most appropriate helper response?',
    options: [
      { label: 'A', text: 'Leave it alone — social dynamics work themselves out among kids' },
      { label: 'B', text: 'Publicly praise the isolated junior in front of the group to draw positive attention to them' },
      { label: 'C', text: 'Create a structured pairing or small group activity that naturally includes the junior, and check in with the lead instructor after the session' },
      { label: 'D', text: 'Speak to the other kids during the session debrief about being more inclusive' },
    ],
    correctAnswer: 'C',
    explanation: 'Structure inclusion naturally and report — no public spotlight, no peer lectures.',
  },
  {
    id: 'l1_e2',
    section: 'E',
    sectionName: 'Peer Support and Inclusion',
    question: 'A junior just missed a short putt. Which response best reflects effort-focused encouragement?',
    options: [
      { label: 'A', text: "Don't worry — it happens to everyone out here." },
      { label: 'B', text: "You almost had it — you'll make the next one for sure." },
      { label: 'C', text: 'Nice try! I could see you were really focused on your line.' },
      { label: 'D', text: 'That looked close — you need to work on your speed control.' },
    ],
    correctAnswer: 'C',
    explanation: 'C names a specific process behavior. A and B are generic sympathy/prediction. D introduces technical correction outside helper scope.',
  },
  {
    id: 'l1_e3',
    section: 'E',
    sectionName: 'Peer Support and Inclusion',
    question: 'A junior is persistently disruptive despite multiple reminders — talking during swings, wandering from stations, ignoring the Circle of Safety. What is the correct escalation path?',
    options: [
      { label: 'A', text: 'Remove the child from the session and call their parent' },
      { label: 'B', text: 'Continue with repeated reminders — persistent behavior in children requires persistent coaching' },
      { label: 'C', text: 'Pair the child with you for direct supervision for the rest of the session without informing the lead instructor' },
      { label: 'D', text: 'Document the specific behaviors and inform the lead instructor immediately so they can assess and act' },
    ],
    correctAnswer: 'D',
    explanation: 'Document and escalate — helpers do not remove children or make operational decisions unilaterally.',
  },
  {
    id: 'l1_e4',
    section: 'E',
    sectionName: 'Peer Support and Inclusion',
    question: "According to SDT research, which of the following coaching behaviors most reliably increases a junior's intrinsic motivation to return next session?",
    options: [
      { label: 'A', text: 'Awarding visible prizes to the top performers in each session game' },
      { label: 'B', text: 'Using autonomy-supportive language: offering bounded choices and explaining the rationale for activities' },
      { label: 'C', text: 'Keeping sessions highly structured with no deviation to prevent confusion' },
      { label: 'D', text: 'Praising effort only — never acknowledging outcomes or scores' },
    ],
    correctAnswer: 'B',
    explanation: 'Autonomy-supportive language — bounded choices + rationale — is the SDT-backed driver of intrinsic motivation.',
  },

  // SECTION F: BASIC RULES AND COURSE MANAGEMENT
  {
    id: 'l1_f1',
    section: 'F',
    sectionName: 'Basic Rules and Course Management',
    question: "A junior's tee shot goes out of bounds. What is the correct procedure under the rules of golf?",
    options: [
      { label: 'A', text: 'Drop a ball at the point where it crossed out of bounds and add one penalty stroke' },
      { label: 'B', text: 'Drop anywhere in the general area of the fairway with a one-stroke penalty' },
      { label: 'C', text: 'Replay the tee shot with no penalty on the first offense in junior play' },
      { label: 'D', text: 'Play a provisional ball from the tee before searching — if the original is confirmed out of bounds, play the provisional with a stroke-and-distance penalty' },
    ],
    correctAnswer: 'D',
    explanation: 'Provisional ball from the tee, stroke-and-distance — the rules of golf apply regardless of age.',
  },
  {
    id: 'l1_f2',
    section: 'F',
    sectionName: 'Basic Rules and Course Management',
    question: 'As a helper walking with a group on the course, where should you stand while a junior hits a shot?',
    options: [
      { label: 'A', text: 'Directly behind the player so you can observe their swing and give feedback afterward' },
      { label: 'B', text: 'To the side and slightly ahead, out of the player\'s peripheral vision and clear of the ball flight path' },
      { label: 'C', text: 'Behind the entire group, at least 20 yards back to allow maximum safety clearance' },
      { label: 'D', text: "Position does not matter for helpers — safety positioning is the lead instructor's responsibility" },
    ],
    correctAnswer: 'B',
    explanation: 'Side and slightly ahead — visible to the player, clear of ball flight.',
  },
];

export const L1_SECTIONS = [
  { id: 'A', name: 'Safety — Circle of Safety and Equipment', maxPoints: 20 },
  { id: 'B', name: 'Course Etiquette', maxPoints: 13.32 },
  { id: 'C', name: 'Pace of Play', maxPoints: 13.32 },
  { id: 'D', name: 'Professional Conduct', maxPoints: 13.32 },
  { id: 'E', name: 'Peer Support and Inclusion', maxPoints: 13.32 },
  { id: 'F', name: 'Basic Rules and Course Management', maxPoints: 6.66 },
];

export const L1_ESSAYS = [
  {
    id: 'l1_essay_1',
    title: 'The Scope of the Helper Role',
    prompt: `A 16-year-old helper at Meadowbrook watches a 9-year-old junior consistently hitting shots off the toe of the club. The helper played competitive junior golf and knows exactly what the fix is. They feel strongly that one quick tip would really help this kid. Describe: (1) what the helper should do in this moment, (2) why the boundary between helper and instructor exists, and (3) one specific thing the helper CAN do to support this junior without crossing into instruction.`,
    wordLimit: 200,
    gradingCriteria: [
      'Clear statement that the helper should NOT provide swing instruction or technique feedback, even briefly',
      'At least one reason the boundary matters (role clarity, student receives conflicting information, liability, trust, or consistency)',
      'A specific appropriate alternative action (encouragement, reporting to lead instructor, equipment help, or emotional support — must be concrete, not vague)',
      'Recognition that the helper\'s golf knowledge is irrelevant to the decision — the role defines the action, not the knowledge level',
    ],
    passThreshold: 7,
  },
  {
    id: 'l1_essay_2',
    title: 'Managing a Conflict on Course',
    prompt: `During a Tuesday session at Meadowbrook, two juniors in your group get into an argument about whose turn it is to hit. One becomes visibly upset and says they want to go home. The lead instructor is at the other end of the course. The rest of the group is watching. Describe step by step what you do in the first two minutes, what you would NOT do, and how you handle the rest of the group while managing this situation.`,
    wordLimit: 200,
    gradingCriteria: [
      'Immediate de-escalation without taking sides in the argument',
      'Brief space or separation for the upset child — not dismissal, but giving them a moment',
      'Explicit plan for the rest of the group: keeping them engaged and not spectating',
      'Plan to notify the lead instructor',
    ],
    passThreshold: 7,
  },
];

export const L1_MC_POINTS = 80 / 24; // ≈ 3.33 per question
export const L1_ESSAY_POINTS = 10; // per essay
export const L1_PASS_THRESHOLD = 80;
export const L1_TIME_LIMIT = 45 * 60; // 45 minutes in seconds
