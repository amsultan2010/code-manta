"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { bronzeStats } from "@/lib/curriculum";

gsap.registerPlugin(ScrollTrigger);

const pathSteps = [
  {
    kicker: "01 Depth",
    title: "Meet the tools",
    body: "Cursor and Claude Code stop being mystery boxes. You know what each one is for.",
  },
  {
    kicker: "02 Depth",
    title: "Open a real folder",
    body: "Install, open a project, and make a tiny change you can see on screen.",
  },
  {
    kicker: "03 Depth",
    title: "Localhost clicks",
    body: "You understand localhost, the files that matter, and how to run locally.",
  },
  {
    kicker: "04 Depth",
    title: "Tokens without fog",
    body: "You learn why chat forgets, what tokens are, and how to give better context.",
  },
  {
    kicker: "05 Depth",
    title: "Ship a live URL",
    body: "Deploy a simple personal site. Share a link that works on your phone.",
  },
];

export function LandingExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const stats = bronzeStats();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    const ctx = gsap.context(() => {
      const progress = root.querySelector<HTMLElement>(".top-progress__bar");
      const loader = root.querySelector<HTMLElement>(".boot-loader");
      const brandChars = root.querySelectorAll(".brand-hero__char");
      const pinSection = root.querySelector<HTMLElement>(".chapter-path");
      const track = root.querySelector<HTMLElement>(".path-track");
      const cards = gsap.utils.toArray<HTMLElement>(".path-card");
      const ghost = root.querySelector<HTMLElement>(".ghost-type");

      if (!reduce) {
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis?.raf(time * 1000));
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
            { scaleX: 1, duration: 0.8, ease: "power2.out" },
          )
          .to(loader, { autoAlpha: 0, duration: 0.45, ease: "power2.inOut" }, "+=0.15");
      } else if (loader) {
        loader.classList.add("is-done");
        gsap.set(loader, { autoAlpha: 0 });
      }

      if (!reduce && brandChars.length) {
        boot.from(
          brandChars,
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.7,
            stagger: 0.035,
            ease: "power3.out",
          },
          "-=0.2",
        );
      }

      gsap.from(".hero-copy > *", {
        y: 28,
        opacity: reduce ? 1 : 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        delay: reduce ? 0 : 0.9,
      });

      if (!reduce && pinSection && track && cards.length) {
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSection,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * cards.length * 0.4)}`,
            pin: true,
            scrub: 0.55,
            anticipatePin: 1,
            onToggle: (self) => {
              if (self.isActive) {
                document.documentElement.dataset.chapter = "path";
              }
            },
            onUpdate: (self) => {
              if (self.isActive) {
                document.documentElement.dataset.chapter = "path";
              }
            },
          },
        });

        scrubTl.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 48),
          ease: "none",
        });

        cards.forEach((card, i) => {
          scrubTl.fromTo(
            card,
            { opacity: 0.35, y: 24 },
            { opacity: 1, y: 0, duration: 0.2 },
            i * 0.15,
          );
        });
      }

      if (!reduce && ghost) {
        gsap.to(ghost, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });
      }

      const magnetic = root.querySelectorAll<HTMLElement>("[data-magnetic]");
      const onMove = (e: PointerEvent) => {
        const btn = e.currentTarget as HTMLElement;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.22, y: y * 0.22, duration: 0.35, ease: "power3.out" });
      };
      const onLeave = (e: PointerEvent) => {
        gsap.to(e.currentTarget as HTMLElement, {
          x: 0,
          y: 0,
          duration: 0.5,
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
      };
    }, root);

    return () => {
      ctx.revert();
      lenis?.destroy();
    };
  }, []);

  const brand = "CodeManta";

  return (
    <main ref={rootRef} className="landing">
      <div className="top-progress" aria-hidden>
        <div className="top-progress__bar" />
      </div>

      <div className="boot-loader" role="status" aria-live="polite">
        <p className="boot-loader__label">Diving in</p>
        <div className="boot-loader__track">
          <div className="boot-loader__bar" />
        </div>
      </div>

      <div className="ghost-type" aria-hidden>
        DEPTH
      </div>

      <section className="chapter chapter-hero" data-phase="ink">
        <div className="chapter-meta">
          <span>01 / Hero</span>
          <span>Free · AI era coding</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="brand-hero" aria-label="CodeManta">
              <span className="brand-hero__line">
                {brand.split("").map((ch, i) => (
                  <span key={`${ch}-${i}`} className="brand-hero__char">
                    {ch}
                  </span>
                ))}
              </span>
            </p>
            <h1 className="hero-title">
              Learn to ship with Cursor and Claude Code.
            </h1>
            <p className="hero-lede">
              A free Khan-simple path for beginners who do not know localhost yet.
              Bronze first. Silver and Gold next.
            </p>
            <div className="hero-cta">
              <Link href="/courses/bronze" className="btn btn-solid btn-lg" data-magnetic>
                Start Bronze
              </Link>
              <Link href="/courses" className="btn btn-ghost btn-lg" data-magnetic>
                See courses
              </Link>
            </div>
            <p className="hero-meta">
              {stats.topicCount} topics · {stats.lessonCount} lessons · ~{stats.hoursLabel} ·{" "}
              {stats.totalXp} XP
            </p>
          </div>

          <div className="hero-visual" aria-hidden>
            <div className="manta-silhouette">
              <svg viewBox="0 0 640 360" className="manta-svg">
                <path
                  className="manta-body"
                  d="M40 190 C160 40 480 40 600 190 C480 250 400 300 320 310 C240 300 160 250 40 190 Z"
                />
                <path
                  className="manta-wing"
                  d="M120 180 C210 120 300 110 360 150"
                />
                <circle className="manta-eye" cx="470" cy="170" r="6" />
              </svg>
              <div className="depth-bands">
                <span>Surface</span>
                <span>Bronze</span>
                <span>Silver</span>
                <span>Gold</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="chapter chapter-path" data-phase="paper">
        <div className="chapter-meta">
          <span>02 / Path</span>
          <span>Bronze depth chart</span>
        </div>
        <h2 className="chapter-title">Five depths. One clear finish line.</h2>
        <p className="chapter-lede">
          Built like a short Duolingo path, taught like Khan Academy. Finish Bronze
          in a free weekend.
        </p>
        <div className="path-viewport">
          <div className="path-track">
            {pathSteps.map((step) => (
              <article key={step.title} className="path-card">
                <p className="path-card__kicker">{step.kicker}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter chapter-levels" data-phase="ink">
        <div className="chapter-meta">
          <span>03 / Levels</span>
          <span>Bronze live</span>
        </div>
        <h2 className="chapter-title">Three courses. Start at Bronze.</h2>
        <div className="level-grid">
          <article className="level-panel is-live">
            <p className="level-panel__kicker">Live now</p>
            <h3>Bronze</h3>
            <p>Tools, localhost, tokens, deploy a personal site.</p>
            <Link href="/courses/bronze" className="btn btn-solid" data-magnetic>
              Enter Bronze
            </Link>
          </article>
          <article className="level-panel is-soon">
            <p className="level-panel__kicker">Coming soon</p>
            <h3>Silver</h3>
            <p>Auth, secrets, rate limits, RLS. Keep your app safer.</p>
          </article>
          <article className="level-panel is-soon">
            <p className="level-panel__kicker">Coming soon</p>
            <h3>Gold</h3>
            <p>MVP clarity, landing pages, distribution, real users.</p>
          </article>
        </div>
      </section>

      <section className="chapter chapter-close" data-phase="paper">
        <div className="chapter-meta">
          <span>04 / Dive</span>
          <span>Free forever intent</span>
        </div>
        <h2 className="chapter-title close-title">Ready when you are.</h2>
        <p className="chapter-lede">
          No ads. No paywall. Sign in, earn XP, keep a streak, and ship something
          real.
        </p>
        <Link href="/sign-up" className="btn btn-peak" data-magnetic>
          Create free account
        </Link>
      </section>
    </main>
  );
}
