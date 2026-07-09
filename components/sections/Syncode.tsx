"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { syncode } from "@/lib/content";
import { useTrack } from "@/components/providers/TrackProvider";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Team SYNCODE. On the design track this is a visual gallery: real
 * screenshots of the client sites that "assemble" into place with a
 * staggered scatter animation and zoom on hover. The backend track keeps
 * the compact name-and-tag tiles.
 */
export default function Syncode() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const hoverReduced = useReducedMotion();
  const { track } = useTrack();
  const isDesign = track === "design";

  const gallerySites = syncode.sites.filter((s) => s.img);

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const head = headRef.current;
    if (!section || !head) return;

    const ctx = gsap.context(() => {
      gsap.from(head.children, {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: head, start: "top 78%", once: true },
      });
      const grid = section.querySelector("[data-syncode-grid]");
      if (!grid) return;
      grid.querySelectorAll("li").forEach((tile, i) => {
        gsap.from(tile, {
          y: 70 + (i % 3) * 24,
          x: (i % 2 === 0 ? -1 : 1) * (18 + (i % 3) * 10),
          rotation: i % 2 === 0 ? -3 : 3,
          scale: 0.88,
          autoAlpha: 0,
          duration: 0.9,
          delay: i * 0.08,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: grid, start: "top 82%", once: true },
        });
      });
    }, section);
    return () => ctx.revert();
    // re-run when the grid variant swaps so new tiles get the entrance too
  }, [reducedMotion, isDesign]);

  return (
    <section
      ref={sectionRef}
      id="syncode"
      aria-label="Team SYNCODE"
      data-waypoint
      data-trail-x="0.22"
      className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-40"
    >
      <div ref={headRef}>
        <p className="eyebrow text-stage">waypoint 03 — team syncode</p>
        <h2 className="mt-2 font-display text-3xl md:text-5xl">
          {syncode.role}
        </h2>
        <p className="mt-2 font-mono text-xs text-slate">{syncode.period}</p>
        <p className="mt-5 max-w-xl text-slate">{syncode.blurb}</p>
      </div>

      {isDesign ? (
        <ul
          data-syncode-grid
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Client sites"
        >
          {gallerySites.map((site) => (
            <motion.li
              key={site.name}
              whileHover={hoverReduced ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group overflow-hidden rounded-2xl border border-fog bg-fog/50 transition-colors hover:border-stage/60"
            >
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${site.name} — ${site.desc}`}
                className="block"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={site.img}
                    alt={`Screenshot of the ${site.name} website`}
                    loading="lazy"
                    className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-30" />
                </div>
                <div className="p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-medium text-paper">
                      {site.name}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-stage">
                      {site.tag}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate">
                    {site.desc}
                  </p>
                  <span className="mt-2 inline-block font-mono text-[10px] text-signal opacity-0 transition-opacity group-hover:opacity-100">
                    visit live site ↗
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      ) : (
        <ul
          data-syncode-grid
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
          aria-label="Client sites"
        >
          {syncode.sites.map((site) => {
            const inner = (
              <>
                <span className="font-mono text-[10px] uppercase tracking-widest text-stage">
                  {site.tag}
                </span>
                <span className="text-sm leading-snug text-paper">
                  {site.name}
                  {site.url && (
                    <span className="ml-1 text-signal" aria-hidden="true">
                      ↗
                    </span>
                  )}
                </span>
              </>
            );
            return (
              <motion.li
                key={site.name}
                whileHover={hoverReduced ? undefined : { y: -5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="rounded-2xl border border-fog bg-fog/60 transition-colors hover:border-stage/60"
              >
                {site.url ? (
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${site.name}`}
                    className="flex aspect-square flex-col justify-between p-4"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex aspect-square flex-col justify-between p-4">
                    {inner}
                  </div>
                )}
              </motion.li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
