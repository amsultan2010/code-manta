"use client";

import Image from "next/image";
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
          <Image
            src="/brand/manta-mark.png"
            alt=""
            width={40}
            height={40}
            className="brand-mark__glyph"
            priority
          />
          <span className="brand-mark__word">CodeManta</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <Link href="/#progression">Courses</Link>
          <Link href="/#info">Info</Link>
          <Link href="/#reviews">Reviews</Link>
        </nav>

        <div className="site-header__actions">
          <Show when="signed-in">
            <div className="stat-pills" aria-label="Progress">
              <span className="stat-pill">{streak ?? 0} day streak</span>
              <span className="stat-pill">{xp ?? 0} XP</span>
            </div>
            <Link href="/dashboard" className="btn btn-ghost">
              Dashboard
            </Link>
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
                Sign up
              </button>
            </SignUpButton>
          </Show>
        </div>
      </div>
    </header>
  );
}
