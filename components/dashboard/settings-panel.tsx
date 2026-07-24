import Link from "next/link";
import { UserProfile } from "@clerk/nextjs";
import { bronzeStats, listBronzeLessons } from "@/lib/curriculum";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { xpToLevel } from "@/lib/progress-ui";

type Props = {
  displayName?: string | null;
  email?: string | null;
  xp: number;
  streak: number;
  longestStreak: number;
  lastActivityDate?: string | null;
  doneCount: number;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function SettingsPanel({
  displayName,
  email,
  xp,
  streak,
  longestStreak,
  lastActivityDate,
  doneCount,
}: Props) {
  const level = xpToLevel(xp);
  const stats = bronzeStats();
  const total = listBronzeLessons().length;
  const progressPct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="dash">
      <header className="dash-hero">
        <div className="dash-hero__copy">
          <p className="dash-kicker">Account</p>
          <h1 className="dash-title">Settings</h1>
          <p className="dash-lede">
            Manage your profile, security, and how CodeManta tracks learning.
          </p>
        </div>
      </header>

      <section className="dash-panels">
        <article className="dash-panel">
          <div className="dash-panel__head">
            <h2>Account</h2>
          </div>
          <div className="settings-account">
            <div className="settings-account__avatar" aria-hidden>
              {(displayName || email || "C").slice(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="settings-account__name">{displayName || "Learner"}</p>
              {email ? <p className="settings-account__email">{email}</p> : null}
            </div>
          </div>
          <dl className="dash-kv">
            <div>
              <dt>Level</dt>
              <dd>{level.label}</dd>
            </div>
            <div>
              <dt>XP</dt>
              <dd>{xp}</dd>
            </div>
            <div>
              <dt>Streak</dt>
              <dd>
                {streak}d · best {longestStreak}d
              </dd>
            </div>
            <div>
              <dt>Bronze</dt>
              <dd>
                {doneCount}/{total} ({progressPct}%)
              </dd>
            </div>
            <div>
              <dt>Last activity</dt>
              <dd>
                {lastActivityDate ? formatDate(lastActivityDate) : "None yet"}
              </dd>
            </div>
          </dl>
          <div className="settings-links">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/progress">Progress</Link>
            <Link href="/courses">Courses</Link>
          </div>
        </article>

        <article className="dash-panel">
          <div className="dash-panel__head">
            <h2>How progress works</h2>
          </div>
          <ul className="settings-facts">
            <li>
              Each Bronze lesson awards XP. Levels move every {level.need} XP.
            </li>
            <li>
              Finish a lesson on consecutive days to grow your streak. Best so
              far: {longestStreak} day{longestStreak === 1 ? "" : "s"}.
            </li>
            <li>
              Bronze has {stats.lessonCount} lessons and {stats.totalXp} XP
              total. Progress stays tied to this signed-in account.
            </li>
            <li>
              Use the profile tools below to change name, email, password, and
              connected accounts.
            </li>
          </ul>
        </article>
      </section>

      <section className="dash-panel dash-panel--wide">
        <div className="dash-panel__head">
          <h2>Profile and security</h2>
        </div>
        <p className="dash-panel__note settings-clerk-note">
          Changes here update your Clerk account across CodeManta.
        </p>
        <div className="settings-clerk">
          <UserProfile appearance={clerkAppearance} routing="hash" />
        </div>
      </section>
    </div>
  );
}
