import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

/** Maximum character lengths accepted for each string field (H-1). */
const MAX_RESPONSE_CHARS = 10_000;
const MAX_FIELD_CHARS = 2_000;

/** Valid certification levels (H-2: runtime enum guard). */
const VALID_LEVELS = ['l1', 'l2'] as const;
type Level = (typeof VALID_LEVELS)[number];

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
  }

  let body: {
    level: Level;
    essayId: string;
    title: string;
    prompt: string;
    gradingCriteria: string[];
    response: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { level, title, prompt, gradingCriteria, response } = body;

  if (!prompt || !response || !level) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // H-2: Validate level is a known enum value at runtime
  if (!(VALID_LEVELS as readonly string[]).includes(level)) {
    return NextResponse.json({ error: 'level must be "l1" or "l2"' }, { status: 400 });
  }

  // H-1: Enforce input length limits to prevent quota abuse
  if (typeof response !== 'string' || response.length > MAX_RESPONSE_CHARS) {
    return NextResponse.json({ error: `Response must not exceed ${MAX_RESPONSE_CHARS} characters` }, { status: 400 });
  }
  if (typeof prompt !== 'string' || prompt.length > MAX_FIELD_CHARS) {
    return NextResponse.json({ error: `Prompt must not exceed ${MAX_FIELD_CHARS} characters` }, { status: 400 });
  }

  if (response.trim().split(/\s+/).length < 20) {
    return NextResponse.json({ error: 'Response too short to grade' }, { status: 400 });
  }

  const levelLabel = level === 'l1' ? 'Level 1 — Junior Golf Helper (JGH)' : 'Level 2 — Instructor Certification (ICC)';

  const criteriaList = Array.isArray(gradingCriteria)
    ? gradingCriteria.slice(0, 20).map((c, i) => `${i + 1}. ${String(c).slice(0, 500)}`).join('\n')
    : '';

  const systemPrompt = `You are grading a written essay response for the Interlachen Country Club Junior Golf Staff Certification — ${levelLabel}.

This is a professional staff certification exam. Your grading must be rigorous, specific, and educational. Every score must be defensible against the rubric criteria.

ESSAY BEING GRADED: "${String(title).slice(0, 200)}"

REQUIRED ELEMENTS (1 point each for clear demonstration, 0.5 for partial/vague, 0 for missing):
${criteriaList}

SCORING SCALE (0–10):
- 9–10: All required elements present and clearly explained. No automatic deductions. Response demonstrates genuine understanding of the principle, not just recall.
- 7–8: 3 of 4 elements present, OR all 4 present with one vague or underdeveloped.
- 5–6: 2 elements present, OR 3 present but one automatic deduction applies.
- 3–4: Only 1 element meaningfully addressed.
- 0–2: No meaningful engagement with the core concepts, or the response actively endorses incorrect behavior.

AUTOMATIC DEDUCTIONS (−1 point each, applied after element scoring):
- Response endorses or partially endorses the wrong behavior (e.g., a L1 essay that suggests offering "just a quick tip")
- Response is entirely generic without any specific reference to the scenario
- Response demonstrates a fundamental misunderstanding of the role or principle

PASS THRESHOLD: 7/10. Responses scoring below 7 should receive specific guidance on what to improve.

IMPORTANT: Respond with ONLY valid JSON — no markdown, no code blocks. The JSON must have exactly:
- "score": integer 0–10
- "feedback": string — 2–3 paragraphs explaining what was demonstrated well and what was missing, referencing the specific required elements by name
- "suggestions": string — 1–2 paragraphs of specific, actionable guidance tied to the elements they missed`;

  const userMessage = `Essay prompt:\n${prompt}\n\nCandidate's response:\n${response}`;

  try {
    const anthropicRes = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!anthropicRes.ok) {
      // H-4: Log only the status code — do not emit the response body to logs
      console.error('Anthropic API error status:', anthropicRes.status);
      return NextResponse.json({ error: 'AI grading service unavailable' }, { status: 502 });
    }

    const anthropicData = await anthropicRes.json();
    const rawContent = anthropicData.content?.[0]?.text ?? '';

    let parsed: { score: number; feedback: string; suggestions: string };
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      const match = rawContent.match(/\{[\s\S]*\}/);
      if (!match) {
        console.error('Could not parse AI grading response (no JSON found)');
        return NextResponse.json({ error: 'Failed to parse grading response' }, { status: 502 });
      }
      parsed = JSON.parse(match[0]);
    }

    const score = Math.max(0, Math.min(10, Math.round(Number(parsed.score))));
    return NextResponse.json({
      score,
      feedback: String(parsed.feedback),
      suggestions: String(parsed.suggestions),
    });
  } catch (err) {
    console.error('Grade cert route error:', err instanceof Error ? err.message : 'unknown');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
