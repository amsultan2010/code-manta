import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

export type Profile = {
  id: string;
  display_name: string | null;
  xp: number;
  streak_count: number;
  longest_streak: number;
  last_activity_date: string | null;
};

export type LessonCompletion = {
  lesson_id: string;
  course_id: string;
  topic_id: string;
  xp_awarded: number;
  completed_at: string;
};

function getUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getPublishableKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/** Service role: bypasses RLS. Use only after Clerk auth(), always filter by userId. */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = getUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * User-scoped client: RLS applies via Clerk session JWT (sub claim).
 * Requires Clerk ↔ Supabase third-party auth:
 * https://dashboard.clerk.com/setup/supabase
 */
export async function getSupabaseAuthed(): Promise<{
  client: SupabaseClient;
  userId: string;
  mode: "rls" | "admin_fallback";
} | null> {
  const { userId, getToken } = await auth();
  if (!userId) return null;

  const url = getUrl();
  const publishable = getPublishableKey();
  if (!url || !publishable) return null;

  try {
    const token = await getToken();
    if (token) {
      const client = createClient(url, publishable, {
        accessToken: async () => token,
        auth: { persistSession: false, autoRefreshToken: false },
      });
      return { client, userId, mode: "rls" };
    }
  } catch (error) {
    console.warn("Clerk token for Supabase unavailable, using admin fallback", error);
  }

  const admin = getSupabaseAdmin();
  if (!admin) return null;
  return { client: admin, userId, mode: "admin_fallback" };
}
