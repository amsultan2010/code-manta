import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProgressState } from "@/app/actions/progress";
import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";
import { PlatformShell } from "@/components/platform/platform-shell";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirect_url=/dashboard");
  }

  const user = await currentUser();
  const { profile, completions } = await getProgressState();
  const displayName =
    profile?.display_name ||
    user?.fullName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    null;

  return (
    <PlatformShell
      xp={profile?.xp ?? 0}
      streak={profile?.streak_count ?? 0}
      displayName={displayName}
    >
      <LearnerDashboard
        xp={profile?.xp ?? 0}
        streak={profile?.streak_count ?? 0}
        longestStreak={profile?.longest_streak ?? 0}
        doneIds={completions.map((c) => c.lesson_id)}
        displayName={displayName}
      />
    </PlatformShell>
  );
}
