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
  const firstName = displayName?.split(" ")[0];

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
  const progressPct = total > 0 ? Math.round((finished / total) * 100) : 0;
  const levelPct = Math.round((level.into / level.need) * 100);

  return (
    <div className="dash">
      <header className="dash-hero">
        <div className="dash-hero__copy">
          <p className="dash-kicker">Bronze path</p>
          <h1 className="dash-title">
            {firstName ? `Hi, ${firstName}` : "Your courses"}
          </h1>
          <p className="dash-lede">
            {finished === 0
              ? "Start Bronze. Finish a lesson to earn XP and open a streak."
              : finished === total
                ? "Bronze complete. Keep the streak warm while Silver opens."
                : `${finished} of ${total} Bronze lessons done.`}
          </p>
        </div>
      </header>

      {resume ? (
        <Link href={resume.href} className="dash-continue">
          <div className="dash-continue__copy">
            <span className="dash-continue__eyebrow">Up next</span>
            <strong className="dash-continue__title">{resume.title}</strong>
            <span className="dash-continue__meta">Bronze · {resume.label}</span>
          </div>
          <span className="dash-continue__action" aria-hidden>
            Open
          </span>
        </Link>
      ) : null}

      <section id="progress" className="dash-strip" aria-label="XP and streaks">
        <div className="dash-strip__level">
          <div className="dash-strip__level-top">
            <span>{level.label}</span>
            <span>
              {level.into}/{level.need} XP
            </span>
          </div>
          <div
            className="dash-strip__bar"
            role="progressbar"
            aria-valuenow={level.into}
            aria-valuemin={0}
            aria-valuemax={level.need}
            aria-label={`${level.into} of ${level.need} XP to next level`}
          >
            <span style={{ width: `${levelPct}%` }} />
          </div>
        </div>
        <dl className="dash-strip__stats">
          <div>
            <dt>XP</dt>
            <dd>{xp}</dd>
          </div>
          <div>
            <dt>Streak</dt>
            <dd>
              {streak}
              <span className="dash-strip__unit">d</span>
            </dd>
            <p className="dash-strip__hint">Best {longestStreak}d</p>
          </div>
          <div>
            <dt>Bronze</dt>
            <dd>
              {finished}/{total}
            </dd>
            <p className="dash-strip__hint">{progressPct}%</p>
          </div>
        </dl>
      </section>

      <section className="dash-path" aria-labelledby="dash-path-heading">
        <div className="dash-path__head">
          <div>
            <h2 id="dash-path-heading">Bronze</h2>
            <p>{bronze?.tagline}</p>
          </div>
          <span className="level-tag">Live</span>
        </div>

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
                              {lesson.durationMin}m
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
        <h2>Next up</h2>
        <div className="dash-soon__grid">
          {[silver, gold].filter(Boolean).map((course) =>
            course ? (
              <article key={course.id} className="dash-soon__card">
                <div className="dash-soon__top">
                  <h3>{course.name}</h3>
                  <span className="level-tag">Soon</span>
                </div>
                <p>{course.tagline}</p>
              </article>
            ) : null,
          )}
        </div>
      </section>
    </div>
  );
}
