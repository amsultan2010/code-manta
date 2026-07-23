import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let admin: SupabaseClient | null = null;

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  if (!admin) {
    admin = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return admin;
}

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
