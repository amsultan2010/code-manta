"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { bronzeStats } from "@/lib/curriculum";

gsap.registerPlugin(ScrollTrigger);

const diveMarks = [
  {
    n: "01",
    ghost: "OPEN",
    title: "Meet the tools",
    body: (
      <>
        <strong>Learn</strong>
        {" "}
        what Cursor, Codex, and Claude Code are, and when to use chat vs&nbsp;agent.
      </>
    ),
    tone: "coral",
  },
  {
    n: "02",
    ghost: "EDIT",
    title: "Open a project",
    body: (
      <>
        Install, open a folder, and <strong>make a tiny change</strong>
        {" "}
        you can&nbsp;see.
      </>
    ),
    tone: "sea",
  },
  {
    n: "03",
    ghost: "RUN",
    title: "Run it locally",
    body: (
      <>
        <strong>Learn</strong> localhost, the files that matter, and how to{" "}
        <strong>start</strong>
        {" "}
        the&nbsp;app.
      </>
    ),
    tone: "sun",
  },
  {
    n: "04",
    ghost: "ASK",
    title: "Talk to the AI",
    body: "Tokens, context windows, and prompts that stay\u00a0useful.",
    tone: "sea",
  },
  {
    n: "05",
    ghost: "SHIP",
    title: "Put it online",
    body: (
      <>
        <strong>Deploy</strong>
        {" "}
        with tools like Vercel, GitHub, and Docker when you need&nbsp;them.
      </>
    ),
    tone: "coral",
  },
];

const toolNodes = [
  {
    id: "cursor",
    label: "Cursor",
    src: "/brand/tools/cursor.png",
    featured: true,
    tone: "black",
    x: 50,
    y: 8,
  },
  {
    id: "codex",
    label: "Codex",
    src: "/brand/tools/codex.png",
    featured: true,
    tone: "sea",
    x: 88,
    y: 32,
  },
  {
    id: "claude-code",
    label: "Claude Code",
    src: "/brand/tools/claude-code.png",
    featured: true,
    tone: "coral",
    x: 12,
    y: 32,
  },
  {
    id: "docker",
    label: "Docker",
    src: "/brand/tools/docker.png",
    featured: false,
    tone: "foam",
    x: 78,
    y: 78,
  },
  {
    id: "vercel",
    label: "Vercel",
    src: "/brand/tools/vercel.png",
    featured: false,
    tone: "foam",
    x: 50,
    y: 92,
  },
  {
    id: "github",
    label: "GitHub",
    src: "/brand/tools/github.png",
    featured: false,
    tone: "foam",
    x: 22,
    y: 78,
  },
] as const;

/** Organic branches from hub (200,200) to node centers in a 400 viewBox. */
const branchPaths = [
  {
    id: "cursor",
    d: "M200 168 C 155 140, 245 70, 200 32",
    tone: "black",
  },
  {
    id: "codex",
    d: "M232 176 C 270 120, 340 90, 352 128",
    tone: "sea",
  },
  {
    id: "claude-code",
    d: "M168 176 C 130 120, 60 90, 48 128",
    tone: "coral",
  },
  {
    id: "docker",
    d: "M230 230 C 290 240, 330 270, 312 312",
    tone: "foam",
  },
  {
    id: "vercel",
    d: "M200 236 C 155 290, 245 340, 200 368",
    tone: "foam",
  },
  {
    id: "github",
    d: "M170 230 C 110 240, 70 270, 88 312",
    tone: "foam",
  },
] as const;

const outcomes = [
  <>
    <strong>Use</strong>
    {" "}
    Cursor, Codex, and Claude Code with confidence
  </>,
  <>
    <strong>Edit</strong>
    {" "}
    a real project folder and see changes&nbsp;live
  </>,
  <>
    <strong>Explain</strong>
    {" "}
    localhost, deploy, and shipping in plain&nbsp;English
  </>,
  <>
    <strong>Write</strong>
    {" "}
    clearer prompts so the AI stops&nbsp;guessing
  </>,
  <>
    <strong>Put something online</strong>
    {" "}
    that people can open on their&nbsp;phone
  </>,
];

const endorsements = [
  {
    quote:
      "CodeManta is the perfect resource online to help you progress from a localhost project to a distributed, working MVP with real, paying users.",
    name: "Aryan Saksena",
    avatar: "/brand/reviews/aryan-saksena.png",
    tone: "foam",
    brandTone: "coral" as const,
    rolePrefix: "CEO @ ",
    company: { label: "GradeLift.AI", href: "https://gradelift.ai" },
  },
  {
    quote:
      "There's no reason to dive into rabbit holes when learning to ship when free resources like CodeManta guide you through each step and help you actually make progress",
    name: "Vincent Yang",
    avatar: "/brand/reviews/vincent-yang.png",
    tone: "coral",
    brandTone: "ink" as const,
    rolePrefix: "CEO @ ",
    company: { label: "FschoolAI", href: "https://fschoolai.com" },
  },
];

function formatEndorseQuote(quote: string, brandTone: "ink" | "foam" | "coral") {
  return quote.split(/(CodeManta)/g).map((part, index) =>
    part === "CodeManta" ? (
      <strong key={index} className={`endorse-brand tone-${brandTone}`}>
        CodeManta
      </strong>
    ) : (
      part
    ),
  );
}

export function LandingExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const stats = bronzeStats();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    const html = document.documentElement;

    const setPhase = (phase: string) => {
      html.dataset.landingPhase = phase;
    };

    const ctx = gsap.context(() => {
      const progress = root.querySelector<HTMLElement>(".top-progress__bar");
      const loader = root.querySelector<HTMLElement>(".boot-loader");
      const brandChars = root.querySelectorAll(".brand-hero__char");
      const divePin = root.querySelector<HTMLElement>(".dive-pin");
      const diveTrack = root.querySelector<HTMLElement>(".dive-track");
      const diveViewport = root.querySelector<HTMLElement>(".dive-viewport");
      const diveGhost = root.querySelector<HTMLElement>(".dive-ghost");
      const diveFolio = root.querySelector<HTMLElement>(".dive-folio__n");
      const diveCards = gsap.utils.toArray<HTMLElement>(".dive-card");

      if (!reduce) {
        lenis = new Lenis({ duration: 1.05, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((t) => lenis?.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      }

      const setProgress = () => {
        if (!progress) return;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        progress.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
      };
      setProgress();
      window.addEventListener("scroll", setProgress, { passive: true });

      const boot = gsap.timeline({
        onComplete: () => {
          loader?.setAttribute("aria-hidden", "true");
          loader?.classList.add("is-done");
        },
      });

      if (loader && !reduce) {
        boot
          .fromTo(
            ".boot-loader__bar",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: "power2.out" },
          )
          .to(loader, { autoAlpha: 0, duration: 0.4, ease: "power2.inOut" }, "+=0.1");
      } else if (loader) {
        loader.classList.add("is-done");
        gsap.set(loader, { autoAlpha: 0 });
      }

      if (!reduce && brandChars.length) {
        boot.from(
          brandChars,
          {
            yPercent: 110,
            duration: 0.65,
            stagger: 0.03,
            ease: "power3.out",
          },
          "-=0.15",
        );
      }

      gsap.from(".hero-rise", {
        y: 24,
        opacity: reduce ? 1 : 0,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
        delay: reduce ? 0 : 0.85,
      });

      const syncDive = (progressAmt: number) => {
        const panels = diveCards.length || 1;
        const idx = Math.min(panels - 1, Math.max(0, Math.round(progressAmt * (panels - 1))));
        const mark = diveMarks[idx];
        if (diveFolio) diveFolio.textContent = mark.n;
        if (diveGhost) diveGhost.textContent = mark.ghost;
        diveCards.forEach((card, i) => {
          card.classList.toggle("is-active", i === idx);
        });
      };

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 860px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (!divePin || !diveTrack || !diveViewport) return;

          syncDive(0);

          const scrubTween = gsap.to(diveTrack, {
            x: () => Math.min(0, diveViewport.clientWidth - diveTrack.scrollWidth),
            ease: "none",
            scrollTrigger: {
              trigger: divePin,
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * diveMarks.length * 0.4)}`,
              scrub: 0.55,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onToggle: (self) => {
                if (self.isActive) setPhase("ink");
              },
              onUpdate: (self) => {
                if (self.isActive) {
                  setPhase("ink");
                  syncDive(self.progress);
                }
              },
            },
          });

          if (diveGhost) {
            gsap.fromTo(
              diveGhost,
              { yPercent: 8, opacity: 0.08 },
              {
                yPercent: -6,
                opacity: 0.16,
                ease: "none",
                scrollTrigger: {
                  trigger: divePin,
                  start: "top top",
                  end: () => `+=${Math.round(window.innerHeight * diveMarks.length * 0.4)}`,
                  scrub: 0.55,
                },
              },
            );
          }

          return () => {
            scrubTween.scrollTrigger?.kill();
            scrubTween.kill();
          };
        },
      );

      mm.add("(max-width: 859px), (prefers-reduced-motion: reduce)", () => {
        if (diveTrack) gsap.set(diveTrack, { clearProps: "transform" });
        diveCards.forEach((card) => card.classList.add("is-active"));
        if (diveGhost) diveGhost.textContent = "SHIP";
        if (diveFolio) diveFolio.textContent = "05";
      });

      if (!reduce) {
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".stagger-in").forEach((group) => {
          const kids = group.querySelectorAll<HTMLElement>(":scope > *");
          gsap.from(kids, {
            y: 22,
            opacity: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 82%",
            },
          });
        });

        const diagram = root.querySelector<HTMLElement>(".hero-diagram__stage");
        if (diagram) {
          const nodes = diagram.querySelectorAll<HTMLElement>(".hero-diagram__node");
          const branches = diagram.querySelectorAll<SVGPathElement>(".hero-diagram__branch");
          const hub = diagram.querySelector<HTMLElement>(".hero-diagram__root");

          gsap.from(hub, {
            scale: 0.75,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.9,
            transformOrigin: "50% 50%",
          });

          branches.forEach((path, i) => {
            const length = path.getTotalLength();
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
              opacity: 1,
            });
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: 0.85,
              delay: 1 + i * 0.06,
              ease: "power2.out",
            });
          });

          gsap.from(nodes, {
            scale: 0.55,
            opacity: 0,
            duration: 0.55,
            stagger: 0.07,
            ease: "back.out(1.4)",
            delay: 1.15,
          });
        }

        gsap.utils.toArray<HTMLElement>(".chapter[data-phase]").forEach((chapter) => {
          if (chapter.classList.contains("chapter-dive")) return;
          ScrollTrigger.create({
            trigger: chapter,
            start: "top 45%",
            end: "bottom 45%",
            onToggle: (self) => {
              if (self.isActive) {
                setPhase(chapter.dataset.phase || "foam");
              }
            },
          });
        });
      } else {
        setPhase("foam");
      }

      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const magnetic = root.querySelectorAll<HTMLElement>("[data-magnetic]");
      const onMove = (e: PointerEvent) => {
        if (!finePointer) return;
        const btn = e.currentTarget as HTMLElement;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.35, ease: "power3.out" });
      };
      const onLeave = (e: PointerEvent) => {
        gsap.to(e.currentTarget as HTMLElement, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        });
      };
      magnetic.forEach((el) => {
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
      });

      return () => {
        window.removeEventListener("scroll", setProgress);
        magnetic.forEach((el) => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
        mm.revert();
        delete html.dataset.landingPhase;
      };
    }, root);

    return () => {
      ctx.revert();
      lenis?.destroy();
      delete html.dataset.landingPhase;
    };
  }, []);

  const brand = "CodeManta";

  return (
    <main ref={rootRef} className="landing">
      <div className="top-progress" aria-hidden>
        <div className="top-progress__bar" />
      </div>

      <div className="boot-loader" role="status" aria-live="polite">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/manta-mark.png"
          alt=""
          className="boot-loader__mark"
          width={72}
          height={72}
          aria-hidden
        />
        <p className="boot-loader__label">CodeManta</p>
        <div className="boot-loader__track">
          <div className="boot-loader__bar" />
        </div>
      </div>

      <section className="chapter chapter-hero" data-phase="ink">
        <div className="shell hero-shell">
          <div className="hero-glow" aria-hidden />
          <div className="hero-copy">
            <p className="eyebrow hero-rise">
              Free school for <strong>shipping</strong>
              {" "}
              with AI tools
            </p>
            <p className="brand-hero" aria-label="CodeManta">
              <span className="brand-hero__line">
                {brand.split("").map((ch, i) => (
                  <span key={`${ch}-${i}`} className="brand-hero__char">
                    {ch}
                  </span>
                ))}
              </span>
            </p>
            <h1 className="hero-title hero-rise">
              <strong>Learn</strong> the tools. <strong>Ship</strong> real apps.{" "}
              <strong>Grow</strong>
              {" "}
              course by&nbsp;course.
            </h1>
            <p className="hero-lede hero-rise">
              CodeManta <strong>teaches</strong>{" "}
              <span className="hero-tool tone-black">Cursor</span>,{" "}
              <span className="hero-tool tone-sea">Codex</span>,{" "}
              <span className="hero-tool tone-coral">Claude Code</span>, and the
              shipping stack around them. Three courses, one path:{" "}
              <span className="path-tier bronze">Bronze</span> to{" "}
              <span className="path-verb">build</span>,{" "}
              <span className="path-tier silver">Silver</span> to{" "}
              <span className="path-verb">support</span>,{" "}
              <span className="path-tier gold">Gold</span> to{" "}
              <span className="path-verb">grow</span>.
            </p>
            <div className="hero-cta hero-rise">
              <Link href="/dashboard" className="btn btn-solid btn-lg" data-magnetic>
                Start learning free
              </Link>
              <Link href="#progression" className="btn btn-ghost btn-lg" data-magnetic>
                See the courses
              </Link>
            </div>
            <p className="hero-trust hero-rise">
              CodeManta is a nonprofit. Courses are{" "}
              <strong className="em-phrase">100%&nbsp;free</strong>.
            </p>
            <p className="hero-meta hero-rise">
              Short lessons, XP, and streaks so you <strong>keep&nbsp;going</strong>.
            </p>
          </div>

          <aside
            className="hero-diagram hero-rise"
            aria-label="Tools CodeManta teaches around shipping"
          >
            <p className="hero-diagram__caption">
              What you <strong>learn</strong> to <strong>ship</strong>&nbsp;with
            </p>
            <div className="hero-diagram__stage">
              <svg
                className="hero-diagram__branches"
                viewBox="0 0 400 400"
                aria-hidden
              >
                {branchPaths.map((branch) => (
                  <path
                    key={branch.id}
                    className={`hero-diagram__branch tone-${branch.tone}`}
                    d={branch.d}
                    fill="none"
                  />
                ))}
              </svg>

              <div className="hero-diagram__root" aria-label="CodeManta">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/manta-mark.png"
                  alt=""
                  width={88}
                  height={88}
                  className="hero-diagram__mark"
                />
              </div>

              {toolNodes.map((tool) => (
                <div
                  key={tool.id}
                  className={`hero-diagram__node tone-${tool.tone}${
                    tool.featured ? " is-featured" : ""
                  }`}
                  style={{
                    ["--x" as string]: `${tool.x}%`,
                    ["--y" as string]: `${tool.y}%`,
                  }}
                  aria-label={tool.label}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tool.src} alt="" className="hero-diagram__logo" />
                  <span className="sr-only">{tool.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="info" className="chapter chapter-who" data-phase="paper">
        <div className="shell reveal">
          <div className="chapter-folio" aria-hidden>
            <span>01</span> Info
          </div>
          <p className="eyebrow">What CodeManta is</p>
          <div className="split-block">
            <div>
              <h2 className="chapter-title">
                A free path from first tool to <strong>first&nbsp;users</strong>.
              </h2>
              <p className="chapter-lede">
                You <strong>learn by shipping</strong>: open an AI coding tool, edit a
                real project, run it locally, and <strong>put it online</strong>. Each
                course builds on the&nbsp;last.
              </p>
            </div>
            <ul className="check-list stagger-in">
              <li>
                You want Cursor, Codex, or Claude Code to{" "}<strong>click for&nbsp;real</strong>
              </li>
              <li>Localhost, deploy, and shipping still feel&nbsp;fuzzy</li>
              <li>
                You want <strong>outcomes you can show</strong>, not a CS&nbsp;syllabus
              </li>
              <li>You learn faster with short videos and clear&nbsp;notes</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="chapter chapter-dive" data-phase="ink" data-chapter="dive">
        <div className="dive-pin">
          <div className="shell dive-head">
            <div className="dive-head__row">
              <p className="eyebrow">How learning works</p>
              <p className="dive-folio" aria-live="polite">
                <span className="dive-folio__n">01</span>
                <span className="dive-folio__sep"> / </span>
                <span>05</span>
              </p>
            </div>
            <h2 className="chapter-title dive-title">The shipping loop every course&nbsp;uses</h2>
            <p className="chapter-lede dive-lede">
              Across Bronze, Silver, and Gold you keep the same rhythm:{" "}
              <strong>learn</strong> a tool, <strong>make a change</strong>,{" "}
              <strong>run</strong> it, <strong>ship</strong>
              {" "}
              it,&nbsp;repeat.
            </p>
          </div>

          <div className="dive-viewport">
            <p className="dive-ghost" aria-hidden>
              OPEN
            </p>
            <div className="dive-track">
              {diveMarks.map((mark) => (
                <article
                  key={mark.n}
                  className={`dive-card tone-${mark.tone}`}
                  data-ghost={mark.ghost}
                >
                  <span className="dive-card__n">{mark.n}</span>
                  <h3>{mark.title}</h3>
                  <p>{mark.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="chapter chapter-outcome" data-phase="foam">
        <div className="shell reveal">
          <div className="chapter-folio" aria-hidden>
            <span>02</span> Outcomes
          </div>
          <p className="eyebrow">What you can do</p>
          <h2 className="chapter-title">Skills the path is built&nbsp;for</h2>
          <p className="chapter-lede wide">
            By the time you finish the path, you should be able to{" "}
            <strong>build</strong>, <strong>protect</strong>, and <strong>show</strong>{" "}
            work without feeling&nbsp;lost.
          </p>
          <div className="outcome-grid stagger-in">
            {outcomes.map((item, i) => (
              <article key={i} className="outcome-row">
                <span className="outcome-num">{String(i + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="progression" className="chapter chapter-levels" data-phase="paper">
        <div className="shell reveal">
          <div className="chapter-folio" aria-hidden>
            <span>03</span> Courses
          </div>
          <p className="eyebrow">What each course teaches</p>
          <h2 className="chapter-title">Bronze, Silver, and&nbsp;Gold</h2>
          <p className="chapter-lede wide">
            One school, three depths. <strong>Start</strong>
            {" "}
            where you are; each course has a clear finish&nbsp;line.
          </p>

          <div className="progress-rail" aria-hidden>
            <span className="progress-dot is-on" />
            <span className="progress-line" />
            <span className="progress-dot" />
            <span className="progress-line" />
            <span className="progress-dot" />
          </div>

          <div className="level-grid stagger-in">
            <article className="level-card is-live">
              <div className="level-top">
                <span className="level-tag">Live now</span>
              </div>
              <h3>Bronze</h3>
              <p className="level-goal">
                <strong>Teaches:</strong>
                {" "}
                Cursor, Claude Code, localhost, prompts, and your first&nbsp;deploy.
              </p>
              <ul>
                <li>AI coding tool basics</li>
                <li>Project files and localhost</li>
                <li>Tokens and clearer prompts</li>
                <li>
                  <strong>Ship</strong>
                  {" "}
                  a simple personal site
                </li>
              </ul>
              <p className="level-meta">
                About {stats.hoursLabel}, {stats.lessonCount} lessons, {stats.totalXp} XP
              </p>
              <Link href="/dashboard" className="btn btn-solid" data-magnetic>
                Enter Bronze
              </Link>
            </article>

            <article className="level-card is-soon">
              <div className="level-top">
                <span className="level-tag">Coming soon</span>
              </div>
              <h3>Silver</h3>
              <p className="level-goal">
                <strong>Teaches:</strong>
                {" "}
                auth, secrets, rate limits, and keeping user data&nbsp;safe.
              </p>
              <ul>
                <li>Auth and sessions</li>
                <li>Secrets and env vars</li>
                <li>Rate limiting</li>
                <li>
                  RLS so users only see <strong>their own data</strong>
                </li>
              </ul>
              <p className="level-meta">After Bronze</p>
            </article>

            <article className="level-card is-soon">
              <div className="level-top">
                <span className="level-tag">Coming soon</span>
              </div>
              <h3>Gold</h3>
              <p className="level-goal">
                <strong>Teaches:</strong>
                {" "}
                MVP scope, landing pages, distribution, and weekly&nbsp;metrics.
              </p>
              <ul>
                <li>MVP scope you can finish</li>
                <li>Landing pages that explain the offer</li>
                <li>
                  <strong>Getting users</strong>
                  {" "}
                  without spam
                </li>
                <li>Metrics that tell you what to fix</li>
              </ul>
              <p className="level-meta">After Silver</p>
            </article>
          </div>
        </div>
      </section>

      <section className="chapter chapter-how" data-phase="foam">
        <div className="shell reveal">
          <div className="chapter-folio" aria-hidden>
            <span>04</span> Rhythm
          </div>
          <p className="eyebrow">Lesson format</p>
          <h2 className="chapter-title">Watch. Mark complete. Come back&nbsp;tomorrow.</h2>
          <p className="chapter-lede wide">
            Same friendly classroom loop in every course: short video, notes, XP, and a
            streak that keeps you&nbsp;honest.
          </p>
          <div className="how-grid stagger-in">
            <article className="how-card">
              <span className="how-num" aria-hidden>
                01
              </span>
              <h3>Watch and read</h3>
              <p>
                A short screen-share video plus notes you can skim if you already
                understand the step.
              </p>
            </article>
            <article className="how-card">
              <span className="how-num" aria-hidden>
                02
              </span>
              <h3>Mark complete</h3>
              <p>
                Sign in, tap complete, <strong>earn XP</strong>. Miss a day and your
                streak resets, so the habit&nbsp;sticks.
              </p>
            </article>
            <article className="how-card">
              <span className="how-num" aria-hidden>
                03
              </span>
              <h3>Move through the path</h3>
              <p>
                <strong>Finish</strong>
                {" "}
                Bronze, then Silver, then Gold when they open. Same rhythm the
                whole&nbsp;way.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="reviews" className="chapter chapter-endorsements" data-phase="paper">
        <div className="shell reveal">
          <div className="chapter-folio" aria-hidden>
            <span>05</span> Reviews
          </div>
          <p className="eyebrow">From founders and makers</p>
          <h2 className="chapter-title">
            People who <strong>shipped</strong>
            {" "}
            something&nbsp;real
          </h2>
          <p className="chapter-lede wide">
            Founders and makers who have <strong>shipped real products</strong>
            {" "}
            with thousands of users
          </p>
          <div className="endorse-grid stagger-in">
            {endorsements.map((item) => (
              <figure key={item.name} className={`endorse-card tone-${item.tone}`}>
                <blockquote>
                  <p className="endorse-quote">
                    &quot;{formatEndorseQuote(item.quote, item.brandTone)}&quot;
                  </p>
                </blockquote>
                <figcaption>
                  <span className={`endorse-avatar tone-${item.tone}`}>
                    <img src={item.avatar} alt={item.name} width={46} height={46} />
                  </span>
                  <div className="endorse-meta">
                    <strong>{item.name}</strong>
                    <span>
                      {item.rolePrefix}
                      <a
                        href={item.company.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.company.label}
                      </a>
                    </span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter chapter-close" data-phase="ink">
        <div className="shell">
          <div className="close-panel reveal">
            <div className="close-copy">
              <p className="eyebrow">Ready when you are</p>
              <h2 className="chapter-title close-title">
                <strong>Start learning</strong>&nbsp;today.
              </h2>
              <p className="chapter-lede">
                Open the first course and <strong>learn the tools by shipping</strong>.
                Go deeper as Silver and Gold&nbsp;open.
              </p>
            </div>
            <div className="close-actions">
              <Link href="/sign-up" className="btn btn-peak" data-magnetic>
                Create free account
              </Link>
              <Link href="/dashboard" className="btn btn-ghost btn-lg" data-magnetic>
                Open dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
