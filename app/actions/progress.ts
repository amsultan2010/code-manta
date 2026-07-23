"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { getLesson } from "@/lib/curriculum";
import {
  getSupabaseAdmin,
  type LessonCompletion,
  type Profile,
} from "@/lib/supabase/admin";

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayUTC() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

function emptyProfile(userId: string, displayName?: string | null): Profile {
  return {
    id: userId,
    display_name: displayName ?? null,
    xp: 0,
    streak_count: 0,
    longest_streak: 0,
    last_activity_date: null,
  };
}

export async function ensureProfile(): Promise<Profile | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const db = getSupabaseAdmin();
  if (!db) return emptyProfile(userId);

  const user = await currentUser();
  const displayName =
    user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress || null;

  const { data: existing } = await db
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (existing) return existing as Profile;

  const profile = emptyProfile(userId, displayName);
  const { data, error } = await db
    .from("profiles")
    .insert(profile)
    .select("*")
    .single();

  if (error) {
    console.error("ensureProfile", error.message);
    return profile;
  }

  return data as Profile;
}

export async function getProgressState() {
  const { userId } = await auth();
  if (!userId) {
    return { profile: null as Profile | null, completions: [] as LessonCompletion[] };
  }

  const db = getSupabaseAdmin();
  const profile = await ensureProfile();

  if (!db) {
    return { profile, completions: [] as LessonCompletion[] };
  }

  const { data: completions } = await db
    .from("lesson_completions")
    .select("lesson_id, course_id, topic_id, xp_awarded, completed_at")
    .eq("user_id", userId);

  return {
    profile,
    completions: (completions ?? []) as LessonCompletion[],
  };
}

export async function completeLessonAction(input: {
  courseId: string;
  topicId: string;
  lessonId: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false as const, error: "Sign in to save progress." };
  }

  const lesson = getLesson(input.courseId, input.topicId, input.lessonId);
  if (!lesson) {
    return { ok: false as const, error: "Lesson not found." };
  }

  const db = getSupabaseAdmin();
  if (!db) {
    return {
      ok: false as const,
      error: "Progress database is not configured yet (missing service role key).",
    };
  }

  const profile = await ensureProfile();
  if (!profile) {
    return { ok: false as const, error: "Could not load profile." };
  }

  const { data: existing } = await db
    .from("lesson_completions")
    .select("id")
    .eq("user_id", userId)
    .eq("lesson_id", input.lessonId)
    .maybeSingle();

  if (existing) {
    return {
      ok: true as const,
      alreadyComplete: true,
      profile,
      xpAwarded: 0,
    };
  }

  const today = todayUTC();
  const yesterday = yesterdayUTC();
  let streak = profile.streak_count;
  if (profile.last_activity_date === today) {
    // same day, streak unchanged
  } else if (profile.last_activity_date === yesterday) {
    streak += 1;
  } else {
    streak = 1;
  }
  const longest = Math.max(profile.longest_streak, streak);
  const xp = profile.xp + lesson.xp;

  const { error: completionError } = await db.from("lesson_completions").insert({
    user_id: userId,
    course_id: input.courseId,
    topic_id: input.topicId,
    lesson_id: input.lessonId,
    xp_awarded: lesson.xp,
  });

  if (completionError) {
    return { ok: false as const, error: completionError.message };
  }

  const { data: updated, error: profileError } = await db
    .from("profiles")
    .update({
      xp,
      streak_count: streak,
      longest_streak: longest,
      last_activity_date: today,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select("*")
    .single();

  if (profileError) {
    return { ok: false as const, error: profileError.message };
  }

  return {
    ok: true as const,
    alreadyComplete: false,
    profile: updated as Profile,
    xpAwarded: lesson.xp,
  };
}
