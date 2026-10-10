@AGENTS.md

# codemanta

Free beginner courses on shipping with AI coding tools: a GSAP landing page plus a signed-in
learner area with lessons, XP and streaks. Bronze is live (5 topics, 10 lessons); Silver and Gold
are `coming_soon` stubs. Deploys to Vercel (`codemanta.vercel.app` per the README).

## Stack and commands

Next.js 16.2.11 App Router (no `src/`, `@/*` is the repo root), React 19.2.4, TypeScript 5 strict,
Tailwind 4, Clerk 7, supabase-js 2, GSAP 3 with Lenis, PostHog, Vercel Analytics. npm scripts:
`dev`, `build`, `start`, `lint`. No test or typecheck script; `next build` is the type check.

## Code map

- `app/page.tsx` the landing page, all of it in `components/landing/landing-experience.tsx`.
- `app/{dashboard,courses,progress,settings}` the learner area, drawn inside
  `components/platform/platform-shell.tsx` (top bar and learner nav): `app/courses/layout.tsx`
  wraps `/courses`, the rest wrap themselves. `/courses/[courseId]` only redirects to `/dashboard`.
- `components/chrome-switch.tsx` hides the marketing header on learner routes. A new learner
  route goes in its prefix list and in `nav` in `platform-shell.tsx`.
- `lib/curriculum.ts` all course content, hardcoded, and the source of truth; every `youtubeId`
  is still `null`. `docs/bronze-syllabus.md` is a prose copy of it.
- `app/actions/progress.ts` the only server actions and the only Supabase reads and writes.
  `lib/supabase/server.ts` builds the clients and types the two tables.
- `app/globals.css` every style: about 2800 lines of hand-written classes on the tokens `--ink`,
  `--foam`, `--coral`, `--sea`, `--sun`. Tailwind is imported but its utilities are barely used.
  `lib/clerk-appearance.ts` repeats the tokens as hex for Clerk's own UI.

## Auth and data

- `proxy.ts` is Next 16's middleware file. It runs `clerkMiddleware()` and protects nothing: each
  learner page calls `auth()` and redirects to `/sign-in?redirect_url=...`. Lesson pages are
  public; only marking a lesson complete needs a session.
- Supabase tables: `profiles` (`id` is the Clerk user id; `display_name`, `xp`, `streak_count`,
  `longest_streak`, `last_activity_date`, `updated_at`) and `lesson_completions` (`user_id`,
  `course_id`, `topic_id`, `lesson_id`, `xp_awarded`, `completed_at`). The schema and RLS policies
  are not in the repo: no migrations, and `supabase/config.toml` only names the Clerk domain.
- `getSupabaseAuthed()` hands Supabase the Clerk session token so RLS applies. With no token it
  falls back to the service-role client, which bypasses RLS: always filter by `auth()`'s `userId`.
- 25 XP per lesson, streaks count UTC days, 100 XP per level (computed twice: `xpToLevel` in
  `lib/progress-ui.ts` and inline in `platform-shell.tsx`). Completions store lesson ids, so
  renaming an id in `lib/curriculum.ts` orphans saved progress.

## Env

Read from `.env.local`: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`,
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or `..._ANON_KEY`),
`SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` (optional),
`NEXT_PUBLIC_SENTRY_DSN`. The README's `.env.example` does not exist: `.gitignore` ignores `.env*`.

## Gotchas

- `getProgressState()` is uncached and runs in the root layout, again in `app/courses/layout.tsx`
  and again in each learner page, so one request repeats the Clerk and Supabase calls.
- `proxy.ts` and `getProgressState()` skip Clerk when its two keys are missing. Keep that path.
- Sentry is not wired up: nothing imports the three `sentry.*.config.ts` files. There is no
  `instrumentation.ts` or `instrumentation-client.ts`, and `next.config.ts` is empty.
- Clerk components here use `<Show when="signed-in">`, not `<SignedIn>`.
