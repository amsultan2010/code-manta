import {
  ClerkProvider,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Fraunces, Manrope, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { getProgressState } from "@/app/actions/progress";
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
    "Free beginner courses for shipping with Cursor and Claude Code. Bronze, Silver, Gold.",
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
        <ClerkProvider>
          <PostHogProvider>
            <SiteHeader xp={profile?.xp ?? 0} streak={profile?.streak_count ?? 0} />
            {children}
          </PostHogProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
