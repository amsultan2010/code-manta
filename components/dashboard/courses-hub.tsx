import Link from "next/link";
import { getCourse } from "@/lib/curriculum";
import { findResumeLesson } from "@/lib/progress-ui";

type Props = {
  doneIds: string[];
};

export function CoursesHub({ doneIds }: Props) {
  const bronze = getCourse("bronze");
  const silver = getCourse("silver");
  const gold = getCourse("gold");
  const done = new Set(doneIds);

  const flat =
    bronze?.topics.flatMap((topic) =>
      topic.lessons.map((lesson) => ({
        topicId: topic.id,
        lessonId: lesson.id,
        title: lesson.title,
      })),
    ) ?? [];

  const finished = flat.filter((item) => done.has(item.lessonId)).length;
  const total = flat.length;
  const resume = findResumeLesson("bronze", done, flat);
  const nextLessonId = flat.find((f) => !done.has(f.lessonId))?.lessonId;
  const progressPct = total > 0 ? Math.round((finished / total) * 100) : 0;

  return (
    <div className="dash">
      <header className="dash-hero">
        <div className="dash-hero__copy">
          <p className="dash-kicker">Courses</p>
          <h1 className="dash-title">Your path</h1>
          <p className="dash-lede">
            Bronze is live. Silver and Gold open as you finish the path.
          </p>
        </div>
        {resume ? (
          <Link href={resume.href} className="btn btn-solid">
            {resume.label}
          </Link>
        ) : null}
      </header>

      <section className="dash-path" aria-labelledby="courses-bronze-heading">
        <div className="dash-path__head">
          <div>
            <h2 id="courses-bronze-heading">Bronze</h2>
            <p>
              {bronze?.tagline} · {finished}/{total} done ({progressPct}%)
            </p>
          </div>
          <span className="level-tag">Live</span>
        </div>
        {bronze?.win ? (
          <p className="dash-path__win">
            <strong>Win:</strong> {bronze.win}
          </p>
        ) : null}

        <ol className="dash-syllabus">
          {bronze?.topics.map((topic, topicIndex) => {
            const topicDone = topic.lessons.filter((l) => done.has(l.id)).length;
            const topicComplete = topicDone === topic.lessons.length;
            const topicHasNext = topic.lessons.some((l) => l.id === nextLessonId);

            return (
              <li
                key={topic.id}
                className={`dash-topic${topicComplete ? " is-done" : ""}${
                  topicHasNext ? " is-next" : ""
                }`}
              >
                <div className="dash-topic__head">
                  <span className="dash-topic__n" aria-hidden>
                    {topicComplete ? "✓" : topicIndex + 1}
                  </span>
                  <div className="dash-topic__copy">
                    <h3>{topic.title}</h3>
                    <p>
                      {topicDone}/{topic.lessons.length} done
                      {topic.summary ? ` · ${topic.summary}` : ""}
                    </p>
                  </div>
                </div>

                <ol className="dash-lessons">
                  {topic.lessons.map((lesson, lessonIndex) => {
                    const href = `/courses/bronze/${topic.id}/${lesson.id}`;
                    const isDone = done.has(lesson.id);
                    const isNext = lesson.id === nextLessonId;

                    return (
                      <li key={lesson.id}>
                        <Link
                          href={href}
                          className={`dash-lesson${isDone ? " is-done" : ""}${
                            isNext ? " is-next" : ""
                          }`}
                        >
                          <span className="dash-lesson__mark" aria-hidden>
                            {isDone ? "✓" : `${topicIndex + 1}.${lessonIndex + 1}`}
                          </span>
                          <span className="dash-lesson__title">{lesson.title}</span>
                          {isNext ? (
                            <span className="dash-lesson__cta">Start</span>
                          ) : (
                            <span className="dash-lesson__meta">
                              {lesson.durationMin}m · {lesson.xp} XP
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="dash-soon" aria-label="Upcoming courses">
        <h2>Coming next</h2>
        <div className="dash-soon__grid">
          {[silver, gold].filter(Boolean).map((course) =>
            course ? (
              <article key={course.id} className="dash-soon__card">
                <div className="dash-soon__top">
                  <h3>{course.name}</h3>
                  <span className="level-tag">Soon</span>
                </div>
                <p>{course.tagline}</p>
                {course.win ? (
                  <p className="dash-course-cards__meta">Win: {course.win}</p>
                ) : null}
              </article>
            ) : null,
          )}
        </div>
      </section>
    </div>
  );
}
