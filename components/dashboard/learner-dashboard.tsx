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
  const done = new Set(completions.map((c) => c.lesson_id));
  const level = xpToLevel(xp);
  const firstName = displayName?.split(" ")[0];
  const lessons = listBronzeLessons();
  const stats = bronzeStats();

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

  const nextTopic =
    bronze?.topics.find((topic) => topic.lessons.some((l) => !done.has(l.id))) ??
    bronze?.topics[bronze.topics.length - 1];

  const recent = [...completions]
    .sort(
      (a, b) =>
        new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime(),
    )
    .slice(0, 3)
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
        isCurrent: topic.id === nextTopic?.id,
      };
    }) ?? [];

  return (
    <div className="dash">
      <header className="dash-hero">
        <div className="dash-hero__copy">
          <p className="dash-kicker">Dashboard</p>
          <h1 className="dash-title">
            {firstName ? `Hi, ${firstName}` : "Welcome back"}
          </h1>
          <p className="dash-lede">
            {finished === 0
              ? "One clear next step: start Bronze."
              : finished === total
                ? "Bronze is done. Keep the streak warm."
                : `${finished}/${total} lessons · ~${minutesLeft} min left in Bronze.`}
          </p>
        </div>
      </header>

      {resume ? (
        <Link href={resume.href} className="dash-continue">
          <div className="dash-continue__copy">
            <span className="dash-continue__eyebrow">
              {finished === 0 ? "Start here" : "Continue learning"}
            </span>
            <strong className="dash-continue__title">{resume.title}</strong>
            <span className="dash-continue__meta">
              Bronze
              {nextTopic ? ` · ${nextTopic.title}` : ""} · {resume.label}
            </span>
          </div>
          <span className="dash-continue__action">
            {finished === 0 ? "Start" : "Continue"}
          </span>
        </Link>
      ) : null}

      <section className="dash-strip dash-strip--compact" aria-label="Your stats">
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
            <p className="dash-strip__hint">of {stats.totalXp}</p>
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
            <dd>{progressPct}%</dd>
            <p className="dash-strip__hint">
              {finished}/{total}
            </p>
          </div>
        </dl>
      </section>

      <section className="dash-panels" aria-label="Overview">
        <article className="dash-panel">
          <div className="dash-panel__head">
            <h2>Where you are</h2>
            <Link href="/courses">Full syllabus</Link>
          </div>
          <ul className="dash-glance">
            {topicGlance.map((topic) => (
              <li
                key={topic.id}
                className={topic.isCurrent ? "is-current" : undefined}
              >
                <div className="dash-glance__row">
                  <span>
                    {topic.isCurrent ? (
                      <em className="dash-glance__now">Now</em>
                    ) : null}
                    {topic.title}
                  </span>
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
            <h2>Recent</h2>
            <Link href="/progress">All progress</Link>
          </div>
          {recent.length === 0 ? (
            <p className="dash-empty">
              Nothing completed yet. Hit Continue above to start.
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
              Last active {formatDate(lastActivityDate)}
            </p>
          ) : null}
        </article>
      </section>

      <section className="dash-quick" aria-label="Shortcuts">
        <Link href="/courses" className="dash-quick__link">
          <strong>Courses</strong>
          <span>Browse the Bronze syllabus</span>
        </Link>
        <Link href="/progress" className="dash-quick__link">
          <strong>Progress</strong>
          <span>XP, streaks, history</span>
        </Link>
        <Link href="/settings" className="dash-quick__link">
          <strong>Settings</strong>
          <span>Profile and security</span>
        </Link>
      </section>
    </div>
  );
}
