import { redirect } from "next/navigation";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  if (courseId === "bronze") {
    redirect("/dashboard");
  }
  redirect("/dashboard");
}
