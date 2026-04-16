/**
 * Google OAuth + session helpers on top of the existing UserProfile model.
 *
 * We use Supabase's PKCE flow. The browser client auto-exchanges the
 * ?code=... param on mount (detectSessionInUrl default true), so no separate
 * /auth/callback route is needed.
 *
 * On successful sign-in we:
 *   1. Pull the authenticated user from the Supabase session
 *   2. Look up an existing ryp_users row by email (case-insensitive)
 *   3. Upsert (preserving the existing business id if present, else auth uuid)
 *   4. Mirror to localStorage via setCurrentUser() so the rest of the app
 *      (Nav, storage.ts, L3 flow) keeps working unchanged.
 */

import { getSupabase } from './supabase';
import { getUserByEmail } from './db';
import { setCurrentUser } from './storage';
import type { UserProfile } from './types';

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? '')
  .split(',')
  .map((s) => s.toLowerCase().trim())
  .filter(Boolean);

/** Start the Google OAuth flow — redirects the browser to Google. */
export async function signInWithGoogle(redirectPath: string = '/dashboard'): Promise<void> {
  const sb = getSupabase();
  if (!sb) {
    alert('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
    return;
  }
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const redirectTo = `${origin}${redirectPath}`;
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  });
  if (error) {
    console.warn('[auth] signInWithGoogle error', error);
    alert('Google sign-in failed: ' + error.message);
  }
}

/** Sign out of Supabase and clear the local session. */
export async function signOutEverywhere(): Promise<void> {
  const sb = getSupabase();
  if (sb) {
    try { await sb.auth.signOut(); } catch (e) { console.warn('[auth] signOut error', e); }
  }
  if (typeof window !== 'undefined') {
    localStorage.removeItem('ryp_cert_current_user');
  }
}

/**
 * Read the current Supabase Auth session and sync it into the app's
 * UserProfile model. Returns the resulting UserProfile, or null if no
 * session is active.
 */
export async function syncAuthSessionToProfile(): Promise<UserProfile | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const { data: { session } } = await sb.auth.getSession();
  const authUser = session?.user;
  if (!authUser) return null;

  const email = (authUser.email ?? '').toLowerCase().trim();
  if (!email) return null;

  const meta = authUser.user_metadata ?? {};
  const provider = authUser.app_metadata?.provider ?? 'google';
  const fullName: string =
    (typeof meta.full_name === 'string' && meta.full_name) ||
    (typeof meta.name === 'string' && meta.name) ||
    email.split('@')[0];
  const avatarUrl: string | null =
    (typeof meta.avatar_url === 'string' && meta.avatar_url) ||
    (typeof meta.picture === 'string' && meta.picture) ||
    null;

  // Preserve existing ryp_users.id if present (so historic attempts still link)
  const existing = await getUserByEmail(email);
  const userId = existing?.id ?? authUser.id;

  const role: UserProfile['role'] =
    ADMIN_EMAILS.includes(email) ? 'admin' : (existing?.role ?? 'student');

  const profile: UserProfile = {
    id: userId,
    email,
    name: fullName,
    role,
  };

  // Upsert extended fields (avatar_url, auth_user_id, provider) — fire-and-forget
  try {
    await sb.from('ryp_users').upsert(
      {
        id: userId,
        email,
        name: fullName,
        role,
        auth_user_id: authUser.id,
        avatar_url: avatarUrl,
        provider,
      },
      { onConflict: 'id' },
    );
  } catch (e) {
    console.warn('[auth] ryp_users upsert error', e);
  }

  // Mirror to localStorage so existing code (Nav, storage.ts) keeps working
  setCurrentUser(profile);
  return profile;
}

/** True if a Supabase Auth session exists right now. */
export async function hasAuthSession(): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const { data: { session } } = await sb.auth.getSession();
  return Boolean(session?.user);
}
