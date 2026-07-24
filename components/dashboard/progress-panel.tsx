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
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ProgressPanel({
  xp,
  streak,
  longestStreak,
  lastActivityDate,
  completions,
}: Props) {
  const bronze = getCourse("bronze");
  const stats = bronzeStats();
  const lessons = listBronzeLessons();
  const done = new Set(completions.map((c) => c.lesson_id));
  const level = xpToLevel(xp);
  const levelPct = Math.round((level.into / level.need) * 100);

  const flat = lessons.map((item) => ({
    topicId: item.topicId,
    lessonId: item.lessonId,
    title: item.lesson.title,
  }));
  const finished = flat.filter((item) => done.has(item.lessonId)).length;
  const total = flat.length;
  const progressPct = total > 0 ? Math.round((finished / total) * 100) : 0;
  const resume = findResumeLesson("bronze", done, flat);
  const earnedXp = completions.reduce((sum, c) => sum + (c.xp_awarded || 0), 0);

  const topicRows =
    bronze?.topics.map((topic) => {
      const topicDone = topic.lessons.filter((l) => done.has(l.id)).length;
      const topicXp = topic.lessons
        .filter((l) => done.has(l.id))
        .reduce((sum, l) => sum + l.xp, 0);
      return {
        id: topic.id,
        title: topic.title,
        done: topicDone,
        total: topic.lessons.length,
        xp: topicXp,
        pct:
          topic.lessons.length > 0
            ? Math.round((topicDone / topic.lessons.length) * 100)
            : 0,
      };
    }) ?? [];

  const history = [...completions]
    .sort(
      (a, b) =>
        new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime(),
    )
    .map((c) => {
      const match = lessons.find((l) => l.lessonId === c.lesson_id);
      return {
        ...c,
        title: match?.lesson.title ?? c.lesson_id,
        topicTitle: match?.topicTitle ?? c.topic_id,
        href: match
          ? `/courses/${match.courseId}/${match.topicId}/${match.lessonId}`
          : "/courses",
      };
    });

  return (
    <div className="dash">
      <header className="dash-hero">
        <div className="dash-hero__copy">
          <p className="dash-kicker">Progress</p>
          <h1 className="dash-title">Your progress</h1>
          <p className="dash-lede">
            Track XP, streaks, and every Bronze lesson you finish.
          </p>
        </div>
        {resume ? (
          <Link href={resume.href} className="btn btn-solid">
            {resume.label}
          </Link>
        ) : null}
      </header>

      <section className="dash-strip" aria-label="Level and totals">
        <div className="dash-strip__level">
          <div className="dash-strip__level-top">
            <span>{level.label}</span>
            <span>
              {level.into}/{level.need} XP to next
            </span>
          </div>
          <div
            className="dash-strip__bar"
            role="progressbar"
            aria-valuenow={level.into}
            aria-valuemin={0}
            aria-valuemax={level.need}
          >
            <span style={{ width: `${levelPct}%` }} />
          </div>
        </div>
        <dl className="dash-strip__stats dash-strip__stats--four">
          <div>
            <dt>Total XP</dt>
            <dd>{xp}</dd>
            <p className="dash-strip__hint">{earnedXp} from lessons</p>
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
              {finished}/{total} lessons
            </p>
          </div>
          <div>
            <dt>Available</dt>
            <dd>{stats.totalXp}</dd>
            <p className="dash-strip__hint">XP in Bronze</p>
          </div>
        </dl>
      </section>

      <section className="dash-panels">
        <article className="dash-panel">
          <div className="dash-panel__head">
            <h2>Streak</h2>
          </div>
          <dl className="dash-kv">
            <div>
              <dt>Current</dt>
              <dd>{streak} day{streak === 1 ? "" : "s"}</dd>
            </div>
            <div>
              <dt>Best</dt>
              <dd>{longestStreak} day{longestStreak === 1 ? "" : "s"}</dd>
            </div>
            <div>
              <dt>Last activity</dt>
              <dd>
                {lastActivityDate ? formatDate(lastActivityDate) : "No activity yet"}
              </dd>
            </div>
          </dl>
          <p className="dash-panel__note">
            Complete a lesson on consecutive days to grow your streak.
          </p>
        </article>

        <article className="dash-panel">
          <div className="dash-panel__head">
            <h2>Topic breakdown</h2>
            <Link href="/courses">Open courses</Link>
          </div>
          <ul className="dash-glance">
            {topicRows.map((topic) => (
              <li key={topic.id}>
                <div className="dash-glance__row">
                  <span>{topic.title}</span>
                  <span>
                    {topic.done}/{topic.total} · {topic.xp} XP
                  </span>
                </div>
                <div className="dash-glance__bar" aria-hidden>
                  <span style={{ width: `${topic.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="dash-panel dash-panel--wide">
        <div className="dash-panel__head">
          <h2>Completion history</h2>
        </div>
        {history.length === 0 ? (
          <p className="dash-empty">
            Finish your first lesson to start a history here.
          </p>
        ) : (
          <ul className="dash-history">
            {history.map((item) => (
              <li key={`${item.lesson_id}-${item.completed_at}`}>
                <Link href={item.href}>
                  <strong>{item.title}</strong>
                  <span>
                    {item.topicTitle} · +{item.xp_awarded} XP
                  </span>
                </Link>
                <time dateTime={item.completed_at}>
                  {formatDate(item.completed_at)}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
