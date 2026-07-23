import { auth, currentUser } from "@clerk/nextjs/server";
import { getProgressState } from "@/app/actions/progress";
import { PlatformShell } from "@/components/platform/platform-shell";

export default async function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const { profile } = await getProgressState();
  const user = userId ? await currentUser() : null;
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
      {children}
    </PlatformShell>
  );
}
