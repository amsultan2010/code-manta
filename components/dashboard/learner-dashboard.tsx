import Link from "next/link";
import { bronzeStats, getCourse, listBronzeLessons } from "@/lib/curriculum";
import { findResumeLesson, xpToLevel } from "@/lib/progress-ui";

type Completion = {
  lesson_id: string;
  topic_id: string;
  xp_awarded: number;
  completed_at: string;
};

type Props = {
  xp: number;
  streak: number;
  longestStreak: number;
  lastActivityDate?: string | null;
  completions: Completion[];
  displayName?: string | null;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function LearnerDashboard({
  xp,
  streak,
  longestStreak,
  lastActivityDate,
  completions,
  displayName,
}: Props) {
  const bronze = getCourse("bronze");
  const silver = getCourse("silver");
  const gold = getCourse("gold");
  const stats = bronzeStats();
  const done = new Set(completions.map((c) => c.lesson_id));
  const level = xpToLevel(xp);
  const firstName = displayName?.split(" ")[0];
  const lessons = listBronzeLessons();

  const flat = lessons.map((item) => ({
    topicId: item.topicId,
    lessonId: item.lessonId,
    title: item.lesson.title,
  }));

  const total = flat.length;
  const finished = flat.filter((item) => done.has(item.lessonId)).length;
  const resume = findResumeLesson("bronze", done, flat);
  const progressPct = total > 0 ? Math.round((finished / total) * 100) : 0;
  const levelPct = Math.round((level.into / level.need) * 100);
  const minutesLeft = lessons
    .filter((item) => !done.has(item.lessonId))
    .reduce((sum, item) => sum + item.lesson.durationMin, 0);

  const recent = [...completions]
    .sort(
      (a, b) =>
        new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime(),
    )
    .slice(0, 4)
    .map((c) => {
      const match = lessons.find((l) => l.lessonId === c.lesson_id);
      return {
        ...c,
        title: match?.lesson.title ?? c.lesson_id,
        topicTitle: match?.topicTitle ?? c.topic_id,
      };
    });

  const topicGlance =
    bronze?.topics.map((topic) => {
      const topicDone = topic.lessons.filter((l) => done.has(l.id)).length;
      return {
        id: topic.id,
        title: topic.title,
        done: topicDone,
        total: topic.lessons.length,
        pct:
          topic.lessons.length > 0
            ? Math.round((topicDone / topic.lessons.length) * 100)
            : 0,
      };
    }) ?? [];

  return (
    <div className="dash">
      <header className="dash-hero">
        <div className="dash-hero__copy">
          <p className="dash-kicker">Dashboard</p>
          <h1 className="dash-title">
            {firstName ? `Hi, ${firstName}` : "Your dashboard"}
          </h1>
          <p className="dash-lede">
            {finished === 0
              ? "Start Bronze, earn XP, and open a streak."
              : finished === total
                ? "Bronze is complete. Keep your streak while Silver opens."
                : `${finished} of ${total} lessons done · about ${minutesLeft} min left.`}
          </p>
        </div>
        <div className="dash-hero__actions">
          <Link href="/courses" className="btn btn-ghost">
            Courses
          </Link>
          {resume ? (
            <Link href={resume.href} className="btn btn-solid">
              {resume.label}
            </Link>
          ) : null}
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

      <section className="dash-strip" aria-label="XP and streaks">
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
            <p className="dash-strip__hint">of {stats.totalXp} Bronze</p>
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

      <section className="dash-panels" aria-label="Overview">
        <article className="dash-panel">
          <div className="dash-panel__head">
            <h2>Path at a glance</h2>
            <Link href="/courses">Open courses</Link>
          </div>
          <ul className="dash-glance">
            {topicGlance.map((topic) => (
              <li key={topic.id}>
                <div className="dash-glance__row">
                  <span>{topic.title}</span>
                  <span>
                    {topic.done}/{topic.total}
                  </span>
                </div>
                <div
                  className="dash-glance__bar"
                  role="progressbar"
                  aria-valuenow={topic.done}
                  aria-valuemin={0}
                  aria-valuemax={topic.total}
                >
                  <span style={{ width: `${topic.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="dash-panel">
          <div className="dash-panel__head">
            <h2>Recent activity</h2>
            <Link href="/progress">Full progress</Link>
          </div>
          {recent.length === 0 ? (
            <p className="dash-empty">
              No lessons completed yet. Finish one to start your streak.
            </p>
          ) : (
            <ul className="dash-activity">
              {recent.map((item) => (
                <li key={`${item.lesson_id}-${item.completed_at}`}>
                  <div>
                    <strong>{item.title}</strong>
                    <span>
                      {item.topicTitle} · +{item.xp_awarded} XP
                    </span>
                  </div>
                  <time dateTime={item.completed_at}>
                    {formatDate(item.completed_at)}
                  </time>
                </li>
              ))}
            </ul>
          )}
          {lastActivityDate ? (
            <p className="dash-panel__note">
              Last activity: {formatDate(lastActivityDate)}
            </p>
          ) : null}
        </article>
      </section>

      <section className="dash-soon" aria-label="Course catalog">
        <div className="dash-panel__head">
          <h2>Your courses</h2>
          <Link href="/courses">Browse all</Link>
        </div>
        <div className="dash-soon__grid dash-course-cards">
          {bronze ? (
            <article className="dash-soon__card is-live">
              <div className="dash-soon__top">
                <h3>Bronze</h3>
                <span className="level-tag">Live</span>
              </div>
              <p>{bronze.tagline}</p>
              <p className="dash-course-cards__meta">
                {finished}/{total} lessons · {progressPct}%
              </p>
              <Link href="/courses" className="btn btn-solid">
                {finished === 0 ? "Start Bronze" : "Continue Bronze"}
              </Link>
            </article>
          ) : null}
          {[silver, gold].filter(Boolean).map((course) =>
            course ? (
              <article key={course.id} className="dash-soon__card">
                <div className="dash-soon__top">
                  <h3>{course.name}</h3>
                  <span className="level-tag">Soon</span>
                </div>
                <p>{course.tagline}</p>
                <p className="dash-course-cards__meta">Opens after Bronze</p>
              </article>
            ) : null,
          )}
        </div>
      </section>
    </div>
  );
}
