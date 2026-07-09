"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { syncode } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Team SYNCODE: the five client sites "assemble" into a grid as the section
 * scrolls in — staggered scale/fade with a slight scatter, pure GSAP.
 */
export default function Syncode() {
  const gridRef = useRef<HTMLUListElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const hoverReduced = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const grid = gridRef.current;
    const head = headRef.current;
    if (!grid || !head) return;

    const ctx = gsap.context(() => {
      gsap.from(head.children, {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: head, start: "top 78%", once: true },
      });
      const tiles = grid.querySelectorAll("li");
      tiles.forEach((tile, i) => {
        gsap.from(tile, {
          y: 70 + (i % 3) * 24,
          x: (i % 2 === 0 ? -1 : 1) * (18 + (i % 3) * 10),
          rotation: i % 2 === 0 ? -4 : 4,
          scale: 0.85,
          autoAlpha: 0,
          duration: 0.9,
          delay: i * 0.09,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: grid, start: "top 80%", once: true },
        });
      });
    }, grid.parentElement as HTMLElement);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="syncode"
      aria-label="Team SYNCODE"
      data-waypoint
      data-trail-x="0.22"
      className="relative z-10 mx-auto max-w-5xl px-6 py-28 md:py-40"
    >
      <div ref={headRef}>
        <p className="eyebrow text-stage">waypoint 03 — team syncode</p>
        <h2 className="mt-2 font-display text-3xl md:text-5xl">
          {syncode.role}
        </h2>
        <p className="mt-2 font-mono text-xs text-slate">{syncode.period}</p>
        <p className="mt-5 max-w-xl text-slate">{syncode.blurb}</p>
      </div>

      <ul
        ref={gridRef}
        className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
        aria-label="Client sites"
      >
        {syncode.sites.map((site) => (
          <motion.li
            key={site.name}
            whileHover={hoverReduced ? undefined : { y: -5, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="flex aspect-square flex-col justify-between rounded-2xl border border-fog bg-fog/60 p-4 transition-colors hover:border-stage/60"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-stage">
              {site.tag}
            </span>
            <span className="text-sm leading-snug text-paper">{site.name}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
