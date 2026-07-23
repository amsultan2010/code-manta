"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SignInButton, Show } from "@clerk/nextjs";
import { completeLessonAction } from "@/app/actions/progress";

export function CompleteLessonButton({
  courseId,
  topicId,
  lessonId,
  xp,
  nextHref,
}: {
  courseId: string;
  topicId: string;
  lessonId: string;
  xp: number;
  nextHref: string | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="lesson-actions">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button type="button" className="btn btn-solid">
            Sign in to mark complete
          </button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <button
          type="button"
          className="btn btn-solid"
          disabled={pending}
          onClick={() => {
            startTransition(async () => {
              const result = await completeLessonAction({
                courseId,
                topicId,
                lessonId,
              });
              if (!result.ok) {
                setMessage(result.error);
                return;
              }
              if (result.alreadyComplete) {
                setMessage("Already complete. Streak and XP unchanged.");
              } else {
                setMessage(`+${result.xpAwarded} XP saved. Streak updated.`);
              }
              router.refresh();
            });
          }}
        >
          {pending ? "Saving..." : `Mark complete (+${xp} XP)`}
        </button>
      </Show>
      {nextHref ? (
        <Link href={nextHref} className="btn btn-ghost">
          Next lesson
        </Link>
      ) : (
        <Link href={`/courses/${courseId}`} className="btn btn-ghost">
          Back to path
        </Link>
      )}
      {message ? <p className="toast">{message}</p> : null}
    </div>
  );
}
