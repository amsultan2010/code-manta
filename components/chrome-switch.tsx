"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";

export function ChromeSwitch({
  children,
  xp,
  streak,
}: {
  children: React.ReactNode;
  xp: number;
  streak: number;
}) {
  const pathname = usePathname();
  const isPlatform =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/courses") ||
    pathname.startsWith("/progress");

  if (isPlatform) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader xp={xp} streak={streak} />
      {children}
    </>
  );
}
