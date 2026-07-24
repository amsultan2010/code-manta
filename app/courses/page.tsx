import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProgressState } from "@/app/actions/progress";
import { CoursesHub } from "@/components/dashboard/courses-hub";

export default async function CoursesPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirect_url=/courses");
  }

  const { completions } = await getProgressState();

  return <CoursesHub doneIds={completions.map((c) => c.lesson_id)} />;
}
