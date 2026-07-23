export type Lesson = {
  id: string;
  title: string;
  durationMin: number;
  youtubeId: string | null;
  notes: string[];
  xp: number;
};

export type Topic = {
  id: string;
  title: string;
  summary: string;
  lessons: Lesson[];
};

export type Course = {
  id: "bronze" | "silver" | "gold";
  name: string;
  tagline: string;
  status: "live" | "coming_soon";
  estimatedHours: number;
  win: string;
  topics: Topic[];
};

const placeholder = null;

export const XP_PER_LESSON = 25;

export const courses: Course[] = [
  {
    id: "bronze",
    name: "Bronze",
    tagline: "Ship your first tiny app with Cursor and Claude Code",
    status: "live",
    estimatedHours: 1.5,
    win: "A personal site live on the internet, and a clear loop: prompt, edit, run local, deploy.",
    topics: [
      {
        id: "the-tools",
        title: "The tools",
        summary: "What Cursor and Claude Code are, and when to use which.",
        lessons: [
          {
            id: "what-are-ai-coding-tools",
            title: "What Cursor and Claude Code actually are",
            durationMin: 8,
            youtubeId: placeholder,
            xp: XP_PER_LESSON,
            notes: [
              "AI coding tools sit next to your project files and help you edit them.",
              "Cursor is an editor with an AI chat and agent built in.",
              "Claude Code is a terminal agent that can explore and change a repo.",
              "You still decide what to ship. The tool drafts and edits.",
            ],
          },
          {
            id: "chat-vs-agent",
            title: "Chat vs agent: picking the right mode",
            durationMin: 7,
            youtubeId: placeholder,
            xp: XP_PER_LESSON,
            notes: [
              "Chat is for questions, plans, and small edits you review.",
              "Agent mode can open files, run commands, and make multi-step changes.",
              "Start narrow: one clear goal per prompt.",
              "If the tool drifts, stop it and restate the goal.",
            ],
          },
        ],
      },
      {
        id: "first-project",
        title: "Your first project",
        summary: "Install, open a folder, and make a tiny change you can see.",
        lessons: [
          {
            id: "install-and-open",
            title: "Install and open your first folder",
            durationMin: 9,
            youtubeId: placeholder,
            xp: XP_PER_LESSON,
            notes: [
              "Install Cursor (or set up Claude Code) before anything fancy.",
              "A project is just a folder of files on your computer.",
              "Open the folder in the tool so the AI can see those files.",
              "Save a tiny starter site (even one HTML file counts).",
            ],
          },
          {
            id: "first-change",
            title: "Make a tiny change and see it",
            durationMin: 8,
            youtubeId: placeholder,
            xp: XP_PER_LESSON,
            notes: [
              "Ask the tool to change the page title or a heading.",
              "Read the diff before you accept big edits.",
              "Reload the page to confirm the change landed.",
              "Undo is normal. Shipping is a loop, not a single perfect pass.",
            ],
          },
        ],
      },
      {
        id: "localhost-files",
        title: "Localhost and files",
        summary: "What localhost is, which files matter, and how to run locally.",
        lessons: [
          {
            id: "what-is-localhost",
            title: "What localhost means",
            durationMin: 7,
            youtubeId: placeholder,
            xp: XP_PER_LESSON,
            notes: [
              "Localhost means the site is running on your machine, not the public internet.",
              "A URL like http://localhost:3000 is private to you.",
              "You use localhost to test before deploy.",
              "If localhost fails, check the terminal for the real error.",
            ],
          },
          {
            id: "run-locally",
            title: "Run the app and find the important files",
            durationMin: 9,
            youtubeId: placeholder,
            xp: XP_PER_LESSON,
            notes: [
              "package.json (or similar) tells the computer how to start the app.",
              "Common start commands: npm run dev, or open index.html.",
              "Ignore node_modules noise. Focus on pages, components, and config.",
              "Keep the terminal visible while you develop.",
            ],
          },
        ],
      },
      {
        id: "tokens-context",
        title: "Tokens and context",
        summary: "Why chat forgets, what tokens are, and how to give better context.",
        lessons: [
          {
            id: "what-are-tokens",
            title: "What tokens are (without the jargon fog)",
            durationMin: 8,
            youtubeId: placeholder,
            xp: XP_PER_LESSON,
            notes: [
              "Tokens are chunks of text the model reads and writes.",
              "Long chats and big files burn tokens and can confuse the model.",
              "Context window = how much it can hold at once.",
              "Shorter, clearer prompts usually work better than dumping everything.",
            ],
          },
          {
            id: "better-context",
            title: "Give better context so the tool stays useful",
            durationMin: 8,
            youtubeId: placeholder,
            xp: XP_PER_LESSON,
            notes: [
              "Point at specific files instead of saying fix everything.",
              "State the goal, the constraint, and what done looks like.",
              "Start a new chat when the thread gets messy.",
              "Paste errors. Guessing wastes tokens.",
            ],
          },
        ],
      },
      {
        id: "deploy",
        title: "Deploy",
        summary: "What deploy means, and how to put a simple site on the internet.",
        lessons: [
          {
            id: "what-is-deploy",
            title: "What deploy means",
            durationMin: 7,
            youtubeId: placeholder,
            xp: XP_PER_LESSON,
            notes: [
              "Deploy = put your site on a host so other people can open a URL.",
              "Localhost is private. Deploy makes it public (or shared).",
              "Vercel, Netlify, and similar hosts are beginner-friendly.",
              "You will redeploy often. That is normal.",
            ],
          },
          {
            id: "ship-personal-site",
            title: "Ship a simple personal site",
            durationMin: 10,
            youtubeId: placeholder,
            xp: XP_PER_LESSON,
            notes: [
              "Connect the project to a host (GitHub + Vercel is a common path).",
              "Confirm the live URL loads on your phone.",
              "If build fails, read the build log top to bottom once.",
              "Bronze win: your name on a live page you can share.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "silver",
    name: "Silver",
    tagline: "Do not get wrecked: auth, secrets, rate limits, RLS",
    status: "coming_soon",
    estimatedHours: 2,
    win: "Explain how a small app stays safer without becoming a security engineer.",
    topics: [],
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "Get real users for what you built",
    status: "coming_soon",
    estimatedHours: 2,
    win: "Put something in front of strangers and get a signal.",
    topics: [],
  },
];

export function getCourse(courseId: string) {
  return courses.find((c) => c.id === courseId);
}

export function getTopic(courseId: string, topicId: string) {
  const course = getCourse(courseId);
  return course?.topics.find((t) => t.id === topicId);
}

export function getLesson(courseId: string, topicId: string, lessonId: string) {
  const topic = getTopic(courseId, topicId);
  return topic?.lessons.find((l) => l.id === lessonId);
}

export function listBronzeLessons() {
  const bronze = getCourse("bronze");
  if (!bronze) return [];
  return bronze.topics.flatMap((topic) =>
    topic.lessons.map((lesson) => ({
      courseId: bronze.id,
      topicId: topic.id,
      lessonId: lesson.id,
      topicTitle: topic.title,
      lesson,
    })),
  );
}

export function getNextLesson(courseId: string, topicId: string, lessonId: string) {
  const course = getCourse(courseId);
  if (!course || course.status !== "live") return null;
  const flat = course.topics.flatMap((topic) =>
    topic.lessons.map((lesson) => ({ topic, lesson })),
  );
  const idx = flat.findIndex(
    (item) => item.topic.id === topicId && item.lesson.id === lessonId,
  );
  if (idx < 0 || idx === flat.length - 1) return null;
  const next = flat[idx + 1];
  return {
    courseId,
    topicId: next.topic.id,
    lessonId: next.lesson.id,
    title: next.lesson.title,
  };
}

export function bronzeStats() {
  const lessons = listBronzeLessons();
  const minutes = lessons.reduce((sum, item) => sum + item.lesson.durationMin, 0);
  return {
    lessonCount: lessons.length,
    topicCount: getCourse("bronze")?.topics.length ?? 0,
    minutes,
    hoursLabel: `${(minutes / 60).toFixed(1)} hr`,
    totalXp: lessons.length * XP_PER_LESSON,
  };
}
