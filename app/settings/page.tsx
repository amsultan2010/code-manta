import { UserProfile } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProgressState } from "@/app/actions/progress";
import { PlatformShell } from "@/components/platform/platform-shell";
import { clerkAppearance } from "@/lib/clerk-appearance";

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirect_url=/settings");
  }

  const user = await currentUser();
  const { profile } = await getProgressState();
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
      <div className="dash">
        <header className="dash-hero">
          <div>
            <p className="dash-kicker">Account</p>
            <h1 className="dash-title">Settings</h1>
            <p className="dash-lede">
              Update your profile, email, and security. CodeManta keeps learning
              progress tied to this account.
            </p>
          </div>
        </header>
        <div className="settings-clerk">
          <UserProfile
            appearance={clerkAppearance}
            routing="hash"
          />
        </div>
      </div>
    </PlatformShell>
  );
}
