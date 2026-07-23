"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const nav = [
  { href: "/dashboard", label: "Courses", group: "My stuff", match: "courses" },
  {
    href: "/dashboard#progress",
    label: "Progress",
    group: "My account",
    match: "progress",
  },
  { href: "/settings", label: "Settings", group: "My account", match: "settings" },
] as const;

function isNavActive(pathname: string, match: (typeof nav)[number]["match"]) {
  if (match === "courses") {
    return pathname === "/dashboard" || pathname.startsWith("/courses/");
  }
  if (match === "settings") {
    return pathname.startsWith("/settings");
  }
  return false;
}

export function PlatformShell({
  children,
  xp = 0,
  streak = 0,
  displayName,
}: {
  children: React.ReactNode;
  xp?: number;
  streak?: number;
  displayName?: string | null;
}) {
  const pathname = usePathname();
  const levelNeed = 100;
  const level = Math.floor(xp / levelNeed) + 1;
  const into = xp % levelNeed;

  return (
    <div className="platform">
      <header className="platform-top">
        <div className="platform-top__inner">
          <Link href="/" className="brand-mark brand-mark--compact" aria-label="CodeManta home">
            <Image
              src="/brand/manta-mark.png"
              alt=""
              width={32}
              height={32}
              className="brand-mark__glyph"
            />
            <span className="brand-mark__word">CodeManta</span>
          </Link>

          <p className="platform-motivation">
            Keep going. Small lessons, <strong>real shipping</strong>.
          </p>

          <div className="platform-stats" aria-label="Your progress">
            <span className="platform-stat">
              <span className="platform-stat__flame" aria-hidden />
              {streak} day streak
            </span>
            <div className="platform-level">
              <span>Level {level}</span>
              <div
                className="platform-level__bar"
                role="progressbar"
                aria-valuenow={into}
                aria-valuemin={0}
                aria-valuemax={levelNeed}
                aria-label={`${into} of ${levelNeed} XP to next level`}
              >
                <span style={{ width: `${(into / levelNeed) * 100}%` }} />
              </div>
              <span className="platform-level__xp">
                {into} / {levelNeed} XP
              </span>
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: { width: "2.4rem", height: "2.4rem" },
                },
              }}
            />
          </div>
        </div>
      </header>

      <div className="platform-body">
        <aside className="platform-side" aria-label="Learner navigation">
          <div className="platform-profile">
            <div className="platform-avatar" aria-hidden>
              {(displayName || "C").slice(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="platform-profile__name">{displayName || "Learner"}</p>
              <Link href="/settings" className="platform-profile__edit">
                Edit profile
              </Link>
            </div>
          </div>

          <nav className="platform-nav">
            <p className="platform-nav__group">My stuff</p>
            {nav
              .filter((item) => item.group === "My stuff")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isNavActive(pathname, item.match) ? "is-active" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            <p className="platform-nav__group">My account</p>
            {nav
              .filter((item) => item.group === "My account")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isNavActive(pathname, item.match) ? "is-active" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            <Link href="/">Back to home</Link>
          </nav>
        </aside>

        <div className="platform-main">{children}</div>
      </div>
    </div>
  );
}
