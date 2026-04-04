# Security & Durability Audit — RYP Golf Certification Dashboard

**Date:** 2026-04-04
**Site:** cert.rypgolf.com
**Auditor:** Claude Sonnet 4.6
**Branch audited:** claude/priceless-mestorf

---

## Summary

| Severity | Count | Status |
|----------|-------|--------|
| Critical | 2 | Fixed |
| High | 4 | Fixed |
| Medium | 3 | Fixed |
| Low | 2 | Fixed |

---

## Critical

### C-1: Hardcoded Admin Email
**File:** `app/login/page.tsx:43`
**Issue:** Admin role is granted by comparing against a literal email string baked into source code:
```ts
emailLower === 'luke.benoit@gmail.com' ? 'admin' : 'student'
```
The email is visible in the compiled client bundle and requires a code deploy to change.
**Risk:** Changing the admin contact requires a deploy; email is exposed in bundle.
**Fix:** Moved to `NEXT_PUBLIC_ADMIN_EMAIL` environment variable. Falls back to `''` (no admin) if unset, so any misconfigured deploy fails safe.

---

### C-2: Open Redirect on Login Page
**File:** `app/login/page.tsx:16,48`
**Issue:** The `redirect` query parameter is passed directly to `router.push()` with no validation:
```ts
const redirect = searchParams.get('redirect') || '/l3';
// ...
router.push(redirect);  // can be https://evil.com
```
An attacker can craft `/login?redirect=https://phishing.example.com` and share it. After submitting their name/email, the user is silently redirected to the attacker's site.
**Risk:** Phishing / credential harvesting via social engineering.
**Fix:** Validate that the redirect value is a relative path (starts with `/` but not `//`). External URLs are rejected; fallback is `/l3`.

---

## High

### H-1: No Input Length Limits on AI Grading Endpoints
**Files:** `app/api/grade/route.ts`, `app/api/grade-cert/route.ts`
**Issue:** The `response` field accepts unlimited text. An attacker (or curious user) can POST megabytes of text, driving up Anthropic API costs and potentially causing 30-second timeouts.
**Risk:** API quota exhaustion, cost abuse, denial-of-service via timeout stacking.
**Fix:** `response` capped at 10,000 characters (generous for any essay); all other string inputs capped at 2,000 characters. Requests exceeding limits return 400 immediately.

---

### H-2: No Runtime Validation of `level` Enum in Grade-Cert Route
**File:** `app/api/grade-cert/route.ts:26`
**Issue:** TypeScript enforces `level: 'l1' | 'l2'` at compile time, but at runtime any string is accepted. The `level` value is embedded into the AI system prompt via string interpolation:
```ts
const levelLabel = level === 'l1' ? 'Level 1 ...' : 'Level 2 ...';
```
A crafted `level` value can shift the prompt context.
**Risk:** Prompt injection via the `level` field.
**Fix:** Explicit runtime check: if `level` is not `'l1'` or `'l2'`, return 400.

---

### H-3: No HTTP Security Headers
**File:** `next.config.mjs`
**Issue:** No security headers are configured. The app is vulnerable to:
- Clickjacking (no `X-Frame-Options`)
- MIME-type sniffing attacks (no `X-Content-Type-Options`)
- Information leakage via referrer (no `Referrer-Policy`)

**Fix:** Added the following headers to all routes in `next.config.mjs`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

### H-4: API Error Logs Emit Full Upstream Response Bodies
**Files:** `app/api/grade/route.ts:88`, `app/api/grade-cert/route.ts:90`
**Issue:** When the Anthropic API returns an error, the full response body is logged:
```ts
const err = await anthropicRes.text();
console.error('Anthropic API error:', err);
```
In production, this surfaces potentially large upstream error payloads in server logs.
**Fix:** Log only the HTTP status code (`anthropicRes.status`). The body is discarded.

---

## Medium

### M-1: JSON.parse Without try-catch in Storage Layer
**File:** `app/lib/storage.ts:10,32,52,70`
**Issue:** Every `localStorage.getItem()` result is passed directly to `JSON.parse()`:
```ts
const data = localStorage.getItem(STORAGE_PREFIX + 'current_user');
return data ? JSON.parse(data) : null;
```
If localStorage contains malformed JSON (partial write, browser bug, manual edits in DevTools), the uncaught `SyntaxError` propagates up through the React render tree and crashes the session.
**Fix:** Added a `safeParse<T>` helper that wraps `JSON.parse` in try-catch and returns a typed fallback on failure. Applied to all four call sites.

---

### M-2: Silent Essay Submission Failures in Exam Pages
**Files:** `app/l1/exam/page.tsx:189-193`, `app/l2/exam/page.tsx:130-132`
**Issue:** When `fetch('/api/grade-cert')` throws or `res.json()` fails, the catch block only resets `grading: false`:
```ts
} catch {
  setEssays(prev => prev.map((e, i) => i === idx ? { ...e, grading: false } : e));
}
```
No error message is shown. The student sees the submit button re-enable with no feedback, possibly believing their submission succeeded.
**Risk:** Students lose work silently; support burden increases.
**Fix:** Added an `error` field to `EssayState`. On failure, it's set and displayed below the textarea with a visible error message.

---

### M-3: res.json() Called Without try-catch in Exam Essay Handlers
**Files:** `app/l1/exam/page.tsx:178`, `app/l2/exam/page.tsx:128`
**Issue:** Immediately after a successful `fetch`, `res.json()` is called without a try-catch. If the server returns a non-JSON body (e.g., an HTML 500 page from Next.js), this throws and is caught by the outer catch — triggering M-2's silent failure.
**Fix:** Wrapped `res.json()` in its own try-catch inside the handler; on parse failure the same visible error message is shown.

---

## Low / Code Quality

### L-1: Unused Imports
**Files:** `app/l1/exam/page.tsx:12`, `app/l2/exam/page.tsx:14`
**Issue:** `L1_ESSAY_POINTS` and `L2_ESSAY_POINTS` are imported but never referenced in either exam page. This adds noise and can confuse maintainers.
**Fix:** Removed both unused imports.

### L-2: console.error Statements in Production API Code (covered under H-4)
**Files:** `app/api/grade/route.ts`, `app/api/grade-cert/route.ts`
**Issue:** Multiple `console.error` calls in API routes log implementation details. Addressed as part of H-4 fix.

---

## Out of Scope / Accepted Risk

These items were identified but not fixed, as they would require architectural changes beyond the scope of this audit:

- **No server-side session authentication.** The app uses localStorage for identity, which is intentional for this internal tool. True server-side sessions would require Supabase Auth or a similar system — a larger architectural change.
- **No rate limiting.** The `/api/grade` and `/api/grade-cert` routes have no request throttling per IP or user. Proper rate limiting requires infrastructure (Vercel edge middleware with Redis) not currently in scope. Input length caps (H-1) provide partial mitigation.
- **Client-side admin role.** Admin role is determined client-side via email comparison. Acceptable for this use case — the "admin" view only controls UI visibility, not privileged data access.
- **No email verification.** Users can log in with any email. Acceptable for an internal known cohort.
- **Timer not persisted across page reloads.** Exam timer resets if the page is reloaded mid-exam. Acceptable for a proctored-style exam; fixing requires server-side session state.
