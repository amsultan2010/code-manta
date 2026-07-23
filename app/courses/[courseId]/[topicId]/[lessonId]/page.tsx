import Link from "next/link";
import { notFound } from "next/navigation";
import { CompleteLessonButton } from "@/components/lesson/complete-lesson-button";
import { getProgressState } from "@/app/actions/progress";
import { getCourse, getLesson, getNextLesson, getTopic } from "@/lib/curriculum";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; topicId: string; lessonId: string }>;
}) {
  const { courseId, topicId, lessonId } = await params;
  const course = getCourse(courseId);
  const topic = getTopic(courseId, topicId);
  const lesson = getLesson(courseId, topicId, lessonId);
  if (!course || !topic || !lesson || course.status !== "live") notFound();

  const next = getNextLesson(courseId, topicId, lessonId);
  const { completions } = await getProgressState();
  const done = completions.some((c) => c.lesson_id === lessonId);

  return (
    <main className="page">
      <p className="page-kicker">
        <Link href={`/courses/${courseId}`}>{course.name}</Link> / {topic.title}
      </p>
      <h1 className="page-title">{lesson.title}</h1>
      <p className="page-lede">
        {lesson.durationMin} min · {lesson.xp} XP
        {done ? " · completed" : ""}
      </p>

      <div className="lesson-player">
        <div className="video-frame">
          {lesson.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div>
              <p style={{ margin: "0 0 0.5rem", fontFamily: "var(--font-mono)" }}>
                Video placeholder
              </p>
              <p style={{ margin: 0, maxWidth: "28ch" }}>
                Screen share plus voice will land here. Notes below are enough to
                follow along for now.
              </p>
            </div>
          )}
        </div>

        <aside className="notes">
          <h2>Notes</h2>
          <ul>
            {lesson.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </aside>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <CompleteLessonButton
          courseId={courseId}
          topicId={topicId}
          lessonId={lessonId}
          xp={lesson.xp}
          nextHref={
            next
              ? `/courses/${next.courseId}/${next.topicId}/${next.lessonId}`
              : null
          }
        />
      </div>
    </main>
  );
}
