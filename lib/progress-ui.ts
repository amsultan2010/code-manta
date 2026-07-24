export function xpToLevel(xp: number) {
  const safe = Math.max(0, Math.floor(xp));
  const perLevel = 100;
  const level = Math.floor(safe / perLevel) + 1;
  const into = safe % perLevel;
  return {
    level,
    into,
    need: perLevel,
    label: `Level ${level}`,
  };
}

export function findResumeLesson(
  courseId: string,
  done: Set<string>,
  flat: { topicId: string; lessonId: string; title: string }[],
) {
  const next = flat.find((item) => !done.has(item.lessonId));
  if (next) {
    const started = flat.some((item) => done.has(item.lessonId));
    return {
      href: `/courses/${courseId}/${next.topicId}/${next.lessonId}`,
      title: next.title,
      label: started ? "Continue" : "Start",
    };
  }
  const last = flat[flat.length - 1];
  if (!last) return null;
  return {
    href: `/courses/${courseId}/${last.topicId}/${last.lessonId}`,
    title: last.title,
    label: "Review last lesson",
  };
}
