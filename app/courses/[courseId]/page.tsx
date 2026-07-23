import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgressState } from "@/app/actions/progress";
import { getCourse } from "@/lib/curriculum";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();

  const { completions } = await getProgressState();
  const done = new Set(completions.map((c) => c.lesson_id));

  if (course.status === "coming_soon") {
    return (
      <main className="page">
        <p className="page-kicker">Coming soon</p>
        <h1 className="page-title">{course.name}</h1>
        <p className="page-lede">{course.tagline}</p>
        <p>{course.win}</p>
        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/courses/bronze" className="btn btn-solid">
            Start Bronze first
          </Link>
        </p>
      </main>
    );
  }

  const total = course.topics.reduce((n, t) => n + t.lessons.length, 0);
  const finished = course.topics.reduce(
    (n, t) => n + t.lessons.filter((l) => done.has(l.id)).length,
    0,
  );

  return (
    <main className="page">
      <p className="page-kicker">
        {course.name} path · {finished}/{total} lessons
      </p>
      <h1 className="page-title">{course.name}</h1>
      <p className="page-lede">{course.tagline}</p>
      <p className="page-lede">Win condition: {course.win}</p>

      <div className="topic-list">
        {course.topics.map((topic, index) => {
          const topicDone = topic.lessons.filter((l) => done.has(l.id)).length;
          return (
            <section key={topic.id} className="topic-card">
              <p className="badge">
                Topic {index + 1} · {topicDone}/{topic.lessons.length} ·{" "}
                {topic.lessons.reduce((n, l) => n + l.durationMin, 0)} min
              </p>
              <h2>{topic.title}</h2>
              <p>{topic.summary}</p>
              <div style={{ marginTop: "1rem", display: "grid", gap: "0.65rem" }}>
                {topic.lessons.map((lesson, lessonIndex) => {
                  const href = `/courses/${course.id}/${topic.id}/${lesson.id}`;
                  const isDone = done.has(lesson.id);
                  return (
                    <Link
                      key={lesson.id}
                      href={href}
                      className={`lesson-row${isDone ? " is-done" : ""}`}
                    >
                      <span>
                        {index + 1}.{lessonIndex + 1} {lesson.title}
                      </span>
                      <span>
                        {lesson.durationMin} min · {lesson.xp} XP
                        {isDone ? " · done" : ""}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
