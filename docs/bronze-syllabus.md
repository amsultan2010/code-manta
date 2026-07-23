# Bronze Syllabus

**Course ID:** `bronze`  
**Status:** Live  
**Tagline:** Ship your first tiny app with Cursor and Claude Code  
**Estimated time:** ~1.5 hours (81 minutes of video across 10 lessons)  
**Total XP:** 250 (25 XP per lesson)  
**Win condition:** A personal site live on the internet, and a clear loop: prompt, edit, run local, deploy.

Source of truth: `lib/curriculum.ts`. Lesson routes: `/courses/bronze/{topicId}/{lessonId}`.

---

## 1. Course overview

### Who it is for

Bronze is for beginners who want to **build and ship** with AI coding tools, not just read about them. You do not need prior web development experience. You should be willing to install an editor, open a folder, click around a terminal, and put a simple page on the public internet.

CodeManta is a Khan/Duolingo-style shipping school. Bronze is the **build** path: Cursor, Claude Code, localhost, clearer prompts, and your first deploy. Silver (auth, secrets, safety) and Gold (real users) come later.

### What you get by the end

- A tiny personal site you can open on your phone
- A repeatable loop: prompt the tool, review the edit, run locally, deploy again
- Enough vocabulary to talk about editors, agents, files, localhost, tokens, and hosts without panic

### Tools you will use

| Tool | Role in Bronze |
| --- | --- |
| **Cursor** | Editor with AI chat and agent built in; primary “sit next to your files” experience |
| **Claude Code** | Terminal agent that can explore and change a repo; alternative or companion path |
| **Browser + localhost** | Private preview of your site before anyone else sees it |
| **GitHub + a host (e.g. Vercel / Netlify)** | Path from local files to a public URL |

Videos may demo one tool more than the other. The ideas (folder = project, chat vs agent, read the diff, redeploy) transfer.

### Structure

Bronze is **5 topics**, each with **2 short lessons** (10 lessons total). Lessons are ordered. Progress is tracked per lesson completion.

```
Bronze
├── 1. The tools
│   ├── what-are-ai-coding-tools
│   └── chat-vs-agent
├── 2. Your first project
│   ├── install-and-open
│   └── first-change
├── 3. Localhost and files
│   ├── what-is-localhost
│   └── run-locally
├── 4. Tokens and context
│   ├── what-are-tokens
│   └── better-context
└── 5. Deploy
    ├── what-is-deploy
    └── ship-personal-site   ← course finish line
```

### How progress and XP work

- Each lesson awards **25 XP** when you mark it complete (signed-in learner).
- Completing all 10 Bronze lessons = **250 XP**.
- Levels use **100 XP per level** (Level 1 at 0–99 XP, Level 2 at 100–199, and so on).
- Daily **streaks** encourage habit: complete lessons regularly or the streak resets.
- The dashboard shows topic/lesson checklist, resume link, and XP/streak stats.
- YouTube embeds land when `youtubeId` is set; until then, on-page **notes** are the follow-along script.

---

## 2. Learning outcomes

By the end of Bronze, a learner should be able to:

1. Explain what Cursor and Claude Code are, and when each is a good fit.
2. Choose **chat** for plans and small edits vs **agent** for multi-step changes, and stop/restart when the tool drifts.
3. Install a tool, open a project folder, and treat a folder of files as “the project.”
4. Ask for a tiny edit, read the diff, accept or undo, and verify the change in the browser.
5. Explain **localhost** vs the public internet, and start a local preview from common commands or a simple HTML file.
6. Find important files (`package.json`, pages, config) and ignore `node_modules` noise.
7. Describe **tokens** and the **context window** in plain language, and keep chats short and goal-shaped.
8. Give better context: point at files, state goal/constraints/done, paste errors, start a fresh chat when messy.
9. Explain what **deploy** means and why redeploying often is normal.
10. Connect a project to a beginner-friendly host and share a live URL with their name on a page.

---

## 3. Course map

| # | Topic ID | Topic title | Lessons | Video time | XP |
| --- | --- | --- | ---: | ---: | ---: |
| 1 | `the-tools` | The tools | 2 | 15 min | 50 |
| 2 | `first-project` | Your first project | 2 | 17 min | 50 |
| 3 | `localhost-files` | Localhost and files | 2 | 16 min | 50 |
| 4 | `tokens-context` | Tokens and context | 2 | 16 min | 50 |
| 5 | `deploy` | Deploy | 2 | 17 min | 50 |
| | | **Total** | **10** | **81 min (~1.4 hr)** | **250** |

Course `estimatedHours` in curriculum: **1.5**.

---

## 4. Detailed syllabus

Durations below match `durationMin` in the curriculum (video length estimates). Expand each lesson into a teaching plan consistent with curriculum `notes` and CodeManta’s Bronze “build” intent.

---

### Topic 1: The tools

**Topic ID:** `the-tools`  
**Summary:** What Cursor and Claude Code are, and when to use which.  
**Goal:** Remove mystery. Learners leave knowing these tools sit next to project files, draft and edit under *their* direction, and that chat vs agent is a deliberate choice.

#### Lesson 1.1 - What Cursor and Claude Code actually are

| Field | Value |
| --- | --- |
| **Lesson ID** | `what-are-ai-coding-tools` |
| **Route** | `/courses/bronze/the-tools/what-are-ai-coding-tools` |
| **Duration** | 8 min |
| **XP** | 25 |

**Learning objectives**

- Define AI coding tools as helpers that sit next to project files and help edit them.
- Contrast Cursor (editor + chat/agent) with Claude Code (terminal agent over a repo).
- State clearly: the human decides what to ship; the tool drafts and edits.

**What the video covers**

1. **Hook:** Shipping school starts with tools, not frameworks. You will build something tiny and real.
2. **Mental model:** Project = folder of files. The AI can only help with what it can see (open folder / repo).
3. **Cursor walkthrough:** Open a folder, where chat lives, how suggestions and agents relate to the editor.
4. **Claude Code walkthrough:** Terminal-first agent that explores and changes files; same goal, different surface.
5. **Division of labor:** You set the destination (what to ship). The tool proposes the path (edits, commands).
6. **Pitfalls:** Treating the AI as “the developer”; assuming it knows files you never opened; expecting magic without a folder.

**Curriculum notes (on-page)**

- AI coding tools sit next to your project files and help you edit them.
- Cursor is an editor with an AI chat and agent built in.
- Claude Code is a terminal agent that can explore and change a repo.
- You still decide what to ship. The tool drafts and edits.

**Practice / checkpoint**

- Install or open Cursor *or* Claude Code (whichever you will use for Bronze).
- Open any empty or starter folder and confirm the tool can “see” files in that workspace.
- Write one sentence: “I decide ___; the tool helps by ___.”

**Success criteria**

- Learner can name both tools and one sentence about each.
- Learner does not expect the AI to ship without an open project and a human goal.

---

#### Lesson 1.2 - Chat vs agent: picking the right mode

| Field | Value |
| --- | --- |
| **Lesson ID** | `chat-vs-agent` |
| **Route** | `/courses/bronze/the-tools/chat-vs-agent` |
| **Duration** | 7 min |
| **XP** | 25 |

**Learning objectives**

- Use chat for questions, plans, and small edits you review.
- Use agent mode when multi-step work (open files, run commands, chained edits) is needed.
- Keep prompts to one clear goal; stop and restate if the tool drifts.

**What the video covers**

1. **Chat mode:** Ask, plan, request a small change, review before accepting.
2. **Agent mode:** Broader autonomy: files, terminal, multi-step sequences.
3. **Decision rule:** Prefer chat until the task needs several coordinated steps; then agent with a narrow goal.
4. **One goal per prompt:** “Change the heading to X” beats “make the site good.”
5. **Drift recovery:** Stop the run, restate goal + constraints, optionally start a fresh thread (preview of Topic 4).
6. **Pitfalls:** Letting an agent roam without a done definition; stacking five requests in one prompt; never reading the plan before approve.

**Curriculum notes (on-page)**

- Chat is for questions, plans, and small edits you review.
- Agent mode can open files, run commands, and make multi-step changes.
- Start narrow: one clear goal per prompt.
- If the tool drifts, stop it and restate the goal.

**Practice / checkpoint**

- In chat: ask for a short plan to add a name and one sentence to a personal page (do not implement yet if you have no project).
- In agent (or chat if agent unavailable): one single-goal prompt only.
- Practice stopping a run once on purpose, then restating the same goal more narrowly.

**Success criteria**

- Learner can say when they would pick chat vs agent for a given task.
- Learner demonstrates “one goal” prompting and knows how to interrupt drift.

---

### Topic 2: Your first project

**Topic ID:** `first-project`  
**Summary:** Install, open a folder, and make a tiny change you can see.  
**Goal:** Move from theory to a folder on disk and the first visible edit. Shipping is a loop, not a perfect first pass.

#### Lesson 2.1 - Install and open your first folder

| Field | Value |
| --- | --- |
| **Lesson ID** | `install-and-open` |
| **Route** | `/courses/bronze/first-project/install-and-open` |
| **Duration** | 9 min |
| **XP** | 25 |

**Learning objectives**

- Install Cursor (or set up Claude Code) before any fancy stack work.
- Treat a project as a folder of files on the computer.
- Open that folder so the AI can see the files.
- Save a tiny starter site (even one HTML file counts).

**What the video covers**

1. **Install path:** Download/setup for Cursor; optional Claude Code setup sketch so either path feels valid.
2. **Folder = project:** Create or choose a directory; name it something simple (`my-site`, `personal`).
3. **Open folder in the tool:** File → Open Folder (or equivalent); confirm file tree is visible.
4. **Minimal starter:** One `index.html` (or scaffolded starter) with a title and heading; save to disk.
5. **Why this order:** Tools first, folder second, content third. No deploy yet.
6. **Pitfalls:** Editing files outside the opened folder; starting with a huge monorepo; skipping save.

**Curriculum notes (on-page)**

- Install Cursor (or set up Claude Code) before anything fancy.
- A project is just a folder of files on your computer.
- Open the folder in the tool so the AI can see those files.
- Save a tiny starter site (even one HTML file counts).

**Practice / checkpoint**

- Create a folder and open it in your chosen tool.
- Add or generate a minimal page file with your name somewhere in the markup.
- Confirm the file appears in the sidebar / tree.

**Success criteria**

- Learner has an opened workspace and at least one saved starter file.
- Learner can point to “this folder is my project.”

---

#### Lesson 2.2 - Make a tiny change and see it

| Field | Value |
| --- | --- |
| **Lesson ID** | `first-change` |
| **Route** | `/courses/bronze/first-project/first-change` |
| **Duration** | 8 min |
| **XP** | 25 |

**Learning objectives**

- Ask the tool to change something visible (page title or heading).
- Read the diff before accepting large edits.
- Reload the page to confirm the change landed.
- Treat undo as normal; shipping is a loop.

**What the video covers**

1. **Prompt for a tiny change:** e.g. change heading to your name; change `<title>`.
2. **Review the diff:** Accept only what you understand; reject or undo surprises.
3. **Verify visually:** Open/reload the page (file open or simple preview).
4. **Loop language:** Prompt → edit → check → adjust. Perfection is not the first pass.
5. **Undo story:** Show reverting a bad accept; normalize mistakes.
6. **Pitfalls:** Accepting whole-file rewrites for a one-line change; never looking at the diff; changing many things at once.

**Curriculum notes (on-page)**

- Ask the tool to change the page title or a heading.
- Read the diff before you accept big edits.
- Reload the page to confirm the change landed.
- Undo is normal. Shipping is a loop, not a single perfect pass.

**Practice / checkpoint**

- Prompt a single visible change; accept after reading the diff.
- Reload and screenshot or note what changed.
- Intentionally undo once, then re-apply a cleaner version.

**Success criteria**

- A visible change exists that the learner can point to.
- Learner habitually reviews diffs before accepting large edits.

---

### Topic 3: Localhost and files

**Topic ID:** `localhost-files`  
**Summary:** What localhost is, which files matter, and how to run locally.  
**Goal:** Connect “files on disk” to “site in the browser on my machine,” and know where to look when something fails.

#### Lesson 3.1 - What localhost means

| Field | Value |
| --- | --- |
| **Lesson ID** | `what-is-localhost` |
| **Route** | `/courses/bronze/localhost-files/what-is-localhost` |
| **Duration** | 7 min |
| **XP** | 25 |

**Learning objectives**

- Define localhost as the site running on your machine, not the public internet.
- Recognize URLs like `http://localhost:3000` as private to you.
- Use localhost to test before deploy.
- When localhost fails, check the terminal for the real error.

**What the video covers**

1. **Private vs public:** Localhost preview vs a shareable URL (tease Deploy topic).
2. **URL anatomy:** `localhost` + port; why ports differ (`3000`, `5173`, etc.).
3. **Why test locally first:** Catch broken layouts and errors before strangers see them.
4. **Failure path:** Blank page / connection refused → look at the terminal, do not guess in chat only.
5. **Pitfalls:** Thinking localhost is already live for friends; ignoring red text in the terminal; confusing “file opened in browser” with a running dev server when a server is required.

**Curriculum notes (on-page)**

- Localhost means the site is running on your machine, not the public internet.
- A URL like http://localhost:3000 is private to you.
- You use localhost to test before deploy.
- If localhost fails, check the terminal for the real error.

**Practice / checkpoint**

- Say out loud or write: “Localhost is private; deploy is for sharing.”
- If a server is running, open the localhost URL; if not, note what the terminal says when you try.
- Paste one real terminal error into a note for the next lesson (even a staged failure is fine).

**Success criteria**

- Learner correctly explains localhost vs public internet.
- Learner’s first debugging move is “read the terminal,” not “ask the AI to guess.”

---

#### Lesson 3.2 - Run the app and find the important files

| Field | Value |
| --- | --- |
| **Lesson ID** | `run-locally` |
| **Route** | `/courses/bronze/localhost-files/run-locally` |
| **Duration** | 9 min |
| **XP** | 25 |

**Learning objectives**

- Use `package.json` (or similar) to learn how to start the app.
- Run common starts: `npm run dev`, or open `index.html` for a static page.
- Ignore `node_modules` noise; focus on pages, components, and config.
- Keep the terminal visible while developing.

**What the video covers**

1. **Start scripts:** Open `package.json` scripts section; map `dev` / `start` to a command.
2. **Static path:** For HTML-only, opening the file (or a tiny static server) is enough.
3. **File map tour:** Pages/routes, components, config; what to ignore (`node_modules`, build output).
4. **Terminal as cockpit:** Keep it visible; watch for compile errors while editing.
5. **Tie back to AI:** Point the agent at specific files (setup for Topic 4).
6. **Pitfalls:** Exploring `node_modules`; running from the wrong directory; closing the terminal mid-run.

**Curriculum notes (on-page)**

- package.json (or similar) tells the computer how to start the app.
- Common start commands: npm run dev, or open index.html.
- Ignore node_modules noise. Focus on pages, components, and config.
- Keep the terminal visible while you develop.

**Practice / checkpoint**

- Start the project the “right” way for your stack and load it locally.
- List three important files in your project and one folder you will ignore.
- Leave the terminal visible while you make one more tiny edit and confirm reload.

**Success criteria**

- Learner can start and stop local preview confidently.
- Learner navigates by meaningful files, not dependency trees.

---

### Topic 4: Tokens and context

**Topic ID:** `tokens-context`  
**Summary:** Why chat forgets, what tokens are, and how to give better context.  
**Goal:** Make prompting cheaper and clearer. Less dumping, more pointing; fewer confused long threads.

#### Lesson 4.1 - What tokens are (without the jargon fog)

| Field | Value |
| --- | --- |
| **Lesson ID** | `what-are-tokens` |
| **Route** | `/courses/bronze/tokens-context/what-are-tokens` |
| **Duration** | 8 min |
| **XP** | 25 |

**Learning objectives**

- Describe tokens as chunks of text the model reads and writes.
- Explain that long chats and big files burn tokens and can confuse the model.
- Define context window as how much the model can hold at once.
- Prefer shorter, clearer prompts over dumping everything.

**What the video covers**

1. **Plain definition:** Tokens ≈ pieces of text (words/parts of words); billing and limits often track them.
2. **Context window:** Finite memory for this conversation + attached files.
3. **Why chats “forget” or get weird:** Overflow, noise, contradictory earlier instructions.
4. **Cost of dumping:** Pasting entire repos or huge logs without a goal.
5. **Practical rule:** Short and clear usually beats long and vague.
6. **Pitfalls:** Treating the chat as infinite memory; attaching every file “just in case.”

**Curriculum notes (on-page)**

- Tokens are chunks of text the model reads and writes.
- Long chats and big files burn tokens and can confuse the model.
- Context window = how much it can hold at once.
- Shorter, clearer prompts usually work better than dumping everything.

**Practice / checkpoint**

- Rewrite a rambling prompt into three lines: goal, constraint, done looks like.
- Notice approximate chat length; decide if a new chat would help (next lesson).

**Success criteria**

- Learner can explain tokens and context window in everyday words.
- Learner chooses a short prompt over a dump for the same task.

---

#### Lesson 4.2 - Give better context so the tool stays useful

| Field | Value |
| --- | --- |
| **Lesson ID** | `better-context` |
| **Route** | `/courses/bronze/tokens-context/better-context` |
| **Duration** | 8 min |
| **XP** | 25 |

**Learning objectives**

- Point at specific files instead of saying “fix everything.”
- State the goal, the constraint, and what done looks like.
- Start a new chat when the thread gets messy.
- Paste errors instead of guessing.

**What the video covers**

1. **File pointing:** `@file` / attach / name paths explicitly.
2. **Goal template:** Goal + constraint + definition of done (demo live).
3. **Fresh chat hygiene:** When to abandon a tangled thread.
4. **Errors as context:** Copy terminal/build errors verbatim into the prompt.
5. **Bronze loop upgrade:** Better context makes prompt → edit → run smoother before deploy.
6. **Pitfalls:** “Fix everything”; vague “make it nice”; describing an error instead of pasting it.

**Curriculum notes (on-page)**

- Point at specific files instead of saying fix everything.
- State the goal, the constraint, and what done looks like.
- Start a new chat when the thread gets messy.
- Paste errors. Guessing wastes tokens.

**Practice / checkpoint**

- Run one prompt that names a file, a goal, a constraint, and a done check.
- If you have an error, paste it into chat and apply the fix after reading the diff.
- Start a new chat for the next unrelated task.

**Success criteria**

- Learner’s prompts routinely include file + goal + done.
- Learner pastes real errors and knows when to reset the thread.

---

### Topic 5: Deploy

**Topic ID:** `deploy`  
**Summary:** What deploy means, and how to put a simple site on the internet.  
**Goal:** Cross the finish line: localhost stays for testing; a host makes a URL others can open. Redeploy often.

#### Lesson 5.1 - What deploy means

| Field | Value |
| --- | --- |
| **Lesson ID** | `what-is-deploy` |
| **Route** | `/courses/bronze/deploy/what-is-deploy` |
| **Duration** | 7 min |
| **XP** | 25 |

**Learning objectives**

- Define deploy as putting the site on a host so others can open a URL.
- Contrast private localhost with public (or shared) deploy.
- Name beginner-friendly hosts (Vercel, Netlify, and similar).
- Expect to redeploy often; treat that as normal.

**What the video covers**

1. **Definition:** Files + build → host → public URL.
2. **Localhost vs live:** Same project, different audience.
3. **Host landscape:** Vercel / Netlify style flows for beginners; GitHub as a common companion.
4. **Redeploy culture:** Every fix can be another deploy; not a one-time ceremony.
5. **Pitfalls:** Sharing localhost URLs with friends; fear of redeploying; assuming “deploy once = done forever.”

**Curriculum notes (on-page)**

- Deploy = put your site on a host so other people can open a URL.
- Localhost is private. Deploy makes it public (or shared).
- Vercel, Netlify, and similar hosts are beginner-friendly.
- You will redeploy often. That is normal.

**Practice / checkpoint**

- Pick a host you will use for the next lesson (account ready if possible).
- Write the one-line definition of deploy in your own words.
- List what you will check after a deploy (URL loads, name visible).

**Success criteria**

- Learner can explain deploy without jargon fog.
- Learner expects multiple deploys as part of the loop.

---

#### Lesson 5.2 - Ship a simple personal site

| Field | Value |
| --- | --- |
| **Lesson ID** | `ship-personal-site` |
| **Route** | `/courses/bronze/deploy/ship-personal-site` |
| **Duration** | 10 min |
| **XP** | 25 |

**Learning objectives**

- Connect the project to a host (GitHub + Vercel is a common path).
- Confirm the live URL loads on a phone.
- If build fails, read the build log top to bottom once.
- Hit the Bronze win: your name on a live page you can share.

**What the video covers**

1. **End-to-end ship:** Push or import project → connect host → trigger deploy.
2. **Live URL check:** Open on desktop and phone; confirm personal content.
3. **Build failure playbook:** Open log, read once top to bottom, paste error into the AI with goal “make build pass,” redeploy.
4. **Celebrate the win:** Shareable link; the loop is now complete: prompt, edit, run local, deploy.
5. **What’s next (light):** Silver = staying safer; Gold = real users. Same classroom rhythm.
6. **Pitfalls:** Skipping the phone check; ignoring the first error in a long log; deploying empty or wrong project root.

**Curriculum notes (on-page)**

- Connect the project to a host (GitHub + Vercel is a common path).
- Confirm the live URL loads on your phone.
- If build fails, read the build log top to bottom once.
- Bronze win: your name on a live page you can share.

**Practice / checkpoint**

- Deploy the personal site.
- Open the live URL on a phone; confirm your name (or chosen identity) is visible.
- Share the link with one person, or save it in a note as your Bronze artifact.
- Mark the lesson complete and claim XP.

**Success criteria**

- A public URL loads the learner’s simple personal page.
- Learner can repeat: prompt → edit → localhost → deploy.

---

## 5. Capstone / finish line

Bronze does not use a separate “capstone project” ID. The **finish line is Lesson 5.2** (`ship-personal-site`).

**Official win (from curriculum):**  
A personal site live on the internet, and a clear loop: prompt, edit, run local, deploy.

**Capstone checklist**

- [ ] Tiny personal site exists as a real project folder
- [ ] Learner can edit with Cursor or Claude Code and verify on localhost
- [ ] Site is deployed to a public URL
- [ ] URL verified on a phone
- [ ] Learner can explain chat vs agent, localhost vs deploy, and “goal + constraint + done”
- [ ] All 10 lessons marked complete (250 XP)

**After Bronze**

- **Silver** (coming soon): auth, secrets, rate limits, RLS; stay safer without becoming a security engineer.
- **Gold** (coming soon): get real users and a signal for what you built.

Same rhythm in every course: short video, notes, XP, streak.

---

## 6. Lesson index (quick reference)

| Order | Topic | Lesson ID | Title | Min | XP | Route |
| ---: | --- | --- | --- | ---: | ---: | --- |
| 1 | The tools | `what-are-ai-coding-tools` | What Cursor and Claude Code actually are | 8 | 25 | `/courses/bronze/the-tools/what-are-ai-coding-tools` |
| 2 | The tools | `chat-vs-agent` | Chat vs agent: picking the right mode | 7 | 25 | `/courses/bronze/the-tools/chat-vs-agent` |
| 3 | Your first project | `install-and-open` | Install and open your first folder | 9 | 25 | `/courses/bronze/first-project/install-and-open` |
| 4 | Your first project | `first-change` | Make a tiny change and see it | 8 | 25 | `/courses/bronze/first-project/first-change` |
| 5 | Localhost and files | `what-is-localhost` | What localhost means | 7 | 25 | `/courses/bronze/localhost-files/what-is-localhost` |
| 6 | Localhost and files | `run-locally` | Run the app and find the important files | 9 | 25 | `/courses/bronze/localhost-files/run-locally` |
| 7 | Tokens and context | `what-are-tokens` | What tokens are (without the jargon fog) | 8 | 25 | `/courses/bronze/tokens-context/what-are-tokens` |
| 8 | Tokens and context | `better-context` | Give better context so the tool stays useful | 8 | 25 | `/courses/bronze/tokens-context/better-context` |
| 9 | Deploy | `what-is-deploy` | What deploy means | 7 | 25 | `/courses/bronze/deploy/what-is-deploy` |
| 10 | Deploy | `ship-personal-site` | Ship a simple personal site | 10 | 25 | `/courses/bronze/deploy/ship-personal-site` |

---

*Generated from `lib/curriculum.ts` for CodeManta Bronze. Video `youtubeId` values are placeholders until recordings land; teaching plans above expand the existing lesson notes into a full lesson plan.*
