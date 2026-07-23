import Link from "next/link";
import { getCourse } from "@/lib/curriculum";
import { findResumeLesson, xpToLevel } from "@/lib/progress-ui";

type Props = {
  xp: number;
  streak: number;
  longestStreak: number;
  doneIds: string[];
  displayName?: string | null;
};

export function LearnerDashboard({
  xp,
  streak,
  longestStreak,
  doneIds,
  displayName,
}: Props) {
  const bronze = getCourse("bronze");
  const silver = getCourse("silver");
  const gold = getCourse("gold");
  const done = new Set(doneIds);
  const level = xpToLevel(xp);

  const flat =
    bronze?.topics.flatMap((topic) =>
      topic.lessons.map((lesson) => ({
        topicId: topic.id,
        lessonId: lesson.id,
        title: lesson.title,
      })),
    ) ?? [];

  const total = flat.length;
  const finished = flat.filter((item) => done.has(item.lessonId)).length;
  const resume = findResumeLesson("bronze", done, flat);
  const nextLessonId = flat.find((f) => !done.has(f.lessonId))?.lessonId;

  return (
    <div className="dash">
      <header className="dash-hero">
        <div>
          <p className="dash-kicker">Learner home</p>
          <h1 className="dash-title">
            {displayName ? `Hi, ${displayName.split(" ")[0]}` : "My courses"}
          </h1>
          <p className="dash-lede">
            Open the Bronze syllabus, <strong>earn XP</strong>, and keep your streak
            alive.
          </p>
        </div>
        <Link href="/settings" className="btn btn-ghost">
          Edit profile
        </Link>
      </header>

      <section id="progress" className="dash-progress" aria-label="XP and streaks">
        <article className="dash-metric">
          <p className="dash-metric__label">Level</p>
          <p className="dash-metric__value">{level.label}</p>
          <div
            className="dash-metric__bar"
            role="progressbar"
            aria-valuenow={level.into}
            aria-valuemin={0}
            aria-valuemax={level.need}
          >
            <span style={{ width: `${(level.into / level.need) * 100}%` }} />
          </div>
          <p className="dash-metric__sub">
            {level.into} / {level.need} XP this level
          </p>
        </article>
        <article className="dash-metric">
          <p className="dash-metric__label">Total XP</p>
          <p className="dash-metric__value">{xp}</p>
          <p className="dash-metric__sub">Earn XP by completing lessons</p>
        </article>
        <article className="dash-metric">
          <p className="dash-metric__label">Streak</p>
          <p className="dash-metric__value">{streak} day</p>
          <p className="dash-metric__sub">Best: {longestStreak} day</p>
        </article>
        <article className="dash-metric">
          <p className="dash-metric__label">Bronze</p>
          <p className="dash-metric__value">
            {finished}/{total}
          </p>
          <p className="dash-metric__sub">Lessons completed</p>
        </article>
      </section>

      <section className="dash-courses">
        <div className="dash-courses__head">
          <h2>My courses</h2>
        </div>

        <div className="dash-course-grid">
          {bronze ? (
            <article className="dash-course is-live">
              <div className="dash-course__top">
                <h3>Bronze</h3>
                <span className="level-tag">Live</span>
              </div>
              <p>{bronze.tagline}</p>
              <p className="dash-course__win">
                <strong>Win:</strong> {bronze.win}
              </p>

              <div className="dash-syllabus" aria-label="Bronze syllabus">
                {bronze.topics.map((topic, topicIndex) => {
                  const topicDone = topic.lessons.filter((l) =>
                    done.has(l.id),
                  ).length;
                  const topicComplete = topicDone === topic.lessons.length;
                  const topicHasNext = topic.lessons.some(
                    (l) => l.id === nextLessonId,
                  );
                  return (
                    <div
                      key={topic.id}
                      className={`dash-topic${topicComplete ? " is-done" : ""}${
                        topicHasNext ? " is-next" : ""
                      }`}
                    >
                      <div className="dash-topic__head">
                        <span className="dash-topic__n" aria-hidden>
                          {topicComplete ? "ok" : topicIndex + 1}
                        </span>
                        <div>
                          <h4>{topic.title}</h4>
                          <p>
                            {topicDone}/{topic.lessons.length} done
                            {topic.summary ? `. ${topic.summary}` : ""}
                          </p>
                        </div>
                        {topicHasNext && resume ? (
                          <Link href={resume.href} className="btn btn-solid dash-topic__start">
                            Start
                          </Link>
                        ) : null}
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
                                  {isDone
                                    ? "done"
                                    : `${topicIndex + 1}.${lessonIndex + 1}`}
                                </span>
                                <span className="dash-lesson__title">
                                  {lesson.title}
                                </span>
                                {isNext ? (
                                  <span className="dash-lesson__cta">Start</span>
                                ) : (
                                  <span className="dash-lesson__meta">
                                    {lesson.durationMin} min
                                  </span>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  );
                })}
              </div>
            </article>
          ) : null}

          <div className="dash-course-stack">
            {[silver, gold].filter(Boolean).map((course) =>
              course ? (
                <article key={course.id} className="dash-course is-soon">
                  <div className="dash-course__top">
                    <h3>{course.name}</h3>
                    <span className="level-tag">Coming soon</span>
                  </div>
                  <p>{course.tagline}</p>
                  <p className="dash-course__win">
                    <strong>Teaches:</strong> {course.win}
                  </p>
                </article>
              ) : null,
            )}
            <div className="dash-add" aria-hidden>
              <span>+</span>
              <p>More courses open as you finish the path</p>
            </div>
          </div>
        </div>
      </section>

      {resume ? (
        <section className="dash-resume" aria-label="Resume learning">
          <p className="dash-resume__label">Resume learning</p>
          <div className="dash-resume__row">
            <Link href={resume.href} className="dash-resume__card">
              <span className="dash-resume__badge">Bronze</span>
              <strong>{resume.title}</strong>
              <span className="btn btn-solid">{resume.label}</span>
            </Link>
            <Link href="#progress" className="dash-resume__alt">
              Or check your progress
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}
