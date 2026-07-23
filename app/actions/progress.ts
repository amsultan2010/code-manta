"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { getLesson } from "@/lib/curriculum";
import {
  getSupabaseAuthed,
  type LessonCompletion,
  type Profile,
} from "@/lib/supabase/server";

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
  const session = await getSupabaseAuthed();
  if (!session) return null;

  const { client, userId } = session;
  const user = await currentUser();
  const displayName =
    user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress || null;

  const { data: existing, error: readError } = await client
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (readError) {
    console.error("ensureProfile read", readError.message, session.mode);
  }

  if (existing) return existing as Profile;

  const profile = emptyProfile(userId, displayName);
  const { data, error } = await client
    .from("profiles")
    .insert(profile)
    .select("*")
    .single();

  if (error) {
    console.error("ensureProfile insert", error.message, session.mode);
    return profile;
  }

  return data as Profile;
}

export async function getProgressState() {
  const empty = {
    profile: null as Profile | null,
    completions: [] as LessonCompletion[],
  };

  // Avoid crashing the marketing shell when Clerk/Supabase env is absent.
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    return empty;
  }

  try {
    const { userId } = await auth();
    if (!userId) return empty;

    const session = await getSupabaseAuthed();
    const profile = await ensureProfile();

    if (!session) {
      return { profile, completions: [] as LessonCompletion[] };
    }

    const { data: completions, error } = await session.client
      .from("lesson_completions")
      .select("lesson_id, course_id, topic_id, xp_awarded, completed_at")
      .eq("user_id", userId);

    if (error) {
      console.error("getProgressState", error.message, session.mode);
    }

    return {
      profile,
      completions: (completions ?? []) as LessonCompletion[],
    };
  } catch (error) {
    console.error("getProgressState failed", error);
    return empty;
  }
}

export async function completeLessonAction(input: {
  courseId: string;
  topicId: string;
  lessonId: string;
}) {
  const session = await getSupabaseAuthed();
  if (!session) {
    return { ok: false as const, error: "Sign in to save progress." };
  }

  const { client, userId } = session;

  const lesson = getLesson(input.courseId, input.topicId, input.lessonId);
  if (!lesson) {
    return { ok: false as const, error: "Lesson not found." };
  }

  const profile = await ensureProfile();
  if (!profile) {
    return { ok: false as const, error: "Could not load profile." };
  }

  // Hard scope: never trust a client-supplied user id
  const { data: existing, error: existingError } = await client
    .from("lesson_completions")
    .select("id")
    .eq("user_id", userId)
    .eq("lesson_id", input.lessonId)
    .maybeSingle();

  if (existingError) {
    return { ok: false as const, error: existingError.message };
  }

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
    // same day
  } else if (profile.last_activity_date === yesterday) {
    streak += 1;
  } else {
    streak = 1;
  }
  const longest = Math.max(profile.longest_streak, streak);
  const xp = profile.xp + lesson.xp;

  const { error: completionError } = await client.from("lesson_completions").insert({
    user_id: userId,
    course_id: input.courseId,
    topic_id: input.topicId,
    lesson_id: input.lessonId,
    xp_awarded: lesson.xp,
  });

  if (completionError) {
    return { ok: false as const, error: completionError.message };
  }

  const { data: updated, error: profileError } = await client
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
