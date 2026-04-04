import { NextRequest, NextResponse } from 'next/server';
import { CHAPTERS } from '../../lib/chapters';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

/** Maximum character lengths accepted for each string field (H-1). */
const MAX_RESPONSE_CHARS = 10_000;
const MAX_FIELD_CHARS = 2_000;

const SCORE_RUBRIC = `
Score rubric (1–10):
- 1–3: Misunderstands the core mechanism. The student confuses surface symptoms with root causes, or paraphrases back the question without engaging the underlying principle.
- 4–6: Partially correct but missing key elements. The student grasps one dimension of the answer but overlooks the mechanistic explanation the chapter provides.
- 7–8: Solid understanding with minor gaps. The student demonstrates accurate knowledge of the mechanism and can apply it, but may miss a nuance or fail to fully connect it to the chapter's broader framework.
- 9–10: Deep mechanistic understanding. The student can explain the mechanism in their own terms, apply it to novel scenarios, and connect it accurately to the chapter's key concepts.
`.trim();

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
  }

  let body: {
    questionId: string;
    question: string;
    gradingCriteria: string[];
    response: string;
    chapter: number;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { question, gradingCriteria, response, chapter } = body;

  if (!question || !response || chapter === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // H-1: Enforce input length limits to prevent quota abuse
  if (typeof response !== 'string' || response.length > MAX_RESPONSE_CHARS) {
    return NextResponse.json({ error: `Response must not exceed ${MAX_RESPONSE_CHARS} characters` }, { status: 400 });
  }
  if (typeof question !== 'string' || question.length > MAX_FIELD_CHARS) {
    return NextResponse.json({ error: `Question must not exceed ${MAX_FIELD_CHARS} characters` }, { status: 400 });
  }
  if (!Number.isInteger(chapter) || chapter < 0) {
    return NextResponse.json({ error: 'chapter must be a non-negative integer' }, { status: 400 });
  }

  if (response.trim().length < 20) {
    return NextResponse.json({ error: 'Response too short to grade' }, { status: 400 });
  }

  const chapterInfo = CHAPTERS.find(ch => ch.number === chapter);
  const chapterContext = chapterInfo
    ? `Chapter ${chapterInfo.number}: "${chapterInfo.title}"\n${chapterInfo.summary}\n\nKey concepts covered in this chapter:\n${chapterInfo.keyConcepts.map((c, i) => `${i + 1}. ${c}`).join('\n')}`
    : `Chapter ${chapter}`;

  const criteriaList = Array.isArray(gradingCriteria) && gradingCriteria.length > 0
    ? `\nGrading criteria for this question:\n${gradingCriteria.slice(0, 20).map((c, i) => `${i + 1}. ${String(c).slice(0, 500)}`).join('\n')}`
    : '';

  const systemPrompt = `You are a deeply knowledgeable instructor for the RYP (Rewire Your Practice) golf methodology. You are grading a student's written response to a discussion question.

Your job is to teach, not just score. Every piece of feedback should make the student's understanding deeper — pointing them to the specific chapter concepts they understood, the ones they missed, and explaining the mechanisms they need to internalize.

${chapterContext}

${SCORE_RUBRIC}

${criteriaList}

IMPORTANT OUTPUT FORMAT: You must respond with ONLY valid JSON. No markdown, no code blocks, no extra text. The JSON object must have exactly these three fields:
- "score": integer 1-10
- "feedback": string (2-4 paragraphs explaining what they got right and what they missed, referencing specific chapter concepts by name)
- "suggestions": string (1-2 paragraphs with specific, actionable guidance on what to re-read or think through to improve their understanding)`;

  const userMessage = `Discussion question:\n${question}\n\nStudent's response:\n${response}`;

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
      // Attempt to extract JSON from within the response text
      const match = rawContent.match(/\{[\s\S]*\}/);
      if (!match) {
        console.error('Could not parse AI grading response (no JSON found)');
        return NextResponse.json({ error: 'Failed to parse grading response' }, { status: 502 });
      }
      parsed = JSON.parse(match[0]);
    }

    const score = Math.max(1, Math.min(10, Math.round(Number(parsed.score))));
    return NextResponse.json({
      score,
      feedback: String(parsed.feedback),
      suggestions: String(parsed.suggestions),
    });
  } catch (err) {
    console.error('Grade route error:', err instanceof Error ? err.message : 'unknown');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
