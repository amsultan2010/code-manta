"use client";

import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export function SiteHeader({
  xp,
  streak,
}: {
  xp?: number | null;
  streak?: number | null;
}) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand-mark" aria-label="CodeManta home">
          <span className="brand-mark__glyph" aria-hidden>
            ◇
          </span>
          <span className="brand-mark__word">CodeManta</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <Link href="/courses">Courses</Link>
          <Link href="/courses/bronze">Bronze</Link>
        </nav>

        <div className="site-header__actions">
          <Show when="signed-in">
            <div className="stat-pills" aria-label="Progress">
              <span className="stat-pill">{streak ?? 0} day streak</span>
              <span className="stat-pill">{xp ?? 0} XP</span>
            </div>
            <UserButton />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button type="button" className="btn btn-ghost">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button type="button" className="btn btn-solid">
                Start free
              </button>
            </SignUpButton>
          </Show>
        </div>
      </div>
    </header>
  );
}
