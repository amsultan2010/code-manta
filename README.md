# CodeManta

Free beginner courses for shipping with Cursor and Claude Code.

## Stack

- Next.js + Clerk auth
- Supabase (profiles, lesson completions, streaks, XP)
- Sentry + PostHog
- Vercel deploy target: `codemanta.vercel.app`

## Local

```bash
npm install
npm run dev
```

## Required env

Copy `.env.example` to `.env.local` and fill:

- Clerk keys (already set by `clerk init`)
- `SUPABASE_SERVICE_ROLE_KEY` (from Supabase project settings)
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_SENTRY_DSN`

## Courses

- **Bronze** live (10 lessons, ~1.5 hours)
- **Silver** / **Gold** coming soon
