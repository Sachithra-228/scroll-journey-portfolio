"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTrack, type Track } from "@/components/providers/TrackProvider";
import { useIsNarrow, usePrefersReducedMotion } from "@/lib/hooks";
import { lockScroll, unlockScroll, scrollToTarget } from "@/lib/scroll";

const TERMINAL_LINES = [
  { text: "$ sachithra --track backend", tone: "cmd" },
  { text: "resolving dependencies…", tone: "dim" },
  { text: "build passing ✓", tone: "ok" },
  { text: "ready to deploy", tone: "ok" },
] as const;

const PREVIEW_BLOCKS = [
  "bg-bloom",
  "bg-citrus",
  "bg-signal",
  "bg-stage",
  "bg-bloom/60",
  "bg-signal/60",
  "bg-citrus/70",
  "bg-fog",
  "bg-stage/70",
];

/**
 * The fork: a pinned, scroll-locked choice between the ui/ux and backend
 * tracks. Desktop pins the section and locks scrolling until a side is
 * clicked; mobile falls back to two stacked tappable cards with no lock.
 */
export default function Fork() {
  const narrow = useIsNarrow();
  const reducedMotion = usePrefersReducedMotion();
  const { chosen, choose } = useTrack();

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const busyRef = useRef(false);

  const [terminalStep, setTerminalStep] = useState(-1); // -1 = idle

  const interactive = !narrow && !reducedMotion;

  // Pin + scroll-lock (desktop, motion allowed, not yet chosen)
  useEffect(() => {
    if (!interactive || chosen) return;
    const section = sectionRef.current;
    if (!section) return;

    // If the page loads already scrolled past the fork (browser scroll
    // restoration), don't trap the visitor — let the default track stand
    // and surface the nav pill instead.
    if (window.scrollY > section.offsetTop + window.innerHeight * 0.5) {
      choose("design");
      return;
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=40%",
      pin: true,
      onEnter: (self) => {
        if (busyRef.current) return;
        // snap to the pin start, then hard-lock until a track is chosen
        window.scrollTo(0, self.start);
        lockScroll();
      },
    });
    stRef.current = st;

    return () => {
      stRef.current = null;
      st.kill();
    };
  }, [interactive, chosen, choose]);

  const finish = (track: Track) => {
    choose(track);
    unlockScroll();
    stRef.current?.kill();
    stRef.current = null;
    ScrollTrigger.refresh();
    scrollToTarget("#education");
    busyRef.current = false;
  };

  const pick = (track: Track) => {
    if (busyRef.current || chosen) {
      if (chosen) choose(track); // allow re-picking without choreography
      return;
    }
    busyRef.current = true;

    if (!interactive) {
      // mobile / reduced motion: no choreography, just continue
      choose(track);
      busyRef.current = false;
      if (!reducedMotion) scrollToTarget("#education");
      return;
    }

    if (track === "design") {
      // backend side slides out, ui/ux side expands into color
      const tl = gsap.timeline({ onComplete: () => finish("design") });
      tl.to(rightRef.current, {
        xPercent: 24,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.in",
      })
        .to(
          rightRef.current,
          { flexBasis: "0%", padding: 0, duration: 0.6, ease: "power3.inOut" },
          "-=0.35"
        )
        .to(
          washRef.current,
          { autoAlpha: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .to(headerRef.current, { autoAlpha: 0, duration: 0.4 }, "<");
    } else {
      // terminal sequence beat (~1.8s), left side fades out underneath
      gsap.to(leftRef.current, {
        xPercent: -24,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.in",
      });
      gsap.to(headerRef.current, { autoAlpha: 0, duration: 0.4 });
      setTerminalStep(0);
      TERMINAL_LINES.forEach((_, i) => {
        setTimeout(() => setTerminalStep(i + 1), 450 * (i + 1));
      });
      setTimeout(() => finish("backend"), 450 * TERMINAL_LINES.length + 500);
    }
  };

  // ---------- mobile / narrow fallback: stacked tappable cards ----------
  if (narrow) {
    return (
      <section
        id="fork"
        aria-label="Choose a track"
        data-waypoint
        className="relative z-10 px-6 py-24"
      >
        <p className="eyebrow mb-2 text-signal">the trail forks here</p>
        <h2 className="mb-8 font-display text-3xl">Which side do you want to see?</h2>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => pick("design")}
            aria-label="See the ui/ux side"
            className="rounded-2xl border border-fog bg-fog/60 p-6 text-left transition-colors active:border-bloom"
          >
            <div className="mb-4 grid w-fit grid-cols-3 gap-1.5">
              {PREVIEW_BLOCKS.slice(0, 6).map((c, i) => (
                <span key={i} className={`size-4 rounded-md ${c}`} />
              ))}
            </div>
            <span className="font-display text-2xl">see the ui/ux side</span>
            <p className="mt-1 text-sm text-slate">color, flows and the story behind screens</p>
          </button>
          <button
            type="button"
            onClick={() => pick("backend")}
            aria-label="See the backend side"
            className="rounded-2xl border border-fog bg-ink p-6 text-left font-mono transition-colors active:border-signal"
          >
            <div className="mb-4 text-xs leading-relaxed text-slate">
              <p>$ npm run build</p>
              <p className="text-signal">✓ compiled successfully</p>
            </div>
            <span className="font-display text-2xl">see the backend side</span>
            <p className="mt-1 font-body text-sm text-slate">architecture, stacks and hard problems</p>
          </button>
        </div>
      </section>
    );
  }

  // ---------- desktop: split, pinned, locked ----------
  return (
    <section
      ref={sectionRef}
      id="fork"
      aria-label="Choose a track"
      data-waypoint
      data-trail-y="0.15"
      className="relative z-10 flex h-screen overflow-hidden"
    >
      <div
        ref={headerRef}
        className="pointer-events-none absolute inset-x-0 top-24 z-20 text-center"
      >
        <p className="eyebrow text-signal">the trail forks here</p>
        <p className="mt-2 font-display text-2xl text-paper/90 md:text-3xl">
          Pick a side to continue.
        </p>
      </div>

      {/* ui/ux half */}
      <button
        ref={leftRef}
        type="button"
        onClick={() => pick("design")}
        aria-label="See the ui/ux side"
        data-interactive
        className="group relative flex basis-1/2 flex-col items-center justify-center gap-8 border-r border-fog/60 px-10 transition-colors duration-300 hover:bg-fog/40 focus-visible:bg-fog/40"
      >
        <div className="grid grid-cols-3 gap-2 transition-transform duration-300 group-hover:scale-105">
          {PREVIEW_BLOCKS.map((c, i) => (
            <span
              key={i}
              className={`size-8 rounded-xl md:size-10 ${c} transition-transform duration-300 group-hover:rotate-3`}
            />
          ))}
        </div>
        <span className="font-display text-3xl text-paper md:text-4xl">
          see the ui/ux side
        </span>
        <span className="eyebrow text-bloom">color · flows · story</span>
        {/* color wash revealed when this side is chosen */}
        <div
          ref={washRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            visibility: "hidden",
            background:
              "radial-gradient(120% 120% at 20% 20%, rgba(232,93,138,0.28), transparent 55%), radial-gradient(120% 120% at 85% 75%, rgba(242,115,74,0.24), transparent 55%), radial-gradient(100% 100% at 50% 100%, rgba(53,201,176,0.18), transparent 60%)",
          }}
        />
      </button>

      {/* backend half */}
      <button
        ref={rightRef}
        type="button"
        onClick={() => pick("backend")}
        aria-label="See the backend side"
        data-interactive
        className="group relative flex basis-1/2 flex-col items-center justify-center gap-8 px-10 transition-colors duration-300 hover:bg-fog/40 focus-visible:bg-fog/40"
      >
        <div className="w-64 rounded-lg border border-fog bg-ink p-4 text-left font-mono text-xs leading-relaxed text-slate transition-transform duration-300 group-hover:scale-105">
          <p className="text-paper/70">$ npm run build</p>
          <p>bundling modules…</p>
          <p>tests: 87 passed</p>
          <p className="text-signal">✓ compiled successfully</p>
          <p className="text-paper/70">
            $ <span className="animate-pulse">█</span>
          </p>
        </div>
        <span className="font-display text-3xl text-paper md:text-4xl">
          see the backend side
        </span>
        <span className="eyebrow text-signal">architecture · stack · systems</span>
      </button>

      {/* backend selection: terminal sequence overlay */}
      {terminalStep >= 0 && (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-0 z-30 flex items-center justify-center bg-ink/85 backdrop-blur-sm"
        >
          <div className="w-[min(30rem,90vw)] rounded-xl border border-fog bg-ink p-6 font-mono text-sm shadow-2xl">
            <div className="mb-4 flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-citrus/70" />
              <span className="size-2.5 rounded-full bg-stage/70" />
              <span className="size-2.5 rounded-full bg-signal/70" />
            </div>
            {TERMINAL_LINES.slice(0, terminalStep + 1).map((line, i) => (
              <p
                key={i}
                className={
                  line.tone === "ok"
                    ? "text-signal"
                    : line.tone === "dim"
                      ? "text-slate"
                      : "text-paper/80"
                }
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
