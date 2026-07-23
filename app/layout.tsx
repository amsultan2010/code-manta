import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Fraunces, Manrope, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ChromeSwitch } from "@/components/chrome-switch";
import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { getProgressState } from "@/app/actions/progress";
import { clerkAppearance } from "@/lib/clerk-appearance";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "CodeManta",
  description:
    "Free nonprofit courses for shipping with AI coding tools. Learn Cursor, Codex, Claude Code, and the path from first deploy to real users.",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile } = await getProgressState();

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full`}
    >
      <body className="site-shell">
        <ClerkProvider appearance={clerkAppearance}>
          <PostHogProvider>
            <ChromeSwitch xp={profile?.xp ?? 0} streak={profile?.streak_count ?? 0}>
              {children}
            </ChromeSwitch>
          </PostHogProvider>
        </ClerkProvider>
        <Analytics />
      </body>
    </html>
  );
}
