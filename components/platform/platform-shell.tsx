"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const nav = [
  { href: "/dashboard", label: "Courses", match: "courses" },
  { href: "/dashboard#progress", label: "Progress", match: "progress" },
  { href: "/settings", label: "Settings", match: "settings" },
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
  const levelPct = Math.round((into / levelNeed) * 100);

  return (
    <div className="platform">
      <header className="platform-top">
        <div className="platform-top__inner">
          <Link
            href="/"
            className="brand-mark brand-mark--compact"
            aria-label="CodeManta home"
          >
            <Image
              src="/brand/manta-mark.png"
              alt=""
              width={32}
              height={32}
              className="brand-mark__glyph"
            />
            <span className="brand-mark__word">CodeManta</span>
          </Link>

          <div className="platform-stats" aria-label="Your progress">
            <span className="xp-chip xp-chip--streak" title={`${streak} day streak`}>
              <span className="xp-chip__icon" aria-hidden />
              <span className="xp-chip__value">{streak}</span>
              <span className="xp-chip__label">streak</span>
            </span>
            <div
              className="xp-level"
              title={`Level ${level}: ${into} of ${levelNeed} XP`}
            >
              <span className="xp-level__label">Lv {level}</span>
              <div
                className="xp-level__bar"
                role="progressbar"
                aria-valuenow={into}
                aria-valuemin={0}
                aria-valuemax={levelNeed}
                aria-label={`${into} of ${levelNeed} XP to next level`}
              >
                <span style={{ width: `${levelPct}%` }} />
              </div>
              <span className="xp-level__xp">{into}/{levelNeed}</span>
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
            <div className="platform-profile__meta">
              <p className="platform-profile__name">{displayName || "Learner"}</p>
              <Link href="/settings" className="platform-profile__edit">
                Edit profile
              </Link>
            </div>
          </div>

          <nav className="platform-nav">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isNavActive(pathname, item.match) ? "is-active" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/" className="platform-nav__home">
              Home
            </Link>
          </nav>
        </aside>

        <div className="platform-main">{children}</div>
      </div>
    </div>
  );
}
