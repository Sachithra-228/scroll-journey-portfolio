"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { contact, links } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * The closing chapter: a "stage lights" moment nodding to the SLBC presenter
 * background — a warm spotlight vignette brightens as the section scrolls
 * in, and the trail ends here.
 */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const hoverReduced = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const light = lightRef.current;
    if (!section || !light) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        light,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.6,
          },
        }
      );
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  const socials = [
    { label: "LinkedIn", href: links.linkedin },
    { label: "GitHub", href: links.github },
    { label: "YouTube", href: links.youtube },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact"
      data-waypoint
      data-trail-y="0.45"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      {/* stage light */}
      <div
        ref={lightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: reducedMotion ? 1 : undefined,
          background:
            "radial-gradient(55% 45% at 50% 42%, rgba(242,169,59,0.14), transparent 70%), radial-gradient(90% 70% at 50% 50%, rgba(242,169,59,0.05), transparent 75%)",
        }}
      />

      <p className="eyebrow relative text-stage">{contact.eyebrow}</p>
      <h2 className="relative mt-5 max-w-3xl text-balance font-display text-4xl leading-tight md:text-6xl">
        {contact.heading}
      </h2>
      <p className="relative mt-6 max-w-md text-slate">{contact.sub}</p>

      <motion.a
        href={`mailto:${links.email}`}
        whileHover={hoverReduced ? undefined : { scale: 1.04 }}
        whileTap={hoverReduced ? undefined : { scale: 0.98 }}
        className="relative mt-10 rounded-full bg-stage px-8 py-4 font-mono text-sm font-medium text-ink shadow-[0_0_40px_rgba(242,169,59,0.25)] transition-shadow hover:shadow-[0_0_60px_rgba(242,169,59,0.4)]"
      >
        {contact.cta} →
      </motion.a>

      <ul className="relative mt-12 flex gap-8" aria-label="Social links">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest text-slate transition-colors hover:text-signal"
            >
              {s.label.toLowerCase()} ↗
            </a>
          </li>
        ))}
      </ul>

      <p className="relative mt-16 font-mono text-[11px] text-slate/60">
        © {new Date().getFullYear()} Sachithra Wijesinghe — built with a single
        teal line and too much coffee
      </p>
    </section>
  );
}
